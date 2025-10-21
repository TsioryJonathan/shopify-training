"use client";

import { TrendingUp, Award } from "lucide-react";

export default function PromoBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#6366F1] p-8 md:p-12 text-white">
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">Offre Exclusive</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Rejoignez notre programme fidélité
        </h2>
        <p className="text-lg text-white/90 mb-6">
          Profitez de réductions exclusives, de la livraison gratuite et de nombreux avantages réservés à nos membres.
        </p>
        <button className="bg-white text-[#6366F1] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          En savoir plus
        </button>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
        <Award className="absolute right-12 top-12 h-32 w-32" />
        <Award className="absolute right-24 bottom-12 h-24 w-24" />
      </div>
    </div>
  );
}

