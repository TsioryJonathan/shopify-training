"use client";

import ProductGrid from "@/components/products/ProductGrid";
import { mockProducts } from "@/constants";
import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function Products() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="border-b border-gray-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Tous les produits
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {mockProducts.length} produits disponibles
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button 
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Trier par:</label>
            <select className="flex-1 sm:flex-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors bg-white">
              <option>Pertinence</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Nouveautés</option>
              <option>Meilleures ventes</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters Banner */}
        {showMobileFilters && (
          <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Les filtres sont disponibles sur la version desktop. 
              <br />
              <span className="text-xs text-gray-500">Utilisez un écran plus large pour accéder aux filtres avancés.</span>
            </p>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <ProductGrid data={mockProducts} />
      </div>
    </div>
  );
}
