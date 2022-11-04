import {useState} from 'react';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Toggle from '@messageCreate/Toggle';
import Message, {Content} from '@messageCreate/Message';
import Loading from '@components/loading/Loading';
import NavBar from '@components/common/NavBar';

function MessageCreate() {
  const [loading, setLoading] = useState(false);

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

        console.log(emojiNo);
        console.log(content);
        console.log(isShare);
        console.log(location);

        // 서버 통신
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
    }
  }

  return (
    <div className="screen">
      {loading ? <Loading /> : null}

      <div className="container" style={{backgroundColor: 'black'}}>
        <div className="message-create-header">
          <NavBar />
        </div>

        <Carousel onSlideChange={setEmojiNo} />

        <div className="message-create-card">
          <Message mode="create" content={content} setContent={setContent} />

          <div className="message-create-save-container">
            <Toggle label="✨ 공개 여부" onClick={setIsShare} />
            <button className="btn" onClick={handleSubmit}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCreate;
