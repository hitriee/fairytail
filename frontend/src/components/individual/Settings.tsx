// ** 설정

import {useEffect} from 'react';
import '@individual/Settings.scss';
import Toggle from '@messageCreate/Toggle';
import {returnTrue, returnFalse} from '@common/commonFunc';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {popUp} from '@common/commonFunc';
import {bgmArr} from '@/assets/bgms';
import BgmModal from '@individual/BgmModal';
import InfoModal from '@/components/individual/InfoModal';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import {intro} from '@/apis/router';

function Settings() {
  const [permitPush, setPermitPush] = useState('설정 가능');
  const [permitNoti, setPermitNoti] = useState(false);
  const [isBgmModalOpened, setIsBgmModalOpened] = useState(false);
  const [wantLogout, setWantLogout] = useState(false);
  const [wantInfo, setWantInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [info, setInfo] = useState<popUp>({title: '', message: ''});
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  // 좋아요 알림 변경
  // 백그라운드
  const changePermitPush = () => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(async permission => {
        if (permission === 'default') {
          setPermitPush(() => '설정 가능');
        } else if (permission === 'denied') {
          setPermitPush(() => '거부');
        } else {
          setPermitPush(() => '허용');
        }
      });
    } else {
      changeInfo(
        '알림 설정',
        `현재 알림 ${permitPush} 상태입니다. \n 브라우저의 알림 설정 페이지에서 \n 변경이 가능합니다`,
      );
      setOpenAlert(returnTrue);
    }
  };
  // 포그라운드
  const changePermitNoti = () => {
    console.log('clicked');
    setPermitNoti(prev => !prev);
    if (localStorage.getItem('noti')) {
      localStorage.removeItem('noti');
    } else {
      localStorage.setItem('noti', 'true');
    }
  };
  useEffect(() => {
    const {permission} = Notification;
    if (permission === 'denied') {
      setPermitPush(() => '거부');
    } else if (permission === 'granted') {
      setPermitPush(() => '허용');
    }
    if (localStorage.getItem('noti')) {
      setPermitNoti(returnTrue);
    }
  }, []);

  // 팝업에 뜰 내용 변경
  const changeInfo = (title: popUp['title'], message: popUp['message']) => {
    setInfo(() => ({
      title,
      message,
    }));
  };

  // 로그아웃
  const logoutConfirm = () => {
    changeInfo('확인', '정말 로그아웃하시겠어요?');
    setWantLogout(returnTrue);
  };

  // 로그아웃 요청 백에 보내기
  const logout = () => {
    window.localStorage.clear();
    changeInfo('완료', '정상적으로 로그아웃되었습니다.');
    setOpenAlert(returnTrue);
  };

  // alert 창 닫기
  const closeAlert = () => {
    setOpenAlert(returnFalse);
    navigate(intro());
    console.log('여긴가?');
  };

  // 모달 창에서 로그아웃 취소
  const cancelLogout = () => {
    setWantLogout(returnFalse);
  };

  // bgm 모달
  const openBgmModal = () => {
    setIsBgmModalOpened(returnTrue);
  };

  const closeBgmModal = () => {
    setIsBgmModalOpened(returnFalse);
  };

  // 라이선스, 개인정보 처리방침 모달
  const openInfoModal = (type: string) => {
    return () => {
      setInfoType(type);
      setWantInfo(returnTrue);
    };
  };
  const closeInfoModal = () => {
    setWantInfo(returnFalse);
  };

  return (
    <main className="white settings">
      {/* 애플리케이션 */}
      <section className="settings-section">
        <div className="settings-title">애플리케이션</div>
        <div className="settings-between">
          <div className="settings-each" onClick={changePermitPush}>
            좋아요 푸시 알림
          </div>
          <div className="settings-push" onClick={changePermitPush}>
            {permitPush}
          </div>
        </div>
        <div className="settings-between">
          <div className="settings-each" onClick={changePermitNoti}>
            앱 사용 중 좋아요 알림
          </div>
          <Toggle label="" onClick={changePermitNoti} value={permitNoti} />
        </div>
        <div className="settings-between">
          <div className="settings-each" onClick={openBgmModal}>
            배경음악 설정
          </div>
        </div>
      </section>

      {/* 계정 */}
      <section className="settings-section">
        <div className="settings-title">계정</div>
        <div
          className="settings-each settings-margin-bottom"
          onClick={logoutConfirm}>
          로그아웃
        </div>
      </section>

      {/* 기타 */}
      <section className="settings-section">
        <div className="settings-title">기타</div>
        <div
          className="settings-each settings-margin-bottom"
          onClick={openInfoModal('license')}>
          라이선스
        </div>
        <span
          className="settings-each settings-margin-bottom"
          onClick={openInfoModal('privacyPolicy')}>
          개인정보 처리방침
        </span>
      </section>

      {/* 로그아웃 확인 */}
      <Confirm
        info={info}
        open={wantLogout}
        onConfirmed={logout}
        onCancel={cancelLogout}
      />

      {/* 로그아웃 완료 */}
      <Alert info={info} open={openAlert} onConfirmed={closeAlert} />

      {/* 배경음악 목록 */}
      <BgmModal open={isBgmModalOpened} onCancel={closeBgmModal} />

      {/* 라이선스, 개인정보 처리방침 모달 */}
      <InfoModal open={wantInfo} onConfirmed={closeInfoModal} type={infoType} />
    </main>
  );
}

export default Settings;
