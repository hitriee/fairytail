import {useState} from 'react';
import html2canvas from 'html2canvas';
import {useNavigate} from 'react-router-dom';
import {saveAs} from 'file-saver';
import {returnTrue, returnFalse} from '@common/commonFunc';
import Report from '@messageDetail/Report';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import {popUp} from '@common/commonFunc';
import {toMessageUpdate} from '@/apis/router';
import '@common/Common.scss';

interface MoreMenuProps {
  open: boolean;
  isMine: boolean;
  detail: any;
  messageId: string | undefined;
  type: number;
  content: string;
  close: () => void;
  status: number;
}

function MoreMenu({
  open,
  isMine,
  detail,
  messageId,
  type,
  content,
  close,
  status,
}: MoreMenuProps) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({title: '', message: ''});
  const [openConfirm, setConfirm] = useState(false);
  const [openReport, setReport] = useState(false);
  const [openAlert, setAlert] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  // info 값 변경
  const changeInfo = (title: popUp['title'], message: popUp['message']) => {
    setInfo(() => ({
      title,
      message,
    }));
  };

  const saveMessage = async () => {
    close();
    if (type === 0) {
      const height = window.innerHeight;
      html2canvas(detail.current, {height}).then(canvas => {
        saveAs(canvas.toDataURL(), 'fairytail.png');
      });
    } else {
      // content는 url형식
      saveAs(content, 'fairytail.png');
    }
  };
  // 신고 팝업
  const reportMessage = () => {
    setReport(returnTrue);
    console.log('신고 페이지로');
    console.log('back에 요청 - axios');
  };
  // 메시지 상태(공개, 비공개) 설정
  // const toEdit = () => {
  //   if (messageId) {
  //     navigate(toMessageUpdate(messageId));
  //     close();
  //   }
  // };
  const presentStatus = (statusNum: number) =>
    statusNum === 0 ? '공개' : '비공개';
  const changeStatus = () => {
    // 백에 변경 요청 보내기
    setNewStatus(prev => 1 - prev);
    // 변경되었음을 알림
    changeInfo(
      '완료',
      `작성한 메시지가\n${presentStatus(1 - newStatus)}로 변경되었습니다.`,
    );
    setAlert(returnTrue);
  };
  // 삭제 확인
  const onDelete = () => {
    changeInfo('확인', '정말 삭제하시겠습니까?');
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
    changeInfo('완료', '글이 정상적으로 삭제되었습니다');
    setAlert(returnTrue);
    setConfirm(returnFalse);
    // 동기로 처리
    // changeInfo('', '');
  };

  return (
    <>
      {open ? (
        <main id="menu">
          {isMine ? (
            <>
              <article className="button" onClick={changeStatus}>
                {`${presentStatus(1 - newStatus)}로 변경`}
              </article>
              <article className="button" onClick={onDelete}>
                삭제
              </article>
            </>
          ) : (
            <>
              <article className="button" onClick={reportMessage}>
                신고
              </article>
            </>
          )}
          <article className="button" onClick={saveMessage}>
            저장
          </article>
        </main>
      ) : null}

      {/* 공개 여부 변경 모달 */}
      <Alert info={info} open={openAlert} onConfirmed={closeAlert} />

      {/* 삭제 확인 모달 */}
      <Confirm
        info={info}
        onConfirmed={deleteMessage}
        onCancel={onCancel}
        open={openConfirm}
      />

      {/* 신고 모달 */}
      <Report onCancel={onReportCancel} open={openReport} />
    </>
  );
}

export default MoreMenu;
