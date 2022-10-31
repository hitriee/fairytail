import React, {useEffect, useState} from 'react';
import './MessageList.scss';
import balloon from '../assets/images/balloon.gif';
import MyMessage from '../components/messageList/MyMessage';
import items from './items.json';

function MessageList() {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems({data});
  // }, []);
  return (
    <div id="messageList">
      <div className="container">
        <div className="container-info">
          <img className="container-info-balloon" src={balloon} alt="balloon" />
        </div>
        <div className="container-list">
          {items.length === 0 && (
            <div className="leagueopen-empty">작성한 메세지가 없습니다.</div>
          )}
          {items.length !== 0 &&
            items.map(item => {
              return <MyMessage key={item.id} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default MessageList;
