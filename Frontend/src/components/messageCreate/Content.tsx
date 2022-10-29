import React, { useRef, useState } from "react";
import "../../screens/MessageCreate.scss";
import "./Content.scss";

type UploadFile = {
  file: File;
  thumbnail: string;
  type: string;
};

function FileUpload() {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<UploadFile | null>(null);

  const handleClickFileUpload = () => {
    fileUploadRef.current?.click();
  };

  const cancleFileUpload = () => {
    setFile(null);
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      setFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type,
      });
    }
  };

  let preview: any;

  if (!file && file == null) {
    preview = (
      <textarea
        className="content-text"
        placeholder="내용을 입력하세요."
        maxLength={150}
        rows={10}
      />
    );
  } else if (file.type.startsWith("image")) {
    preview = (
      <img
        className="content-image"
        src={file.thumbnail}
        alt={file.type}
        onClick={handleClickFileUpload}
      />
    );
  } else if (file.type.startsWith("video")) {
    preview = (
      <video
        className="content-video"
        controls={true}
        autoPlay={true}
        playsInline={true}
      >
        <source src={file.thumbnail} />
      </video>
    );
  } else if (file.type.startsWith("audio")) {
    preview = <div></div>;
  } else {
    preview = <div>업로드할 수 없는 형식의 파일입니다. 다시 시도해주세요!</div>;
  }

  return (
    <div className="content">
      <div className="content-container">
        {preview}

        {!file && file == null ? (
          <button className="submit" onClick={handleClickFileUpload}>
            사진 / 영상 / 음성 파일 업로드하기
          </button>
        ) : (
          <div className="content-buttons">
            <button className="submit" onClick={handleClickFileUpload}>
              바꾸기
            </button>
            <button className="submit" onClick={cancleFileUpload}>
              취소
            </button>
          </div>
        )}
      </div>

      <input
        style={{ display: "none" }}
        type="file"
        accept="*"
        ref={fileUploadRef}
        onChange={uploadFile}
      />
    </div>
  );
}

export default FileUpload;
