"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MG").format(price) + " Ar";
  };

  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice > 50000 ? 0 : 3000;
  const finalTotal = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-[90px] transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-8 shadow-lg animate-pulse">
              <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Votre panier est vide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-md mx-auto">
              Découvrez nos produits et ajoutez-les à votre panier pour commencer vos achats
            </p>
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Continuer vos achats
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
            Continuer vos achats
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent animate-fade-in">
                Panier
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                {items.length} {items.length === 1 ? "article" : "articles"} dans votre panier
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-200 dark:hover:border-red-800"
              >
                Vider le panier
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-28 h-28 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    {item.category && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {item.category}
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Taille: <span className="font-medium">{item.selectedSize}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="px-4 font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.price}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all transform hover:scale-110"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sticky top-[152px] shadow-2xl transition-all hover:shadow-3xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Résumé de la commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Sous-total</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Livraison</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Gratuit</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                {totalPrice < 50000 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ajoutez {formatPrice(50000 - totalPrice)} pour la livraison gratuite
                  </p>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-3 relative overflow-hidden group">
                <span className="relative z-10">Passer la commande</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button
                onClick={() => router.push("/products")}
                className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:border-gray-300 dark:hover:border-gray-600"
              >
                Continuer vos achats
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <svg className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Retours gratuits sous 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

