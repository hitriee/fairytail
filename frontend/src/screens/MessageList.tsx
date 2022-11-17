import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import '@screens/MessageList.scss';
import MyMessage from '@messageList/MyMessage';
import MoveToBack from '@common/MoveToBack';
import {main} from '@apis/router';
import {getMesssageList} from '@/apis/messageList';

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
  const [messageItems, setMessageItems] = useState<items[]>([]);
  const location = useLocation();

  // 0: text, 1: img, 2:video, 3:audio
  const types = [0, 1, 2, 3];
  const userId = Number(localStorage.getItem('userId'));
  useEffect(() => {
    if (userId !== null) {
      types.forEach(type => {
        getMesssageList(type, userId)
          .then(res => {
            setMessageItems(prev => prev.concat(res.data));
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
    // messageItems.sort((a: items, b: items): string => {
    //   return b.date - a.date;
    // });
    if (messageItems.length > 0) {
      console.log(messageItems[0].date);
    }
  }, [location.pathname]);

  // messageList 최신순으로 정렬
  useEffect(() => {
    if (messageItems.length > 0) {
      messageItems.sort((a, b) =>
        a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
      );
    }
  }, [messageItems]);

  return (
    <div className="messageList">
      <MoveToBack path={main()} />
      {/* <div className="navbarContainer">
      </div> */}
      <div className="messageList-container">
        <div className="messageList-container-info">내 이야기</div>

        <div className="messageList-container-list">
          {messageItems.length === 0 && (
            <div className="messageList-container-list-empty">
              작성한 메세지가 없습니다.
            </div>
          )}
          {messageItems.length !== 0 &&
            messageItems.map(messageItem => {
              return (
                <MyMessage
                  key={`${messageItem.type}+${messageItem.postId}`}
                  messageItem={messageItem}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MessageList;
