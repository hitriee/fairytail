//** 좋아요, 이모지 관련

import React, {useEffect, useState, useRef} from 'react';
import {ReactComponent as HeartEmpty} from '@images/heartEmpty.svg';
import {ReactComponent as HeartFilled} from '@images/heartFilled.svg';
import {emojiArr} from '@emojis/index';
import '@messageDetail/Like.scss';
import {returnFalse, returnTrue} from '../common/commonFunc';
import {likeMessage} from '@apis/messageDetail/detailFunc';
import {dataType} from '@apis/messageDetail/detailInterface';

// props 유형
// interface LikeProps {
//   count: number;
//   like: boolean;
//   isMine: boolean;
//   emoji: number;
//   type: string;
//   writerId: number;
//   likeInfo: {
//     postId: number;
//     userId: number;
//   };
// }
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
    //   .then(
    //   (res: any) => {
    //     if (res.message === 'SUCCESS') {
    //       setLike(prev => !prev);
    //     }
    //   },
    // );
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

  // // props 데이터 갱신 (count, like)
  // useEffect(() => {
  //   setMessageCount(() => likeCnt);
  // }, [likeCnt]);

  // useEffect(() => {
  //   setLike(() => isLike);
  // }, [isLike]);

  return (
    <article className="like">
      <img src={emojiArr[emojiNo]} alt="풍선 이모지" className="like-balloon" />
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
