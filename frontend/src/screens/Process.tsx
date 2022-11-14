import React, {useEffect} from 'react';

// notification
import {
  initToken,
  requestPermission,
} from '@apis/notifications/getMessagingToken';

import {useNavigate} from 'react-router-dom';
import {saveToken, saveFirebaseToken} from '@/apis/process';
import './Process.scss';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';

function Process() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  const navigate = useNavigate();

  // 인증받은 access token, localstorage에 저장
  saveToken();

  // firebase token 불러오기
  initToken();

  // 불러온 firebase token, backend에 저장
  const data = {
    firebaseToken: localStorage.firebaseToken,
    userId: localStorage.userId,
  };
  saveFirebaseToken(data);

  // 작업 완료 후 main 페이지로 이동
  setTimeout(() => navigate('/main'), 100);
  return <div className="process" />;
}

export default Process;
