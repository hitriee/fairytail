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

  const toNoti = () => {
    navigate(notifications());
  };

  const toSettings = () => {
    navigate(settings());
  };

  return (
    <main className="bottomBar">
      <div className="bottomBar-icon" onClick={toNoti}>
        <img
          src={bell}
          className={
            type
              ? 'bottomBar-icon-each'
              : 'bottomBar-icon-each bottomBar-icon-selected'
          }
        />
      </div>
      <div className="bottomBar-icon" onClick={toSettings}>
        <img
          src={gear}
          className={
            type
              ? 'bottomBar-icon-each bottomBar-icon-selected'
              : 'bottomBar-icon-each'
          }
        />
      </div>
    </main>
  );
}

export default BottomBar;
