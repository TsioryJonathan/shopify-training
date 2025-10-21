"use client";

import { Truck, Shield, CreditCard, Headphones } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Truck,
    title: "Livraison Gratuite",
    description: "Livraison gratuite pour toutes les commandes supérieures à 50 000 Ar"
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Vos transactions sont 100% sécurisées et cryptées"
  },
  {
    icon: CreditCard,
    title: "Paiement Flexible",
    description: "Plusieurs options de paiement disponibles"
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Notre équipe est disponible pour vous aider à tout moment"
  }
];

export default function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}

