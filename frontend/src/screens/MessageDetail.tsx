import React, { useEffect, useState } from "react";
import NavBar from "../components/common/NavBar";
import skull from "../assets/images/skull.png";
import heart from "../assets/images/red-heart.png";
import unlike from "../assets/images/unlike.png";
import love from "../assets/images/like.png";
import "./MessageDetail.scss";
import "../styles/_utils.scss";

function MessageDetail() {
  // 현재 사용자 정보
  const username = "나원경";
  // 백에서 글 정보 받아오기
  // 더미 데이터
  const [title, content, count, like, date, author] = [
    "제목입니다",
    "내용입니다",
    121,
    true,
    new Date(),
    "원경",
  ];
  const isMine = author === username;
  const [myLike, setLike] = useState(like);
  const [more, setMore] = useState(false);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const modifiedDate = () =>
    `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} (${
      weekday[date.getDay()]
    }) ${date.getHours()}:${date.getMinutes()}`;
  const changeLike = () => {
    if (!isMine) {
      setLike(!myLike);
      console.log("백에 like 변경 요청?");
    }
  };
  // 아니면 나갈 때만 요청
  return (
    <div>
      <NavBar isMine={isMine} />
      <div id="detail">
        <div className="aurora">
          <p>글 관련 (물결 모양) </p>
          <p>{title}</p>
          <div className="card">
            <p>{content}</p>
            <p>{modifiedDate()}</p>
          </div>
        </div>
        <p>{count}</p>
        {/* <img src={heart} alt="like" /> */}
        {myLike ? (
          <img
            src={love}
            alt="like"
            style={{ width: 10 }}
            onClick={changeLike}
          />
        ) : (
          <img
            src={unlike}
            alt="unlike"
            style={{ width: 10 }}
            onClick={changeLike}
          />
        )}
        <img src={skull} alt="skull" style={{ width: 30 }} />
      </div>
    </div>
  );
}

export default MessageDetail;
