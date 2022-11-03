import {useState, useRef, Fragment} from 'react';
import {useParams} from 'react-router';
import NavBar from '@common/NavBar';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import dummy from '@messageDetail/dummy';
import '@screens/MessageDetail.scss';

function MessageDetail() {
  const detail = useRef(null!);
  const params = useParams();
  const messageId = params.id;

  // 현재 사용자 정보
  const myId = 1;
  const index = 1;
  const [title, content, like_cnt, is_like, date, user_id, type, emoji_no] =
    dummy[index];
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

  return (
    <div className="detail">
      <main id="detail" onClick={hiddenMenu} ref={detail}>
        <div data-html2canvas-ignore="true" className="ignore">
          <NavBar showMenu={showMenu} detail={detail} />
          <MoreMenu
            open={more}
            isMine={isMine}
            detail={detail}
            messageId={messageId}
            type={type}
            content={content}
            close={hiddenMenu}
          />
        </div>
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
