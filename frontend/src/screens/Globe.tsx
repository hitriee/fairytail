// // import React, {useState, useEffect, useRef, useMemo} from 'react';
// import {Earth} from '../components/globe/test';
// import {Canvas, useFrame} from '@react-three/fiber';
// import {OrbitControls, useTexture, Stars} from '@react-three/drei';
// import React, {useEffect, useRef, useCallback, useState, Suspense} from 'react';
// import * as THREE from 'three';
// import star from '../assets/images/milky-way-1427210.jpg';
// // import {SphereGeometry} from 'three';

// function Globe() {
//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <spotLight position={[10, 15, 10]} angle={0.3} />
//       <Suspense fallback={null}>
//         <Earth position={[-1, 0, 0]} />
//         <Stars />
//       </Suspense>
//     </Canvas>
//   );
// }

// export default Globe;

import * as THREE from 'three';
import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useFrame, ThreeElements, useThree} from '@react-three/fiber';
import {Stars} from '@react-three/drei';
import {Earth} from '../components/globe/test';
// import UsePackage from '../components/globe/globeGl';
// import UsePackage from '../components/globe/globeGl';
// import ReactGlobe from 'react-globe.gl';

function Globe() {
  // const set = useThree(state => state.setSize);
  // useEffect(() => {
  //   set(1100, 1100);
  // }, []);
  return (
    <Canvas style={{flex: 1}}>
      <color attach="background" args={[0, 0, 0]} />
      <ambientLight />
      <ambientLight />
      <pointLight position={[5, 1, 2]} />
      <pointLight position={[10, 10, 10]} />
      <Earth position={[-1.2, 0, 0]} />
    </Canvas>
  );
}
export default Globe;
