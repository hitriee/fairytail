import React from 'react';
import {Link} from 'react-router-dom';
import IntroLogo from '@images/introLogo.png';
import '@screens/NotFound.scss';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import InitMessage from '@/apis/notifications/foregroundMessaging';

function NotFound() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  return (
    <>
      <InitMessage />
      <div className="notFound">
        <div className="white"> 404 Not Found</div>
        <img src={IntroLogo} />
        <div className="white">페이지를 찾을 수 없습니다</div>
        <Link to="/main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
