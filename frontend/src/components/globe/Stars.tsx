import {Environment, OrbitControls, useTexture} from '@react-three/drei';
import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
// import star from '../../assets/images/milkyway.jpg';
// import star from '../../assets/images/stars.jpg';
import star from '../../assets/images/stars2.jpg';

export default function Stars(props: JSX.IntrinsicElements['points']) {
  const ref = useRef<THREE.BufferGeometry>(null!);
  // const texture = useTexture(star);

  useEffect(() => {
    const count = 1000;
    const positions = new Float32Array(count * 32);
    const colors = new Float32Array(count * 32);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.58) * 70;
      colors[i] = Math.random();
    }
    ref.current.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 4),
    );
    ref.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);

  return (
    <>
      {/* <OrbitControls /> */}
      <points {...props}>
        <bufferGeometry ref={ref} />
        <pointsMaterial
          size={0.01}
          vertexColors
          color={'white'}
          // map={texture}
          transparent
          // alphaMap={texture}
          depthWrite={false}
        />
      </points>
    </>
  );
}
