import React from 'react';
import googleLogo from '@images/googleLogo.svg';
import './GoogleLoginForm.scss';

function GoogleLoginForm() {
  return (
    <>
      <a
        href="http://k7c209.p.ssafy.io:9096/user/oauth2/authorization/google"
        // href="https://k7c209.p.ssafy.io/user/oauth2/authorization/google"
        role="button">
        <div className="googleLogin">
          <img src={googleLogo} alt="GoogleLogo" />
          <span className="googleLogin-text">구글 로그인</span>
        </div>
      </a>
    </>
  );
}

export default GoogleLoginForm;
