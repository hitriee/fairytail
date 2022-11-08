import {app} from './firebase_admin_init';
import {getMessaging} from 'firebase-admin/messaging';
// fcm 이용
// axios({
//   url: https://fcm.googleapis.com/v1/projects/(프로젝트 id)/messages:send,
//   method: "POST",
//   headers: {
//     Content-Type: "nodelication/json",
//     Authorization: "Bearer (Access token)",
//   },
//   data:{
//       message:{
//           token:"(클라이언트 토큰)",
//           notification:{
//               title:"(메세지 제목)",
//               body:"(메세지 내용)",
//           }
//       },
//   },
// })

// 직접 서버에서
// node.post('/fcm',async (request, response) => {
//   const message = {
//     data: {
//       title: 'title',
//       body: 'body'
//     },
//     token: 'token'
//   }
//   const messaging = getMessaging(app)
//   messaging
//       .send(message)
//       .then((response) => {
//       console.log(response);
//       })
//       .catch((error) => {
//       console.log(error);
//     });

// })
