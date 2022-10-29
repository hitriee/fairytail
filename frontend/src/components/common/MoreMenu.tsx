import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Confirm from "./Confirm";
import Alert from "./Alert";
import "./MoreMenu.scss";

interface props {
  isMine: boolean;
}

function MoreMenu({ isMine }: props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [openConfirm, setConfirm] = useState(false);
  const [openAlert, setAlert] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const saveBallon = () => {
    console.log("기기나 컴퓨터에 저장");
  };
  const reportBallon = () => {
    // 신고 페이지가 필요 없을까?
    console.log("신고 페이지로");
    console.log("back에 요청 - axios");
    // 신고 확인 alert
    setTitle("신고 확인");
    setMessage("신고되었습니다");
    setAlert(true);
  };
  const toEdit = () => navigate("/message/update");
  const onDelete = () => {
    setTitle("삭제 확인");
    setMessage("정말 이 글을 삭제하시겠습니까?");
    setConfirm(true);
  };
  const onCancel = () => {
    console.log("cancel");
    setConfirm(false);
    setTitle("");
    setMessage("");
  };
  const onAlert = () => {
    setAlert(false);
    setTitle("");
    setMessage("");
  };
  useEffect(() => {
    // 백에 삭제 요청
    // 삭제 확인
    setTitle("");
    setMessage("삭제되었습니다");
    setAlert(false);
    setMessage("");
  }, [deleted]);
  return (
    <>
      <div className="card">
        {isMine ? null : (
          <>
            <button type="button" onClick={toEdit}>
              글 수정하기
            </button>
            <button type="button" onClick={onDelete}>
              글 삭제하기
            </button>
            <button type="button" onClick={reportBallon}>
              신고하기
            </button>
          </>
        )}
        <button type="button" onClick={saveBallon}>
          글 저장하기
        </button>
      </div>
      <Confirm
        title={title}
        message={message}
        open={openConfirm}
        onConfirmed={() => setDeleted(true)}
        onCancel={onCancel}
      />
      <Alert
        title={title}
        message={message}
        open={openAlert}
        onConfirmed={onAlert}
      />
    </>
  );
}

export default MoreMenu;
