import {useState} from 'react';
import close from '@images/x-22.svg';
import EachBgm from '@individual/EachBgm';
import {bgmList} from '@common/commonFunc';
import '@individual/SettingsModal.scss';

interface props {
  bgm: string;
  open: boolean;
  setBgm: React.Dispatch<any>;
  onCancel: () => void;
}

function BgmModal({bgm, open, setBgm, onCancel}: props) {
  const [newBgm, setNewBgm] = useState(bgm);
  const changeBgm = (index: number) => {
    return () => setNewBgm(bgmList[index].title);
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
                <EachBgm
                  key={element.title}
                  element={element}
                  index={index}
                  newBgm={newBgm}
                  changeBgm={changeBgm}
                />
              ))}
            </article>
          </section>
        </main>
      ) : null}
    </>
  );
}

export default BgmModal;
