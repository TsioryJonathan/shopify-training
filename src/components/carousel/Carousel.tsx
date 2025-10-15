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
      modules={[Autoplay, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation
      className="w-full relative"
    >
      {slides?.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="flex justify-center items-center w-full"
        >
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
