import {useState} from 'react';
import items from '@screens/items.json';
import MyNotification from '@/components/individual/MyNotification';
import '@screens/Individual.scss';

function Notifications() {
  const [newItems, setNewItems] = useState<any[]>(items);
  const [isEmpty, setIsEmpty] = useState(false);
  const deleteEach = (index: number) => {
    // 임시
    setNewItems(() => newItems.filter((element, i) => i !== index));
    // 백에 삭제 요청 (id 필요)
  };
  const deleteAll = () => {
    setNewItems(() => []);
    setIsEmpty(true);
    console.log('하나씩 사라지는 효과가 필요할까....');
    console.log('백에 신호 보내기');
  };

  return (
    <>
      <p className="delete" onClick={deleteAll}>
        전체 삭제
      </p>
      <div className="individual-container">
        <div className="individual-container-list">
          {newItems.length === 0 ? (
            <div className="white">새 좋아요 알림이 없습니다</div>
          ) : (
            newItems.map((item, index) => {
              return (
                <MyNotification
                  item={item}
                  key={item.id}
                  deleteEach={deleteEach}
                  index={index}
                  isEmpty={isEmpty}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Notifications;
