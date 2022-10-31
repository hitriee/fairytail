import {useState} from 'react';
import {IoHeartOutline} from 'react-icons/io5';
import {IoHeartSharp} from 'react-icons/io5';
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
        <IoHeartOutline className="white icon-medium" onClick={changeLike} />
      ) : (
        <IoHeartSharp className="red icon-medium" onClick={changeLike} />
      )}
      <img src={emojiArr[emoji]} alt="skull" className="ballon" />
    </article>
  );
}

export default Like;
