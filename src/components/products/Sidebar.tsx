// components/Sidebar.tsx
"use client";
import React, { useState } from "react";

type Option = { label: string; value: string };

type Props = {
  categories?: Option[]; // 6 options max pour éviter le scroll
  onApply?: (filters: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
  topOffsetPx?: number; // hauteur du header si besoin
};

export default function Sidebar({
  categories = [
    { label: "Toutes", value: "" },
    { label: "Électronique", value: "electronics" },
    { label: "Mode", value: "fashion" },
    { label: "Maison", value: "home" },
    { label: "Beauté", value: "beauty" },
    { label: "Sport", value: "sports" },
  ],
  onApply,
  onReset,
  className,
  topOffsetPx = 136,
}: Props) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);

  function apply() {
    onApply?.({
      q: q || undefined,
      category: category || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      inStock,
    });
  }

  function reset() {
    setQ("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    onReset?.();
  }

  return (
    <aside
      className={`sticky top-20 left-0 z-40 w-64 md:w-72 border-r border-gray-100 bg-white ${
        className ?? ""
      }`}
      style={{
        top: topOffsetPx,
        height: `calc(100vh - ${topOffsetPx}px)`,
      }}
    >
      <div className="flex h-full flex-col gap-5 p-6 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
          <p className="text-xs text-gray-500 mt-1">Affinez votre recherche</p>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recherche
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors bg-white"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix (Ar)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
          </div>
        </div>

        {/* Stock Filter */}
        <div className="pt-2">
          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400 focus:ring-offset-0"
            />
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              En stock seulement
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={apply}
            className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            Appliquer
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  );
}
