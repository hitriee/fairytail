import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import domToImg from 'dom-to-image';
import {saveAs} from 'file-saver';
import Report from '@messageDetail/Report';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import '@common/Common.scss';

interface props {
  isMine: boolean;
  detail: any;
}

function MoreMenu({isMine, detail}: props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [openConfirm, setConfirm] = useState(false);
  const [openReport, setReport] = useState(false);
  const [openAlert, setAlert] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const saveBallon = async () => {
    console.log(detail);
    // htmlToImg.toBlob(detail.current).then((blob: any) => {
    //   saveAs(blob, "fairytail.png");
    // });
    // htmlToImg
    //   .toJpeg(detail.current, { cacheBust: true })
    //   .then((dataUrl) => {
    //     const link = document.createElement("a");
    //     link.download = "fairytail.jpeg";
    //     link.href = dataUrl;
    //     link.click();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    domToImg.toPng(detail.current).then(blob => {
      saveAs(blob, 'fairytail.jpeg');
    });
  };
  const reportBallon = () => {
    // 신고 페이지가 필요 없을까?
    setTitle('신고 확인');
    setMessage('신고');
    setReport(true);
    console.log('신고 페이지로');
    console.log('back에 요청 - axios');
  };
  const toEdit = () => navigate('/message/update');
  const onDelete = () => {
    setTitle('삭제 확인');
    setMessage('정말 이 글을 삭제하시겠습니까?');
    setConfirm(true);
    console.log('delete');
    console.log(title, message, openConfirm);
  };
  const onCancel = () => {
    console.log('cancel');
    setConfirm(false);
    setTitle('');
    setMessage('');
  };
  const onAlert = () => {
    setAlert(false);
    setTitle('');
    setMessage('');
  };
  useEffect(() => {
    console.log(message);
  }, [message]);
  // useEffect(() => {
  //   // 백에 삭제 요청
  //   // 삭제 확인
  //   setTitle("");
  //   setMessage("삭제되었습니다");
  //   setAlert(false);
  //   setMessage("");
  // }, [deleted]);
  return (
    <>
      <div className="right">
        <main id="menu">
          {isMine ? (
            <>
              <article className="button button-not center" onClick={toEdit}>
                수정
              </article>
              <article className="button button-not center" onClick={onDelete}>
                삭제
              </article>
            </>
          ) : (
            <>
              <article
                className="button button-not center"
                onClick={reportBallon}>
                신고
              </article>
            </>
          )}
          <article className="button button-not center" onClick={saveBallon}>
            저장
          </article>
        </main>
      </div>
      <Confirm
        title={title}
        message={message}
        onConfirmed={() => setDeleted(true)}
        onCancel={onCancel}
        open={openConfirm}
      />
      <Alert
        title={title}
        message={message}
        open={openAlert}
        onConfirmed={onAlert}
      />
      <Report onCancel={() => setReport(false)} open={openReport} />
    </>
  );
}

export default MoreMenu;
