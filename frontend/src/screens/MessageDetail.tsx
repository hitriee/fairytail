import { useState, useRef } from "react";
import NavBar from "../components/common/NavBar";
import Content from "../components/messageDetail/Content";
import Like from "../components/messageDetail/Like";
import dummy from "../components/messageDetail/dummy";
import wave from "../assets/images/wave.png";
import milkyway from "../assets/images/milkyway.jpg";
import "./MessageDetail.scss";
import "../styles/_utils.scss";

import domToImage from "dom-to-image";
import { saveAs } from "file-saver";

function MessageDetail() {
  const detail = useRef(null!);
  // 현재 사용자 정보
  const username = "나원경";
  // dummy => 더미 데이터
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const types = ["text", "image", "video", "voice"];
  // 백에서 받아올 정보 - 제목, 내용/url, 좋아요 수, 작성일, 작성자, 글 유형, 풍선 번호
  // const [title, content, count, like, date, author, type] = dummy[0];
  // const [title, content, count, like, date, author, type] = dummy[1];
  // const [title, content, count, like, date, author, type] = dummy[2];
  // const [title, content, count, like, date, author, type] = dummy[3];
  const [title, content, count, like, date, author, type] = dummy[4];
  const isMine = author === username;
  const [more, setMore] = useState(false);

  const hiddenMenu = () => (more ? setMore(false) : null);
  const showMenu = () => setMore(true);
  const modifiedDate = () =>
    `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} (${
      weekday[date.getDay()]
    }) ${date.getHours()}:${date.getMinutes()}`;
  // const detail = document.querySelector("#detail")!;

  return (
    <>
      <img className="background" src={milkyway} alt="배경" />
      <main id="detail" onClick={hiddenMenu}>
        <img src={wave} className="wave" alt="파도 모양" />
        <NavBar
          isMine={isMine}
          more={more}
          showMenu={showMenu}
          detail={detail}
        />
        <section className="core" ref={detail}>
          <Content
            title={title}
            content={content}
            type={type}
            date={modifiedDate()}
          />
          <Like count={count} like={like} isMine={isMine} />
        </section>
      </main>
    </>
  );
}

export default MessageDetail;
