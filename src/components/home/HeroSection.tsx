"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  link: string;
  badge?: string;
  gradient: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Collection Exclusive 2024",
    subtitle: "Nouvelle Saison",
    description: "Découvrez notre sélection premium de produits tendance sélectionnés pour vous",
    image: "/images/hero-1.jpg",
    cta: "Explorer la collection",
    link: "/products",
    badge: "Nouveauté",
    gradient: "from-indigo-600 via-purple-600 to-pink-600"
  },
  {
    title: "Offres Exceptionnelles",
    subtitle: "Jusqu'à -70%",
    description: "Profitez de réductions incroyables sur des milliers de produits premium",
    image: "/images/hero-2.jpg",
    cta: "Voir les offres",
    link: "/products",
    badge: "Vente Flash",
    gradient: "from-orange-500 via-red-500 to-pink-600"
  },
  {
    title: "Tendances du Moment",
    subtitle: "Soyez à la pointe",
    description: "Les dernières nouveautés qui font le buzz, livrées directement chez vous",
    image: "/images/hero-3.jpg",
    cta: "Découvrir",
    link: "/products",
    badge: "Trending",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90 transition-all duration-1000`} />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6 animate-fadeIn">
              {/* Badge */}
              {slide.badge && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">{slide.badge}</span>
                </div>
              )}

              {/* Subtitle */}
              <div className="text-sm uppercase tracking-[0.2em] font-semibold opacity-90">
                {slide.subtitle}
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={slide.link}
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-2xl"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Parcourir tout
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-white/70">Produits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm text-white/70">Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-sm text-white/70">Notation</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Decorative */}
            <div className="hidden lg:block relative">
              <div className="relative w-full h-[500px]">
                {/* Floating Cards */}
                <div className="absolute top-0 right-0 w-72 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 animate-float">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" />
                    <div>
                      <div className="text-white font-semibold">Livraison Gratuite</div>
                      <div className="text-white/70 text-sm">Sur toutes commandes</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 right-20 w-64 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <Zap className="w-10 h-10 text-yellow-300" />
                    <div>
                      <div className="text-white font-semibold text-xl">-70%</div>
                      <div className="text-white/70 text-sm">Vente Flash Active</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-0 w-56 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 animate-float-slow">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">Trending</span>
                  </div>
                  <div className="text-white/70 text-sm">+2.5K ventes aujourd'hui</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "w-12 bg-white" 
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

