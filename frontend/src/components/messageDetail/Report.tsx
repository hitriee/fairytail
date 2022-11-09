import {useState, useEffect, useRef} from 'react';
import Alert from '@common/Alert';
import {returnTrue, returnFalse} from '@common/commonFunc';
import '@common/Common.scss';
import SelectBox from '../common/SelectBox';

interface ReportProps {
  open: boolean;
  onCancel: () => void;
}

function Report({onCancel, open}: ReportProps) {
  // 선택한 신고 유형
  const [reportType, setReportType] = useState(-1);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (reportRef.current && !reportRef.current.contains(target as Node)) {
        setReportType(-1);
        onCancel();
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

          <SelectBox
            reportType={reportType}
            setReportType={setReportType}
            options={options}
          />

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
