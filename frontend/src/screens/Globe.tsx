// ** 숨겨진 페이지
import {useState, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';

import '@screens/Globe.scss';
import Stars from '@globe/Stars';
import {Earth} from '@globe/Sphere';
import MoveToBack from '@common/MoveToBack';

import {main} from '@apis/router';
import {returnFalse, returnTrue} from '@common/commonFunc';

function Globe() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isFirstVisit, setFirstVisit] = useState(false);

  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const setVisited = () => {
    setFirstVisit(returnFalse);
    localStorage.setItem('visited', 'true');
  };
  useEffect(() => {
    window.addEventListener('resize', onResize);
    if (!localStorage.getItem('visited')) {
      setFirstVisit(returnTrue);
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <div className="globe-background">
        {isFirstVisit ? (
          <div className="first-visit-background" onClick={setVisited}>
            <span className="white center first-visit">
              숨겨진 페이지에 오신 것을 환영합니다. <br /> 지구를 돌려보세요.
            </span>
          </div>
        ) : null}
        <MoveToBack path={main()} />
        <Canvas
          style={{width, height, cursor: 'grab'}}
          camera={{near: 6, far: 30, zoom: 1.2}}>
          <Stars position={[0, 0, 0]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Earth position={[0, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
}
export default Globe;
