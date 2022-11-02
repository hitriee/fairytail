import React from 'react';
import {Link} from 'react-router-dom';
import './Intro.scss';
import {ReactComponent as IntroLogo} from '@images/introLogo.svg';
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
      <div className="intro">
        <IntroLogo className="introLogo" />
        <Link to="main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default Intro;
