import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import config from "./config";

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

// node 서버에서 추가
export const addData: addData = async (
  title,
  userId,
  postId,
  emojiNo,
  type
) => {
  try {
    const docRef = await addDoc(collection(db, "notification"), {
      userId,
      emojiNo,
      title,
      postId,
      type,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
