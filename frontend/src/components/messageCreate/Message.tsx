import React, {
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';

import '@messageCreate/Message.scss';
import {Content} from '@screens/MessageCreate';
import Preview from '@messageCreate/Preview';
import Alert from '@common/Alert';
import {ReactComponent as ImageIcon} from '@images/image.svg';
import {ReactComponent as ImageFillIcon} from '@images/imageFill.svg';
import {ReactComponent as VideoIcon} from '@images/video.svg';
import {ReactComponent as VideoFillIcon} from '@images/videoFill.svg';
import {ReactComponent as AudioIcon} from '@images/audio.svg';
import {ReactComponent as AudioFillIcon} from '@images/audioFill.svg';
import {ReactComponent as TextIcon} from '@images/text.svg';
import {ReactComponent as TextFillIcon} from '@images/textFill.svg';

// 파일 타입
const fileTypeArr = ['', 'image', 'video', 'audio'];
const fileTypeKoArr = ['', '사진', '영상', '음성'];

type MessageProps = {
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
};

// 메세지 내용 작성 및 파일 등록 시 미리보기 지원
function Message({content, setContent}: MessageProps) {
  // 알림 관련 state
  const [isAlertOpened, setIsAlertOpend] = useState(false);
  const [alertInfo, setAlertInfo] = useState({title: '', message: ''});

  // 새로 등록하는 파일
  const newFileRef = useRef<HTMLInputElement>(null);

  const [newFile, setNewFile] = useState(content.file);
  const [newFileType, setNewFileType] = useState(content.type);
  const [newFileURL, setNewFileURL] = useState(content.fileURL);

  // textarea 높이 자동 조절
  const textRef = useRef<HTMLTextAreaElement>(null!);
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }, []);

  // 버튼 클릭 시 파일 등록 창 보여주기
  const handleClickFileUpload = () => {
    newFileRef.current?.click();
  };

  // nav에서 다른 카테고리 누를 때마다 메세지 내용 및 타입 초기화
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

  // 새로운 파일 등록
  const selectNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      const file = fileList[0];

      // 용량 10mb 이하인지 확인
      if (file.size > 10 * 1024 * 1024) {
        setAlertInfo({
          title: '알림',
          message: '10MB 이하의 파일만\n업로드할 수 있습니다.',
        });
        setIsAlertOpend(true);
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
        setAlertInfo({
          title: '알림',
          message: '올바르지 않은 형식입니다.',
        });
        setIsAlertOpend(true);
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
          <>
            <div className="message-create-content-text">
              <textarea
                ref={textRef}
                className="message-create-content-textarea"
                placeholder="내용을 입력해주세요 &#13; (최대 100자)"
                // {`내용을 입력해주세요.\n(최대 100자)`}
                maxLength={100}
                onInput={handleResizeHeight}
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
            </div>
            {/* <span className="message-create-content-text-explain">{`내용을 입력해주세요.\n(최대 100자)`}</span> */}
          </>
        ) : null}

        {newFile === null && newFileType !== 0 ? (
          <div
            className="message-create-content-upload"
            onClick={handleClickFileUpload}>
            <span>
              이곳을 눌러서 <br /> "{fileTypeKoArr[newFileType]}" 파일을
              첨부해주세요. <br /> (최대 10MB)
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

      <Alert
        info={alertInfo}
        open={isAlertOpened}
        onConfirmed={() => setIsAlertOpend(false)}
      />
    </div>
  );
}

export default Message;
