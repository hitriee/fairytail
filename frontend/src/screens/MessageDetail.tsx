import {useState, useRef, createContext} from 'react';
import {useParams} from 'react-router';
import NavBar from '@common/NavBar';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import dummy from '@messageDetail/dummy';
import wave from '@images/wave.png';
import '@screens/MessageDetail.scss';
// import '@styles/_utils.scss';

// export const PopUpContext = createContext<boolean>(false);

function MessageDetail() {
  const detail = useRef(null!);
  const params = useParams();
  const messageId = params.id;
  // const menu = useRef<HTMLSpanElement>(null!);
  // 현재 사용자 정보
  const myId = 1;
  const index = 1;
  const [title, content, like_cnt, is_like, date, user_id, type, emoji_no] =
    dummy[index];
  const isMine = user_id === myId;
  const [more, setMore] = useState(false);
  // const [usePopUp, setUsePopUp] = useState(false);

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
    <div className="detail" ref={detail}>
      <main id="detail" onClick={hiddenMenu}>
        <NavBar showMenu={showMenu} detail={detail} />
        {/* <section ref={detail}> */}
        {/* <img src={wave} className="wave" alt="파도 모양" /> */}
        <MoreMenu
          open={more}
          isMine={isMine}
          detail={detail}
          messageId={messageId}
          type={type}
          content={content}
          close={hiddenMenu}
        />
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
        {/* </section> */}
      </main>
    </div>
  );
}

export default MessageDetail;
