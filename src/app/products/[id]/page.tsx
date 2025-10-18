"use client";

import { mockProducts } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, ChevronLeft, Share2, Minus, Plus } from "lucide-react";
import PopularProductCard from "@/components/home/PopularProductCard";

export default function AboutProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Mock images for gallery (in real app, this would come from product data)
  const images = [product.image, product.image, product.image, product.image];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux produits
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden group">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWished(!isWished)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-105 transition-all z-10"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWished ? "fill-rose-500 text-rose-500" : "text-gray-600"
                  }`}
                />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {selectedImage + 1} / {images.length}
              </div>

              {/* Navigation Arrows for Mobile */}
              <button
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all lg:hidden"
              >
                <ChevronLeft className="h-5 w-5 text-gray-900" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all lg:hidden rotate-180"
              >
                <ChevronLeft className="h-5 w-5 text-gray-900" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="hidden lg:grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-400"
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
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewsCount} avis)
                  </span>
                </div>
              )}
              {product.category && (
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="border-y border-gray-100 py-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="px-2 py-1 bg-gray-900 text-white text-sm font-bold rounded">
                    -20%
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Taxes incluses. Livraison calculée au paiement.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-900">
                  Taille: <span className="font-bold">{selectedSize}</span>
                </label>
                <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline">
                  Guide des tailles
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {mockProducts.length} en stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </button>
              <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-900 text-gray-900 py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Acheter maintenant
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4" />
                Partager
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Livraison gratuite
                  </p>
                  <p className="text-sm text-gray-600">
                    Pour les commandes de plus de 50 000 Ar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Retours gratuits
                  </p>
                  <p className="text-sm text-gray-600">
                    Sous 30 jours, sans condition
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Paiement sécurisé
                  </p>
                  <p className="text-sm text-gray-600">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.title} est un produit de haute qualité conçu pour répondre à vos besoins. 
                  Fabriqué avec des matériaux premium, ce produit combine style et fonctionnalité 
                  pour vous offrir la meilleure expérience possible. Son design moderne s'adapte 
                  parfaitement à votre style de vie actif.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Caractéristiques principales : durabilité exceptionnelle, confort optimal, 
                  design élégant et finitions soignées. Parfait pour un usage quotidien ou 
                  pour des occasions spéciales.
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Caractéristiques
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Matériau", value: "Coton premium" },
                  { label: "Couleur", value: "Noir" },
                  { label: "Origine", value: "Madagascar" },
                  { label: "Entretien", value: "Lavage machine 30°" },
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{spec.label}</span>
                    <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Produits similaires
              </h2>
              <button
                onClick={() => router.push("/products")}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm text-gray-600">Prix</div>
            <div className="text-2xl font-bold text-gray-900">{product.price}</div>
          </div>
          <button
            onClick={() => setIsWished(!isWished)}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isWished ? "fill-rose-500 text-rose-500" : "text-gray-600"
              }`}
            />
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
  }
