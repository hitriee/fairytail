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

function Settings() {
  const [permitNoti, setPermitNoti] = useState(true);
  const [isBgmModalOpened, setIsBgmModalOpened] = useState(false);
  const [wantLogout, setWantLogout] = useState(false);
  const [wantInfo, setWantInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [info, setInfo] = useState<popUp>({title: '', message: ''});
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  // 좋아요 알림 변경
  const changePermitNoti = () => {
    setPermitNoti(!permitNoti);
  };

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
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('token');
    changeInfo('완료', '정상적으로 로그아웃되었습니다.');
    cancelLogout();
    setOpenAlert(returnTrue);
  };

  // alert 창 닫기
  const closeAlert = () => {
    setOpenAlert(returnFalse);
  };

  // 모달 창에서 로그아웃 취소
  const cancelLogout = () => {
    setWantLogout(returnFalse);
    navigate('/');
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
          <div className="settings-each" onClick={changePermitNoti}>
            좋아요 알림
          </div>
          <Toggle label="" onClick={setPermitNoti} value={permitNoti} />
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
