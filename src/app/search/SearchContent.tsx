"use client";

import ProductGrid from "@/components/products/ProductGrid";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProductFilters, FilterOptions } from "@/hooks/useProductFilters";
import { useShopifySearch } from "@/hooks/useShopifyProducts";
import { Search, Loader2 } from "lucide-react";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "relevance",
  });

  // 🛍️ Recherche Shopify
  const { 
    products: searchResults, 
    loading, 
    error, 
    isShopifyConfigured 
  } = useShopifySearch(queryFromUrl, true);

  // Appliquer les filtres locaux sur les résultats de recherche
  const filteredProducts = useProductFilters(searchResults, filters);

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
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-[136px] transition-colors">
      {/* Header Section */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {!isShopifyConfigured && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Mode développement : Recherche dans les données mock. Configurez Shopify pour rechercher dans vos vrais produits.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Search className="h-6 w-6 text-gray-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Résultats de recherche
                </h1>
              </div>
              {queryFromUrl && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recherche: <span className="font-semibold text-gray-900 dark:text-white">"{queryFromUrl}"</span>
                  {isShopifyConfigured && <span className="text-green-600 dark:text-green-400 ml-2">✓ Shopify</span>}
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Recherche en cours...
                  </span>
                ) : (
                  <>
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Trier par:
              </label>
              <select
                className="flex-1 sm:flex-none rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                onChange={handleSortChange}
                disabled={loading}
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
        {/* Error State */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              ❌ Erreur lors de la recherche : {error.message}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Recherche en cours...</p>
            {isShopifyConfigured && (
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Recherche dans Shopify</p>
            )}
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductGrid data={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">Aucun produit trouvé</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {queryFromUrl
                ? `Aucun résultat pour "${queryFromUrl}"`
                : "Essayez une autre recherche"}
            </p>
            <a
              href="/products"
              className="inline-block mt-6 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Voir tous les produits
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

