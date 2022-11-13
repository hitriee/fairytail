import React, {useState, useEffect, useRef, ReactHTMLElement} from 'react';
import Alert from '@common/Alert';
import {returnTrue, returnFalse, currentUser} from '@common/commonFunc';
import '@common/Common.scss';
import SelectBox from '../common/SelectBox';
import {reportMessage} from '@/apis/messageDetail';
import {checkType} from '@/apis';
import {useNavigate} from 'react-router-dom';
import {intro} from '@/apis/router';

interface ReportProps {
  open: boolean;
  onCancel: () => void;
  type: string;
  messageId: number;
}

function Report({onCancel, open, type, messageId}: ReportProps) {
  // 선택한 신고 유형
  const [reportType, setReportType] = useState(-1);
  const [reportContent, setReportContent] = useState('');

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (reportRef.current && !reportRef.current.contains(target as Node)) {
        setReportType(-1);
        onCancel();
        setReportContent(() => '');
      }
    });
  });

  const [reported, setReported] = useState(false);
  const navigate = useNavigate();
  const userId = currentUser();
  useEffect(() => {
    // if (userId === -1) {
    //   navigate(intro());
    // }
  }, []);

  const reportedAlert = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      content: reportContent,
      type: reportType,
      postId: messageId,
      userId: userId,
    };
    reportMessage(type, data).then(() => {
      setReported(returnTrue);
      setReportContent(() => '');
      setReportType(-1);
    });
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(() => e.target.value);
  };

  const closeAlert = () => {
    setReported(returnFalse);
    onCancel();
  };

  const closeReport = () => {
    setReportContent(() => '');
    onCancel();
    setReportType(-1);
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
            value={reportContent}
            onChange={changeContent}
          />
          <footer className="modal-footer">
            <button className="btn" onClick={reportedAlert}>
              확인
            </button>
            <button className="btn" onClick={closeReport}>
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
