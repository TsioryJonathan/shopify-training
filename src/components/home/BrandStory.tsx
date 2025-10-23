"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16">
      {/* Image Side */}
      <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        {/* Placeholder for lifestyle image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400 dark:text-gray-500">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-sm">Lifestyle Image</p>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="space-y-6">
        <div className="inline-block">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400">
            Notre Histoire
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Qualité, Style et Durabilité
        </h2>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Depuis notre création, nous nous engageons à offrir des produits de qualité exceptionnelle 
          qui allient style contemporain et durabilité. Chaque article est soigneusement sélectionné 
          pour vous garantir une expérience d'achat unique.
        </p>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Notre mission est simple : rendre le shopping accessible, agréable et responsable pour tous.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-semibold border-b-2 border-gray-900 dark:border-white pb-1 hover:gap-3 transition-all group"
        >
          <span>En savoir plus</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

