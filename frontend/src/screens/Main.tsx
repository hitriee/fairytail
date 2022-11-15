import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {loadingState, transitionState} from '@apis/recoil';

import InitMessage from '@apis/notifications/foregroundMessaging';

import Loading from '@loading/Loading';
import Room from '@main/Room';
import OpenHelp from '@common/OpenHelp';
import BgmBtn from '@common/BgmBtn';
import {currentUser} from '@common/commonFunc';
import Alert from '@common/Alert';

import '@screens/Main.scss';
import Globe from '@screens/Globe';
import Map from '@screens/Map';
import MessageCreate from '@screens/MessageCreate';
import MessageDetail from '@screens/MessageDetail';
import MessageList from '@screens/MessageList';
import VR from '@screens/VR';
import NotFound from '@screens/NotFound';
import Individual from '@screens/Individual';

function Main() {
  // 로그인 여부 확인
  const userInfo = currentUser();
  const [isAlertOpened, setIsAlertOpend] = useState(
    userInfo === -1 ? true : false,
  );

  const navigate = useNavigate();

  // url에 따라 다른 컴포넌트 렌더링
  const location = useLocation();
  const pathname = location.pathname;

  const component = () => {
    if (pathname.startsWith('/message/create')) {
      return <MessageCreate />;
    } else if (pathname.startsWith('/message/detail')) {
      return <MessageDetail />;
    } else if (pathname.startsWith('/message/list')) {
      return <MessageList />;
    } else if (pathname.startsWith('/vr')) {
      return <VR />;
    } else if (pathname.startsWith('/globe')) {
      return <Globe />;
    } else if (pathname.startsWith('/settings')) {
      return <Individual />;
    } else if (pathname.startsWith('/notification')) {
      return <Individual />;
    } else if (pathname.startsWith('/map')) {
      return <Map />;
    } else {
      return <NotFound />;
    }
  };

  // main 최초 렌더링 확인
  const [isLoaded, setIsLoaded] = useRecoilState(loadingState);

  if (pathname === '/main' && !isLoaded) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }

  // main 렌더링 시 애니메이션 효과
  const [transitionName, setTransitionName] = useRecoilState(transitionState);

  useEffect(() => {
    if (transitionName === '') {
      setTransitionName('fadeIn');
    }
  }, [pathname]);

  return (
    <>
      {isAlertOpened ? null : (
        <div className="screen main">
          <div
            className={`${transitionName}`}
            onAnimationEnd={() => {
              if (transitionName === 'fadeIn') {
                setTransitionName('');
              }
            }}>
            {pathname === '/main' && !isLoaded ? (
              <Loading fillBackground={false} />
            ) : null}

            <InitMessage />
            <div
              className="screen"
              style={{
                display: pathname.startsWith('/main') ? 'block' : 'none',
              }}>
              <OpenHelp imagesIndex={0} />
              <BgmBtn />
              <Room />
            </div>

            <div
              style={{
                display: pathname.startsWith('/main') ? 'none' : 'block',
              }}>
              {component()}
            </div>
          </div>
        </div>
      )}
      <Alert
        info={{title: '알림', message: '로그인이 필요합니다.'}}
        open={isAlertOpened}
        onConfirmed={() => {
          setIsAlertOpend(false);
          navigate('/');
        }}
      />
    </>
  );
}

export default Main;
