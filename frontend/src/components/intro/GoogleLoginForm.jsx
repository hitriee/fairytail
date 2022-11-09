import React, {useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';

function GoogleLoginForm() {
  const clientId =
    '587123311906-vk5u7gdst1g3cfjejgfj6h48uff6o600.apps.googleusercontent.com';

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({clientId: clientId});
    });
  }, []);

  const responseGoogle = response => {
    console.log(response);
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

export default GoogleLoginForm;
