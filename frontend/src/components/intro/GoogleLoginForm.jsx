// import React from 'react';

// function GoogleLoginForm() {
//   const onGoogleSignInSuccess = res => {
//     const params = new URLSearchParams();
//     params.append('idToken', res.tokenObj.id_token);

//     const googleLogin = async () => {
//       const res = await axios.post('요청 주소', params, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });

//       localStorage.setItem('accessToken', res.data.token.access);
//       localStorage.setItem('refreshToken', res.data.token.refresh);
//     };

//     googleLogin();
//   };
//   return <div>GoogleLoginForm</div>;
// }

// export default GoogleLoginForm;
import React from 'react';

function GoogleLoginForm() {
  // clinent ID = 587123311906-3en9j95qp639rr6p3d8fblpsgl3f6k7d.apps.googleusercontent.com
  // 'https://accounts.google.com/o/oauth2/v2/auth?client_id=587123311906-3en9j95qp639rr6p3d8fblpsgl3f6k7d.apps.googleusercontent.com&redirect_uri=http://k7c209.p.ssafy.io:9096/login/oauth2/code/google';
  // http://localhost:3000/user/oauth2/authorization/google
  // const data = 'http://localhost:3000/oauth2/authorization/google';
  // const data = 'http://localhost:3000/oauth2/authorize/google';
  return (
    <div>
      <button type="button">
        <a
          href="https://k7c209.p.ssafy.io/user/oauth2/authorization/google"
          // class="btn btn-success active"
          role="button">
          Google Login..
        </a>
      </button>
    </div>
  );
}

export default GoogleLoginForm;

//내꺼
// import React, {useEffect} from 'react';
// import GoogleLogin from 'react-google-login';
// import {gapi} from 'gapi-script';

// function GoogleLoginForm() {
//   const clientId =
//     '587123311906-3en9j95qp639rr6p3d8fblpsgl3f6k7d.apps.googleusercontent.com';

//   useEffect(() => {
//     gapi.load('client:auth2', () => {
//       gapi.auth2.init({clientId: clientId});
//     });
//   }, []);

//   const responseGoogle = response => {
//     console.log(response);
//   };
//   return (
//     <>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Login"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={'single_host_origin'}
//       />
//     </>
//   );
// }

// export default GoogleLoginForm;
