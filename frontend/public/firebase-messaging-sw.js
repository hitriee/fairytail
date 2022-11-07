// 프로젝트 버전 확인
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
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

// 추가로 databaseURL 넣을 수 있음

// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
