import {useLayoutEffect, useRef, useState} from 'react';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Message from '@messageCreate/Message';
import Loading from '@components/loading/Loading';
import MoveToBack from '@/components/common/MoveToBack';
import EmojiGrid from '@/components/messageCreate/EmojiGrid';
import CheckBox from '@/components/messageCreate/CheckBox';
import Compress from '@/components/messageCreate/Compress';

// 내용 타입 정의
export type Content = {
  type: number; // 0: text, 1: image, 2: video, 3: audio
  file: File | null; // create 경우에 사용
  fileURL: string; // text의 경우 내용, 나머지의 경우 경로
};

function MessageCreate() {
  // 모바일 가상 키보드 고려한 스크롤 이동
  const screenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const detectMobileKeybord = () => {
      if (document.activeElement?.tagName === 'INPUT') {
        screenRef.current?.scrollIntoView({block: 'end'});
      }
    };

    window.addEventListener('resize', detectMobileKeybord);

    return window.removeEventListener('resize', detectMobileKeybord);
  });

  // 파일 전송 중 보여주는 로딩
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        navigator.geolocation.getCurrentPosition(position => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // 사진/영상/음성 업로드인 경우 압축
          if (content.type !== 0 && content.file !== null) {
            const compressedFile = Compress(
              content.file,
              content.file.type,
              content.file.name,
            );

            console.log(compressedFile);
          }

          setLoading(false);

          // // 서버 통신, type에 따라 보내는 url 달라짐
          // setTimeout(() => {
          //   setLoading(false);
          // }, 3000);
        });
      }
    }
  }

  return (
    <div className="screen" ref={screenRef}>
      {loading ? <Loading /> : null}

      <div className="container">
        <MoveToBack path="/main" />

        <Carousel
          emojiNo={emojiNo}
          onSlideChange={setEmojiNo}
          setIsLongClicked={setIsLongClicked}
        />

        {isLongClicked ? (
          <div className="message-create-card">
            <EmojiGrid
              setEmojiNo={setEmojiNo}
              setIsLongClicked={setIsLongClicked}
            />
          </div>
        ) : (
          <div className="message-create-card">
            <input
              className="message-create-card-title"
              placeholder="제목을 입력하세요."
              maxLength={10}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />

            <Message content={content} setContent={setContent} />

            <div className="message-create-save-container">
              <CheckBox label="비공개" onClick={setIsShare} />
              <button className="btn" onClick={handleSubmit}>
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageCreate;
