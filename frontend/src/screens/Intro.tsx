import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Iframe from 'react-iframe';

import {getIdentification} from '@apis/main';

import '@screens/Intro.scss';
import GoogleLoginForm from '@intro/GoogleLoginForm';
import {currentUser} from '@common/commonFunc';
import IntroLogo from '@images/introLogo.png';

function Intro() {
  const navigate = useNavigate();

  // 로그인 여부 확인
  useEffect(() => {
    const userInfo = currentUser();

    // 유효한 토큰이 있는지 확인
    getIdentification()
      .then(res => {
        // 유효한 토큰이 있으면서 userId도 있으면 main으로 이동
        if (userInfo !== -1) {
          navigate('/main');
        } else {
          // 유효한 토큰은 있는데 userId가 없으면 localStorage 초기화
          localStorage.clear();
        }
      })
      // 유효한 토큰이 없으면 localStorage 초기화
      .catch(err => {
        console.log(err);
        localStorage.clear();
      });
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
