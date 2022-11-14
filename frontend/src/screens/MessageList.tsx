import '@screens/MessageList.scss';
import MyMessage from '@messageList/MyMessage';
import MoveToBack from '@/components/common/MoveToBack';
import {main} from '@apis/router';

function MessageList() {
  return (
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
          {/* {items.length === 0 && (
              <div className="leagueopen-empty">작성한 메세지가 없습니다.</div>
            )}
            {items.length !== 0 &&
              items.map(item => {
                return <MyMessage key={item.id} item={item} />;
              })} */}
        </div>
      </div>
    </div>
  );
}

export default MessageList;
