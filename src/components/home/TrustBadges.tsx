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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-12 border-y border-gray-200 dark:border-gray-700">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 md:mb-4">
            <badge.icon className="w-6 h-6 md:w-7 md:h-7 text-gray-900 dark:text-white" />
          </div>
          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white mb-1">
            {badge.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}

