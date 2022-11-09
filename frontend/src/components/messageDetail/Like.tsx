import {useState} from 'react';
import {ReactComponent as HeartRegular} from '@images/heart-regular.svg';
import {ReactComponent as HeartSolid} from '@images/heart-solid.svg';
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
      <div className="like-container">
        {isMine || myLike ? (
          <HeartSolid className="like-icon" onClick={changeLike} fill="red" />
        ) : (
          <HeartRegular
            className="like-icon"
            onClick={changeLike}
            fill="white"
          />
        )}
        <p className="like-count">{count}</p>
      </div>
      <img src={emojiArr[emoji]} alt="풍선 이모지" className="like-balloon" />
    </article>
  );
}

export default Like;
