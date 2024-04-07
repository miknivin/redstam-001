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
        className="relative w-full overflow-hidden rounded-box"
      >
        <SwiperSlide>
          <img
            className=" object-cover"
            style={{ width: "100%", height: "100%" }}
            src="https://ik.imagekit.io/c1jhxlxiy/2000x1125%20pxls%202.webp?updatedAt=1712050050083"
            alt="banner"
          />
          {/* <div className="h-full w-[85%] mx-auto flex items-center relative">
            {/* <div className="card w-96 glass shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-5xl text-emerald-950 font-bold">
                  Card title!
                </h2>
                <p className="text-start text-gray-600 text-lg my-5">
                  If a dog chews shoes whose shoes does he choose?
                </p>
                <div className="card-actions justify-start">
                  <button className="btn bg-emerald-700 text-white border-none text-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover object-right-top"
            style={{ width: "100%", height: "100%" }}
            src="https://ik.imagekit.io/c1jhxlxiy/2000x1125%20pxls%201.webp?updatedAt=1712050194112"
            alt="banner1"
          />
          {/* <div className="h-full w-[85%] mx-auto flex items-center relative">
            <div className="card w-96 glass shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-5xl text-purple-900 font-bold">
                  Card title!
                </h2>
                <p className="text-start text-gray-600 text-lg my-5">
                  If a dog chews shoes whose shoes does he choose?
                </p>
                <div className="card-actions justify-start">
                  <button className="btn bg-purple-700 text-white border-none text-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            className="absolute top-0 bottom-0 right-0 left-0 object-cover"
            style={{ width: "100%", height: "100%" }}
            src="https://storage.googleapis.com/msgsndr/RKjSVFlud4tomMYa0uQc/media/656f09f94d019c5a588409a4.jpeg"
            alt=""
          />
          <div className="h-full w-[85%] mx-auto flex items-center relative">
            <div className="card w-96 glass shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-5xl text-pink-900 font-bold">
                  Card title!
                </h2>
                <p className="text-start text-gray-600 text-lg my-5">
                  If a dog chews shoes whose shoes does he choose?
                </p>
                <div className="card-actions justify-start">
                  <button className="btn bg-pink-700 text-white border-none text-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
    </>
  );
}

export default Banners;
