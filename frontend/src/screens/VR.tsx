import 'aframe';
import {
  Scene,
  Box,
  Camera,
  Assets,
  Image,
  Cursor,
  Sky,
  Entity,
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
  return (
    <Scene cursor="rayOrigin: mouse">
      <Assets>
        <img
          id="city"
          src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg"
        />
        <img id="test" src={emojiArr[0]} alt="테스트" />
      </Assets>

      <Sky id="" src="#city" />

      <Entity />

      <Image
        src="#test"
        opacity={1}
        width={1}
        position={{x: 1, y: 0.7, z: 0}}
        billboard
      />

      <Box
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
      />

      <Camera
        near={1}
        wasdControlsEnabled={false}
        orbit-controls="
        autoRotate: true;
        autoRotateSpeed: -0.1;
        rotateSpeed: 0.1;
        target: 0 0 0;
        initialPosition: 0 0 0;
        minPolarAngle: 0;
        maxPolarAngle: 90;
      ">
        <Cursor
          id="cursor"
          animation__click={{
            property: 'scale',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            easing: 'easeInCubic',
            dur: 150,
            startEvents: ['click'],
          }}
          animation__clickreset={{
            property: 'scale',
            to: '0.1 0.1 0.1',
            dur: 1,
            startEvents: ['animationcomplete__click'],
          }}
          animation__fusing={{
            property: 'scale',
            from: '1 1 1',
            to: '0.1 0.1 0.1',
            easing: 'easeInCubic',
            dur: 150,
            startEvents: ['fusing'],
          }}
        />
      </Camera>
    </Scene>
  );
}

export default VR;
