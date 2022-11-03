import items from '@screens/items.json';
import MyNotification from '@/components/individual/MyNotification';

function Notifications() {
  return (
    <>
      <div className="individual-container">
        <div className="individual-container-list">
          {items.length === 0 && (
            <div className="leagueopen-empty">새 좋아요 알림이 없습니다</div>
          )}
          {items.length !== 0 &&
            items.map(item => {
              return <MyNotification key={item.id} item={item} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Notifications;
