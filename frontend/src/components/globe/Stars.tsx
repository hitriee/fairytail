import {useEffect, useRef} from 'react';
import * as THREE from 'three';

export default function Stars(props: JSX.IntrinsicElements['points']) {
  const ref = useRef<THREE.BufferGeometry>(null!);

  useEffect(() => {
    const count = 300;
    const positions = new Float32Array(count * 32);
    const colors = new Float32Array(count * 32);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.55) * 35;
      colors[i] = 0.5;
      // colors[i] = i % 3;
      // colors[i] = i % 5;
      colors[i] = i % 6;
      // colors[i] = i % 8;
      // colors[i] = 1;
    }
    ref.current.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 4),
    );
    ref.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);

  return (
    <>
      <points {...props}>
        <bufferGeometry ref={ref} />
        <pointsMaterial
          size={0.045}
          vertexColors
          color={'white'}
          transparent
          depthWrite={false}
        />
      </points>
    </>
  );
}
