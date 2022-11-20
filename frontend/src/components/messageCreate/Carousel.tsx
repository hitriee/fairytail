import 'swiper/css';
import 'swiper/css/effect-coverflow';
import SwiperCore, {EffectCoverflow} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useState, Dispatch, SetStateAction, useEffect} from 'react';

import '@messageCreate/Carousel.scss';
import {emojiArr} from '@emojis/index';
import useLongPress from '@apis/useLongPress';

type CarouselProps = {
  emojiNo: number;
  onSlideChange: Dispatch<SetStateAction<number>>;
  setIsLongClicked: Dispatch<SetStateAction<boolean>>;
};

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
            <img
              className="emoji"
              src={item}
              alt={`${index}번 이모지`}
              loading="lazy"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
