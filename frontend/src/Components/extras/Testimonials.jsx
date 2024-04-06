import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import testimonialsData from '../utilities/testimonial';

const Testimonials = () => {
  const swiperRef = useRef(null);
  const testimonialsRef = useRef(null);
  useEffect(() => {
    swiperRef.current = new Swiper('.mySwiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
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
    className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container m-auto text-gray-600 dark:text-gray-300 md:px-12 xl:px-6">
        <div className="mb-12 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            We have some fans.
          </h2>
          <p className="text-center">
            We don't like to brag, but we don't mind letting our customers do it
            for us. <br />
            Here are a few nice things folks have said about our themes over the
            years.
          </p>
        </div>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper pb-8">
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="swiper-slide !bg-transparent px-6 md:px-0">
                <div className="p-2 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none md:mx-auto lg:w-10/12 xl:w-8/12">
                  <div className="grid md:grid-cols-5">
                    <img
                      src={testimonial.imageSrc}
                      className="md:col-span-2 h-full w-full rounded-2xl object-cover"
                      alt="testimonial_image"
                      width={640}
                      height={422}
                      loading="lazy"
                    />
                    <div className="md:col-span-3 mx-auto space-y-6 p-6 text-center sm:p-8">
                      <div className="mx-auto w-24">
                        <img
                          src={testimonial.companyLogoSrc}
                          alt="company logo"
                          height={400}
                          width={142}
                          loading="lazy"
                        />
                      </div>
                      <p>
                        <span className="font-serif">"</span> {testimonial.testimonial}{" "}
                        <span className="font-serif">"</span>
                      </p>
                      <h6 className="text-lg font-semibold leading-none">
                        {testimonial.author}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
          <div className=' max-w-screen-lg w-full mx-auto flex justify-start items-start flex-row-reverse gap-3 pe-4'>
          <div className="swiper-button-next-custom" onClick={handleNextSlide}>
            <i className="fa-solid fa-chevron-right text-pink-900 text-lg p-4 bg-base-300 dark:bg-slate-50 rounded-full"></i>
          </div>
          <div className="swiper-button-prev-custom" onClick={handlePrevSlide}>
            <i className="fa-solid fa-chevron-left text-lg text-pink-900 p-4 bg-base-300 dark:bg-slate-50 rounded-full"></i>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
