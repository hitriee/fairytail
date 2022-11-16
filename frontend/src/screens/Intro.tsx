import '@screens/Intro.scss';
import GoogleLoginForm from '@intro/GoogleLoginForm';
import IntroLogo from '@images/introLogo.png';
import Iframe from 'react-iframe';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      navigate('/main');
    }
  }, []);

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
          <img className="introLogo" src={IntroLogo} alt="loading" />
          <h1 className="intro-title">동하책</h1>
          <p className="intro-subTitle">같은 하늘 아래, 우리들의 이야기</p>
          <GoogleLoginForm />
        </div>
      </div>
    </>
  );
}

export default Intro;
