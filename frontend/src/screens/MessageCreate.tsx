import {useLayoutEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Message, {Content} from '@messageCreate/Message';
import Loading from '@components/loading/Loading';
import {ReactComponent as ArrowBack} from '@images/arrow-back-outline.svg';
import EmojiGrid from '@/components/messageCreate/EmojiGrid';
import CheckBox from '@/components/messageCreate/CheckBox';

function MessageCreate() {
  const navigate = useNavigate();

  const screenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const detectMobileKeybord = () => {
      if (document.activeElement?.tagName == 'INPUT') {
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
    type: 'string',
    file: null,
    fileURL: '',
  });
  const [isShare, setIsShare] = useState(false);

  function handleSubmit() {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // 제목이나 내용이 비어있는지 확인

        // 파일 압축

        // 서버 통신
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
    }
  }

  return (
    <div id="message-create" className="screen" ref={screenRef}>
      {loading ? <Loading /> : null}

      <div className="container">
        <div className="message-create-header">
          <ArrowBack
            onClick={() => navigate(-1)}
            color="white"
            className="icon-nav button"
          />
        </div>

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
