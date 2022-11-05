import {smallEmojiArr} from '@/assets/emojis';
import './EmojiGrid.scss';
import {useRef, useState, useEffect, Dispatch, SetStateAction} from 'react';

type EmojiGridProps = {
  setEmojiNo: Dispatch<SetStateAction<number>>;
  setIsLongClicked: Dispatch<SetStateAction<boolean>>;
};

type EmojiGridItemProps = EmojiGridProps & {
  item: string;
  index: number;
};

function EmojiGridItem({
  item,
  index,
  setEmojiNo,
  setIsLongClicked,
}: EmojiGridItemProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [isLoaded, setIsLoaded] = useState(false);

  function onIntersection(
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoaded(true);
      }
    });
  }

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection, {
        threshold: 0.1,
      });
    }

    imageRef.current && observerRef.current.observe(imageRef.current);
  });

  return (
    <img
      ref={imageRef}
      className="emojigrid-item"
      src={isLoaded ? item : ''}
      alt={`${index}번 이모지`}
      onClick={() => {
        setEmojiNo(index);
        setIsLongClicked(false);
      }}
    />
  );
}

function EmojiGrid({setEmojiNo, setIsLongClicked}: EmojiGridProps) {
  const emojiGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (
        emojiGridRef.current &&
        !emojiGridRef.current.contains(target as Node)
      ) {
        setIsLongClicked(false);
      }
    });
  });

  return (
    <div ref={emojiGridRef} className="emojigrid">
      {smallEmojiArr.map((item, index) => {
        return (
          <EmojiGridItem
            key={index}
            item={item}
            index={index}
            setEmojiNo={setEmojiNo}
            setIsLongClicked={setIsLongClicked}
          />
        );
      })}
    </div>
  );
}

export default EmojiGrid;
