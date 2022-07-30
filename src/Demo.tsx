import React from 'react';
import useVideoThumbnails from './lib';

export default function Demo() {
  const [ref, thumbnails] = useVideoThumbnails(8, 0.125);

  return (
    <div>
      <video ref={ref} controls preload="none">
        <source src="/sample.mp4" />
      </video>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {thumbnails.map(({ blob, time }) => (
          <figure key={time} style={{ margin: 0 }}>
            <img src={URL.createObjectURL(blob)} alt="" />
            <figcaption>{time}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
