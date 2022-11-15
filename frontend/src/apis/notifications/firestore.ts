import {collection, addDoc, getDocs} from 'firebase/firestore';
import {db} from '@apis/notifications/firebaseConfig';

interface addData {
  (
    // id: string,
    title: string,
    userId: number,
    postId: number,
    emojiNo: number,
    type: number,
  ): void;
}

// node 서버에서 추가
export const addData: addData = async (
  title,
  userId,
  postId,
  emojiNo,
  type,
) => {
  try {
    const docRef = await addDoc(collection(db, 'notification'), {
      userId,
      emojiNo,
      title,
      postId,
      type,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

//
export const readData = async (userId: number) => {
  const querySnapshot = await getDocs(collection(db, 'notification'));
  const newData: any = [];
  querySnapshot.forEach(doc => {
    newData.push({id: String(doc.id), ...doc.data()});
  });
  console.log(newData);
  return newData;
  // querySnapshot.forEach(doc => {
  //   // console.log(`${doc.id} => ${doc.data()}`);
  //   console.log(doc);
  //   // console.log(doc.data());
  //   // console.dir(doc.data());
  // });
};
