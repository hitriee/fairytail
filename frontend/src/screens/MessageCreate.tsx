import { useState } from "react";
import { Link } from "react-router-dom";
import "./MessageCreate.scss";
import Carousel from "../components/messageCreate/Carousel";
import Toggle from "../components/messageCreate/Toggle";
import { HiArrowLeft } from "react-icons/hi2";

function MessageCreate() {
  const [emojiNo, setEmojiNo] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [contentType, setContentType] = useState(0);
  const [isShare, setIsShare] = useState(false);

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <Link to="/main">
            <HiArrowLeft
              size="4vh"
              color="white"
              onClick={() => console.log("뒤로가기")}
            />
          </Link>
        </div>

        <Carousel onSlideChange={setEmojiNo} />
        <div className="create-area">
          <input
            className="title"
            placeholder="제목을 입력하세요."
            maxLength={10}
          />
          <textarea
            className="content"
            placeholder="내용을 입력하세요."
            maxLength={150}
            rows={10}
          />
          <button className="submit" onClick={() => console.log(emojiNo)}>
            사진 / 영상 / 음성 파일 업로드하기
          </button>

          <div className="save-area">
            <Toggle label="✨ 공개 여부" onClick={setIsShare} />
            <button className="submit" onClick={() => console.log(emojiNo)}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCreate;
