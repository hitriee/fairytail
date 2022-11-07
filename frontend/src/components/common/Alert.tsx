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
        {open ? (
          <section className="modal">
            <article className="modal-alert">
              <p>{info.title}</p>
              <p>{info.message}</p>
              <footer className="modal-footer">
                <button onClick={onConfirmed}>확인</button>
              </footer>
            </article>
          </section>
        ) : null}
      </main>
    </>
  );
}

export default Alert;
