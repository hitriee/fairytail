import React from 'react';
import {Link} from 'react-router-dom';
import './Intro.scss';
// import {ReactComponent as IntroLogo} from '@images/introLogo.svg';
import IntroLogo from '@images/introLogo.png';
import Iframe from 'react-iframe';

function Intro() {
  return (
    <>
      <Iframe
        className="iframeBackground"
        url="background/Background.html"
        src="background/Background.html"
        frameBorder={0}
      />
      <div className="contaier">
        <div className="intro">
          {/* <IntroLogo className="introLogo" /> */}
          <img className="introLogo" src={IntroLogo} alt="loading" />
          <h1 className="intro-title">동하책</h1>
          <p className="intro-subTitle">같은 하늘 아래, 우리들의 이야기</p>
          <Link to="main">
            <button>go Main</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Intro;