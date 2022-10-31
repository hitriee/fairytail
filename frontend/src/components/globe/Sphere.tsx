import React, {useRef, useState, Suspense} from 'react';
import {useFrame, useLoader} from '@react-three/fiber';
import {Mesh, TextureLoader} from 'three';
import {useTexture, OrbitControls} from '@react-three/drei';
import map from '../../assets/images/map.png';
import earthMap from '../../assets/images/earthmap.jpg';
import nightEarth from '../../assets/images/earthlights.jpg';
import resolution from '../../assets/images/resolution.jpg';
import icon from '../../assets/images/icon.svg';
import {NearestMipMapLinearFilter} from 'three/src/constants';
import {Texture} from 'three/src/Three';

export function Earth(props: JSX.IntrinsicElements['mesh']) {
  const mapImg = useTexture(earthMap);
  const nightImg = useTexture(nightEarth);
  const nightImg2 = useTexture(resolution);

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
        minDistance={8}
      />
      <Suspense fallback={null}>
        <mesh ref={mesh} scale={3} {...props}>
          <meshStandardMaterial map={mapImg} transparent />
          {/* <meshStandardMaterial map={mapImg} transparent color="#545454" /> */}
          {/* <meshStandardMaterial map={nightImg} transparent color="white" /> */}
          <meshStandardMaterial map={nightImg2} transparent color="white" />
          <sphereGeometry />
        </mesh>
      </Suspense>
    </>
  );
}
