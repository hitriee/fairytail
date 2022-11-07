import {Content} from '@/screens/MessageCreate';
import React, {useRef, useState, Dispatch, SetStateAction} from 'react';
import '../../screens/MessageCreate.scss';
import './Message.scss';
import MusicPlayer from './MusicPlayer';

type PreviewProps = {
  type: number;
  fileURL: string;
};

export function Preview({type, fileURL}: PreviewProps) {
  let preview: any;

  if (type === 0) {
    preview = <p className="message-content-text">{fileURL}</p>;
  } else if (type === 1) {
    preview = (
      <img className="message-content-image" src={fileURL} alt="사진" />
    );
  } else if (type === 2) {
    preview = (
      <video
        className="message-content-image"
        controls={true}
        autoPlay={true}
        playsInline={true}>
        <source src={fileURL} />
      </video>
    );
  } else if (type === 3) {
    preview = <MusicPlayer fileURL={fileURL} />;
  } else {
    preview = <div>업로드할 수 없는 파일 형식입니다. 다시 시도해주세요.</div>;
  }

  return preview;
}

type MessageProps = {
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
};

function Message({content, setContent}: MessageProps) {
  const newFileRef = useRef<HTMLInputElement>(null);

  const [newFile, setNewFile] = useState(content.file);
  const [newFileURL, setNewFileURL] = useState(content.fileURL);
  const [newFileType, setNewFileType] = useState(content.type);

  const handleClickFileUpload = () => {
    newFileRef.current?.click();
  };

  const cancleNewFile = () => {
    if (newFileRef.current) {
      newFileRef.current.value = '';
    }

    setNewFile(null);
    setNewFileURL('');
    setNewFileType(0);
    setContent({
      type: 0,
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

      // 음성, 영상, 사진 중 하나인지 확인
      if (
        file.type.startsWith('image') ||
        file.type.startsWith('video') ||
        file.type.startsWith('audio')
      ) {
        let fileTypeNo = 1;
        if (file.type.startsWith('video')) {
          fileTypeNo = 2;
        } else if (file.type.startsWith('audio')) {
          fileTypeNo = 3;
        }

        setNewFile(file);
        setNewFileURL(url);
        setNewFileType(fileTypeNo);
        setContent({
          type: fileTypeNo,
          file: file,
          fileURL: url,
        });
      } else {
        alert('지원하지 않는 파일 형식입니다.');
        return;
      }
    }
  };

  return (
    <div className="message">
      {newFileURL === '' || newFileType === 0 ? (
        // create 이거나, type이 text인 글을 update 하는 경우 -> textarea
        <textarea
          className="message-content-text"
          placeholder="내용을 입력하세요."
          maxLength={100}
          rows={10}
          onChange={e => {
            setNewFileURL(e.target.value);
            setContent(prev => {
              prev.type = 0;
              prev.file = null;
              prev.fileURL = e.target.value;
              return prev;
            });
          }}
        />
      ) : (
        <Preview type={newFileType} fileURL={newFileURL} />
      )}
      {!newFile && newFile == null ? (
        <button className="btn" onClick={handleClickFileUpload}>
          사진 / 영상 / 음성 파일 업로드
        </button>
      ) : (
        <div className="message-content-buttons">
          <button className="btn" onClick={handleClickFileUpload}>
            바꾸기
          </button>
          <button className="btn" onClick={cancleNewFile}>
            취소
          </button>
        </div>
      )}

      <input
        style={{display: 'none'}}
        type="file"
        accept="*"
        ref={newFileRef}
        onChange={selectNewFile}
      />
    </div>
  );
}

export default Message;
