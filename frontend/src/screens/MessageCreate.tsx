import {useLayoutEffect, useRef, useState} from 'react';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Message from '@messageCreate/Message';
import Loading from '@components/loading/Loading';
import MoveToBack from '@/components/common/MoveToBack';
import EmojiGrid from '@/components/messageCreate/EmojiGrid';
import CheckBox from '@/components/messageCreate/CheckBox';
import {useRecoilState} from 'recoil';
import {loadingState} from '../apis/Recoil';
import Toggle from '@/components/messageCreate/Toggle';
import axios from 'axios';

// 내용 타입 정의
export type Content = {
  type: number; // 0: text, 1: image, 2: video, 3: audio
  file: File | null; // create 경우에 사용
  fileURL: string; // text의 경우 내용, 나머지의 경우 경로
};

function MessageCreate() {
  // 모바일 가상 키보드 고려한 스크롤 이동

  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);
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

          console.log(emojiNo);
          console.log(title);
          console.log(content);
          console.log(location);
          console.log(isShare);

          // 서버 통신, type에 따라 보내는 url 달라짐
          const formData = new FormData();
          formData.append('emojiNo', emojiNo.toString());
          formData.append('title', title);
          formData.append('type', content.type.toString());
          formData.append('file', content.file as Blob);
          formData.append('content', content.fileURL);
          formData.append('lat', location.lat.toString());
          formData.append('lng', location.lng.toString());
          formData.append('status', isShare ? '0' : '1');

          axios({
            method: 'post',
            url: 'url',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('access_token'),
            },
          });

          setLoading(false);
        });
      }
    }
  }

  return (
    <div className="screen" ref={screenRef}>
      {loading ? <Loading /> : null}

      <MoveToBack path="/main" />
      <div className="container message-create-container">
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
                placeholder="제목을 입력하세요."
                maxLength={10}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />

              <Message content={content} setContent={setContent} />

              <div className="message-create-save-container">
                {/* <CheckBox label="비공개" onClick={setIsShare} /> */}
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
  );
}

export default MessageCreate;
