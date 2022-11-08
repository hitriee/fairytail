import {Content} from '@/screens/MessageCreate';
import React, {useRef, useState, Dispatch, SetStateAction} from 'react';
import '../../screens/MessageCreate.scss';
import './Message.scss';
import MusicPlayer from './MusicPlayer';
import {ReactComponent as ImageIcon} from '@images/image.svg';
import {ReactComponent as ImageFillIcon} from '@images/imageFill.svg';
import {ReactComponent as VideoIcon} from '@images/video.svg';
import {ReactComponent as VideoFillIcon} from '@images/videoFill.svg';
import {ReactComponent as AudioIcon} from '@images/audio.svg';
import {ReactComponent as AudioFillIcon} from '@images/audioFill.svg';
import {ReactComponent as TextIcon} from '@images/text.svg';
import {ReactComponent as TextFillIcon} from '@images/textFill.svg';

type PreviewProps = {
  type: number;
  fileURL: string;
};

export function Preview({type, fileURL}: PreviewProps) {
  let preview: any;

  if (type === 1) {
    preview = (
      <img className="message-create-content-image" src={fileURL} alt="사진" />
    );
  } else if (type === 2) {
    preview = (
      <video
        className="message-create-content-image"
        controls={true}
        playsInline={true}>
        <source src={fileURL} />
      </video>
    );
  } else if (type === 3) {
    preview = <MusicPlayer fileURL={fileURL} />;
  }

  return preview;
}

const fileTypeArr = ['', 'image', 'video', 'audio'];
const fileTypeKoArr = ['', '사진', '영상', '음성'];

type MessageProps = {
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
};

function Message({content, setContent}: MessageProps) {
  const newFileRef = useRef<HTMLInputElement>(null);

  const [newFile, setNewFile] = useState(content.file);
  const [newFileType, setNewFileType] = useState(content.type);
  const [newFileURL, setNewFileURL] = useState(content.fileURL);

  const handleClickFileUpload = () => {
    newFileRef.current?.click();
  };

  const handleChangeNewFileType = (type: number) => {
    if (newFileRef.current) {
      newFileRef.current.value = '';
    }

    setNewFile(null);
    setNewFileType(type);
    setNewFileURL('');
    setContent({
      type: type,
      file: null,
      fileURL: '',
    });
  };

  const selectNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      const file = fileList[0];

      // 용량 10mb 이하인지 확인
      if (file.size > 10 * 1024 * 1024) {
        alert('10MB 이하의 파일만 업로드할 수 있습니다.');
        return;
      }

      // 올바른 파일 타입인지 확인
      if (file.type.startsWith(fileTypeArr[newFileType])) {
        setNewFile(file);
        setNewFileURL(url);
        setContent({
          type: newFileType,
          file: file,
          fileURL: url,
        });
      } else {
        alert('올바르지 않은 파일 형식입니다.');
        return;
      }
    }
  };

  return (
    <div className="message-create-content">
      <div className="message-create-content-navbar">
        {newFileType === 0 ? (
          <TextFillIcon
            fill="#a07dff"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            className="message-create-content-navbaritem message-create-content-navbaritem-fill"
          />
        ) : (
          <TextIcon
            fill="#dbdbdb"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            onClick={() => handleChangeNewFileType(0)}
            className="message-create-content-navbaritem"
          />
        )}
        {newFileType === 1 ? (
          <ImageFillIcon
            fill="#a07dff"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            className="message-create-content-navbaritem  message-create-content-navbaritem-fill"
          />
        ) : (
          <ImageIcon
            fill="#dbdbdb"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            onClick={() => handleChangeNewFileType(1)}
            className="message-create-content-navbaritem"
          />
        )}
        {newFileType === 2 ? (
          <VideoFillIcon
            fill="#a07dff"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            className="message-create-content-navbaritem  message-create-content-navbaritem-fill"
          />
        ) : (
          <VideoIcon
            fill="#dbdbdb"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            onClick={() => handleChangeNewFileType(2)}
            className="message-create-content-navbaritem"
          />
        )}
        {newFileType === 3 ? (
          <AudioFillIcon
            fill="#a07dff"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            className="message-create-content-navbaritem  message-create-content-navbaritem-fill"
          />
        ) : (
          <AudioIcon
            fill="#dbdbdb"
            viewBox="0 0 45 50"
            width="40"
            height="40"
            onClick={() => handleChangeNewFileType(3)}
            className="message-create-content-navbaritem"
          />
        )}
      </div>
      <div className="message-create-content-container">
        {newFile === null && newFileType === 0 ? (
          <textarea
            className="message-create-content-text"
            placeholder="내용을 입력하세요."
            maxLength={100}
            onChange={e => {
              setNewFile(null);
              setNewFileURL(e.target.value);
              setContent(prev => {
                prev.type = 0;
                prev.file = null;
                prev.fileURL = e.target.value;
                return prev;
              });
            }}
          />
        ) : null}

        {newFile === null && newFileType !== 0 ? (
          <div
            className="message-create-content-upload"
            onClick={handleClickFileUpload}>
            <span>
              이곳을 눌러서 <br /> "{fileTypeKoArr[newFileType]}" 파일을
              첨부하세요.
            </span>
          </div>
        ) : null}

        {newFile !== null && newFileType !== 0 ? (
          <>
            <div className="message-create-content-align">
              <Preview type={newFileType} fileURL={newFileURL} />
            </div>
            <button className="btn" onClick={handleClickFileUpload}>
              변경
            </button>
          </>
        ) : null}
      </div>

      <input
        style={{display: 'none'}}
        type="file"
        accept={fileTypeArr[newFileType] + '/*'}
        ref={newFileRef}
        onChange={selectNewFile}
      />
    </div>
  );
}

export default Message;
