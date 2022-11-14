import InitMessage from '@apis/notifications/foregroundMessaging';

import Room from '@main/Room';
import OpenHelp from '@common/OpenHelp';
import BgmBtn from '@common/BgmBtn';

import Globe from '@screens/Globe';
import Map from '@screens/Map';
import MessageCreate from '@screens/MessageCreate';
import MessageDetail from '@screens/MessageDetail';
import MessageList from '@screens/MessageList';
import VR from '@screens/VR';
import NotFound from '@screens/NotFound';
import Individual from '@screens/Individual';
import {useLocation} from 'react-router-dom';

function Main() {
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

  return (
    <div className="screen main">
      <InitMessage />
      <div
        className="screen"
        style={{display: pathname.startsWith('/main') ? 'block' : 'none'}}>
        <OpenHelp imagesIndex={0} />
        <BgmBtn />
        <Room />
      </div>

      <div style={{display: pathname.startsWith('/main') ? 'none' : 'block'}}>
        {component()}
      </div>
    </div>
  );
}

export default Main;
