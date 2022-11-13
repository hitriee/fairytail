import {getMessaging, onMessage} from 'firebase/messaging';
import app from '@apis/notifications/firebaseConfig';
import MyNotification from '@individual/MyNotification';
import {useEffect, useState} from 'react';
import {returnFalse, returnTrue} from '@common/commonFunc';
import {initialItem} from '@individual/notification';
import '@common/Common.scss';

function InitMessage() {
  const messaging = getMessaging(app);
  const [info, setInfo] = useState(initialItem);
  const [open, setOpen] = useState(false);
  const changeOpenState = () => {
    if (open) {
      setInterval(() => {
        setOpen(returnFalse);
      }, 5000);
    }
  };

  onMessage(messaging, payload => {
    if (payload.data?.body && payload.data?.title) {
      const body = JSON.parse(payload.data?.body);
      const newInfo = {
        id: body?.postId,
        emoji: body?.emojiNo,
        type: body?.type,
        title: payload.data?.title,
      };
      setInfo(newInfo);
    }
  });
  useEffect(() => {
    if (info !== initialItem) {
      setOpen(returnTrue);
    }
  }, [info]);

  useEffect(changeOpenState, [open]);

  return (
    <>
      {open ? (
        <div id="foreground">
          <MyNotification item={info} dragFlag={false} />
        </div>
      ) : null}
    </>
  );
}

export default InitMessage;
