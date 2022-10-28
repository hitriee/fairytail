import React, {useRef, useState, Suspense} from 'react';
import {useFrame, useLoader} from '@react-three/fiber';
import {Mesh, TextureLoader} from 'three';
import {useTexture, OrbitControls} from '@react-three/drei';
import map from '../../assets/images/map.png';
import earthMap from '../../assets/images/earthmap.jpg';
import nightEarth from '../../assets/images/earthlights.jpg';
import icon from '../../assets/images/icon.svg';
import {NearestMipMapLinearFilter} from 'three/src/constants';
import {Texture} from 'three/src/Three';

export function Earth(props: JSX.IntrinsicElements['mesh']) {
  const mapImg = useTexture(earthMap);
  const nightImg = useTexture(nightEarth);

  const mesh = useRef<Mesh>(null!);
  useFrame((state, delta) => (mesh.current.rotation.y += 0.007));
  return (
    <>
      <OrbitControls
        // autoRotate
        // autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4 - 0.14}
        maxPolarAngle={Math.PI - 0.78}
        maxDistance={30}
        minDistance={5}
      />
      <Suspense fallback={null}>
        <mesh ref={mesh} scale={3} onClick={e => console.log('click')}>
          <meshStandardMaterial map={mapImg} transparent />
          {/* <meshStandardMaterial map={mapImg} transparent color="#545454" /> */}
          <meshStandardMaterial map={nightImg} transparent color="white" />
          <sphereGeometry />
        </mesh>
      </Suspense>
    </>
  );
}
