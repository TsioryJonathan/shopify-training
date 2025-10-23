"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, ChevronLeft, Share2, Minus, Plus, Loader2 } from "lucide-react";
import PopularProductCard from "@/components/home/PopularProductCard";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { getUniqueVariantOptions } from "@/lib/shopify/utils";

export default function AboutProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  
  const addToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => 
    state.isInWishlist(id as string)
  );

  // 🛍️ Récupération du produit depuis Shopify
  const { product, loading, error, isShopifyConfigured } = useShopifyProduct(id as string);
  
  // Récupération des produits similaires
  const { products: allProducts } = useShopifyProducts({ first: 10 });
  const relatedProducts = allProducts.filter(p => p.id !== product?.id).slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[90px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Chargement du produit...</p>
          {isShopifyConfigured && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Récupération depuis Shopify</p>
          )}
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[90px]">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            ❌ {error ? error.message : "Produit non trouvé"}
          </p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  // Utiliser les vraies images du produit Shopify
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  
  // Extraire les tailles disponibles depuis les variantes
  const variantOptions = getUniqueVariantOptions(product);
  const sizes = variantOptions.Size || variantOptions.Taille || ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 lg:pb-0  transition-colors">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {!isShopifyConfigured && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Mode développement : Données mock. Configurez Shopify pour voir vos vrais produits.
              </p>
            </div>
          )}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux produits
            {isShopifyConfigured && <span className="text-green-600 dark:text-green-400 ml-2">✓ Shopify</span>}
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden group">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-105 transition-all z-10"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isInWishlist ? "fill-rose-500 text-rose-500" : "text-gray-600 dark:text-gray-300"
                  }`}
                />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                {selectedImage + 1} / {images.length}
              </div>

              {/* Navigation Arrows for Mobile */}
              <button
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all lg:hidden"
              >
                <ChevronLeft className="h-4 w-4 text-gray-900 dark:text-white" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all lg:hidden rotate-180"
              >
                <ChevronLeft className="h-4 w-4 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="hidden lg:grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                    selectedImage === idx
                      ? "border-gray-900 ring-2 ring-gray-900"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Mobile Thumbnail Dots */}
            <div className="flex lg:hidden justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-2 rounded-full transition-all ${
                    selectedImage === idx
                      ? "w-8 bg-gray-900"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(product.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {product.rating} ({product.reviewsCount} avis)
                  </span>
                </div>
              )}
              {product.category && (
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {product.category}
                </p>
              )}
              {product.vendor && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Marque: <span className="font-medium">{product.vendor}</span>
                </p>
              )}
            </div>

            {/* Price */}
            <div className="border-y border-gray-100 py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-bold rounded">
                    -20%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5">
                Taxes incluses. Livraison calculée au paiement.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-900 dark:text-white">
                  Taille: <span className="font-bold">{selectedSize}</span>
                </label>
                <button className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white underline">
                  Guide des tailles
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-lg border transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-medium text-gray-900 dark:text-white mb-2">
                Quantité
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 dark:bg-gray-900 transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-5 font-medium text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 dark:bg-gray-900 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {product.availableForSale ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ En stock</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-medium">✗ Rupture de stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3">
              <button 
                onClick={() => {
                  addToCart(product, quantity, selectedSize);
                  // Optionally show a toast notification here
                }}
                disabled={!product.availableForSale}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                {product.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
              </button>
              <button 
                onClick={() => {
                  addToCart(product, quantity, selectedSize);
                  router.push("/cart");
                }}
                disabled={!product.availableForSale}
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 dark:text-white dark:border-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Acheter maintenant
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2.5 px-6 rounded-lg hover:bg-gray-50 dark:bg-gray-900 transition-colors text-sm">
                <Share2 className="h-3.5 w-3.5" />
                Partager
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <Truck className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Livraison gratuite
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Pour les commandes de plus de 50 000 Ar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <RefreshCw className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Retours gratuits
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Sous 30 jours, sans condition
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Paiement sécurisé
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Vos données sont protégées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-gray-100 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {product.description || `${product.title} est un produit de haute qualité conçu pour répondre à vos besoins.`}
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Caractéristiques
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Marque", value: product.vendor || "Non spécifié" },
                  { label: "Catégorie", value: product.category || "Général" },
                  { label: "Disponibilité", value: product.availableForSale ? "En stock" : "Rupture" },
                  { label: "Variantes", value: `${product.variants.length} option(s)` },
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{spec.value}</span>
                  </div>
                ))}
                {product.tags && product.tags.length > 0 && (
                  <div className="col-span-full pt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Tags :</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Produits similaires
              </h2>
              <button
                onClick={() => router.push("/products")}
                className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white transition-colors"
              >
                Voir tout →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.map((p) => (
                <PopularProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 lg:hidden z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm text-gray-600 dark:text-gray-400">Prix</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{product.price}</div>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "fill-rose-500 text-rose-500" : "text-gray-600 dark:text-gray-300"
              }`}
            />
          </button>
          <button 
            onClick={() => {
              addToCart(product, 1, selectedSize);
            }}
            disabled={!product.availableForSale}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5" />
            {product.availableForSale ? "Ajouter" : "Indisponible"}
          </button>
        </div>
      </div>
    </div>
  );
  }
