import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Room from '../components/main/Room';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import InitMessage from '@/apis/notifications/foregroundMessaging';
import OpenHelp from '@common/OpenHelp';
import BgmBtn from '@/components/common/BgmBtn';

function Main() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  if (isLoading) {
    setIsLoading(false);
    window.location.reload();
  }

  return (
    <>
      <InitMessage />
      <OpenHelp imagesIndex={0} />
      <BgmBtn />
      <Room />
    </>
  );
}
export default Main;
