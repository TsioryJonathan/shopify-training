"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

interface SlideProps {
  image?: string | StaticImageData;
  title?: string;
  subtitle?: string;
  price?: string;
  discount?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Slide({
  image = "https://picsum.photos/400/300?random=1",
  title = "Nouvelle Collection",
  subtitle = "Découvrez nos dernières tendances",
  price,
  discount = "-50%",
  ctaText = "Acheter maintenant",
  ctaLink = "/products",
}: SlideProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(ctaLink);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group cursor-pointer">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-xl space-y-4 animate-fade-in">
          {/* Discount Badge */}
          {discount && (
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6347] to-[#FF8C69] px-4 py-2 text-sm font-bold text-white shadow-lg animate-pulse">
                🔥 {discount} DE RÉDUCTION
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-base md:text-xl text-white/90 drop-shadow-md">
              {subtitle}
            </p>
          )}

          {/* Price */}
          {price && (
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {price}
              </span>
              <span className="text-lg text-white/70 line-through">
                {parseInt(price.replace(/\D/g, '')) * 2} Ar
              </span>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-xl transition-all hover:bg-[#FF6347] hover:text-white hover:scale-105 active:scale-95"
          >
            {ctaText}
            <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#FF6347]/20 to-transparent blur-3xl" />
    </div>
  );
}
