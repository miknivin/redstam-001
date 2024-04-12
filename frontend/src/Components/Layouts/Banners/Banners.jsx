import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./banners.css";
import banners from "../../utilities/banners";

function Banners() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={true}
        pagination={true}
        scrollbar={{ draggable: true }}
        className="relative w-full overflow-hidden"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              className="object-cover"
              style={{ width: "100%", height: "100%" }}
              src={banner}
              alt={`banner-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Banners;
