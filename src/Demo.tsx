import React from 'react';
import useVideoThumbnails from './lib';

export default function Demo() {
  const [ref, thumbnails] = useVideoThumbnails(10, 0.1);

  return (
    <div>
      <video ref={ref} controls src="/sample.mp4" />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {thumbnails.map(({ blob, second }) => (
          <figure key={second} style={{ margin: 0 }}>
            <img src={URL.createObjectURL(blob)} />
            <figcaption>{second}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
