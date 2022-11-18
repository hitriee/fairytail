import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {loadingState, transitionState} from '@apis/recoil';

import InitMessage from '@apis/notifications/foregroundMessaging';

import Room from '@main/Room';
import OpenHelp from '@common/OpenHelp';
import BgmBtn from '@common/BgmBtn';
import Alert from '@common/Alert';

import Globe from '@screens/Globe';
import Map from '@screens/Map';
import MessageCreate from '@screens/MessageCreate';
import MessageDetail from '@screens/MessageDetail';
import MessageList from '@screens/MessageList';
import VR from '@screens/VR';
import NotFound from '@screens/NotFound';
import Individual from '@screens/Individual';
import {getIdentification} from '@apis/main';
import {currentUser} from '@common/commonFunc';

function Main() {
  const [isAlertOpened, setIsAlertOpend] = useState(false);

  // 로그인 여부 확인
  useEffect(() => {
    console.log(localStorage.token);

    // 유효한 토큰이 있는지 확인
    getIdentification()
      .then(res => console.log(res))
      // 유효한 토큰이 없으면 알림 표시
      .catch(err => {
        console.log(err);
        setIsAlertOpend(true);
      });
  }, []);

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
            <InitMessage />
            <div
              className="screen"
              style={{
                display: pathname.startsWith('/main') ? 'block' : 'none',
              }}>
              {isLoaded ? (
                <>
                  <OpenHelp imagesIndex={0} />
                  <BgmBtn />
                </>
              ) : null}

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
