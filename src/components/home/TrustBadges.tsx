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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6 md:py-8 border-y border-gray-200 dark:border-gray-700">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2 md:mb-3">
            <badge.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
          </div>
          <h3 className="font-semibold text-xs md:text-sm text-gray-900 dark:text-white mb-1">
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

