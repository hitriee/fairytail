import {emojiArr} from 'src/assets/emojis';
import '@individual/MyNotifications.scss';
import {useNavigate} from 'react-router';

interface itemProps {
  item: {
    id: number;
    title: string;
    emoji: number;
  };
}

function MyNotification({item}: itemProps) {
  const navigate = useNavigate();
  const {id, title, emoji} = item;
  const toDetail = (postId: number) => {
    return () => navigate(`/message/detail/${postId}`);
  };
  const shortTitle = () => {
    if (title.length >= 5) {
      return `${title.slice(0, 7)}...`;
    } else {
      return title;
    }
  };
  return (
    <div className="myNotification" onClick={toDetail(id)}>
      <img src={emojiArr[emoji]} alt="emoji" className="myNotification-emoji" />
      <p>
        익명의 작가가 당신의 이야기 <br />
        <span className="myNotification-title">{shortTitle()}</span>을
        좋아합니다
      </p>
    </div>
  );
}

export default MyNotification;
