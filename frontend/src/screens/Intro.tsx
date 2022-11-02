import React from 'react';
import {Link} from 'react-router-dom';
import './Intro.scss';
import {ReactComponent as Intro_logo} from '../assets/images/intro_logo.svg';
import Iframe from 'react-iframe';

function Intro() {
  return (
    <>
      <Iframe
        className="iframeBackground"
        url="background/Background.html"
        src="background/Background.html"
      />
      <div className="intro">
        <Intro_logo className="introLogo" />
        <Link to="main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default Intro;
