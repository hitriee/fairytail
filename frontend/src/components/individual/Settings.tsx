import '@individual/Settings.scss';
import Toggle from '@messageCreate/Toggle';
import {returnTrue, returnFalse} from '@common/commonFunc';
import {useState} from 'react';
import {popUp} from '@common/commonFunc';
import {bgmList} from '@common/commonFunc';
import BgmModal from '@individual/BgmModal';
import InfoModal from '@/components/individual/InfoModal';
import Confirm from '@common/Confirm';

function Settings() {
  const [permitNoti, setPermitNoti] = useState(true);
  const [selectBgm, setSelectBgm] = useState(false);
  const [wantLogout, setWantLogout] = useState(false);
  const [wantInfo, setWantInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [info, setInfo] = useState<popUp>({title: '', message: ''});
  const [bgm, setBgm] = useState(bgmList[0].bgm);

  // 좋아요 알림 변경
  const changePermit = () => {
    setPermitNoti(!permitNoti);
  };
  // 팝업에 뜰 내용 변경
  const changeInfo = (title: string, message: string) => {
    return {title, message};
  };
  // 로그아웃
  const logoutConfirm = () => {
    setInfo(changeInfo('로그아웃 확인', '정말 로그아웃하시겠어요?'));
    setWantLogout(returnTrue);
  };
  const logout = () => {
    console.log('로그아웃 요청');
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
      <BgmModal
        bgm={bgm}
        setBgm={setBgm}
        open={selectBgm}
        onCancel={closeBgmPopUp}
      />
      <InfoModal open={wantInfo} onConfirmed={closeInfoModal} type={infoType} />
      <section className="settings-section">
        <b className="settings-title">애플리케이션</b>
        <br />
        <Toggle
          label="좋아요 알림"
          onClick={changePermit}
          className="settings-each"
        />
        <br />
        <span className="settings-each" onClick={bgmPopUp}>
          배경음악
        </span>
        <span>현재 배경음악</span>
      </section>
      <section className="settings-section">
        <b className="settings-title">계정</b> <br />
        <span className="settings-each" onClick={logoutConfirm}>
          로그아웃
        </span>
      </section>
      <section className="settings-section">
        <b className="settings-title">기타</b> <br />
        <span className="settings-each" onClick={openLicense}>
          라이센스
        </span>
        <br />
        <span className="settings-each" onClick={openHelp}>
          도움말
        </span>
      </section>
    </main>
  );
}

export default Settings;
