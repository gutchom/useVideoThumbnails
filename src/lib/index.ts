import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type VideoThumbnail = {
  blob: Blob;
  second: number;
};

/**
 * Create thumbnails of HTMLVideoElement.
 * @param count - A number of thumbnails.
 * @param scale - A number of scale.
 * @param mimeType - A string indicating the image format.
 * @param qualityArgument - A number between 0 and 1 indicating the image quality.
 * @see https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/toBlob
 */
export default function useVideoThumbnails(
  count: number,
  scale = 1,
  mimeType: `image/${'png' | 'jpeg' | 'webp'}` = 'image/jpeg',
  qualityArgument = 0.95,
): [videoRef: RefObject<HTMLVideoElement>, thumbnails: VideoThumbnail[]] {
  const ref = useRef<HTMLVideoElement>(null);
  const [thumbnails, setThumbnails] = useState<VideoThumbnail[]>([]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    let interval: number;
    const thumbs: VideoThumbnail[] = [];
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    video.addEventListener('seeked', drawThumbnail);
    video.addEventListener('canplaythrough', handleReady);
    video.crossOrigin = 'anonymous';
    video.src = ref.current.src;
    video.load();

    function handleReady() {
      video.removeEventListener('canplaythrough', handleReady);
      video.currentTime = video.duration;
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      interval = video.duration / (count - 1);
    }

    function drawThumbnail() {
      if (!ctx) {
        throw new Error('canvas context is not found.');
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      (function recurse(limit = 5) {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              if (limit > 0) {
                recurse(--limit);
              }
              throw new Error();
            }
            thumbs.push({ blob, second: video.currentTime });
            if (thumbs.length < count) {
              video.currentTime -= interval;
            } else {
              cleanup();
              setThumbnails(thumbs.reverse());
            }
          },
          mimeType,
          qualityArgument,
        );
      })();
    }

    function cleanup() {
      video.removeEventListener('seeked', drawThumbnail);
      video.removeEventListener('canplaythrough', handleReady);
    }

    return cleanup;
  }, [ref, count, mimeType, qualityArgument]);

  return [ref, thumbnails];
}
