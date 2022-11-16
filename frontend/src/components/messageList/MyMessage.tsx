import React from 'react';
import {useNavigate} from 'react-router-dom';
import {smallEmojiArr} from '../../assets/emojis';
import {ReactComponent as Heart} from '@images/heartFilled.svg';
import './MyMessage.scss';
import {messageUrl} from '@/apis/messageList';

interface messageProps {
  messageItem: {
    postId: number;
    date: string;
    emojiNo: number;
    likeCnt: number;
    status: number;
    title: string;
    type: number;
  };
}

function MyMessage({messageItem}: messageProps) {
  const navigate = useNavigate();

  function moveMessage() {
    navigate(messageUrl(messageItem.type, messageItem.postId));
  }
  return (
    <>
      <div className="myMessage" onClick={() => moveMessage()}>
        <div className="myMessage-emoji">
          <img src={smallEmojiArr[messageItem.emojiNo]} alt="smallEmojiArr" />
        </div>
        <div className="myMessage-container">
          <p className="myMessage-container-title">{messageItem.title}</p>
          <span className="myMessage-container-date">{messageItem.date}</span>
        </div>
        <div className="myMessage-container-like">
          <Heart className="myMessage-container-like-heart" />
          {messageItem.likeCnt}
        </div>
      </div>
    </>
  );
}

export default MyMessage;
