import React, {useEffect, useState} from 'react';
import '@screens/MessageList.scss';
import balloon from '@images/balloon.png';
import MyMessage from '@messageList/MyMessage';
import items from '@screens/items.json';
import Iframe from 'react-iframe';
import NavBar from '@common/NavBar';

function MessageList() {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems({data});
  // }, []);
  return (
    <>
      <Iframe
        className="BackgroundUnMove"
        url="BackgroundUnMove.html"
        src="../background/BackgroundUnMove.html"
        frameBorder={0}
      />
      <div className="messageList">
        <NavBar />
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
