import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// notification
import {
  initToken,
  requestPermission,
} from '@apis/notifications/getMessagingToken';
import {saveToken, saveFirebaseToken} from '@/apis/process';

import Loading from '@loading/Loading';

function Process() {
  const navigate = useNavigate();

  // 인증받은 access token, localstorage에 저장
  saveToken();
  useEffect(() => {
    // firebase token 불러오기
    initToken().then(async res => {
      // 불러온 firebase token, backend에 저장
      const data = {
        firebaseToken: res,
        userId: localStorage.userId,
      };

      // 작업 완료 후 main 페이지로 이동
      await saveFirebaseToken(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .then(() => requestPermission())
        .then(() => navigate('/main'));
    });
  }, []);

  return <Loading fillBackground={true} />;
}

export default Process;
