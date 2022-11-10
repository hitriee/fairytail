import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {emojiArr} from 'src/assets/emojis';
import '@individual/MyNotifications.scss';
import {useNavigate} from 'react-router';
import {toMessageDetail} from '@apis/router';

interface itemProps {
  item: {
    id: number;
    title: string;
    emoji: number;
  };
  index?: number;
  deleteEach?: (index: number) => void;
}

function MyNotification({item, index, deleteEach}: itemProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const navigate = useNavigate();
  const [originPos, setOriginPos] = useState({x: 0, y: 0});
  const [deleted, setDeleted] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const {id, title, emoji} = item;
  const toDetail = (postId: number) => {
    return () => navigate(toMessageDetail(postId));
  };
  const shortTitle = () => {
    if (title.length >= 5) {
      return `${title.slice(0, 7)}...`;
    } else {
      return title;
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const {current} = ref;
    const img = new Image();
    e.dataTransfer?.setDragImage(img, 0, 0);
    e.dataTransfer.effectAllowed = 'move';
    const originPosTemp = {x: current.offsetLeft, y: current.offsetTop};
    setOriginPos(() => originPosTemp);
    setIsGrabbing(true);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (ref.current as HTMLDivElement as HTMLDivElement).style.marginLeft = `${
      e.clientX * 0.4
    }px`;
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsGrabbing(false);
    e.dataTransfer.dropEffect = 'move';
    const {current} = ref;
    if ((current.offsetLeft + current.offsetWidth) / 2 < e.clientX * 0.4) {
      setDeleted(true);
      console.log(true);
      if (deleteEach && index) {
        deleteEach(index);
      }
    } else {
      (ref.current as HTMLDivElement).style.marginLeft = `0`;
      setDeleted(false);
      console.log(false);
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const {current} = ref;
    const originPosTemp = {x: current.offsetLeft, y: current.offsetTop};
    setOriginPos(() => originPosTemp);
    setIsGrabbing(true);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    (
      ref.current as HTMLDivElement
    ).style.marginLeft = `${e.changedTouches[0].clientX}px`;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsGrabbing(false);
    const {current} = ref;
    if (
      (current.offsetLeft + current.offsetWidth) / 2 <
      e.changedTouches[0].clientX
    ) {
      setDeleted(true);
      // console.log(true);
      if (deleteEach && index) {
        deleteEach(index);
      }
    } else {
      (ref.current as HTMLDivElement).style.marginLeft = '0';
      // console.log(false);
      setDeleted(false);
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
  // useEffect(() => {
  //   dynamicClass();
  // }, [isGrabbing, deleted]);

  return (
    <>
      <div
        ref={ref}
        className={dynamicClass()}
        draggable
        onClick={toDetail(id)}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <img
          src={emojiArr[emoji]}
          alt="emoji"
          className="myNotification-emoji"
        />
        <p>
          익명의 작가가 당신의 이야기 <br />
          <span className="myNotification-title">{shortTitle()}</span>을
          좋아합니다
        </p>
      </div>
    </>
  );
}

export default MyNotification;
