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
      <div className="min-h-screen bg-white pt-[136px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez nos produits et ajoutez-les à votre panier
            </p>
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continuer vos achats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[136px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuer vos achats
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Panier ({items.length})
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Vider le panier
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    {item.category && (
                      <p className="text-sm text-gray-500 mb-2">
                        {item.category}
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600 mb-2">
                        Taille: <span className="font-medium">{item.selectedSize}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-lg font-bold text-gray-900">
                        {item.price}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-[152px]">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">Gratuit</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                {totalPrice < 50000 && (
                  <p className="text-sm text-gray-500">
                    Ajoutez {formatPrice(50000 - totalPrice)} pour la livraison gratuite
                  </p>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3">
                Passer la commande
              </button>
              <button
                onClick={() => router.push("/products")}
                className="w-full border border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continuer vos achats
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Retours gratuits sous 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

