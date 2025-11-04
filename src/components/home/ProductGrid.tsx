"use client";

import { LocalProduct } from "@/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { toast } from "sonner";

interface ProductGridProps {
  products: LocalProduct[];
  columns?: 3 | 4 | 5;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  const gridCols = {
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  };

  const handleAddToCart = (product: LocalProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images && product.images[0] ? product.images[0] : product.image,
      href: product.href,
      category: product.category,
    }, 1);
    toast.success("Produit ajouté au panier");
  };

  const handleAddToWishlist = (product: LocalProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      toast.info("Déjà dans vos favoris");
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : product.image,
        href: product.href,
        category: product.category,
      });
      toast.success("Ajouté aux favoris");
    }
  };

  // Helper function to parse price string to number
  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/\s/g, "").replace("Ar", "").replace(/,/g, ""));
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => {
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        
        // Calculate discount percentage
        const currentPrice = parsePrice(product.price);
        const oldPrice = product.oldPrice ? parsePrice(product.oldPrice) : null;
        const discount = oldPrice && oldPrice > currentPrice
          ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
          : 0;

        return (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="group"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-[#6366F1] dark:hover:border-[#8B5CF6] transition-all hover:shadow-2xl">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                {(product.images && product.images[0]) || product.image ? (
                  <Image
                    src={(product.images && product.images[0]) || product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : null}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {discount > 0 && (
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{discount}%
                    </div>
                  )}
                  {!product.availableForSale && (
                    <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Épuisé
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleAddToWishlist(product, e)}
                    className={`w-10 h-10 rounded-full ${
                      isInWishlist 
                        ? "bg-red-500 text-white" 
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    } flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
                  </button>
                  <Link
                    href={`/products/${product.handle}`}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    aria-label="Voir le produit"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </div>

                {/* Quick Add to Cart on Hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.availableForSale}
                    className="w-full bg-[#6366F1] hover:bg-[#5B21B6] text-white py-3 flex items-center justify-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                {/* Category/Vendor */}
                {product.vendor && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {product.vendor}
                  </p>
                )}

                {/* Title */}
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#6366F1] dark:group-hover:text-[#8B5CF6] transition-colors">
                  {product.title}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviewsCount || 0})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  {oldPrice && oldPrice > currentPrice && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

