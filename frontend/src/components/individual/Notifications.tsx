import React, {useEffect, useRef, useState} from 'react';
import items from '@screens/items.json';
import MyNotification from '@/components/individual/MyNotification';
import '@screens/Individual.scss';

function Notifications() {
  const [newItems, setNewItems] = useState<any[]>(items);
  const deleteEach = (index: number) => {
    return () =>
      setNewItems(() => newItems.filter((element, i) => i !== index));
  };
  const deleteAll = () => {
    setNewItems(() => []);
    console.log('하나씩 사라지는 효과');
    console.log('백에 신호 보내기');
  };
  const moveMessage = (id: number, index: number) => {
    deleteEach(index);
    // 백에 삭제 요청
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  };
  const onClick = (e: any) => {
    console.log(e);
  };

  // drag
  // const ref = useRef(null!);
  // const dragComponent = useRef(null!);

  // const getElementIndex = ()
  // const setDragItemId = {
  //   grabItem: (index: number) => {
  //     clcikElId
  //   }
  // }
  // const onDragStart = (e: React.DragEvent<HTMLElement>, index: number) => {
  //   e.dataTransfer.effectAllowed = 'move'
  //   setDragItemId.grabItem(index)
  // };
  // const onDragEnter = (e: React.DragEvent<HTMLElement>, index: number) => {
  //   setDragItemId.interSectItem(index)
  // }

  return (
    <>
      {/* <div className="delete-parent"> */}
      <p className="delete" onClick={deleteAll} draggable>
        전체 삭제
      </p>
      {/* </div> */}
      {/* <div ref={dragPreview} style={{opacity: isDragging ? 0.5 : 1}}>
        <div role="Handle" ref={drag} />
      </div>
      <div
        ref={drop}
        role={'Dustbin'}
        style={{backgroundColor: isOver ? 'red' : 'white'}}>
        {canDrop ? 'Release to drop' : 'Drag a box here'}
      </div> */}
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
                  // onDragEnd={(e) => dragEndHandler(e)}
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

// https://channel.io/ko/blog/react-dnd-tips-tricks

// const ITEM_TYPE = 'SOME_COMPONENT'

// export default function SomeComponent({ index, move }) {
//   const [{ isDragging }, drag] = useDrag({
//     // monitor.getItem() 의 내용으로 들어갈 값을 정의합니다.
//     // type 값은 무조건 설정되어 있어야 합니다. (useDrop의 accept와 일치시켜야 함)
//     item: { type: ITEM_TYPE, index },

//     // Return array의 첫번째 값에 들어갈 객체를 정의합니다.
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),

//     // 드래그가 완전히 끝났을때 실행됩니다. 보통 여기에서 Redux dispatch를 많이 실행시킵니다.
//     end: (item) => {
//       console.log(`${index} should move to ${item.index}`)
//     },
//   })

//   const [, drop] = useDrop({
//     accept: ITEM_TYPE,
//     hover: (item) => {
//       if (item.index === index) {
//         return null
//       }

//       move(item.index, index)

//       item.index = index // item is mutable
//     },
//   })

//   return (
//     <div ref={node => drag(drop(node))} />
//   )
// }
