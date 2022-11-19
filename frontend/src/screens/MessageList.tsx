import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import '@screens/MessageList.scss';
import MyMessage from '@messageList/MyMessage';
import MoveToBack from '@common/MoveToBack';
import {currentUser} from '@common/commonFunc';
import {main, notFound} from '@apis/router';
import {getMesssageList} from '@apis/messageList';

import filterImg from '@images/filter.svg';

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
  const navigate = useNavigate();

  const [messageItems, setMessageItems] = useState<items[]>([]);
  const [filterState, setFilterState] = useState(true);

  // 데이터 및 데이터 받아오기가 끝났는지 확인하기 위한 state
  const [isFinished, setIsFinished] = useState(-1);
  const [isSorted, setIsSorted] = useState(false);

  // 0: text, 1: img, 2:video, 3:audio
  const types = [0, 1, 2, 3];
  const userId = currentUser();

  useEffect(() => {
    if (userId !== -1) {
      types.forEach(type => {
        getMesssageList(type, userId)
          .then(res => {
            setMessageItems(prev => prev.concat(res.data));
            setIsFinished(prev => prev + 1);
          })
          .catch(err => {
            console.log(err);
          });
      });
    } else {
      navigate(notFound());
    }
  }, []);

  // messageList 최신순으로 정렬
  useEffect(() => {
    if (isFinished === 3 && messageItems.length > 0) {
      const copiedData = messageItems.slice();

      if (filterState) {
        const sortedData = copiedData.sort((a, b) =>
          a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
        );

        setMessageItems(() => sortedData);
      } else {
        const sortedData = copiedData.sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
        );

        setMessageItems(() => sortedData);
      }

      console.log(filterState);
      console.log(messageItems);

      setIsSorted(true);
    }
  }, [filterState, isFinished, messageItems]);

  return (
    <div className="messageList">
      <MoveToBack path={main()} />
      <div className="messageList-container">
        <div className="messageList-container-info">내 이야기</div>
        <div
          className="messageList-container-filter"
          onClick={() => setFilterState(prev => !prev)}>
          <img src={filterImg} alt="정렬" />
          <span>{filterState ? '최신순' : '오래된순'}</span>
        </div>

        <div className="messageList-container-list">
          {!isSorted ? (
            <div className="messageList-container-list-empty">
              잠시만 기다려주세요...
            </div>
          ) : null}

          {isSorted && messageItems.length > 0
            ? messageItems.map(messageItem => {
                return (
                  <MyMessage
                    key={`${messageItem.type}+${messageItem.postId}`}
                    messageItem={messageItem}
                  />
                );
              })
            : null}

          {isSorted && messageItems.length < 1 ? (
            <div className="messageList-container-list-empty"></div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MessageList;
