import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles

export default function CustomSwiper({
  slides = [],
  slidesPerView = 1,
  spaceBetween = 20,
  autoplay = false,
  loop = true,
  className = "",
}) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      navigation
      pagination={{ clickable: true }}
      loop={loop}
      autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
      className={`w-full ${className}`}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-full">
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
              />
            )}
            {slide.title && (
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {slide.title}
              </h3>
            )}
            {slide.description && (
              <p className="text-gray-600 text-sm text-center">
                {slide.description}
              </p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
