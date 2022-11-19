import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { config, email, password } from "./config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(config);
const db = getFirestore(app);

interface addData {
  (
    title: string,
    userId: number,
    postId: number,
    emojiNo: number,
    type: number
  ): void;
}

const auth = getAuth(app);

// node 서버에서 추가
export const addData: addData = async (
  title,
  userId,
  postId,
  emojiNo,
  type
) => {
  signInWithEmailAndPassword(auth, email, password) //정보를 토대로 로그인
    .then(async () => {
      try {
        const date = String(Date.now());
        const docRef = await setDoc(doc(db, "notification", date), {
          userId,
          emojiNo,
          title,
          postId,
          type,
        });
        console.log("Document written with ID");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
