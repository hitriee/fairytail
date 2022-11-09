import {useState, useEffect, useRef} from 'react';
import Alert from '@common/Alert';
import {returnTrue, returnFalse} from '@common/commonFunc';
import '@common/Common.scss';
import {ReactComponent as ArrowDropDown} from '@images/arrowDropDown.svg';

interface ReportProps {
  open: boolean;
  onCancel: () => void;
}

function Report({onCancel, open}: ReportProps) {
  // select 보여주기 여부
  const [showSelect, setShowSelect] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (reportRef.current && !reportRef.current.contains(target as Node)) {
        // onCancel();
      }
    });
  });

  const [reported, setReported] = useState(false);
  const reportedAlert = () => {
    // 백에 신고 요청
    // axios.post('url')
    setReported(returnTrue);
  };

  const closeAlert = () => {
    setReported(returnFalse);
    onCancel();
  };

  const options = [
    '저작권 위반',
    '개인정보 침해',
    '부적절한 내용',
    '불법 홍보',
    '기타',
  ];

  const info = {title: '확인', message: '신고가 접수되었습니다.'};

  return (
    <>
      {open ? (
        <div className="modal" ref={reportRef}>
          <p className="modal-title">신고</p>

          {/* select */}
          <div
            className="modal-select-toggle"
            onClick={() => setShowSelect(prev => !prev)}>
            신고 유형
            <ArrowDropDown
              fill="#a07dff"
              viewBox="0 0 45 45"
              width="30"
              height="30"
            />
          </div>
          {showSelect ? (
            <ul className="modal-select-box">
              {options.map((option: string, index) => (
                <li className="modal-select-li" key={option}>
                  <button
                    className="modal-select-option"
                    onClick={() => console.log(index)}>
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <textarea
            className="modal-textarea"
            placeholder="신고 사유를 입력해주세요."
            maxLength={100}
            rows={8}
          />
          <footer className="modal-footer">
            <button className="btn" onClick={reportedAlert}>
              확인
            </button>
            <button className="btn" onClick={onCancel}>
              취소
            </button>
          </footer>
        </div>
      ) : null}
      <Alert info={info} open={reported} onConfirmed={closeAlert} />
    </>
  );
}

export default Report;
