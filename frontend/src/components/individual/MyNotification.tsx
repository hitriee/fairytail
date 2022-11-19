// ** 각 알림당 설정
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';

import '@individual/MyNotification.scss';
import {item} from '@individual/notification';
import {smallEmojiArr} from '@emojis/index';
import {toMessageDetail} from '@apis/router';
import {returnFalse, returnTrue} from '../common/commonFunc';

interface itemProps {
  item: item;
  dragFlag: boolean;
  index?: number;
  deleteEach?: (index: number) => void;
}

function MyNotification({item, index, deleteEach, dragFlag}: itemProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const {postId, title, emojiNo, type} = item;
  const toDetail = (postId: number) => {
    return () => navigate(toMessageDetail(postId, type));
  };
  const shortTitle = () => {
    if (title.length > 6) {
      return `${title.slice(0, 6)}...`;
    } else {
      return title;
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragFlag) {
      const img = new Image();
      e.dataTransfer?.setDragImage(img, 0, 0);
      e.dataTransfer.effectAllowed = 'move';
      setIsGrabbing(returnTrue);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragFlag) {
      e.preventDefault();
      (ref.current as HTMLDivElement as HTMLDivElement).style.marginLeft = `${
        e.clientX * 0.4
      }px`;
    }
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragFlag) {
      e.preventDefault();
      setIsGrabbing(false);
      e.dataTransfer.dropEffect = 'move';
      const {current} = ref;
      if ((current.offsetLeft + current.offsetWidth) / 2 < e.clientX * 0.4) {
        setDeleted(returnTrue);
      } else {
        (ref.current as HTMLDivElement).style.marginLeft = `0`;
        setDeleted(returnFalse);
      }
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragFlag) {
      setIsGrabbing(returnTrue);
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragFlag) {
      (
        ref.current as HTMLDivElement
      ).style.marginLeft = `${e.changedTouches[0].clientX}px`;
    }
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragFlag) {
      setIsGrabbing(false);
      const {current} = ref;
      if (
        (current.offsetLeft + current.offsetWidth) / 2 <
        e.changedTouches[0].clientX
      ) {
        setDeleted(returnTrue);
      } else {
        (ref.current as HTMLDivElement).style.marginLeft = '0';
        setDeleted(returnFalse);
      }
    }
  };
  const dynamicClass = () => {
    let result = 'myNotification';
    if (isGrabbing) {
      result += ' grabbed';
    }
    if (deleted) {
      result += ' deleted';
    }
    return result;
  };
  useEffect(() => {
    if (deleted && deleteEach && index !== undefined) {
      deleteEach(index);
      setDeleted(returnFalse);
    }
  }, [deleted]);

  return (
    <div
      ref={ref}
      className={dynamicClass()}
      draggable={dragFlag}
      onClick={toDetail(postId)}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <img
        src={smallEmojiArr[emojiNo]}
        alt="emoji"
        className="myNotification-emoji"
      />
      <p className="myNotification-message">
        누군가 당신의 이야기 <br />
        <span className="myNotification-title">{shortTitle()}</span>을(를)
        좋아합니다.
      </p>
    </div>
  );
}

export default MyNotification;
