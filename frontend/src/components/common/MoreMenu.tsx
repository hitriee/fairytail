// ** 상세 페이지 더보기 메뉴
import {useState} from 'react';
import html2canvas from 'html2canvas';
import {useNavigate} from 'react-router-dom';
import {saveAs} from 'file-saver';

import '@common/Common.scss';
import Report from '@messageDetail/Report';
import {returnTrue, returnFalse} from '@common/commonFunc';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import {popUp} from '@common/commonFunc';
import {
  changeMessageStatus,
  deleteMessage,
} from '@apis/messageDetail/detailFunc';
import {dataType} from '@apis/messageDetail/detailInterface';

// props 유형
interface MoreMenuProps {
  open: boolean;
  isMine: boolean;
  detail: any;
  messageId: number;
  type: string;
  close: () => void;
  data: dataType;
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}

function MoreMenu({
  open,
  isMine,
  detail,
  messageId,
  type,
  close,
  data,
  status,
  setStatus,
}: MoreMenuProps) {
  const {url} = data;

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

  // 저장
  const saveMessage = () => {
    if (type === 'text' || type === 'img') {
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
        useCORS: true,
      }).then(canvas => {
        saveAs(canvas.toDataURL(), `fairytail_${type}_${messageId}.png`);
        changeInfo('완료', '게시글이 저장되었습니다.');
        setAlert(returnTrue);
      });
    } else {
      const extension = url.split('.').at(-1);
      saveAs(`https://${url}`, `fairytail_${type}_${messageId}.${extension}`);
      changeInfo('완료', '파일이 저장되었습니다.');
      setAlert(returnTrue);
    }
  };

  // 신고 팝업 띄우기
  const reportMessage = () => {
    setReport(returnTrue);
  };

  // 메시지 공개 여부
  const presentStatus = (statusNum: number) =>
    statusNum === 0 ? '공개' : '비공개';

  // 메시지 공개 여부 변경
  const changeStatus = () => {
    changeMessageStatus(type, {
      postId: messageId,
      status: 1 - status,
    })
      .then((res: any) => {
        if (res.message === 'SUCCESS') {
          changeInfo(
            '완료',
            `작성한 메시지가\n${presentStatus(1 - status)}로 변경되었습니다.`,
          );
          setStatus(prev => 1 - prev);
        } else {
          changeInfo('오류', `요청이 제대로 처리되지 않았습니다`);
        }
      })
      .catch(() => {
        changeInfo('오류', `요청이 제대로 처리되지 않았습니다`);
      })
      .finally(() => {
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
    changeInfo('', '');
    close();
    if (deleted) {
      navigate(-1);
    }
  };

  // 신고 취소
  const onReportCancel = () => {
    setReport(returnFalse);
    close();
  };

  // 백에 삭제 요청
  const delMessage = () => {
    deleteMessage(type, messageId)
      .then((res: any) => {
        if (res.message === 'SUCCESS') {
          setDeleted(returnTrue);
          changeInfo('성공', '정상적으로 삭제되었습니다.');
        } else {
          setDeleted(returnFalse);
          changeInfo('실패', '오류가 발생해 삭제되지 않았습니다.');
        }
      })
      .catch((err: any) => {
        setDeleted(returnFalse);
        changeInfo('실패', '오류가 발생해 삭제되지 않았습니다.');
      })
      .finally(() => {
        setConfirm(returnFalse);
        setAlert(returnTrue);
      });
  };

  return (
    <>
      {open ? (
        <main id="menu fadeIn">
          <article className="button" onClick={saveMessage}>
            저장
          </article>
          {isMine ? (
            <>
              <article className="button" onClick={onDelete}>
                삭제
              </article>
              <article className="button" onClick={changeStatus}>
                {`${presentStatus(1 - status)}로 변경`}
              </article>
            </>
          ) : (
            <>
              <article className="button" onClick={reportMessage}>
                신고
              </article>
            </>
          )}
        </main>
      ) : null}

      {/* 공개 여부 변경, 삭제 모달 */}
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
