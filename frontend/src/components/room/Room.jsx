import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import Scene from './Scene';
import './Room.scss';

function Room() {
  return (
    // <div className="Room">
    <Suspense fallback={null}>
      <Canvas shadows flat linear className="room">
        <Scene setSize={{width: 100, height: 100}} />
        <OrbitControls />
      </Canvas>
    </Suspense>
    // </div>
  );
}
export default Room;
