import React, { useState, useEffect } from "react";
import "./Carousel.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import { debounce } from "lodash";
import { emojiArr } from "../../assets/emojis";

function Carousel() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 10);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  type SwiperImageProps = {
    item: any;
    index: number;
  };

  function SwiperImage({ item, index }: SwiperImageProps) {
    return <img className="emoji" src={item} alt={index.toString()} />;
  }

  const MemorizedImage = React.memo(SwiperImage);

  return (
    <Swiper
      effect={"coverflow"}
      slidesPerView={2.2}
      centeredSlides={true}
      grabCursor={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
    >
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
