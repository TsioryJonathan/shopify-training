"use client";

import { Truck, Shield, Clock, Award } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Livraison Gratuite",
    description: "Dès 50 000 Ar d'achat"
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "100% sécurisé"
  },
  {
    icon: Clock,
    title: "Retours Faciles",
    description: "Sous 30 jours"
  },
  {
    icon: Award,
    title: "Garantie Qualité",
    description: "Produits authentiques"
  }
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-8 md:py-12 border-y border-gray-200 dark:border-gray-700">
      {badges.map((badge, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center text-center group cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 dark:from-[#10b981]/20 dark:to-[#059669]/20 flex items-center justify-center mb-3 md:mb-4 group-hover:from-[#10b981]/20 group-hover:to-[#059669]/20 dark:group-hover:from-[#10b981]/30 dark:group-hover:to-[#059669]/30 transition-all duration-300 border border-[#10b981]/20 group-hover:border-[#10b981]/40">
            <badge.icon className="w-6 h-6 md:w-7 md:h-7 text-[#10b981] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white mb-1 group-hover:text-[#10b981] transition-colors">
            {badge.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}

