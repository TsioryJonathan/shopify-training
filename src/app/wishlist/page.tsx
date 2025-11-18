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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-[90px] transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 mb-8 shadow-lg animate-pulse">
              <Heart className="h-12 w-12 text-red-400 dark:text-red-500 fill-current" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Votre liste de souhaits est vide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-md mx-auto">
              Explorez nos produits et ajoutez vos favoris pour les retrouver facilement
            </p>
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Découvrir nos produits
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-[90px] transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">
                Ma liste de souhaits
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {items.length} {items.length === 1 ? "produit" : "produits"} sauvegardé{items.length > 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={clearWishlist}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Vider la liste
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 z-10 p-2.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-xl hover:bg-red-500 dark:hover:bg-red-500 hover:text-white hover:scale-110 hover:rotate-90 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
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
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white py-3 rounded-xl text-sm font-semibold hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
            className="inline-flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:border-gray-300 dark:hover:border-gray-600 transform hover:-translate-y-0.5"
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
}

