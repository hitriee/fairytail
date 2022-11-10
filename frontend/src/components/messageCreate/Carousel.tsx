import {useState, Dispatch, SetStateAction, useEffect} from 'react';
import 'swiper/css';
import './Carousel.scss';
import 'swiper/css/effect-coverflow';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {EffectCoverflow} from 'swiper';
import {emojiArr} from '../../assets/emojis';
import useLongPress from '@/apis/useLongPress';

type CarouselProps = {
  emojiNo: number;
  onSlideChange: Dispatch<SetStateAction<number>>;
  setIsLongClicked: Dispatch<SetStateAction<boolean>>;
};

function Carousel({onSlideChange, setIsLongClicked, emojiNo}: CarouselProps) {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const longPress = useLongPress(() => setIsLongClicked(true), 500);

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
            <img className="emoji" src={item} alt={`${index}번 이모지`} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
