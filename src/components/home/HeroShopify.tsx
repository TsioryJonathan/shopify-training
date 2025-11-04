"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSlide {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  backgroundImage?: string;
  overlayColor?: string;
}

const slides: HeroSlide[] = [
  {
    title: "Nouvelle Collection Automne",
    subtitle: "Découvrez nos dernières créations pour la saison",
    ctaText: "Découvrir",
    ctaLink: "/products",
    badge: "NOUVEAU",
    overlayColor: "from-black/60 via-black/40 to-transparent"
  },
  {
    title: "Offres Exclusives",
    subtitle: "Jusqu'à -70% sur une sélection d'articles",
    ctaText: "Profiter",
    ctaLink: "/products",
    badge: "VENTE FLASH",
    overlayColor: "from-black/50 via-black/30 to-transparent"
  },
  {
    title: "Livraison Gratuite",
    subtitle: "Sur toutes vos commandes dès 50 000 Ar",
    ctaText: "Commander",
    ctaLink: "/products",
    badge: "OFFRE LIMITÉE",
    overlayColor: "from-black/55 via-black/35 to-transparent"
  }
];

export default function HeroShopify() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-3xl">
      {/* Background - Enhanced gradients */}
      <div className="absolute inset-0">
        <div 
          className={`w-full h-full bg-gradient-to-br ${
            currentSlide === 0 ? 'from-emerald-600 via-emerald-500 to-green-500' :
            currentSlide === 1 ? 'from-orange-600 via-red-500 to-pink-500' :
            'from-blue-600 via-indigo-500 to-purple-500'
          } transition-all duration-1000 ease-in-out`}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Pattern overlay - more subtle */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Animated circles for depth */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor} transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`max-w-2xl transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {/* Badge */}
            {slide.badge && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 border border-white/30 animate-fadeIn">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{slide.badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-5 leading-[1.1] animate-fadeIn">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 leading-relaxed font-medium animate-fadeIn">
              {slide.subtitle}
            </p>

            {/* CTA */}
            <Link
              href={slide.ctaLink}
              className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg font-bold rounded-full hover:bg-gray-50 transition-all hover:scale-105 hover:shadow-2xl shadow-lg animate-fadeIn"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Enhanced */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-10 h-2 bg-white shadow-lg" 
                : "w-2 h-2 bg-white/50 hover:bg-white/70 hover:w-6"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

