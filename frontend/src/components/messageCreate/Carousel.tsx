import {useState, useEffect, Dispatch, SetStateAction, useRef} from 'react';
import 'swiper/css';
import './Carousel.scss';
import 'swiper/css/effect-coverflow';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {EffectCoverflow} from 'swiper';
import {debounce} from 'lodash';
import {emojiArr} from '../../assets/emojis';
import useLongPress from '@/apis/useLongPress';

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
        threshold: 0.1,
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

function Carousel({onSlideChange, setIsLongClicked, emojiNo}: CarouselProps) {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const longPress = useLongPress(() => setIsLongClicked(true), 500);

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 10);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  swiper && swiper.slideTo(emojiNo, 300);

  return (
    <Swiper
      mousewheel={true}
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
