"use client";

import { Sparkles } from "lucide-react";

const brands = [
  "NIKE", "ADIDAS", "PUMA", "ZARA", "H&M", "UNIQLO",
  "SAMSUNG", "APPLE", "SONY", "LG", "PHILIPS", "BOSCH"
];

export default function BrandsSection() {
  return (
    <div className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Marques de Confiance</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nos Partenaires Premium
        </h3>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-8 relative z-10">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="group flex items-center justify-center h-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#6366F1] dark:hover:border-[#8B5CF6] hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <span className="text-lg font-bold text-gray-400 dark:text-gray-500 group-hover:text-[#6366F1] dark:group-hover:text-[#8B5CF6] transition-colors">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

