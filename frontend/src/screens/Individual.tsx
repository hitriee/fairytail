import '@screens/Individual.scss';
import Iframe from 'react-iframe';
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

function Individual() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);
  const location = useLocation();
  const isSettings = location.pathname === settings();
  return (
    <>
      <Iframe
        className="BackgroundUnMove"
        url="BackgroundUnMove.html"
        src="../background/BackgroundUnMove.html"
        frameBorder={0}
        // styles={{pointerEvents: 'none'}}
      />
      <main id="individual">
        <section className="individual">
          <MoveToBack path={main()} />
          <img src={isSettings ? gear : bell} className="individual-icon" />
          {isSettings ? <Settings /> : <Notifications />}
          <footer className="individual-bottom">
            <BottomBar type={isSettings} />
          </footer>
        </section>
      </main>
    </>
  );
}

export default Individual;
