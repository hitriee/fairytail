import {useRef, useEffect} from 'react';
import '@individual/InfoModal.scss';

interface InfoModalProps {
  open: boolean;
  type: string;
  onConfirmed: () => void;
}

function InfoModal({open, type, onConfirmed}: InfoModalProps) {
  const isLicense = type === 'license';
  const content = () => {
    if (isLicense) {
      return (
        <div className="bgm-list info-content">
          <div className="info-category">
            <div className="info-subtitle">폰트</div>
            <p className="info-paragraph">
              <span className="info-keyword">{`프리텐다드\n(Pretendard-Regular),`}</span>
              {`\n길형진(orioncactus),\nSIL Open Font License`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`평창평화체\n(PyeongChangPeace-Light),`}</span>
              {`\n평창군(https://www.pc.go.kr/portal/intro/intro-summary/pcFont),\n공공누리 제3유형 (출처표시, 변경금지)`}
            </p>
          </div>
          <div className="info-category">
            <div className="info-subtitle">배경음악</div>
            <p className="info-paragraph">
              <span className="info-keyword">{`Bed,`}</span>
              {`유민규,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Experience,`}</span>
              {`김성원,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Home Work,`}</span>
              {`전범준,\n한국저작권위원회,CC BY-NC-ND`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Last Travel,`}</span>
              {`문양진,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Like a dream,`}</span>
              {`김현정,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Tonight,`}</span>
              {`김재성,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`I HAVE NOTHING,`}</span>
              {`김재영,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Dreaming Rain,`}</span>
              {`김현정,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Fantasy Piano,`}</span>
              {`김태현,\n한국저작권위원회,기증저작물`}
            </p>
            <p className="info-paragraph">
              <span className="info-keyword">{`Drive,`}</span>
              {`서지현,\n한국저작권위원회,기증저작물`}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bgm-list info-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam,
          ligula eget rutrum aliquet, leo neque accumsan sapien, sit amet
          maximus velit odio sit amet diam. Ut in dolor id justo luctus mattis
          sit amet et leo. Aenean nec tincidunt nulla. In rutrum luctus turpis,
          at hendrerit velit consectetur vel. Mauris lobortis porttitor dictum.
          Nullam facilisis felis in ipsum condimentum iaculis. Quisque pulvinar
          sem et ante elementum dapibus. Quisque tempus augue non arcu imperdiet
          tempus. Vivamus ullamcorper ipsum ac massa vehicula, ac consequat leo
          laoreet. Etiam vitae lobortis libero, maximus convallis risus. Integer
          ipsum orci, pulvinar sit amet mollis eget, malesuada a enim. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Integer bibendum diam magna, ut rutrum velit
          vulputate vitae. Cras eget sollicitudin velit, ac dapibus nunc. Aenean
          sed diam euismod, feugiat justo ut, placerat neque. Pellentesque id
          purus sed ex auctor tempus. Maecenas vestibulum ante risus, nec
          molestie ex convallis nec. Aliquam aliquam lacus metus, non tincidunt
          mi vehicula id. In hac habitasse platea dictumst. Cras sed est
          consequat, mattis nunc eu, pharetra purus. Nulla ut pulvinar neque.
          Curabitur iaculis eleifend dapibus. Sed suscipit sem ac tempus porta.
          Praesent ac venenatis dui. Donec aliquet mauris enim, sit amet sodales
          magna cursus quis. Aliquam posuere velit nec arcu ultricies, quis
          consectetur orci commodo.
        </div>
      );
    }
  };

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

            {content()}

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
