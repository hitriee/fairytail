import '@common/Common.scss';
interface props {
  info: {
    title: string;
    message: string;
  };
  open: boolean;
  onConfirmed: () => void;
  onCancel: () => void;
}

function Confirm({info, onConfirmed, onCancel, open}: props) {
  return (
    <>
      {open ? (
        <main id="confirm" className="modal">
          <section>
            <article className="modal-confirm">
              <p>{info.title}</p>
              <p>{info.message}</p>
              <footer className="modal-footer">
                <button type="button" onClick={onConfirmed}>
                  확인
                </button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </footer>
            </article>
          </section>
        </main>
      ) : null}
    </>
  );
}

export default Confirm;
