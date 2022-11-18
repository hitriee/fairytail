// ** 설정 또는 알림

import '@screens/Individual.scss';
import Notifications from '@individual/Notifications';
import Settings from '@individual/Settings';
import {useLocation} from 'react-router';
import MoveToBack from '@common/MoveToBack';
import bell from '@images/bell.png';
import gear from '@images/gear.png';
import {main, settings} from '@apis/router';

function Individual() {
  const location = useLocation();
  const isSettings = location.pathname === settings();

  return (
    <main className="screen">
      <MoveToBack path={main()} />
      <section className="container individual-container">
        <div className="individual-header">
          <img
            src={isSettings ? gear : bell}
            className="individual-header-icon"
          />
        </div>

        <div className="individual-body">
          {isSettings ? <Settings /> : <Notifications />}
        </div>
      </section>
    </main>
  );
}

export default Individual;
