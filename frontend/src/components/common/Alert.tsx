// ** 알림 모달 (제목, 내용, 확인 버튼으로 구성)

import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {intro} from '@/apis/router';

interface AlertProps {
  info: {
    title: string;
    message: string;
  };
  open: boolean;
  onConfirmed: () => void;
}

function Alert({info, open, onConfirmed}: AlertProps) {
  const navigate = useNavigate();

  // 모달 바깥을 누르면 종료
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
            {/* <button className="btn" onClick={()=> {onConfirmed(), navigate(intro())}}> */}
            확인
          </button>
        </section>
      ) : null}
    </>
  );
}

export default Alert;
