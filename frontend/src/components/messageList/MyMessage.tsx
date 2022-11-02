import React from 'react';
import {emojiArr} from '../../assets/emojis';
import './MyMessage.scss';

interface itemProps {
  item: {
    id: number;
    title: string;
    contents: string;
    emoji: number;
    like: number;
  };
}

function MyMessage({item}: itemProps) {
  return (
    <div className="myMessage">
      <div className="myMessage-emoji">
        <img src={emojiArr[item.emoji]} alt="emoji" />
      </div>
      <div className="myMessage-container">
        <p className="myMessage-container-title">{item.title}</p>
        <span className="myMessage-container-date">{item.contents}</span>
      </div>
      <div className="myMessage-container-like">
        <img src={emojiArr[62]} alt="emoji" />
        {item.like}
      </div>
    </div>
  );
}

export default MyMessage;
