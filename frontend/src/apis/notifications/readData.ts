import {collection, getDocs} from 'firebase/firestore';
import {db} from '@apis/notifications/firebaseConfig';

const readData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach(doc => {
    // console.log(`${doc.id} => ${doc.data()}`);
    console.dir(doc.data());
  });
};

export default readData;
