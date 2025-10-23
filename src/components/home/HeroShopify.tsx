"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSlide {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  overlayColor?: string;
}

const slides: HeroSlide[] = [
  {
    title: "Nouvelle Collection Automne",
    subtitle: "Découvrez nos dernières créations pour la saison",
    ctaText: "Découvrir",
    ctaLink: "/products",
    overlayColor: "from-black/60 via-black/40 to-transparent"
  },
  {
    title: "Offres Exclusives",
    subtitle: "Jusqu'à -50% sur une sélection d'articles",
    ctaText: "Profiter",
    ctaLink: "/products",
    overlayColor: "from-black/50 via-black/30 to-transparent"
  },
  {
    title: "Livraison Gratuite",
    subtitle: "Sur toutes vos commandes dès 50 000 Ar",
    ctaText: "Commander",
    ctaLink: "/products",
    overlayColor: "from-black/55 via-black/35 to-transparent"
  }
];

export default function HeroShopify() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Background - Gradient placeholder (in real app would be image) */}
      <div className="absolute inset-0">
        <div 
          className={`w-full h-full bg-gradient-to-br ${
            currentSlide === 0 ? 'from-emerald-700 via-emerald-600 to-green-600' :
            currentSlide === 1 ? 'from-green-700 via-green-600 to-emerald-600' :
            'from-teal-700 via-green-600 to-emerald-600'
          } transition-all duration-1000`}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor}`} />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight animate-fadeIn">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed animate-fadeIn">
              {slide.subtitle}
            </p>

            {/* CTA */}
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold hover:bg-gray-100 transition-all group animate-fadeIn"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentSlide 
                ? "w-8 bg-white" 
                : "w-1 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

