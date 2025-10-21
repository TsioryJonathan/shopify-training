"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, ArrowLeft, X } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCartStore } from "@/stores/useCartStore";

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    // Optionally show a toast notification here
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-[136px] transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
              <Heart className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Votre liste de souhaits est vide
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Explorez nos produits et ajoutez vos favoris
            </p>
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Découvrir nos produits
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-[136px] transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                Ma liste de souhaits
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {items.length} {items.length === 1 ? "produit" : "produits"}
              </p>
            </div>
            <button
              onClick={clearWishlist}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Vider la liste
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Image */}
              <a
                href={item.href}
                className="relative block aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-700"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>

              {/* Info */}
              <div className="p-3">
                {item.category && (
                  <p className="mb-1 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {item.category}
                  </p>
                )}
                <a
                  href={item.href}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {item.title}
                </a>

                {/* Rating */}
                {item.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                      {item.oldPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/products")}
            className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
}

