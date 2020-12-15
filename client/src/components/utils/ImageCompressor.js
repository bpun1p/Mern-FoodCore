import imageCompression from 'browser-image-compression';

export default function ImageCompressor(file) {
  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 700,
    useWebWorker: true,
  };
  return imageCompression(file, options);
}
