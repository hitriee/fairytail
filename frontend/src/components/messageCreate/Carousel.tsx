import 'swiper/css';
import 'swiper/css/effect-coverflow';
import SwiperCore, {EffectCoverflow} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useState, Dispatch, SetStateAction, useEffect, useRef} from 'react';

import '@messageCreate/Carousel.scss';
import {emojiArr} from '@emojis/index';
import useLongPress from '@apis/useLongPress';

type CarouselProps = {
  emojiNo: number;
  onSlideChange: Dispatch<SetStateAction<number>>;
  setIsLongClicked: Dispatch<SetStateAction<boolean>>;
};

type CaroueslImageProps = {
  item: string;
  index: number;
};

function CarouselImage({item, index}: CaroueslImageProps) {
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
        threshold: 0.01,
      });
    }

    imageRef.current && observerRef.current.observe(imageRef.current);
  });

  return (
    <img
      ref={imageRef}
      className="emoji"
      src={isLoaded ? item : ''}
      alt={`${index}번 이모지`}
    />
  );
}

// 캐러셀
function Carousel({onSlideChange, setIsLongClicked, emojiNo}: CarouselProps) {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const longPress = useLongPress(() => setIsLongClicked(true), 500);

  // emojiNo가 변하면 캐러셀 중심도 이동
  useEffect(() => {
    swiper && swiper.slideTo(emojiNo, 0);
  }, [emojiNo]);

  return (
    <Swiper
      onSwiper={setSwiper}
      touchStartPreventDefault={false}
      initialSlide={Math.floor(Math.random() * 76)}
      slideToClickedSlide={true}
      effect={'coverflow'}
      slidesPerView={2}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
      onSlideChange={swiper => onSlideChange(swiper.realIndex)}>
      {emojiArr.map((item, index) => {
        return (
          <SwiperSlide key={index} {...longPress}>
            <CarouselImage item={item} index={index} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
