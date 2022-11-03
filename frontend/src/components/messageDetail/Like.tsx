import {useState} from 'react';
import {ReactComponent as HeartRegular} from '@images/heart.svg';
// import {ReactComponent as HeartSolid} from '@images/heart-solid.svg';
import {emojiArr} from '@emojis/index';
import '@messageDetail/Like.scss';

interface props {
  count: number;
  like: boolean;
  isMine: boolean;
  emoji: number;
}
function Like({count, like, isMine, emoji}: props) {
  const [myLike, setLike] = useState(like);
  const changeLike = () => {
    if (!isMine) {
      setLike(!myLike);
      console.log('백에 like 변경 요청?');
    }
  };
  return (
    <article className="etc">
      <p className="white count">{count}</p>
      {/* <img src={heart} alt="like" /> */}
      {isMine || myLike ? (
        <img src={emojiArr[62]} className="icon-like" onClick={changeLike} />
      ) : (
        <HeartRegular className="white icon-like" onClick={changeLike} />
      )}
      <img src={emojiArr[emoji]} alt="balloon" className="balloon" />
    </article>
  );
}

export default Like;
