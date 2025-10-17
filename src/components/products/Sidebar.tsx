// components/Sidebar.tsx
"use client";
import React, { useState } from "react";

type Option = { label: string; value: string };

type Props = {
  categories?: Option[]; // 6 options max pour éviter le scroll
  onApply?: (filters: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
  topOffsetPx?: number; // hauteur du header si besoin (par défaut ~80px)
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
  topOffsetPx = 80,
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
      className={`sticky top-20 left-0 z-40 w-60 md:w-72 border-r bg-white ${
        className ?? ""
      }`}
      style={{
        top: topOffsetPx,
        height: `calc(100vh - ${topOffsetPx}px)`,
      }}
      // pas de scroll :
      // (contenu équilibré pour tenir sur une hauteur d’écran standard)
    >
      <div className="flex h-full flex-col gap-3 p-4 overflow-hidden">
        <h2 className="text-base font-semibold">Filtres</h2>

        {/* Recherche (1 ligne) */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Recherche…"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
        />

        {/* Catégorie (1 ligne) */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Prix (1 ligne compacte) */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 rounded-lg border px-2 py-2 text-sm focus:ring-2 focus:ring-sky-500"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 rounded-lg border px-2 py-2 text-sm focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* En stock (1 ligne) */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="h-4 w-4 accent-sky-600"
          />
          En stock seulement
        </label>

        {/* Actions (en bas, sans scroll) */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={apply}
            className="flex-1 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Appliquer
          </button>
          <button
            onClick={reset}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Réinit.
          </button>
        </div>
      </div>
    </aside>
  );
}
