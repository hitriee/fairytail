import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Room from '../components/main/Room';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import InitMessage from '@/apis/notifications/foregroundMessaging';

let prePath = '';

function Main() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  if (isLoading) {
    setIsLoading(false);
    window.location.reload();
  }
  return (
    <>
      <InitMessage />
      <Room />
    </>
  );
}
export default Main;
