import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {emojiArr} from 'src/assets/emojis';
import '@individual/MyNotifications.scss';
import {useNavigate} from 'react-router';
import {moveMessagePortToContext} from 'worker_threads';
import {returnFalse, returnTrue} from '@common/commonFunc';

interface itemProps {
  item: {
    id: number;
    title: string;
    emoji: number;
  };
  index: number;
  deleteEach: (index: number) => void;
}

function MyNotification({item, index, deleteEach}: itemProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const navigate = useNavigate();
  const [originPos, setOriginPos] = useState({x: 0, y: 0});
  // const [clientPos, setClientPos] = useState({x: 0, y: 0});
  // const [deleted, setDeleted] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const {id, title, emoji} = item;
  const toDetail = (postId: number) => {
    return () => navigate(`/message/detail/${postId}`);
  };
  const shortTitle = () => {
    if (title.length >= 5) {
      return `${title.slice(0, 7)}...`;
    } else {
      return title;
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const img = new Image();
    e.dataTransfer?.setDragImage(img, 0, 0);
    e.dataTransfer.effectAllowed = 'move'; // 크롬의그린 +아이콘 제거
    const originPosTemp = {...originPos};
    originPosTemp['x'] = target.offsetLeft;
    originPosTemp['y'] = target.offsetTop;
    setOriginPos(originPosTemp); //드래그 시작할때 드래그 전 위치값을 저장

    // const clientPosTemp = {...clientPos};
    // clientPosTemp['x'] = target.offsetLeft;
    // clientPosTemp['y'] = target.offsetTop;
    // setClientPos(clientPosTemp);

    setIsGrabbing(true);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).style.marginLeft = `${e.clientX * 0.3}px`;
    console.log(e.clientX);
    // const clientPosTemp = {...clientPos};
    // clientPosTemp['x'] = e.clientX;
    // clientPosTemp['y'] = e.clientY;
    // setClientPos(clientPosTemp);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsGrabbing(false);
    e.dataTransfer.dropEffect = 'move';
    const target = e.target as HTMLDivElement;

    if (target.offsetWidth / 2 < e.clientX * 0.3) {
      console.log(true);
      // setDeleted(true);
      deleteEach(index);
    } else {
      (e.target as HTMLDivElement).style.marginLeft = `0px`;
      console.log(false);
      // setDeleted(false);
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const {current} = ref;
    const originPosTemp = {...originPos};
    originPosTemp['x'] = current.offsetLeft;
    originPosTemp['y'] = current.offsetTop;
    setOriginPos(originPosTemp);
    console.dir(current);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const {current} = ref;
    e.preventDefault();
    (ref.current as HTMLDivElement).style.marginLeft = `${
      current.clientLeft * 0.3
    }px`;
    console.log(current.clientLeft);

    console.log('touch move');
    console.log(e);
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('touch end');
    console.log(e);
  };

  return (
    <>
      <div
        ref={ref}
        className={isGrabbing ? 'myNotification grabbed' : 'myNotification'}
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
