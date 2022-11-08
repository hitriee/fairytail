import {getMessaging, onMessage} from 'firebase/messaging';
import app from '@apis/notifications/firebase-config';

interface payload {
  collapseKey: string | undefined;
  from: string;
  messageId: string | undefined;
  notification: {
    title: string;
    body: string;
  };
}

const initMessage = () => {
  const messaging = getMessaging(app);
  onMessage(messaging, payload => {
    console.log(payload.notification);
    // console.log(payload.notification.title);
    // console.log(payload.notification.body);
    // alert(payload.notification.body + '이다');
  });
};

export default initMessage;
