import '@individual/Settings.scss';
import Toggle from '@messageCreate/Toggle';
import {returnTrue, returnFalse} from '@common/commonFunc';
import {useState} from 'react';
import {popUp} from '@common/commonFunc';
import {bgmList} from '@common/commonFunc';
import BgmModal from '@individual/BgmModal';
import InfoModal from '@/components/individual/InfoModal';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';

function Settings() {
  const [permitNoti, setPermitNoti] = useState(true);
  const [selectBgm, setSelectBgm] = useState(false);
  const [wantLogout, setWantLogout] = useState(false);
  const [wantInfo, setWantInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [info, setInfo] = useState<popUp>({title: '', message: ''});
  const [openAlert, setOpenAlert] = useState(false);
  const [bgm, setBgm] = useState(bgmList[0].bgm);

  // 좋아요 알림 변경
  const changePermit = () => {
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
    changeInfo('로그아웃 확인', '정말 로그아웃하시겠어요?');
    setWantLogout(returnTrue);
  };
  // 로그아웃 요청 백에 보내기
  const logout = () => {
    // axios.post('url')
    // .then(())
    changeInfo('로그아웃 완료', '정상적으로 로그아웃되었습니다');
    cancelLogout();
    setOpenAlert(returnTrue);
  };
  const closeAlert = () => {
    setOpenAlert(returnFalse);
  };

  const cancelLogout = () => {
    setWantLogout(returnFalse);
  };

  // bgm 팝업 띄우기
  const bgmPopUp = () => {
    setSelectBgm(returnTrue);
  };
  // bgm 팝업 끄기
  const closeBgmPopUp = () => {
    setSelectBgm(returnFalse);
  };

  const openLicense = () => {
    setInfoType('license');
    setWantInfo(returnTrue);
  };
  const openHelp = () => {
    setInfoType('help');
    setWantInfo(returnTrue);
  };
  const closeInfoModal = () => {
    setWantInfo(returnFalse);
  };

  return (
    <main className="white settings">
      <Confirm
        info={info}
        open={wantLogout}
        onConfirmed={logout}
        onCancel={cancelLogout}
      />
      <Alert info={info} open={openAlert} onConfirmed={closeAlert} />
      <BgmModal
        bgm={bgm}
        setBgm={setBgm}
        open={selectBgm}
        onCancel={closeBgmPopUp}
      />
      <InfoModal open={wantInfo} onConfirmed={closeInfoModal} type={infoType} />
      <section className="settings-section">
        <div className="settings-title">애플리케이션</div>
        <br />
        <Toggle
          label="좋아요 알림"
          onClick={changePermit}
          labelClass="settings-each"
          containerClass="settings-between"
        />
        <br />
        <div className="settings-between" onClick={bgmPopUp}>
          <div className="settings-each">배경음악</div>
          <div className="settings-each">현재 배경 음악</div>
        </div>
      </section>
      <section className="settings-section">
        <div className="settings-title">계정</div>
        <br />
        <div className="settings-each" onClick={logoutConfirm}>
          로그아웃
        </div>
      </section>
      <section className="settings-section">
        <div className="settings-title">기타</div>
        <br />
        <div className="settings-each" onClick={openLicense}>
          라이선스
        </div>
        <br />
        <span className="settings-each" onClick={openHelp}>
          도움말
        </span>
      </section>
    </main>
  );
}

export default Settings;
