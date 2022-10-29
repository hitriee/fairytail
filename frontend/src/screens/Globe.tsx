import * as THREE from 'three';
import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useFrame, ThreeElements, useThree} from '@react-three/fiber';
// import {Stars} from '@react-three/drei';
import {Earth} from '../components/globe/Sphere';
import Stars from '../components/globe/Stars';
import {useNavigate} from 'react-router-dom';
import {map} from '../apis/router';

function Globe() {
  const navigate = useNavigate();
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const onResized = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };
  const toMap = () => navigate(map());
  useEffect(() => {
    window.addEventListener('resize', onResized);
    return () => {
      window.addEventListener('resize', onResized);
    };
  });
  return (
    <>
      <Canvas style={{width, height}}>
        {/* 추후 suspense 추가 */}
        <Earth position={[0, 0, 0]} onClick={toMap} />
        <Stars position={[-10, 0, 0]} />
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight />
        <ambientLight />
        <ambientLight />
        <pointLight position={[5, 1, 3]} />
        <pointLight position={[10, 10, 10]} />
        {/* <pointLight position={[20, 10, 10]} /> */}
      </Canvas>
    </>
  );
}
export default Globe;
