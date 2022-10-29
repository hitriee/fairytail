import * as THREE from 'three';
import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useFrame, ThreeElements, useThree} from '@react-three/fiber';
import Stars from '../components/globe/Stars';
import {Earth} from '../components/globe/Sphere';
import {useNavigate} from 'react-router';
import {map} from '../apis/router';

function Globe() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const toMap = () => navigate(map());
  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <Canvas style={{width, height}}>
      <color attach="background" args={[0, 0, 0]} />
      <Stars position={[-1, -1, 0]} />
      <ambientLight />
      <ambientLight />
      <pointLight position={[5, 1, 2]} />
      <pointLight position={[10, 10, 10]} />
      <Earth position={[0, 0, 0]} onClick={toMap} />
    </Canvas>
  );
}
export default Globe;
