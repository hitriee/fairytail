// ** 신고 모달

import React, {useState, useEffect, useRef, ReactHTMLElement} from 'react';
import Alert from '@common/Alert';
import {returnTrue, returnFalse, currentUser} from '@common/commonFunc';
import '@common/Common.scss';
import SelectBox from '../common/SelectBox';
import {reportMessage} from '@/apis/messageDetail/detailFunc';
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
  const [info, setInfo] = useState({title: '', message: ''});

  const reportRef = useRef<HTMLDivElement>(null);

  // 모달 바깥을 클릭 시 모달 닫힘
  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (reportRef.current && !reportRef.current.contains(target as Node)) {
        setReportType(-1);
        onCancel();
        setReportContent(() => '');
      }
    });
  });

  // 신고 접수 여부
  const [reported, setReported] = useState(false);

  // 로그인된 사용자인지 판별
  const navigate = useNavigate();
  const userId = currentUser();
  useEffect(() => {
    if (userId === -1) {
      navigate(intro());
    }
  }, []);

  // 백에 신고 요청
  const reportedAlert = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      content: reportContent,
      type: reportType,
      postId: messageId,
      userId: userId,
    };
    reportMessage(type, data)
      .then(() => {
        const newInfo = {title: '신고 확인', message: '신고가 접수되었습니다.'};
        setInfo(() => newInfo);
        setReported(returnTrue);
      })
      .catch(() => {
        const newInfo = {title: '신고 실패', message: '오류가 발생했습니다.'};
        setInfo(() => newInfo);
        setReported(returnFalse);
      })
      .finally(() => {
        setReportContent(() => '');
        setReportType(-1);
      });
  };

  // 신고 내용 변경
  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(() => e.target.value);
  };

  // 신고 확인 창 닫기
  const closeAlert = () => {
    setReported(returnFalse);
    onCancel();
  };

  // 신고 창 닫기
  const closeReport = () => {
    setReportContent(() => '');
    onCancel();
    setReportType(-1);
  };

  // 신고 유형
  const options = [
    '저작권 위반',
    '개인정보 침해',
    '부적절한 내용',
    '불법 홍보',
    '기타',
  ];

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
