import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '@screens/MessageList.scss';
import MyMessage from '@messageList/MyMessage';
import MoveToBack from '@common/MoveToBack';
import {main, notFound} from '@apis/router';
import {getMesssageList} from '@/apis/messageList';
import {currentUser} from '@/components/common/commonFunc';
import {ReactComponent as Filter} from '@images/filter.svg';

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
  const [filterState, setFilterState] = useState(true);

  // 데이터 및 데이터 받아오기가 끝났는지 확인하기 위한 state
  const [isFinished, setIsFinished] = useState(-1);

  // const location = useLocation();
  const navigate = useNavigate();

  // 0: text, 1: img, 2:video, 3:audio
  const types = [0, 1, 2, 3];
  const userId = currentUser();

  const handleFilter = () => {
    console.log('정렬 변경');
    setFilterState(prev => !prev);
  };

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
    // if (messageItems && messageItems?.length > 0) {
    //   console.log(messageItems[0].date);
    // }
  }, []);

  // messageList 최신순으로 정렬
  useEffect(() => {
    console.log(messageItems);
    if (isFinished === 3 && messageItems.length > 0) {
      if (filterState) {
        messageItems.sort((a, b) =>
          a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
        );
      } else {
        messageItems?.sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
        );
      }
    }

    // if (filterState && messageItems.length > 0) {
    //   messageItems.sort((a, b) =>
    //     a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    //   );
    // } else if (!filterState && messageItems.length > 0) {
    //   messageItems?.sort((a, b) =>
    //     a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
    //   );
    // }

    // if (messageItems && messageItems.length > 0) {
    //   messageItems.sort((a, b) =>
    //     a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    //   );
    // } else {
    //   messageItems?.sort((a, b) =>
    //     a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
    //   );
    // }
  }, [filterState, isFinished]);

  return (
    <>
      {messageItems ? (
        <div className="messageList">
          <MoveToBack path={main()} />
          {/* <div className="navbarContainer">
        </div> */}
          <div className="messageList-container">
            <div className="messageList-container-info">내 이야기</div>
            <div
              className="messageList-container-filter"
              onClick={() => handleFilter()}>
              <Filter viewBox="0 0 80 80" fill="white" />
            </div>

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
      ) : null}
    </>
  );
}

export default MessageList;
