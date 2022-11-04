import {useNavigate} from 'react-router';
import bell from '@images/bell.png';
import gear from '@images/gear.png';
import {settings, notifications} from '@apis/router';
import '@individual/BottomBar.scss';

import '@common/Common.scss';

interface props {
  type: boolean;
}

function BottomBar({type}: props) {
  const navigate = useNavigate();
  const toNoti = () => navigate(notifications());
  const toSettings = () => navigate(settings());
  return (
    <>
      <main id="bottomBar">
        <section className="box" />
        <section className="icon">
          <img
            src={bell}
            onClick={toNoti}
            className={type ? 'icon-each' : 'icon-each icon-selected'}
          />
          <img
            src={gear}
            onClick={toSettings}
            className={type ? 'icon-each icon-selected' : 'icon-each'}
          />
        </section>
      </main>
    </>
  );
}

export default BottomBar;
