//** 좋아요, 이모지 관련

import React, {useEffect, useState, useRef} from 'react';
import {emojiArr, smallEmojiArr} from '@emojis/index';
import '@messageDetail/Like.scss';
import {likeMessage} from '@apis/messageDetail/detailFunc';
import {dataType} from '@apis/messageDetail/detailInterface';
interface LikeProps {
  data: dataType;
  type: string;
  userId: number;
}

function Like({type, userId, data}: LikeProps) {
  const {isLike, likeCnt, postId, emojiNo} = data;
  // 현재 사용자가 좋아요 눌렀는지 여부
  const [myLike, setLike] = useState(isLike);
  // 사용자에게 보여줄 좋아요 수
  const [messageCount, setMessageCount] = useState(likeCnt);

  // 좋아요 수, 좋아요 여부 변경
  const sendChangeSignal = () => {
    likeMessage(type, {writerId: data.userId, postId, userId});
  };

  const changeLike = () => {
    if (myLike) {
      setMessageCount(prev => prev - 1);
    } else {
      setMessageCount(prev => prev + 1);
    }
    setLike(prev => !prev);
    sendChangeSignal();
  };

  return (
    <article className="like">
      <div className="like-container">
        {myLike ? (
          <img src={emojiArr[5]} className="like-icon" onClick={changeLike} />
        ) : (
          <img
            src={smallEmojiArr[11]}
            className="like-icon like-icon-stable"
            onClick={changeLike}
          />
        )}
        <p className="like-count">{messageCount}</p>
        <img
          src={emojiArr[emojiNo]}
          alt="풍선 이모지"
          className="like-balloon"
        />
      </div>
    </article>
  );
}

export default Like;
