import { sendFcmMessage } from "./firebase_admin_init";
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-private.json");

const app = express();
const port = 5000;
const myCors = {
  origin: "https://k7c209.p.ssafy.io",
  credentials: true,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

type request = any;
type response = any;
type error = any;

app.use(cors(myCors));
app.listen(port, () => console.log(`Listening on Port is ${port}!`));
app.use(express.json());

app.post("/fcm", (request: request, response: response) => {
  const { title, token, data } = request.body;
  const body = JSON.stringify(data);

  const message = {
    message: {
      token,
      data: {
        title,
        body,
      },
    },
  };

  sendFcmMessage(message)
    .then(async (res: any) => {
      response.status(200).send(res);
    })
    .catch((error: error) => response.status(400).send(error));
});
