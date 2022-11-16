import {useRef, useEffect} from 'react';

import '@individual/InfoModal.scss';
import License from '@individual/License';
import Privacy from '@individual/Privacy';

interface InfoModalProps {
  open: boolean;
  type: string;
  onConfirmed: () => void;
}

function InfoModal({open, type, onConfirmed}: InfoModalProps) {
  const isLicense = type === 'license';

  const infoModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (
        infoModalRef.current &&
        !infoModalRef.current.contains(target as Node)
      ) {
        onConfirmed();
      }
    });
  });

  return (
    <>
      {open ? (
        <div
          className="bgm-background"
          onClick={onConfirmed}
          ref={infoModalRef}>
          <div
            className="bgm-container info-container"
            onClick={event => {
              event.stopPropagation();
            }}>
            <div className="bgm-header info-title">
              {isLicense ? '라이선스' : '개인정보 처리방침'}
            </div>

            {isLicense ? <License /> : <Privacy />}

            <button className="btn" onClick={onConfirmed}>
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default InfoModal;
