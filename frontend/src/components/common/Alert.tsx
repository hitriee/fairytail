import {useEffect, useRef} from 'react';

interface AlertProps {
  info: {
    title: string;
    message: string;
  };
  open: boolean;
  onConfirmed: () => void;
}

function Alert({info, open, onConfirmed}: AlertProps) {
  const alertRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (alertRef.current && !alertRef.current.contains(target as Node)) {
        onConfirmed();
      }
    });
  });

  return (
    <>
      {open ? (
        <section className="modal" ref={alertRef}>
          <p className="modal-title">{info.title}</p>
          <p className="modal-message">{info.message}</p>
          <button className="btn" onClick={onConfirmed}>
            확인
          </button>
        </section>
      ) : null}
    </>
  );
}

export default Alert;
