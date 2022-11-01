import {useState, useRef} from 'react';
import NavBar from '@common/NavBar';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import dummy from '@messageDetail/dummy';
import wave from '@images/wave.png';
import milkyway from '@images/milkyway.jpg';
import '@screens/MessageDetail.scss';
import '@styles/_utils.scss';

function MessageDetail() {
  const detail = useRef(null!);
  const menu = useRef<HTMLSpanElement>(null!);
  // 현재 사용자 정보
  const myId = 1;
  // dummy => 더미 데이터
  // 백에서 받아올 정보 - 제목, 내용/url, 좋아요 수, 작성일, 작성자, 글 유형, 풍선 번호
  const index = 0;
  const [title, content, like_cnt, is_like, date, user_id, type, emoji_no] =
    dummy[index];
  const isMine = user_id === myId;
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };
  const showMenu = () => String(setMore(true));
  let month: number | string = date.getMonth();
  if (month < 10) month = '0' + month;
  let day: number | string = date.getDate();
  if (day < 10) day = '0' + day;
  const modifiedDate = () => `${date.getFullYear()}-${month}-${day}`;

  return (
    <div className="detail">
      <img className="background" src={milkyway} alt="배경" />
      <main id="detail" onClick={hiddenMenu}>
        <img src={wave} className="wave" alt="파도 모양" ref={detail} />
        <NavBar
          isMine={isMine}
          more={more}
          showMenu={showMenu}
          detail={detail}
        />
        {more ? <MoreMenu isMine={isMine} detail={detail} /> : null}
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
