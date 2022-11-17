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
    console.log('메세지 리스트 불러오기');
  }, [location.pathname]);

  // messageList 저장 확인
  useEffect(() => {
    console.log(messageItems);
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
