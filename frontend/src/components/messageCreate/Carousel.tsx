import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import 'swiper/css';
import './Carousel.scss';
import 'swiper/css/effect-coverflow';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow} from 'swiper';
import {debounce} from 'lodash';
import {emojiArr} from '../../assets/emojis';

type CarouselProps = {
  onSlideChange: Dispatch<SetStateAction<number>>;
};

function Carousel({onSlideChange}: CarouselProps) {
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

  type SwiperImageProps = {
    item: any;
    index: number;
  };

  function SwiperImage({item, index}: SwiperImageProps) {
    return <img className="emoji" src={item} alt={index.toString()} />;
  }

  const MemorizedImage = React.memo(SwiperImage);

  return (
    <Swiper
      speed={1200}
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
          <SwiperSlide key={index}>
            <MemorizedImage item={item} index={index} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
