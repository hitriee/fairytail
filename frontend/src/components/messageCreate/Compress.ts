import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

async function Compress(file: File, type: string, name: string) {
  const nameArr = name.split('.');

  let targetExtension;

  if (type.startsWith('image')) {
    targetExtension = 'webp';
  } else if (type.startsWith('video')) {
    targetExtension = 'mp4';
  } else if (type.startsWith('audio')) {
    targetExtension = 'mp3';
  }

  const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
  });

  // ffmpeg-core 로딩
  await ffmpeg.load();

  // 원본 파일 업로드
  ffmpeg.FS('writeFile', name, await fetchFile(file));

  // 변환
  await ffmpeg.run('-i', name, '-r', '33', `output.${targetExtension}`);

  // 변환된 파일 읽기
  const targetFile = ffmpeg.FS('readFile', `output.${targetExtension}`);

  // 변환된 파일의 URL 생성
  const targetBlob = new Blob([targetFile.buffer], {type: 'video/mp4'});
  const targetURL = URL.createObjectURL(targetBlob);

  return targetURL;
}

export default Compress;
// ffmpeg.wasm
// 웹 어셈블리(wasm)로 포팅된 ffmpeg을 javascript에서 사용할 수 있도록 제공하는 인터페이스 형식의 패키지

// [IMAGE]
// image/gif
// image/png
// image/jpeg
// image/bmp
// image/webp
// image/tiff
// image/svg+xml
// image/x-icon

// [AUDIO]
// audio/aac
// audio/midi
// audio/mpeg
// audio/ogg
// audio/wave
// audio/wav
// audio/webm
// audio/x-wav
// audio/x-pn-wav
// audio/3gpp
// audio/3gpp2

// [VIDEO]
// video/x-msvideo
// video/webm
// video/ogg
// video/3gpp
// video/3gpp2
// video/mpeg
