import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import testimonialsData from "../utilities/testimonial";
import "swiper/css";
const Testimonials = () => {
  const swiperRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 1000, // Autoplay delay in milliseconds
        disableOnInteraction: false, // Autoplay continues even when user interacts with the slider
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }, []);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div
      ref={testimonialsRef}
      id="testimonialsRef"
      className="bg-gray-50 py-16"
    >
      <div className="container m-auto text-gray-600 dark:text-gray-300 md:px-12 xl:px-6">
        <div className="mb-12 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-3xl text-gray-800 md:text-5xl font-bcf font-bold">
            We have some fans.
          </h2>
          <p className="text-center text-gray-700 font-calibri">
            We don't like to brag, but we don't mind letting our customers do it
            for us. <br />
            Here are a few nice things folks have said about our products
          </p>
        </div>
        <div data-swiper-autoplay="2000" className="swiper mySwiper h-fit ">
          <div className="swiper-wrapper pb-8 h-fit ">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="swiper-slide !bg-transparent px-6 md:px-0"
              >
                <div class="mx-auto space-y-6 text-center md:w-8/12 lg:w-7/12 p-4 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none ">
                  <img
                    class="mx-auto !h-16 !w-16 rounded-full object-cover"
                    src={testimonial.imageSrc}
                    alt="user avatar"
                    height="220"
                    width="220"
                    loading="lazy"
                  />
                  <p className="font-calibri">
                    <span class="font-serif">"</span> {testimonial.testimonial}{" "}
                    <span class="font-serif">"</span>
                  </p>
                  <div>
                    <h6 class="text-lg font-semibold leading-none font-calibri">
                      {testimonial.author}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-screen-lg w-full mx-auto flex justify-start items-start flex-row-reverse gap-3 pe-4 pt-0">
            <div
              className="swiper-button-next-custom"
              onClick={handleNextSlide}
            >
              <i className="fa-solid fa-chevron-right text-pink-900 text-lg p-4 bg-base-300 dark:bg-slate-50 rounded-full"></i>
            </div>
            <div
              className="swiper-button-prev-custom"
              onClick={handlePrevSlide}
            >
              <i className="fa-solid fa-chevron-left text-lg text-pink-900 p-4 bg-base-300 dark:bg-slate-50 rounded-full"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
