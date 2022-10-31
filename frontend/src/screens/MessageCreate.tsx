import {useState} from 'react';
import {Link} from 'react-router-dom';
import './MessageCreate.scss';
import Carousel from '../components/messageCreate/Carousel';
import Toggle from '../components/messageCreate/Toggle';
import {HiArrowLeft} from 'react-icons/hi2';
import Message, {Content} from '../components/messageCreate/Message';
import useGeolocation from '../apis/useGeolocation';
import Loading from '../components/loading/Loading';

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

  function useSubmit() {
    const location = useGeolocation();

    setLoading(true);

    // 서버 통신
    const timer = setTimeout(() => {
      console.log('3초 정지');
      // setLoading(false);
    }, 3000);

    console.log(emojiNo);
    console.log(content);
    console.log(isShare);
    console.log(location);
  }

  return (
    <div className="screen">
      {loading ? <Loading /> : null}

      <div className="container">
        <div className="header">
          <Link to="/main">
            <HiArrowLeft size="4vh" color="white" />
          </Link>
        </div>

        <Carousel onSlideChange={setEmojiNo} />

        <div className="card">
          <Message mode="create" content={content} setContent={setContent} />

          <div className="save-container">
            <Toggle label="✨ 공개 여부" onClick={setIsShare} />
            <button className="btn" onClick={useSubmit}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCreate;
