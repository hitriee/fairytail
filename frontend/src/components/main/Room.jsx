import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import './Room.scss';
import Scene from './Scene';

function Room() {
  return (
    <>
      <Canvas shadows flat linear className="room">
        <Scene setSize={{width: 100, height: 100}} />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default Room;
