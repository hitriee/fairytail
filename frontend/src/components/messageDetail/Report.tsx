import { useState } from "react";
import Alert from "../common/Alert";
import "../common/Common.scss";

interface props {
  open: boolean;
  onCancel: () => void;
}

function Report({ onCancel, open }: props) {
  const [reported, setReported] = useState(false);
  const reportedAlert = () => {};
  return (
    <>
      {open ? (
        <div id="report">
          <p>신고하기</p>
          <input placeholder="신고 사유를 입력해주세요" />
          <button type="button">확인</button>
          <button type="button" onClick={onCancel}>
            취소
          </button>
        </div>
      ) : null}
      {reported ? (
        <Alert
          title="신고 확인"
          message="신고가 접수되었습니다"
          open={reported}
        />
      ) : null}
    </>
  );
}

export default Report;
