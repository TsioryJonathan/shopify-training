"use client";

import { ShopifyProduct } from "@/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Eye } from "lucide-react";

interface MinimalProductCardProps extends ShopifyProduct {}

export default function MinimalProductCard(product: MinimalProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount && product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-all duration-300">
        {product.images[0] && (
          <>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered && product.images[1] ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
              }`}
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.title}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              />
            )}
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {hasDiscount && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
              -{discountPercent}%
            </div>
          )}
          {!product.availableForSale && (
            <div className="bg-gray-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              ÉPUISÉ
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            } shadow-lg hover:scale-110`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Button */}
        <div className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button 
            onClick={(e) => e.preventDefault()}
            className="w-full bg-white/95 backdrop-blur-md text-gray-900 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>APERÇU RAPIDE</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        {/* Vendor */}
        {product.vendor && (
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
            {product.vendor}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm md:text-base text-gray-900 dark:text-white font-semibold line-clamp-2 group-hover:text-[#10b981] transition-colors leading-snug">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
            {product.price.toLocaleString()} Ar
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-through">
                {product.compareAtPrice?.toLocaleString()} Ar
              </span>
              <span className="text-xs font-semibold text-red-500 ml-auto">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

