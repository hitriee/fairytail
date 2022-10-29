interface props {
  title: string;
  message: string;
  open: boolean;
  onConfirmed?: () => void;
  onCancel?: () => void;
}

function Confirm({ title, message, open, onConfirmed, onCancel }: props) {
  return (
    <>
      {open ? (
        <div className="card">
          <p>{title}</p>
          <p>{message}</p>
          <button type="button" onClick={onConfirmed}>
            확인
          </button>
          <button type="button" onClick={onCancel}>
            취소
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Confirm;
