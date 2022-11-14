import imageCompression from 'browser-image-compression';

// 이미지 압축
async function Compress(file: File) {
  const options = {
    maxSizeMb: 5,
    maxWidthOrHeight: 1920,
  };

  let compressedFile;

  try {
    compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default Compress;
