import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Room from '../components/room/Room';
import {useRecoilState} from 'recoil';
import {loadingState} from '../apis/Recoil';

let prePath = '';

function Main() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  if (isLoading) {
    setIsLoading(false);
    window.location.reload();
  }
  return (
    <>
      <Room />
    </>
  );
}
export default Main;
