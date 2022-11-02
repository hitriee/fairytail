import {useState} from 'react';
import html2canvas from 'html2canvas';
import {useNavigate} from 'react-router-dom';
import {saveAs} from 'file-saver';
import {returnTrue, returnFalse} from '@common/commonFunc';
import Report from '@messageDetail/Report';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import '@common/Common.scss';

interface props {
  open: boolean;
  isMine: boolean;
  detail: any;
  messageId: string | undefined;
  type: string;
  content: string;
  close: () => void;
}

interface popUp {
  title: string;
  message: string;
}

function MoreMenu({
  open,
  isMine,
  detail,
  messageId,
  type,
  content,
  close,
}: props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({title: '', message: ''});
  const [openConfirm, setConfirm] = useState(false);
  const [openReport, setReport] = useState(false);
  const [openAlert, setAlert] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // info 값 변경
  const changeInfo = (title: popUp['title'], message: popUp['message']) => {
    setInfo(() => ({
      title,
      message,
    }));
  };

  const saveMessage = async () => {
    if (type.startsWith('string')) {
      const height = window.innerHeight;
      html2canvas(detail.current, {width: 520, height}).then(canvas => {
        saveAs(canvas.toDataURL(), 'fairytail.png');
      });
    } else {
      // content는 url형식
      saveAs(content, 'fairytail.png');
    }
    close();
  };
  // 신고 팝업
  const reportMessage = () => {
    setReport(returnTrue);
    console.log('신고 페이지로');
    console.log('back에 요청 - axios');
  };
  // 수정 페이지로 이동
  const toEdit = () => {
    navigate(`/message/update/${messageId}`);
    close();
  };
  // 삭제 확인
  const onDelete = () => {
    changeInfo('삭제 확인', '정말 이 글을 삭제하시겠습니까?');
    setConfirm(returnTrue);
    close();
  };
  // 취소 버튼
  const onCancel = () => {
    setConfirm(returnFalse);
    changeInfo('', '');
    close();
  };
  // 알림 창
  const closeAlert = () => {
    setAlert(returnFalse);
    close();
    changeInfo('', '');
  };
  // 신고 취소
  const onReportCancel = () => {
    setReport(returnFalse);
    close();
  };

  // 삭제 요청 백에 보내기
  const deleteMessage = () => {
    setDeleted(returnTrue);
    // axios.delete('url')
    // .then(())
    changeInfo('삭제 확인', '글이 정상적으로 삭제되었습니다');
    setAlert(returnTrue);
    setConfirm(returnFalse);
    // 동기로 처리
    // changeInfo('', '');
  };

  return (
    <>
      <div className="right">
        {open ? (
          <main id="menu">
            {isMine ? (
              <>
                <article className="button button-not center" onClick={toEdit}>
                  수정
                </article>
                <article
                  className="button button-not center"
                  onClick={onDelete}>
                  삭제
                </article>
              </>
            ) : (
              <>
                <article
                  className="button button-not center"
                  onClick={reportMessage}>
                  신고
                </article>
              </>
            )}
            <article className="button button-not center" onClick={saveMessage}>
              저장
            </article>
          </main>
        ) : null}
      </div>
      <Confirm
        info={info}
        onConfirmed={deleteMessage}
        onCancel={onCancel}
        open={openConfirm}
      />
      <Alert info={info} open={openAlert} onConfirmed={closeAlert} />
      <Report onCancel={onReportCancel} open={openReport} />
    </>
  );
}

export default MoreMenu;
