import "./Common.scss";
interface props {
  title: string;
  message: string;
  open: boolean;
  onConfirmed?: () => void;
  onCancel?: () => void;
}

function Confirm({ title, message, onConfirmed, onCancel, open }: props) {
  return (
    <div className={open ? "modal openModal" : "modal"}>
      {open ? (
        <div className="confirm">
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
    </div>
  );
}

export default Confirm;
