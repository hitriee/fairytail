import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as IntroLogo} from '@images/introLogo.svg';
import '@screens/NotFound.scss';

function NotFound() {
  return (
    <>
      <div className="notFound">
        <IntroLogo className="introLogo" />
        페이지를 찾을 수 없습니다
        <Link to="/main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
