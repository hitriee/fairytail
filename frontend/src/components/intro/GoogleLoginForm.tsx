import googleLogo from '@images/googleLogo.svg';
import '@intro/GoogleLoginForm.scss';

function GoogleLoginForm() {
  return (
    <>
      <a
        href="https://k7c209.p.ssafy.io/user/oauth2/authorization/google"
        // href="https://k7c209.p.ssafy.io/user/oauth2/authorization/google"
        role="button">
        <div className="googleLogin">
          <span className="googleLogin-text">다음 계정으로 로그인:</span>
          <div className="googleLogin-img">
            <img src={googleLogo} alt="GoogleLogo" />
          </div>
        </div>
      </a>
    </>
  );
}

export default GoogleLoginForm;
