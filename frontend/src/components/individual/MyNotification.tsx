import React, {useRef, useState} from 'react';
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
  deleteEach: (index: number) => () => void;
  // onDragStart: (e: any) => void;
  // onDrag: (e: any) => void;
  // onDragOver: (e: any) => void;
  // onDragStart: (e: any) => (e: any) => void
}

function MyNotification({item, index, deleteEach}: itemProps) {
  const navigate = useNavigate();
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
  // dnd
  const [grab, setGrab] = useState<any>(null!);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
    e.dataTransfer.setData('index', String(index));
  };

  return (
    <div
      className="myNotification"
      draggable
      onClick={toDetail(id)}
      onDragStart={handleDragStart}>
      <img src={emojiArr[emoji]} alt="emoji" className="myNotification-emoji" />
      <p className="myNotification-message">
        익명의 작가가 당신의 이야기 <br />
        <span className="myNotification-title">{shortTitle()}</span>을
        좋아합니다.
      </p>
    </div>
  );
}

export default MyNotification;
