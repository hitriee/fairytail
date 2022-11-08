// import Ffmpeg from 'fluent-ffmpeg';
// import {useState} from 'react';

// export default function Compress(fileURL: string) {
//   const [result, setResult] = useState();

//   Ffmpeg(fileURL)
//     .setFfmpegPath('C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe')
//     .setFfprobePath('C:\\Program Files\\ffmpeg\\bin\\ffprobe.exe')
//     .format('mp4')
//     .size('640x?')
//     .aspect('1:1')
//     .autopad(true)
//     .audioCodec('libmp3lame')
//     .videoCodec('libx264')
//     .save('test.mp4')
//     .on('progress', ({timemark}) => {
//       console.log(timemark);
//     })
//     .on('end', res => {
//       if (!res) {
//         res.send('success');
//       }
//     })
//     .run();

//   return result;
// }

import React from 'react';

export default function Compress(fileURL: string) {
  return '테스트';
}
