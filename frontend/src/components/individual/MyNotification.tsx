import {emojiArrStatic} from 'src/assets/emojis';
import '@individual/MyNotifications.scss';

interface itemProps {
  item: {
    id: number;
    title: string;
    contents: string;
    emoji: number;
    like: number;
  };
}

function MyNotification({item}: itemProps) {
  return (
    <div className="myNotification">
      <div className="myNotification-emoji">
        <img src={emojiArrStatic[item.emoji]} alt="emojiArrStatic" />
      </div>
      <div className="myNotification-container">
        <p className="myNotification-container-title">
          익명의 작가가 당신의 이야기 <br />
          <span>{item.title.slice(0, 5)}...</span>을 좋아합니다
        </p>
        {/* <span className="myMessage-container-date">{item.contents}</span> */}
      </div>
    </div>
  );
}

export default MyNotification;
