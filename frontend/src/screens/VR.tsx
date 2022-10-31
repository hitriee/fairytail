import 'aframe';
import {
  Scene,
  Box,
  Camera,
  Assets,
  Image,
  Cursor,
  Sky,
} from '@belivvr/aframe-react';
import {emojiArr} from '../assets/emojis';

AFRAME.registerComponent('clickhandler', {
  schema: {
    txt: {default: 'default'},
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    el.addEventListener('click', function () {
      console.log(data.txt);
    });
  },
});

function VR() {
  const data = [
    {like_cnt: 0, emoji_no: 0, post_id: 0},
    {like_cnt: 1, emoji_no: 1, post_id: 1},
    {like_cnt: 2, emoji_no: 2, post_id: 2},
    {like_cnt: 3, emoji_no: 3, post_id: 3},
    {like_cnt: 4, emoji_no: 4, post_id: 4},
  ];

  const maxX = 5;
  const minX = -5;
  const maxY = 10;
  const minY = 1;
  const maxZ = 5;
  const minZ = -5;

  const minSize = 0.15;
  const maxSize = 0.5;

  let emojis = data.map(({like_cnt, emoji_no, post_id}) => {
    <Image
      src={emojiArr[emoji_no]}
      height={like_cnt > 2 ? 0.5 : 0.15}
      width={like_cnt > 2 ? 0.5 : 0.15}
      rotation={{x: 0, y: 0, z: 0}}
      position={{x: 0, y: 1, z: -1}}
      shader="standard"
      clickhandler={`txt.${post_id}`}
    />;
  });

  const test = () => {
    let arr: typeof Image[] = [];
    for (let i = 0; i < 5; i++) {
      return (
        <Image
          src={emojiArr[0]}
          height={0.15}
          width={0.15}
          rotation={{x: 0, y: 0, z: 0}}
          position={{x: 0, y: 1, z: -1}}
          shader="standard"
          clickhandler="txt:img!"
        />
      );
    }
    return arr;
  };

  return (
    <Scene cursor="rayOrigin: mouse">
      <Sky color="#00FF00" />

      <Image
        src={emojiArr[0]}
        height={0.15}
        width={0.15}
        rotation={{x: 0, y: 0, z: 0}}
        position={{x: 0, y: 1, z: -1}}
        shader="standard"
        clickhandler="txt:img!"
      />

      {/* <Image
        src={emojiArr[0]}
        height={0.5}
        width={0.5}
        rotation={{x: 0, y: 0, z: 0}}
        position={{x: 0, y: 2, z: -1}}
        shader="standard"
        clickhandler="txt:img!"
      /> */}

      {/* <Box
        position={{x: -5, y: 10, z: -5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#ff3c00"
        clickhandler="txt:box1"
      />
      <Box
        position={{x: 5, y: 10, z: -5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#ffa200"
        clickhandler="txt:box2"
      />
      <Box
        position={{x: -5, y: 10, z: 5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#f2ff00"
        clickhandler="txt:box3"
      />
      <Box
        position={{x: 5, y: 10, z: 5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#3cff00"
        clickhandler="txt:box4"
      />
      <Box
        position={{x: -5, y: 0, z: -5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#00fbff"
        clickhandler="txt:box5"
      />
      <Box
        position={{x: 5, y: 0, z: -5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#0026ff"
        clickhandler="txt:box6"
      />
      <Box
        position={{x: -5, y: 0, z: 5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#960afa"
        clickhandler="txt:box7"
      />
      <Box
        position={{x: 5, y: 0, z: 5}}
        rotation={{x: 0, y: 45, z: 0}}
        color="#ff00bf"
        clickhandler="txt:box8"
      /> */}

      <Camera
        wasdControlsEnabled={false}
        orbit-controls="
        autoRotate: true;
        autoRotateSpeed: -0.1;
        rotateSpeed: 0.1;
        target: 0 0 0;
        initialPosition: 0 0 0;
        minPolarAngle: 0;
        maxPolarAngle: 90;
      "
      />
    </Scene>
  );
}

export default VR;
