import {useState} from 'react';
import {Link} from 'react-router-dom';
import '@screens/MessageCreate.scss';
import Carousel from '@messageCreate/Carousel';
import Toggle from '@messageCreate/Toggle';
import Message, {Content} from '@messageCreate/Message';
import useGeolocation from '@apis/useGeolocation';
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
        {/* <div className="header"> */}
        {/* <Link to="/main"> */}
        <NavBar />
        {/* </Link> */}
        {/* </div> */}

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
