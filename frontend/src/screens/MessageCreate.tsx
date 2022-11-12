import {useLayoutEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Message from '@messageCreate/Message';
import Spinner from '@messageCreate/Spinner';
import MoveToBack from '@/components/common/MoveToBack';
import EmojiGrid from '@/components/messageCreate/EmojiGrid';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import Toggle from '@/components/messageCreate/Toggle';
import Compress from '@/components/messageCreate/Compress';
import {postText, postFile} from '@/apis/messageCreate';
import {toMessageDetail} from '@/apis/router';
import InitMessage from '@/apis/notifications/foregroundMessaging';

// 내용 타입 정의
export type Content = {
  type: number; // 0: text, 1: image, 2: video, 3: audio
  file: File | null; // create 경우에 사용
  fileURL: string; // text의 경우 내용, 나머지의 경우 경로
};

function MessageCreate() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

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

  // 디테일 페이지로 이동
  const navigate = useNavigate();

  // 파일 전송 중 보여주는 스피너
  const [spinner, setSpinner] = useState(false);
  const [spinnerMessage, setSpinnerMessage] =
    useState('잠시만 기다려주세요...');
  const [spinnerStop, setspinnerStop] = useState(0);

  // 이모지 길게 클릭했는지 확인
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

  // 풍선 등록
  function handleSubmit() {
    // 제목이나 내용이 비어있는지 확인
    if (title.trim() === '') {
      alert('제목을 입력해주세요.');
    } else if (content.type === 0 && content.fileURL.trim() === '') {
      alert('내용을 입력해주세요.');
    } else if (content.type !== 0 && content.file === null) {
      alert('파일이 첨부되지 않았습니다.');
    } else {
      if (navigator.geolocation) {
        setSpinner(true);

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
            };
            postText(content.type, data)
              .then(({data}) => {
                setspinnerStop(1);
                setSpinnerMessage('성공적으로 등록되었습니다.');
                setTimeout(() => {
                  setSpinner(false);
                  navigate(toMessageDetail(data.postId));
                }, 1500);
              })
              .catch(err => {
                setspinnerStop(2);
                setSpinnerMessage('풍선 등록에 실패했습니다.');
                setTimeout(() => setSpinner(false), 1500);
              });
          } else {
            // image, video, audio인 경우
            data = new FormData();
            data.append('content', content.fileURL);
            data.append('emojiNo', emojiNo.toString());
            data.append('file', compressedFile as Blob);
            data.append('lat', location.lat.toString());
            data.append('lng', location.lng.toString());
            data.append('status', isShare ? '1' : '0');
            data.append('title', title);
            data.append('type', content.type.toString());

            postFile(content.type, data)
              .then(({data}) => {
                setspinnerStop(1);
                setSpinnerMessage('성공적으로 등록되었습니다.');
                setTimeout(() => {
                  setSpinner(false);
                  navigate(toMessageDetail(data.postId));
                }, 1000);
              })
              .catch(err => {
                setspinnerStop(2);
                setSpinnerMessage('풍선 등록에 실패했습니다.');

                setTimeout(() => {
                  setSpinner(false);
                  setspinnerStop(0);
                  setSpinnerMessage('잠시만 기다려주세요...');
                }, 1000);
              });
          }
        });
      }
    }
  }

  return (
    <>
      <InitMessage />
      <div className="screen messageList" ref={screenRef}>
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

          <div className="message-create-card">
            {isLongClicked ? (
              <EmojiGrid
                setEmojiNo={setEmojiNo}
                setIsLongClicked={setIsLongClicked}
              />
            ) : (
              <>
                <input
                  className="message-create-title"
                  placeholder="제목을 입력해주세요."
                  maxLength={10}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                />

                <Message content={content} setContent={setContent} />

                <div className="message-create-save-container">
                  <Toggle label="비공개" onClick={setIsShare} value={isShare} />
                  <button className="btn" onClick={handleSubmit}>
                    등록
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageCreate;
