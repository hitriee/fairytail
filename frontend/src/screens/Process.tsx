import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {saveToken} from '@/apis/Process';
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

  useEffect(() => {
    if (localStorage.token && localStorage.token !== null) {
      // 토큰 저장 후 main 페이지로 자동 이동
      navigate('/main');
    }
  }, []);

  return <div className="process" />;
}

export default Process;
