import {app} from './firebase_admin_init';
import {getMessaging} from 'firebase-admin/messaging';
// fetch.post('/fcm',async (request, response) => {
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
