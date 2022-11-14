// ** 설정 또는 알림

import '@screens/Individual.scss';
import Notifications from '@individual/Notifications';
import Settings from '@individual/Settings';
import BottomBar from '@individual/BottomBar';
import {useLocation} from 'react-router';
import MoveToBack from '@common/MoveToBack';
import bell from '@images/bell.png';
import gear from '@images/gear.png';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import {main, settings} from '@apis/router';
import InitMessage from '@/apis/notifications/foregroundMessaging';

function Individual() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  const location = useLocation();
  const isSettings = location.pathname === settings();

  return (
    <main className="screen messageList">
      <MoveToBack path={main()} />
      <section className="container individual-container">
        <div className="individual-header">
          <img
            src={isSettings ? gear : bell}
            className="individual-header-icon"
          />
        </div>
        <InitMessage />

        <div className="individual-body">
          {isSettings ? <Settings /> : <Notifications />}
        </div>

        <footer className="individual-bottom">
          <BottomBar type={isSettings} />
        </footer>
      </section>
    </main>
  );
}

export default Individual;
