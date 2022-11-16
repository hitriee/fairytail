// ** fcm으로 요청보낼 때 필요한 토큰 관련

import {getMessaging, getToken} from 'firebase/messaging';
import app from '@apis/notifications/firebaseConfig';

const messaging = getMessaging(app);

// 토큰 받아오기
export const initToken = async () => {
  const token = getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then(currentToken => {
      if (currentToken) {
        return currentToken;
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
        return '';
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
      return '';
    });
  return token;
};

// 등록 토큰에 액세스 (알림 권한 요청)
export const requestPermission = () => {
  console.log(Notification.permission);
  if (Notification.permission === 'default') {
    console.log('Requesting permission...');
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }
};
