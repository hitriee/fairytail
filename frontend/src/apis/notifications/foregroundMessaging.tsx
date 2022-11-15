// ** 사용자가 서비스를 이용하고 있을 때 내부 알림 컴포넌트

import {getMessaging, onMessage} from 'firebase/messaging';
import {app} from '@apis/notifications/firebaseConfig';
import MyNotification from '@individual/MyNotification';
import {useEffect, useState} from 'react';
import {returnFalse, returnTrue} from '@common/commonFunc';
import {initialItem} from '@individual/notification';
import '@common/Common.scss';

function InitMessage() {
  // fcm으로부터 데이터값 전달 받음
  const messaging = getMessaging(app);

  // 알림 창 관련 내용
  const [info, setInfo] = useState(initialItem);
  const [open, setOpen] = useState(false);

  // 알림이 뜨고 5초 후에 사라짐
  const changeOpenState = () => {
    if (open) {
      setInterval(() => {
        setOpen(returnFalse);
      }, 5000);
    }
  };

  // fcm에서 요청이 오면 info값 변경, localStorage에 값 저장
  onMessage(messaging, payload => {
    if (payload.data?.body && payload.data?.title) {
      const body = JSON.parse(payload.data?.body);
      const list = JSON.parse(localStorage.getItem('list') || '[]');
      const newInfo = {
        id: body?.postId,
        emoji: body?.emojiNo,
        type: body?.type,
        title: payload.data?.title,
      };
      setInfo(() => newInfo);
      list.unshift(body);
      localStorage.setItem('list', JSON.stringify(list));
    }
  });

  // info 값 변경 시 알림 팝업 띄움
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
