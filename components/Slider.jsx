// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const imageLoader = ({ src, width, quality }) => {
  return `https://swiperjs.com/demos/images/${src}`;
};

export default function Slider() {
  return (
    <>
      <Swiper
        rewind={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper w-full py-[50px]"
      >
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-1.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-2.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>{" "}
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-3.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-4.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-5.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-6.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>
        <SwiperSlide className="bg-center bg-cover max-h-[300px] max-w-[300px]">
          <Image
            loader={imageLoader}
            alt="slider picture"
            src={"nature-7.jpg"}
            width={300}
            height={300}
            className="block"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
