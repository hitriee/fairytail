import React from 'react';
import {useNavigate} from 'react-router-dom';
import {smallEmojiArr} from '../../assets/emojis';
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
  const date = messageItem.date.split('T')[0];

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
          <span className="myMessage-container-date">{date}</span>
        </div>
        {messageItem.likeCnt ? (
          <div className="myMessage-container-like">
            <img
              alt="emoji"
              src={smallEmojiArr[5]}
              className="myMessage-container-like-heart"
            />
            {messageItem.likeCnt}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default MyMessage;
