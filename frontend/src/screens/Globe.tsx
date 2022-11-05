import {useState, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import Stars from '@globe/Stars';
import {Earth} from '@globe/Sphere';
import {useNavigate} from 'react-router';
import {map} from '@apis/router';
import NavBar from '@common/NavBar';
import '@screens/Globe.scss';

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
    <div className="globe-background">
      <NavBar />
      <Canvas style={{width, height}} camera={{near: 6, far: 30}}>
        {/* <color attach="background" args={[0, 0, 0]} /> */}
        <Stars position={[0, 0, 0]} />
        <ambientLight />
        {/* <pointLight position={[5, 1, 2]} /> */}
        <pointLight position={[10, 10, 10]} />
        <Earth position={[0, 0, 0]} onClick={toMap} />
      </Canvas>
    </div>
  );
}
export default Globe;
