"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel({ slides }: { slides: React.ReactNode[] }) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation
      className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
    >
      {slides?.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="flex justify-center items-center w-full h-full"
        >
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
