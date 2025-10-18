"use client";

import ProductGrid from "@/components/products/ProductGrid";
import Sidebar from "@/components/products/Sidebar";
import { mockProducts } from "@/constants";
import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useProductFilters, FilterOptions } from "@/hooks/useProductFilters";
import { useSearchParams } from "next/navigation";

export default function Products() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "";
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: categoryFromUrl,
    sortBy: "relevance",
  });

  const filteredProducts = useProductFilters(mockProducts, filters);

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

  const handleApplyFilters = (newFilters: Record<string, any>) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: newFilters.q,
      category: newFilters.category,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
      inStock: newFilters.inStock,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      sortBy: "relevance",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          initialCategory={categoryFromUrl}
        />
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
        {/* Header Section */}
        <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {filters.category ? `Catégorie: ${filters.category}` : "Tous les produits"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
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
              <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Trier par:</label>
              <select 
                className="flex-1 sm:flex-none rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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

          {/* Mobile Filters Banner */}
          {showMobileFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Les filtres sont disponibles sur la version desktop. 
                <br />
                <span className="text-xs text-gray-500 dark:text-gray-500">Utilisez un écran plus large pour accéder aux filtres avancés.</span>
              </p>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <ProductGrid data={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun produit trouvé</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Essayez de modifier vos filtres</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
