import useVideoThumbnails from "./index";

export default function Demo() {
  const [ref, thumbnails] = useVideoThumbnails(10, 0.2);

  return (
    <div>
      <video ref={ref} controls src="/sample.mp4"/>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {thumbnails.map(({ blob, second }) => (
          <figure key={second} style={{ margin: 0 }}>
            <img src={URL.createObjectURL(blob)} />
            <figcaption>{second}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}