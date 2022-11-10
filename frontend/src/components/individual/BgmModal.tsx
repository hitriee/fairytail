import {useState} from 'react';
import EachBgm from '@individual/EachBgm';
import {bgmList} from '@common/commonFunc';
import '@individual/SettingsModal.scss';

interface BgmModalProps {
  bgm: string;
  open: boolean;
  setBgm: React.Dispatch<any>;
  onCancel: () => void;
}

function BgmModal({bgm, open, setBgm, onCancel}: BgmModalProps) {
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
        <main id="bgm-modal" className="modal bgm-modal">
          <div className="modal-title">배경음악 목록</div>

          <div className="bgm-list">
            {bgmList.map((element, index) => (
              <EachBgm
                key={`${element.title}-${index}`}
                element={element}
                index={index}
                newBgm={newBgm}
                changeBgm={changeBgm}
              />
            ))}
          </div>

          <button className="btn" onClick={applyBgm}>
            닫기
          </button>
        </main>
      ) : null}
    </>
  );
}

export default BgmModal;
