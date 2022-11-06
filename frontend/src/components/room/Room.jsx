import React, {useState, useEffect, Suspense, lazy} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, useProgress, Html} from '@react-three/drei';
import './Room.scss';
// import Loading from './Loading';
import Scene from './Scene';

function Room() {
  const [isLoading, setIsLoading] = useState(true);

  const Loader = () => {
    const {active, progress, errors, item, loaded, total} = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

  return (
    <>
      <Canvas shadows flat linear className="room">
        <Suspense fallback={<Loader />}>
          <Scene setSize={{width: 100, height: 100}} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Room;

// return (
//   <>
//     <Canvas shadows flat linear className="room">
//       <Suspense fallback={<Loader />}>
//         <Scene setSize={{width: 100, height: 100}} />
//         <OrbitControls />
//       </Suspense>
//     </Canvas>
//   </>
// );

// function Room() {
//   return (
//     // <div className="Room">
//     // <Suspense fallback={null}>
//     <Suspense fallback={<Loader />}>
//       {/* <Suspense fallback={<Loading />}> */}

//       <Canvas shadows flat linear className="room">
//         <Scene setSize={{width: 100, height: 100}} />
//         <OrbitControls />
//       </Canvas>
//     </Suspense>
//     // </div>
//   );
// }
// export default Room;
