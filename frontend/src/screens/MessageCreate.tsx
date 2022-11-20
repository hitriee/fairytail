import {useLayoutEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Message from '@messageCreate/Message';
import Spinner from '@messageCreate/Spinner';
import EmojiGrid from '@messageCreate/EmojiGrid';
import Compress from '@messageCreate/Compress';
import Toggle from '@messageCreate/Toggle';
import MoveToBack from '@common/MoveToBack';
import Alert from '@common/Alert';

import {postText, postFile} from '@apis/messageCreate';
import {toMessageDetail} from '@apis/router';

import {ReactComponent as Send} from '@images/send.svg';

// 내용 타입 정의
export type Content = {
  type: number; // 0: text, 1: image, 2: video, 3: audio
  file: File | null; // create 경우에 사용
  fileURL: string; // text의 경우 내용, 나머지의 경우 경로
};

function MessageCreate() {
  // 알림 관련 state
  const [isAlertOpened, setIsAlertOpend] = useState(false);
  const [alertInfo, setAlertInfo] = useState({title: '', message: ''});

  // 모바일 가상 키보드 고려한 스크롤 이동
  const screenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const detectMobileKeyboard = () => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        screenRef.current?.scrollIntoView({block: 'end'});
      }
    };

    window.addEventListener('resize', detectMobileKeyboard);

    return window.removeEventListener('resize', detectMobileKeyboard);
  });

  // detail 페이지로 이동하기 위한 navigate
  const navigate = useNavigate();

  // 풍선 등록 중 보여주는 스피너
  const [spinner, setSpinner] = useState(false);
  const [spinnerMessage, setSpinnerMessage] =
    useState('잠시만 기다려주세요...');
  const [spinnerStop, setspinnerStop] = useState(0);

  // 이모지 길게 클릭했는지 확인하기 위한 state
  const [isLongClicked, setIsLongClicked] = useState(false);

  // 풍선 등록에 필요한 정보
  const [emojiNo, setEmojiNo] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Content>({
    type: 0,
    file: null,
    fileURL: '',
  });
  const [isShare, setIsShare] = useState(false);

  // 풍선 등록 결과에 따른 스피너 표시
  const successSpinner = (postId: number, type: number) => {
    setspinnerStop(1);
    setSpinnerMessage('성공적으로 등록되었습니다.');
    setTimeout(() => {
      setSpinner(false);
      navigate(toMessageDetail(postId, type));
    }, 1500);
  };

  const failSpinner = (message: string) => {
    setspinnerStop(2);
    setSpinnerMessage(message);

    setTimeout(() => {
      setSpinner(false);
      setspinnerStop(0);
      setSpinnerMessage('잠시만 기다려주세요...');
    }, 1500);
  };

  // 풍선 등록
  function handleSubmit() {
    // 제목이나 내용이 비어있는지 확인
    if (title.trim() === '') {
      setAlertInfo({title: '알림', message: '제목을 입력해주세요.'});
      setIsAlertOpend(true);
    } else if (content.type === 0 && content.fileURL.trim() === '') {
      setAlertInfo({title: '알림', message: '내용을 입력해주세요.'});
      setIsAlertOpend(true);
    } else if (content.type !== 0 && content.file === null) {
      setAlertInfo({title: '알림', message: '파일을 첨부해주세요.'});
      setIsAlertOpend(true);
    } else {
      // 모두 작성되었다면 서버로 전송
      if (navigator.geolocation) {
        setSpinner(true);

        // 현재 위치 정보 받아오기
        navigator.geolocation.getCurrentPosition(async position => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          let compressedFile = content.file;

          // 이미지는 압축
          if (content.type === 1 && content.file !== null) {
            compressedFile = await Compress(content.file);
          }

          let data;

          const userId = localStorage.getItem('userId');

          // 서버 통신, type에 따라 보내는 방식이 달라짐
          // text인 경우
          if (content.type === 0) {
            data = {
              content: content.fileURL,
              emojiNo: emojiNo,
              lat: location.lat,
              lng: location.lng,
              status: isShare ? '1' : '0',
              title: title,
              type: content.type,
              userId: userId,
            };
            postText(content.type, data)
              .then(({data, message}) => {
                if (message === 'FAIL') {
                  failSpinner('부적절한 내용이\n포함되어 있습니다.');
                } else {
                  successSpinner(data.postId, data.type);
                }
              })
              .catch(err => {
                failSpinner('풍선 등록에 실패했습니다.');
              });
          } else {
            // image, video, audio인 경우 -- multipart/form-data 사용
            data = new FormData();
            data.append('content', content.fileURL);
            data.append('emojiNo', emojiNo.toString());
            data.append('file', compressedFile as Blob);
            data.append('lat', location.lat.toString());
            data.append('lng', location.lng.toString());
            data.append('status', isShare ? '1' : '0');
            data.append('title', title);
            data.append('type', content.type.toString());
            data.append('userId', userId ? userId : '');

            postFile(content.type, data)
              .then(({data, message}) => {
                if (message === 'FAIL') {
                  failSpinner('부적절한 내용이\n포함되어 있습니다.');
                } else {
                  successSpinner(data.postId, data.type);
                }
              })
              .catch(err => {
                failSpinner('풍선 등록에 실패했습니다.');
              });
          }
        });
      }
    }
  }

  return (
    <div className="screen" ref={screenRef}>
      {spinner ? (
        <Spinner message={spinnerMessage} spinnerStop={spinnerStop} />
      ) : null}

      <MoveToBack path="/main" />
      <div className="container">
        <Carousel
          emojiNo={emojiNo}
          onSlideChange={setEmojiNo}
          setIsLongClicked={setIsLongClicked}
        />

        <div
          className="message-create-card"
          style={{display: isLongClicked ? 'block' : 'none'}}>
          <EmojiGrid
            setEmojiNo={setEmojiNo}
            setIsLongClicked={setIsLongClicked}
          />
        </div>

        <div
          className="message-create-card"
          style={{display: isLongClicked ? 'none' : 'block'}}>
          <input
            className="message-create-title"
            placeholder="제목을 입력해주세요.(최대 10자)"
            maxLength={10}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />

          <Message content={content} setContent={setContent} />

          <div className="message-create-save-container">
            <Toggle label="비공개" onClick={setIsShare} value={isShare} />
            <Send
              onClick={handleSubmit}
              transform="rotate(-20)"
              className="message-create-save-btn-icon"
            />
          </div>
        </div>
      </div>

      <Alert
        info={alertInfo}
        open={isAlertOpened}
        onConfirmed={() => setIsAlertOpend(false)}
      />
    </div>
  );
}

export default MessageCreate;
