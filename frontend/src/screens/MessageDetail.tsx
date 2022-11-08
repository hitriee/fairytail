import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoveToBack from '@common/MoveToBack';
import dummy from '@messageDetail/dummy';
import {notFound} from '@apis/router';
import '@screens/MessageDetail.scss';

function MessageDetail() {
  //recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  const detail = useRef(null!);
  const params = useParams();
  const navigate = useNavigate();
  const messageId = params.id;
  const loader = async () => {
    if (!messageId || !parseInt(messageId)) {
      navigate(notFound());
    }
  };

  // 현재 사용자 정보
  const myId = 1;
  const index = 1;
  const [
    title,
    content,
    like_cnt,
    is_like,
    date,
    user_id,
    type,
    emoji_no,
    status,
  ] = dummy[index];
  const isMine = user_id === myId;
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };
  const showMenu = () => setMore(!more);
  let month: number | string = date.getMonth();
  if (month < 10) month = '0' + month;
  let day: number | string = date.getDate();
  if (day < 10) day = '0' + day;
  const modifiedDate = () => `${date.getFullYear()}-${month}-${day}`;
  useEffect(() => {
    loader();
  }, []);
  const changeBackground = () => {
    const number = 11;
    return `detail background${number}`;
  };

  return (
    <div className={changeBackground()} ref={detail}>
      <main id="detail" onClick={hiddenMenu}>
        <section data-html2canvas-ignore="true" className="ignore">
          <MoveToBack path="" />
          <div id="detail-nav-more">
            <EllipsisVertical
              width="30"
              height="30"
              onClick={showMenu}
              color="white"
            />
          </div>
          <MoreMenu
            open={more}
            isMine={isMine}
            detail={detail}
            messageId={messageId}
            type={type}
            content={content}
            close={hiddenMenu}
            status={status}
          />
        </section>
        <section className="core">
          <Content
            title={title}
            content={content}
            type={type}
            date={modifiedDate()}
          />
          <Like
            count={like_cnt}
            like={is_like}
            isMine={isMine}
            emoji={emoji_no}
          />
        </section>
      </main>
    </div>
  );
}

export default MessageDetail;
