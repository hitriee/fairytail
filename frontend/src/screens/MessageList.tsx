import {useEffect, useState} from 'react';
import '@screens/MessageList.scss';
import MyMessage from '@messageList/MyMessage';
import items from '@screens/items.json';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import MoveToBack from '@/components/common/MoveToBack';
import {main} from '@apis/router';
import InitMessage from '@/apis/notifications/foregroundMessaging';
import {getMesssageList} from '@apis/MessageList';

interface items {
  postId: number;
  date: string;
  emojiNo: number;
  likeCnt: number;
  status: number;
  title: string;
  type: number;
}

function MessageList() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  const [messageItems, setMessageItems] = useState<items[]>([]);

  // 0: text, 1: img, 2:video, 3:audio
  // const types = [0, 1, 2, 3];
  const types = [2];
  const userId = Number(localStorage.getItem('userId'));
  console.log('여기냐? 3');
  useEffect(() => {
    if (userId !== null) {
      console.log('여기냐? 1');

      types.forEach(type => {
        getMesssageList(type, userId).then(res => {
          // setMessageItems(oldArray => [...oldArray, res.data]);
          setMessageItems(prev => prev.concat(res.data));
        });
      });
    }
  }, []);

  // useEffect(() => {
  //   if (userId !== null) {
  //     types.forEach(type => {
  //       getMesssageList(type, userId).then(res => {

  //         setMessageItems(prev => prev.concat(res.data));
  //       });
  //     });
  //   }
  // }, []);

  useEffect(() => {
    // if (messageItems.length > 0) {
    //   messageItems.sort(messageItems[0].date);
    // }
    console.log('여기냐? 2');

    console.log(messageItems);
    // console.log(messageItems[0].postId);
  }, [messageItems]);

  // types.forEach();
  // if (userId !== null) {
  //   types.map(type => {
  //     setMessageItems(getMesssageList(type, userId)).then(res => res.data);
  //   });
  // }
  // types.forEach(getMesssageList);

  return (
    <>
      <InitMessage />
      <div className="messageList">
        <div className="navbarContainer">
          <MoveToBack path={main()} />
        </div>
        <div className="messageList-container">
          <div className="messageList-container-info">내 이야기</div>

          <div className="messageList-container-list">
            {messageItems.length === 0 && (
              <div className="leagueopen-empty">작성한 메세지가 없습니다.</div>
            )}
            {messageItems.length !== 0 &&
              messageItems.map(messageItem => {
                return (
                  <MyMessage
                    key={messageItem.postId}
                    messageItem={messageItem}
                  />
                );
              })}
          </div>

          {/* <div className="messageList-container-list">
            {items.length === 0 && (
              <div className="leagueopen-empty">작성한 메세지가 없습니다.</div>
            )}
            {items.length !== 0 &&
              items.map(item => {
                return <MyMessage key={item.id} item={item} />;
              })}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default MessageList;
