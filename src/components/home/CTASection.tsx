"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

export default function CTASection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Primary CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-3xl p-8 md:p-10 text-white">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">Offre Limitée</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Vente Flash Active
          </h3>
          
          <p className="text-white/90 mb-6 text-lg">
            Jusqu'à <strong>-70%</strong> sur une sélection de produits premium. Offre valable pendant 24h seulement !
          </p>
          
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-[#6366F1] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl"
          >
            <span>Voir les offres</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Secondary CTAs */}
      <div className="space-y-6">
        {/* Shipping CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">Livraison Gratuite</h4>
              <p className="text-white/90 text-sm mb-3">
                Sur toutes les commandes supérieures à 50 000 Ar
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
              >
                <span>En savoir plus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Security CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">Paiement Sécurisé</h4>
              <p className="text-white/90 text-sm mb-3">
                Vos transactions sont 100% sécurisées et cryptées
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
              >
                <span>Acheter en toute confiance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

