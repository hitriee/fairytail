import React, {useEffect} from 'react';

// notification
import {
  initToken,
  requestPermission,
} from '@apis/notifications/getMessagingToken';

import {useNavigate} from 'react-router-dom';
import {saveToken, saveFirebaseToken} from '@/apis/process';
import './Process.scss';

function Process() {
  const navigate = useNavigate();

  // 인증받은 access token, localstorage에 저장
  saveToken();

  // firebase token 불러오기
  initToken().then(res => {
    console.log(res);
    // 불러온 firebase token, backend에 저장
    const data = {
      firebaseToken: res,
      userId: localStorage.userId,
    };
    saveFirebaseToken(data)
      .catch(err => console.log(err))
      .then(() => requestPermission())
      .then(() => navigate('/main'));
  });

  // 작업 완료 후 main 페이지로 이동
  // setTimeout(() => navigate('/main'), 100);
  return <div className="process" />;
}

export default Process;
