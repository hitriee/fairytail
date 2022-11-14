import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Room from '../components/main/Room';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import InitMessage from '@/apis/notifications/foregroundMessaging';
import Confirm from '@/components/common/Confirm';
import Alert from '@/components/common/Alert';
import {returnFalse, returnTrue} from '@/components/common/commonFunc';

import OpenHelp from '@common/OpenHelp';
import BgmBtn from '@/components/common/BgmBtn';

let prePath = '';

function Main() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  if (isLoading) {
    setIsLoading(false);
    // window.location.reload();
    // setOpenConfirm(returnTrue)
  }

  return (
    <>
      <InitMessage />
      {/* <Confirm
        info={info}
        onConfirmed={onConfirm}
        onCancel={onCancel}
        open={openConfirm}
      /> */}
      {/* <Alert info={} open={} onConfirmed={} /> */}

      <OpenHelp imagesIndex={0} />
      <BgmBtn />
      <Room />
    </>
  );
}
export default Main;
