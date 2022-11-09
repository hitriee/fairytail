import React from 'react';
import {smallEmojiArr} from '../../assets/emojis';
import {ReactComponent as Heart} from '@images/heartFilled.svg';
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
        <img src={smallEmojiArr[item.emoji]} alt="smallEmojiArr" />
      </div>
      <div className="myMessage-container">
        <p className="myMessage-container-title">{item.title}</p>
        <span className="myMessage-container-date">{item.contents}</span>
      </div>
      <div className="myMessage-container-like">
        {/* <img src={Heart} alt="emoji" /> */}
        <Heart className="myMessage-container-like-heart" />
        {item.like}
      </div>
    </div>
  );
}

export default MyMessage;
