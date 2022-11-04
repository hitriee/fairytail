import close from '@images/x-22.svg';
import {bgmList} from '@common/commonFunc';
import '@individual/SettingsModal.scss';
import {useState} from 'react';
import {ReactComponent as Play} from '@images/play.svg';
import {ReactComponent as Pause} from '@images/pause.svg';
import {returnTrue, returnFalse} from '@common/commonFunc';
interface props {
  bgm: string;
  open: boolean;
  setBgm: React.Dispatch<any>;
  onCancel: () => void;
}

function BgmModal({bgm, open, setBgm, onCancel}: props) {
  const [newBgm, setNewBgm] = useState(bgmList[0]);
  const [onPlay, setOnPlay] = useState(false);
  const changeBgm = (selectedBgm: any) => {
    return () => setNewBgm(selectedBgm);
  };
  const playBgm = (index: number) => {
    return () => {
      setOnPlay(returnTrue);
      setNewBgm(() => bgmList[index]);
    };
  };
  const pauseBgm = (index: number) => {
    return () => {
      setOnPlay(returnFalse);
    };
  };
  const applyBgm = () => {
    setBgm(newBgm);
    onCancel();
  };
  return (
    <>
      {open ? (
        <main id="bgm-modal" className="settingsModal">
          <section className="modal-x">
            <img
              src={close}
              onClick={applyBgm}
              className="modal-cancel button"
            />
            <article className="bgm">
              {bgmList.map((element, index) => (
                <div key={element.title} className="bgm-each selectedBgm">
                  <span
                    // className={element.bgm === newBgm ? 'selectedBgm' : ''}
                    onClick={changeBgm(element.bgm)}>
                    {element.title}
                  </span>
                  {onPlay && element.bgm === newBgm ? (
                    <Pause
                      className="play"
                      fill="black"
                      onClick={pauseBgm(index)}
                    />
                  ) : (
                    <Play
                      className="play"
                      fill="black"
                      onClick={playBgm(index)}
                    />
                  )}
                  {/* {element.bgm === newBgm ? (
                      <span>선택됨</span>
                    ) : (
                      <span>아님</span>
                    )} */}
                </div>
              ))}
            </article>
          </section>
        </main>
      ) : null}
    </>
  );
}

export default BgmModal;
