import close from '@images/x-22.svg';
import {bgmList} from '@common/commonFunc';
import '@individual/BgmModal.scss';
import {useState} from 'react';
interface props {
  bgm: string;
  open: boolean;
  setBgm: React.Dispatch<any>;
  onCancel: () => void;
}

function BgmModal({bgm, open, setBgm, onCancel}: props) {
  const [newBgm, setNewBgm] = useState(bgm);
  const changeBgm = (selectedBgm: any) => {
    return () => setNewBgm(selectedBgm);
  };
  const applyBgm = () => {
    setBgm(newBgm);
    onCancel();
  };
  return (
    <>
      {open ? (
        <main id="bgm-modal">
          <section className="modal-x">
            <img
              src={close}
              onClick={applyBgm}
              className="modal-cancel button"
            />
            <article className="bgm-each">
              {bgmList.map(element => (
                <>
                  <div>
                    <span onClick={changeBgm(element.bgm)}>
                      {element.title}
                    </span>
                    {element.bgm === newBgm ? (
                      <span>선택됨</span>
                    ) : (
                      <span>아님</span>
                    )}
                  </div>
                </>
              ))}
            </article>
          </section>
        </main>
      ) : null}
    </>
  );
}

export default BgmModal;
