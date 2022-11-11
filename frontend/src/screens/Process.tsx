import {useEffect} from 'react';
import SaveToken from '@/apis/auth/SaveToken';
import GetUser from '@/apis/auth/GetUser';

function Process() {
  // 인증받은 access token, localstorage에 저장
  SaveToken();
  console.log(localStorage.token);
  // GetUser();
  const result = GetUser();
  console.log(result);

  // useEffect(() => {
  //   if (localStorage.token) {
  //     alert('이미 로그인 되어있습니다.');
  //     navigate('/');
  //   }
  // });

  return <div>Process</div>;
}

export default Process;
