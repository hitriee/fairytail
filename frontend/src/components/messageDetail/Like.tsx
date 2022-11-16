//** 좋아요, 이모지 관련

import React, {useEffect, useState, useRef} from 'react';
import {ReactComponent as HeartEmpty} from '@images/heartEmpty.svg';
import {ReactComponent as HeartFilled} from '@images/heartFilled.svg';
import {emojiArr} from '@emojis/index';
import '@messageDetail/Like.scss';
import {returnFalse, returnTrue} from '../common/commonFunc';
import {likeMessage} from '@/apis/messageDetail/detailFunc';

// props 유형
interface LikeProps {
  count: number;
  like: boolean;
  isMine: boolean;
  emoji: number;
  type: string;
  writerId: number;
  likeInfo: {
    postId: number;
    userId: number;
  };
}

function Like({
  count,
  like,
  isMine,
  emoji,
  type,
  writerId,
  likeInfo,
}: LikeProps) {
  // 현재 사용자가 좋아요 눌렀는지 여부
  const [myLike, setLike] = useState(like);
  // 사용자에게 보여줄 좋아요 수
  const [messageCount, setMessageCount] = useState(count);

  // 좋아요 수, 좋아요 여부 변경
  const changeLike = () => {
    if (myLike) {
      setMessageCount(prev => prev - 1);
    } else {
      setMessageCount(prev => prev + 1);
    }
    setLike(() => !myLike);
  };

  // props 데이터 갱신 (count, like)
  useEffect(() => {
    setMessageCount(count);
  }, [count]);

  useEffect(() => {
    setLike(() => like);
  }, [like]);

  useEffect(() => {
    likeMessage(type, {isLike: myLike, ...likeInfo});
  }, [myLike]);

  return (
    <article className="like">
      <img src={emojiArr[emoji]} alt="풍선 이모지" className="like-balloon" />
      <div className="like-container">
        {myLike ? (
          <HeartFilled className="like-icon" onClick={changeLike} fill="red" />
        ) : (
          <HeartEmpty className="like-icon" onClick={changeLike} fill="white" />
        )}
        <p className="like-count">{messageCount}</p>
      </div>
    </article>
  );
}

export default Like;
