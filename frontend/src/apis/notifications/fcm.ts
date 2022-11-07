import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import firebaseConfig from '@apis/notifications/firebase-config';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

//토큰값 얻기
getToken(messaging, {
  vapidKey:
    'BJpQpJ85bWRoJnhpznnEN2lHtCHgQ7t36mUmHJTvwOk4gp8ua6K_-YQBk6_R65xJEWsedMFfcCddOTqBtQWJF1U',
})
  .then(currentToken => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      );
      // ...
    }
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

//포그라운드 메시지 수신 (콘솔 출력)
onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  // ...
});
