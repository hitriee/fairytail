const axios = require("axios");
const serviceAccount = require("./firebase-private.json");
const { google } = require("googleapis");

type fcmMessage = {
  message: {
    token: any;
    data: {
      title: any;
      body: any;
    };
  };
};
type response = any;
type error = any;
type tokens = any;

const PROJECT_ID = serviceAccount.project_id;
const URL = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];

export function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err: error, tokens: tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}
export function sendFcmMessage(fcmMessage: fcmMessage) {
  const result = getAccessToken().then(async (accessToken) => {
    const options = {
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: fcmMessage,
    };
    const data = axios(options)
      .then(async (res: response) => {
        return res.data;
      })
      .catch(console.log);
    return data;
  });
  return result;
}
