// 프로젝트 버전 확인
importScripts(
  "https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js"
);

const config = {
  apiKey: "AIzaSyC2L6taSK-Ee-zv8Ajsvz2ZtgLl-6kXOcI",
  authDomain: "fairytail-1cde3.firebaseapp.com",
  projectId: "fairytail-1cde3",
  storageBucket: "fairytail-1cde3.appspot.com",
  messagingSenderId: "687832998262",
  appId: "1:687832998262:web:0acbc99331b00f997e5a57",
  measurementId: "G-9K68TDR453",
};

const app = firebase.initializeApp(config);
const messaging = firebase.messaging(app);

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  if (Notification.permission === "granted") {
    // 알림 설정
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload,
      requireInteraction: true,
      // icon: "./logo192.png", // web
      // badge: "./logo192.png", // 모바일에서만 - 권장 크기 72px
      // actions: [
      //   {
      //     action: "coffee-action",
      //     title: "coffee",
      //   },
      // ],
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

// 알림 클릭 시 option (어떤 페이지로 redirect 시킬지)

// import request from 'request'

// const option = {
// 	method: 'GET',
// 	url: 'https://fcm.googleapis.com/fcm/send',
// 	json: {
// 		'to': '',
// 		'notification': {
// 			'title': 'hello',
// 			'body': 'world!',
// 			'click_action': 'url', //이 부분에 원하는 url을 넣습니다.
// 		}
// 	},
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Authorization': 'key'
// 	}
// }

// request(option, (err, res, body) => {
// 	if(err) console.log(err); //에러가 발생할 경우 에러를 출력
// 	else console.log(body); //제대로 요청이 되었을 경우 response의 데이터를 출력
// })
