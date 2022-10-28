import React from "react";
import Room from "../components/room/Room";

function Main() {
  return (
    <>
      <Room />
      {/* <p>this is main</p> */}
    </>
  );
}

export default Main;

// import React from 'react';
// import Experience from '../components/main/Experience/Experience.js';

// function Main() {
//   return <Experience />;
// }

// export default Main;

// import React, {useRef, useState} from 'react';
// import {Canvas, useFrame} from '@react-three/fiber/native';

// function Box(props) {
//   const mesh = useRef(null);
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={event => setActive(!active)}
//       onPointerOver={event => setHover(true)}
//       onPointerOut={event => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   );
// }

// export default function App() {
//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Box position={[-1.2, 0, 0]} />
//       <Box position={[1.2, 0, 0]} />
//     </Canvas>
//   );
// }
