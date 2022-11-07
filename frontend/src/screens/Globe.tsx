import {useState, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import Stars from '@globe/Stars';
import {Earth} from '@globe/Sphere';
import {main} from '@apis/router';
import MoveToBack from '@common/MoveToBack';
import '@screens/Globe.scss';
import {useRecoilState} from 'recoil';
import {loadingState} from '../apis/Recoil';

function Globe() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  if (isLoading) {
    setIsLoading(false);
  }

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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
    <div className="globe-background">
      <MoveToBack path={main()} />
      <Canvas style={{width, height}} camera={{near: 6, far: 30}}>
        {/* <color attach="background" args={[0, 0, 0]} /> */}
        <Stars position={[0, 0, 0]} />
        <ambientLight />
        {/* <pointLight position={[5, 1, 2]} /> */}
        <pointLight position={[10, 10, 10]} />
        <Earth position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
export default Globe;
