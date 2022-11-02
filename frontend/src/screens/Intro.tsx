import React from 'react';
import {Link} from 'react-router-dom';
import './Intro.scss';
import {ReactComponent as IntroLogo} from '../assets/images/introLogo.svg';

function Intro() {
  return (
    <>
      <iframe
        className="iframeBackground"
        title="background"
        src="background/Background.html"
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
