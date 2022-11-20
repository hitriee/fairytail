import {useEffect, useRef} from 'react';
import '@common/Common.scss';

interface ConfirmProps {
  info: {
    title: string;
    message: string;
  };
  open: boolean;
  onConfirmed: () => void;
  onCancel: () => void;
}

function Confirm({info, onConfirmed, onCancel, open}: ConfirmProps) {
  const confirmRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (confirmRef.current && !confirmRef.current.contains(target as Node)) {
        onCancel();
      }
    });
  });

  return (
    <>
      {open ? (
        <section className="modal fadeIn" ref={confirmRef}>
          <p className="modal-title">{info.title}</p>
          <p className="modal-message">{info.message}</p>
          <footer className="modal-footer">
            <button className="btn" onClick={onConfirmed}>
              확인
            </button>
            <button className="btn" onClick={onCancel}>
              취소
            </button>
          </footer>
        </section>
      ) : null}
    </>
  );
}

export default Confirm;
