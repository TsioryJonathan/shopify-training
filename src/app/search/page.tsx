"use client";

import ProductGrid from "@/components/products/ProductGrid";
import { mockProducts } from "@/constants";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProductFilters, FilterOptions } from "@/hooks/useProductFilters";
import { Search } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: queryFromUrl,
    sortBy: "relevance",
  });

  const filteredProducts = useProductFilters(mockProducts, filters);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery: queryFromUrl }));
  }, [queryFromUrl]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sortBy: FilterOptions["sortBy"] = "relevance";

    switch (value) {
      case "Prix croissant":
        sortBy = "price-asc";
        break;
      case "Prix décroissant":
        sortBy = "price-desc";
        break;
      case "Nouveautés":
        sortBy = "newest";
        break;
      case "Meilleures ventes":
        sortBy = "popular";
        break;
      default:
        sortBy = "relevance";
    }

    setFilters((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="min-h-screen bg-white pt-[136px]">
      {/* Header Section */}
      <div className="border-b border-gray-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Search className="h-6 w-6 text-gray-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Résultats de recherche
                </h1>
              </div>
              {queryFromUrl && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Recherche: <span className="font-semibold text-gray-900 dark:text-white">"{queryFromUrl}"</span>
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Trier par:
              </label>
              <select
                className="flex-1 sm:flex-none rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors bg-white"
                onChange={handleSortChange}
              >
                <option>Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
                <option>Meilleures ventes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <ProductGrid data={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">Aucun produit trouvé</p>
            <p className="text-gray-400 text-sm mt-2">
              {queryFromUrl
                ? `Aucun résultat pour "${queryFromUrl}"`
                : "Essayez une autre recherche"}
            </p>
            <a
              href="/products"
              className="inline-block mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Voir tous les produits
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

