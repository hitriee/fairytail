import React, {useEffect, useState} from 'react';
import '@screens/MessageList.scss';
import balloon from '@images/balloon.png';
import MyMessage from '@messageList/MyMessage';
import items from '@screens/items.json';
import Iframe from 'react-iframe';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import MoveToBack from '@/components/common/MoveToBack';
import {main} from '@apis/router';
import InitMessage from '@/apis/notifications/foregroundMessaging';

function MessageList() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  return (
    <>
      {/* <Iframe
        className="BackgroundUnMove"
        url="Background.html"
        src="../background/Background.html"
        frameBorder={0}
      /> */}
      <InitMessage />
      <div className="messageList">
        <div className="navbarContainer">
          <MoveToBack path={main()} />
        </div>
        <div className="messageList-container">
          <div className="messageList-container-info">
            내 이야기
            {/* <img
              className="messageList-container-info-balloon"
              src={balloon}
              alt="balloon"
            /> */}
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
