import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {saveToken} from '@/apis/Process';
import './Process.scss';

function Process() {
  const navigate = useNavigate();

  // 인증받은 access token, localstorage에 저장
  saveToken();
  setTimeout(() => navigate('/main'), 100);
  return <div className="process" />;
}

export default Process;
