import React from 'react';
import {Link} from 'react-router-dom';
import IntroLogo from '@images/introLogo.png';
import '@screens/NotFound.scss';
import {useRecoilState} from 'recoil';
import {loadingState} from '../apis/Recoil';

function NotFound() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  return (
    <>
      <div className="notFound">
        <img src={IntroLogo} />
        페이지를 찾을 수 없습니다
        <Link to="/main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
