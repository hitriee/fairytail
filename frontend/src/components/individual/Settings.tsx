import {useEffect} from 'react';
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
import {useRecoilState} from 'recoil';
import {playingState} from '@apis/Recoil';

function Settings() {
  // 그 전에 설정했던 사항이 props로 들어옴 (좋아요 알림, 배경음악 여부, 배경음악)
  const [permitNoti, setPermitNoti] = useState(true);
  const [selectBgm, setSelectBgm] = useState(false);
  const [wantLogout, setWantLogout] = useState(false);
  const [wantInfo, setWantInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [info, setInfo] = useState<popUp>({title: '', message: ''});
  const [openAlert, setOpenAlert] = useState(false);
  const [bgm, setBgm] = useState(bgmList[0].title);
  const [onPlay, setOnPlay] = useRecoilState(playingState);

  // 좋아요 알림 변경
  const changePermitNoti = () => {
    setPermitNoti(!permitNoti);
  };

  //  배경 음악 재생 여부 변경
  const changeOnPlay = () => {
    setOnPlay(prev => !prev);
    console.log(onPlay);
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
    // axios.post('url')
    // .then(())
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
  };
  // bgm 설정 여부 변경
  const changeBgmPermit = () => {
    changeOnPlay();
    if (bgm) {
      // setPermitBgm(returnFalse);
      setBgm('');
    } else {
      // setPermitBgm(returnTrue);
      setBgm(bgmList[0].title);
    }
  };

  // bgm 팝업 띄우기
  const bgmPopUp = () => {
    changeOnPlay();
    setSelectBgm(returnTrue);
  };
  // bgm 팝업 끄기
  const closeBgmPopUp = () => {
    setSelectBgm(returnFalse);
    // 팝업에서 아무 것도 선택하지 않고 끌 경우
    if (!bgm) {
      changeOnPlay();
    }
  };

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
          <div className="settings-each">
            <div onClick={changeOnPlay}>배경음악</div>
            <div
              className={onPlay ? 'bgm-title' : 'bgm-hidden'}
              onClick={bgmPopUp}>
              {bgm || 'bgm'}
            </div>
          </div>
          <Toggle label="" onClick={changeOnPlay} value={onPlay} />
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
          onClick={openInfoModal('help')}>
          도움말
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
      <BgmModal
        bgm={bgm}
        setBgm={setBgm}
        open={selectBgm}
        onCancel={closeBgmPopUp}
      />

      {/* 라이선스, 도움말 모달 */}
      <InfoModal open={wantInfo} onConfirmed={closeInfoModal} type={infoType} />
    </main>
  );
}

export default Settings;
