import '@screens/Individual.scss';
import Iframe from 'react-iframe';
import Notifications from '@individual/Notifications';
import Settings from '@individual/Settings';
import BottomBar from '@individual/BottomBar';
import {useLocation} from 'react-router';
import NavBar from '@common/NavBar';
import bell from '@images/bell.png';
import gear from '@images/gear.png';
import {settings} from '@apis/router';

function Individual() {
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
          <NavBar />
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
