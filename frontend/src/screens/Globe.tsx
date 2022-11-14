// ** 숨겨진 페이지

import {useState, useEffect, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import Stars from '@globe/Stars';
import {Earth} from '@globe/Sphere';
import {main} from '@apis/router';
import MoveToBack from '@common/MoveToBack';
import '@screens/Globe.scss';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import InitMessage from '@/apis/notifications/foregroundMessaging';
import {returnFalse} from '@/components/common/commonFunc';

function Globe() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isFirstVisit, setFirstVisit] = useState(true);
  const firstRef = useRef<HTMLDivElement>(null);

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
    window.addEventListener('mousedown', ({target}) => {
      if (firstRef.current && !firstRef.current.contains(target as Node)) {
        setVisited();
      }
    });
    if (localStorage.getItem('visited')) {
      setVisited();
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <InitMessage />
      {isFirstVisit ? (
        <div
          className="white first-visit center"
          onClick={setVisited}
          ref={firstRef}>
          숨겨진 페이지에 온 것을 환영합니다 <br /> 지구를 돌려보세요
        </div>
      ) : null}
      <div className="globe-background">
        <MoveToBack path={main()} />
        <Canvas style={{width, height}} camera={{near: 6, far: 30, zoom: 1.2}}>
          {/* <color attach="background" args={[0, 0, 0]} /> */}
          <Stars position={[0, 0, 0]} />
          <ambientLight />
          {/* <pointLight position={[5, 1, 2]} /> */}
          <pointLight position={[10, 10, 10]} />
          <Earth position={[0, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
}
export default Globe;
