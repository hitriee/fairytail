const admin = require('firebase-admin');

const serviceAccount = require('firebase-private.json');

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
