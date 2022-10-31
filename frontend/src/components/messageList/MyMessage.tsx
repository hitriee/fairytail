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
  console.log(item.emoji);
  return (
    <div className="myMessage">
      <div className="myMessage-emoji">
        <img src={emojiArr[item.emoji]} alt="emoji" />
      </div>
      <div className="myMessage-container">
        <p>{item.id}</p>
        <p>{item.title}</p>
        <p>{item.contents}</p>
        <p>{item.like}</p>
      </div>
    </div>
  );
}

export default MyMessage;
