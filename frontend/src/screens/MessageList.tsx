import React, {useEffect, useState} from 'react';
import './MessageList.scss';
import balloon from '../assets/images/balloon.gif';
import MyMessage from '../components/messageList/MyMessage';
import items from './items.json';
import Iframe from 'react-iframe';

function MessageList() {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems({data});
  // }, []);
  return (
    <>
      <Iframe
        className="messageBackground"
        url="Background.html"
        src="../background/Background.html"
        frameBorder={0}
      />
      <div className="messageList">
        <div className="messageList-container">
          <div className="messageList-container-info">
            <img
              className="messageList-container-info-balloon"
              src={balloon}
              alt="balloon"
            />
          </div>
          <div className="messageList-container-list">
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
    </>
  );
}

export default MessageList;
