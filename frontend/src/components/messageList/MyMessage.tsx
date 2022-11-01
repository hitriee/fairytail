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
        {/* <p className="myMessage-container-id">{item.id}</p> */}
        <p className="myMessage-container-title">{item.title}</p>
        <span className="myMessage-container-contents">{item.contents}</span>
        <span className="myMessage-container-like">
          <img src={emojiArr[62]} alt="emoji" />
          {item.like}
        </span>
      </div>
    </div>
  );
}

export default MyMessage;
