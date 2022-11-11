import {getMessaging, onMessage} from 'firebase/messaging';
import app from '@apis/notifications/firebaseConfig';
import {returnTrue} from '@/components/common/commonFunc';
import MyNotification from '@individual/MyNotification';
import {useEffect, useState} from 'react';
import {returnFalse} from '@common/commonFunc';

function InitMessage() {
  const messaging = getMessaging(app);
  const initialInfo = {id: 0, title: '', emoji: 0};
  const [info, setInfo] = useState(initialInfo);
  const [open, setOpen] = useState(false);
  const changeOpenState = () => {
    if (open) {
      setInterval(() => {
        setOpen(returnFalse);
      }, 5000);
    }
  };

  onMessage(messaging, payload => {
    if (payload.notification?.body && payload.notification?.title) {
      const body = JSON.parse(payload.notification?.body);
      const newInfo = {
        id: body?.post_id,
        emoji: body?.emoji_no,
        title: payload.notification?.title,
      };
      setInfo(newInfo);
    }
  });
  useEffect(() => {
    if (info !== initialInfo) {
      setOpen(returnTrue);
    }
  }, [info]);

  useEffect(() => changeOpenState, [open]);

  return (
    <>
      {open ? (
        <div id="foreground">
          <MyNotification item={info} />
        </div>
      ) : null}
    </>
  );
}

export default InitMessage;
