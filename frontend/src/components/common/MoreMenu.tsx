import {useState} from 'react';
import html2canvas from 'html2canvas';
import {useNavigate} from 'react-router-dom';
import {saveAs} from 'file-saver';
import {returnTrue, returnFalse} from '@common/commonFunc';
import Report from '@messageDetail/Report';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import {popUp} from '@common/commonFunc';
import '@common/Common.scss';
import {checkType} from '@/apis';
import {changeMessageStatus, deleteMessage} from '@/apis/messageDetail';

interface MoreMenuProps {
  open: boolean;
  isMine: boolean;
  detail: any;
  messageId: number;
  type: string;
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
    if (type === 'text') {
      const height = window.innerHeight;
      const width = window.innerWidth;

      let x = 0;
      let resultWidth = width;

      if (width / height > 9 / 16) {
        resultWidth = (height * 56.25) / 100;
        x = (width - resultWidth) / 2;
      }

      html2canvas(detail.current, {
        x: x,
        width: resultWidth,
        height: height,
      }).then(canvas => {
        saveAs(canvas.toDataURL(), `fairytail_${messageId}.png`);
      });
    } else {
      // content는 url형식
      saveAs(content, `fairytail_${messageId}.png`);
    }
  };
  // 신고 팝업
  const reportMessage = () => {
    setReport(returnTrue);
  };

  // 메시지 상태(공개, 비공개) 설정
  const presentStatus = (statusNum: number) =>
    statusNum === 1 ? '비공개' : '공개';
  const changeStatus = () => {
    changeMessageStatus(type, {
      postId: messageId,
      status: 1 - status,
    }).then((res: any) => {
      console.log(res);
      setNewStatus(prev => 1 - prev);
      // 변경되었음을 알림
      changeInfo(
        '완료',
        `작성한 메시지가\n${presentStatus(1 - newStatus)}로 변경되었습니다.`,
      );
      setAlert(returnTrue);
    });
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
  const delMessage = () => {
    deleteMessage(type, messageId)
      .then((res: any) => {
        setDeleted(returnTrue);
        changeInfo('삭제 완료', '글이 정상적으로 삭제되었습니다');
      })
      .catch((err: any) => {
        setDeleted(returnFalse);
        changeInfo('삭제 미완료', '오류가 발생해 글이 삭제되지 않았습니다');
      })
      .finally(() => {
        setAlert(returnTrue);
        setConfirm(returnFalse);
      });
  };

  return (
    <>
      {open ? (
        <main id="menu">
          <article className="button" onClick={saveMessage}>
            저장
          </article>
          {/* {isMine ? ( */}
          <>
            <article className="button" onClick={onDelete}>
              삭제
            </article>
            <article className="button" onClick={changeStatus}>
              {`${presentStatus(1 - newStatus)}로 변경`}
            </article>
          </>
          {/* ) : ( */}
          <>
            <article className="button" onClick={reportMessage}>
              신고
            </article>
          </>
          {/* )} */}
        </main>
      ) : null}

      {/* 공개 여부 변경 모달 */}
      <Alert info={info} open={openAlert} onConfirmed={closeAlert} />

      {/* 삭제 확인 모달 */}
      <Confirm
        info={info}
        onConfirmed={delMessage}
        onCancel={onCancel}
        open={openConfirm}
      />

      {/* 신고 모달 */}
      <Report
        onCancel={onReportCancel}
        open={openReport}
        type={type}
        messageId={messageId}
      />
    </>
  );
}

export default MoreMenu;
