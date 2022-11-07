import {useLayoutEffect, useRef, useState} from 'react';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Message, {Content} from '@messageCreate/Message';
import Loading from '@components/loading/Loading';
import MoveToBack from '@/components/common/MoveToBack';
import EmojiGrid from '@/components/messageCreate/EmojiGrid';
import CheckBox from '@/components/messageCreate/CheckBox';
import Compress from '@/components/messageCreate/Compress';

function MessageCreate() {
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

  const [loading, setLoading] = useState(false);

  const [isLongClicked, setIsLongClicked] = useState(false);

  const [emojiNo, setEmojiNo] = useState(0);
  const [content, setContent] = useState<Content>({
    title: '',
    type: 0,
    file: null,
    fileURL: '',
  });
  const [isShare, setIsShare] = useState(false);

  function handleSubmit() {
    // 제목이나 내용이 비어있는지 확인
    if (content.title.trim() === '') {
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
            <Message mode="create" content={content} setContent={setContent} />

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
