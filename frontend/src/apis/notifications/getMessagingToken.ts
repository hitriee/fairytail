// ** fcm으로 요청보낼 때 필요한 토큰 관련

import {getMessaging, getToken} from 'firebase/messaging';
import {app} from '@apis/notifications/firebaseConfig';

const messaging = getMessaging(app);
const ua = navigator.userAgent.toLowerCase();
const iOS = ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad');

// 토큰 받아오기
export const initToken = async () => {
  const token = getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then(async currentToken => {
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
  if (!iOS) {
    Notification.requestPermission().then(permission => {
      if (permission !== 'denied') {
        localStorage.setItem('noti', 'true');
      }
    });
  }
};
