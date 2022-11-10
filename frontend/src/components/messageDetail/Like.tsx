import {useState} from 'react';
import {ReactComponent as HeartEmpty} from '@images/heartEmpty.svg';
import {ReactComponent as HeartFilled} from '@images/heartFilled.svg';
import {emojiArr} from '@emojis/index';
import '@messageDetail/Like.scss';

interface LikeProps {
  count: number;
  like: boolean;
  isMine: boolean;
  emoji: number;
}

function Like({count, like, isMine, emoji}: LikeProps) {
  // 현재 사용자가 좋아요 눌렀는지 여부
  const [myLike, setLike] = useState(like);

  const changeLike = () => {
    if (!isMine) {
      setLike(!myLike);
      console.log('백에 like 변경 요청?');
    }
  };

  return (
    <article className="like">
      <img src={emojiArr[emoji]} alt="풍선 이모지" className="like-balloon" />
      <div className="like-container">
        {isMine || myLike ? (
          <HeartFilled className="like-icon" onClick={changeLike} fill="red" />
        ) : (
          <HeartEmpty className="like-icon" onClick={changeLike} fill="white" />
        )}
        <p className="like-count">{count}</p>
      </div>
    </article>
  );
}

export default Like;
