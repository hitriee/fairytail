import React, { useRef, useState, Dispatch, SetStateAction } from "react";
import "../../screens/MessageCreate.scss";
import "./Message.scss";
import MusicPlayer from "./MusicPlayer";

export type Content = {
  title: string;
  type: string; // text, image, video, audio
  file: File | null; // create, update 경우에 사용
  fileURL: string; // text의 경우 내용, 나머지의 경우 경로
};

type PreviewProps = {
  type: string;
  fileURL: string;
};

function Preview({ type, fileURL }: PreviewProps) {
  let preview: any;

  if (type.startsWith("string")) {
    preview = <p className="content-text">{fileURL}</p>;
  } else if (type.startsWith("image")) {
    preview = <img className="content-image" src={fileURL} alt={type} />;
  } else if (type.startsWith("video")) {
    preview = (
      <video
        className="content-image"
        controls={true}
        autoPlay={true}
        playsInline={true}
      >
        <source src={fileURL} />
      </video>
    );
  } else if (type.startsWith("audio")) {
    preview = <MusicPlayer fileURL={fileURL} />;
  } else {
    preview = <div>업로드할 수 없는 파일 형식입니다. 다시 시도해주세요.</div>;
  }

  return preview;
}

type MessageProps = {
  mode: string;
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
};

function Message({ mode, content, setContent }: MessageProps) {
  const newFileRef = useRef<HTMLInputElement>(null);

  const [newTitle, setNewTitle] = useState(content.title);
  const [newFile, setNewFile] = useState(content.file);
  const [newFileURL, setNewFileURL] = useState(content.fileURL);
  const [newType, setNewFileType] = useState(content.type);

  const handleClickFileUpload = () => {
    newFileRef.current?.click();
  };

  const cancleNewFile = () => {
    if (newFileRef.current) {
      newFileRef.current.value = "";
    }

    setNewFile(null);
    setNewFileURL("");
    setNewFileType("string");
    setContent({
      title: newTitle,
      type: "string",
      file: null,
      fileURL: "",
    });
  };

  const selectNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("확인");
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      setNewFile(fileList[0]);
      setNewFileURL(url);
      setNewFileType(fileList[0].type);
      setContent({
        title: newTitle,
        type: fileList[0].type,
        file: fileList[0],
        fileURL: url,
      });
    }
  };

  if (mode === "create" || mode === "update") {
    return (
      <div className="message-container">
        <input
          className="title"
          placeholder="제목을 입력하세요."
          maxLength={10}
          onChange={(e) => {
            setNewTitle(e.target.value);
            setContent((prev) => {
              prev.title = e.target.value;
              return prev;
            });
          }}
          defaultValue={content.title}
        />
        {newFileURL === "" || newType === "string" ? (
          // create 이거나, type이 text인 글을 update 하는 경우 -> textarea
          <textarea
            className="content-text"
            placeholder="내용을 입력하세요."
            maxLength={150}
            rows={10}
            onChange={(e) => {
              setNewFileURL(e.target.value);
              setContent((prev) => {
                prev.type = "string";
                prev.file = null;
                prev.fileURL = e.target.value;
                return prev;
              });
            }}
            defaultValue={typeof content.file === "string" ? content.file : ""}
          />
        ) : (
          <Preview type={newType} fileURL={newFileURL} />
        )}
        {!newFile && newFile == null ? (
          <button className="btn" onClick={handleClickFileUpload}>
            사진 / 영상 / 음성 파일 업로드하기
          </button>
        ) : (
          <div className="content-buttons">
            <button className="btn" onClick={handleClickFileUpload}>
              바꾸기
            </button>
            <button className="btn" onClick={cancleNewFile}>
              취소
            </button>
          </div>
        )}

        <input
          style={{ display: "none" }}
          type="file"
          accept="*"
          ref={newFileRef}
          onChange={selectNewFile}
        />
      </div>
    );
  } else if (mode === "read") {
    return (
      <div>
        <div className="title">{content ? content.title : null}</div>
        <Preview type={content.type} fileURL={content.fileURL} />
      </div>
    );
  } else {
    return (
      <div>
        잘못된 접근입니다. mode의 값은 "create", "read", "update" 중 하나여야
        합니다.
      </div>
    );
  }
}

export default Message;
