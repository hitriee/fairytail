import {useState} from 'react';
import items from '@screens/items.json';
import MyNotification from '@/components/individual/MyNotification';
import '@individual/Notifications.scss';

interface item {
  id: number;
  title: string;
  emoji: number;
}
function Notifications() {
  const [newItems, setNewItems] = useState<item[]>(items);
  const deleteEach = (index: number) => {
    // 임시
    setNewItems(() => newItems.filter((element, i) => i !== index));
    // 백에 삭제 요청 (id 필요)
  };
  const deleteAll = () => {
    setNewItems(() => []);
    console.log('하나씩 사라지는 효과가 필요할까....');
    console.log('백에 신호 보내기');
  };

  return (
    <div className="notifications">
      <p className="notifications-delete-all" onClick={deleteAll} draggable>
        전체 삭제
      </p>
      {/* <div ref={dragPreview} style={{opacity: isDragging ? 0.5 : 1}}>
        <div role="Handle" ref={drag} />
      </div>
      <div
        ref={drop}
        role={'Dustbin'}
        style={{backgroundColor: isOver ? 'red' : 'white'}}>
        {canDrop ? 'Release to drop' : 'Drag a box here'}
      </div> */}
      {newItems.length === 0 ? (
        <div className="notifications-empty">새로운 알림이 없습니다.</div>
      ) : (
        <div className="notifications-list">
          {newItems.map((item, index) => {
            return (
              <MyNotification
                item={item}
                key={item.id}
                deleteEach={deleteEach}
                index={index}
                // onDragEnd={(e) => dragEndHandler(e)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;
