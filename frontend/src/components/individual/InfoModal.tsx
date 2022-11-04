import close from '@images/x-22.svg';
import '@individual/InfoModal.scss';
interface props {
  open: boolean;
  type: string;
  onConfirmed: () => void;
}

function InfoModal({open, type, onConfirmed}: props) {
  const content = () => {
    if (type === 'license') {
      return <div>라이센스 관련 내용</div>;
    }
    return <div>도움말</div>;
  };
  return (
    <>
      {open ? (
        <main id="infoModal">
          <section className={open ? 'modal-x' : ''}>
            <img
              src={close}
              onClick={onConfirmed}
              className="modal-cancel button"
            />
            {content()}
          </section>
        </main>
      ) : null}
    </>
  );
}

export default InfoModal;
