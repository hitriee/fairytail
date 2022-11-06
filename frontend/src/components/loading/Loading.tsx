import './Loading.scss';
import {emojiArr} from '@/assets/emojis';

function Loading() {
  return (
    <div className="loading-background">
      <img className="loading-image" src={emojiArr[0]} alt="로딩 이미지" />
      <p className="loading-message">~이동 중~</p>
    </div>
  );
}

export default Loading;
