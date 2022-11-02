interface props {
  info: {
    title: string;
    message: string;
  };
  open: boolean;
  onConfirmed: () => void;
}

function Alert({info, open, onConfirmed}: props) {
  return (
    <>
      <main id="alert">
        <section className={open ? 'modal' : ''}>
          {open ? (
            <article className="modal-alert">
              <p>{info.title}</p>
              <p>{info.message}</p>
              <footer className="modal-footer">
                <button onClick={onConfirmed}>확인</button>
              </footer>
            </article>
          ) : null}
        </section>
      </main>
    </>
  );
}

export default Alert;
