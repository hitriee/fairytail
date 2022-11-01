import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Intro_logo} from '../assets/images/intro_logo.svg';

function Intro() {
  return (
    <>
      <div>
        <Intro_logo className="introLogo" />
        페이지를 찾을 수 없습니다
        <Link to="main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default Intro;
