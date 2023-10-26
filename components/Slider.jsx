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
  return `${src}`;
};

export default function Slider(data) {
  console.log("Slider Data", data);
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
        {data.pictures.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="bg-center bg-cover max-h-[300px] max-w-[300px]"
            >
              <Image
                loader={imageLoader}
                alt="slider picture"
                priority={true}
                src={item}
                width={300}
                height={300}
                className="block h-[300px] w-[300px] object-cover rounded-2xl"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
