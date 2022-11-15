import {useRecoilState} from 'recoil';

import {playingState} from '@apis/recoil';

import googleLogo from '@images/googleLogo.svg';
import '@intro/GoogleLoginForm.scss';

function GoogleLoginForm() {
  // 배경음악 재생 여부
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);

  return (
    <>
      <a
        href="https://k7c209.p.ssafy.io/user/oauth2/authorization/google"
        // href="https://k7c209.p.ssafy.io/user/oauth2/authorization/google"
        role="button"
        onClick={() => {
          setIsPlaying(true);
        }}>
        <div className="googleLogin">
          <img src={googleLogo} alt="GoogleLogo" />
          <span className="googleLogin-text">구글 로그인</span>
        </div>
      </a>
    </>
  );
}

export default GoogleLoginForm;
