"use client";

import { ShopifyProduct } from "@/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MinimalProductCardProps extends ShopifyProduct {}

export default function MinimalProductCard(product: MinimalProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.images[0] && (
          <>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={`object-cover transition-all duration-500 ${
                isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.title}
                fill
                className={`object-cover transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </>
        )}

        {/* Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1">
            SALE
          </div>
        )}

        {!product.availableForSale && (
          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2 py-1">
            ÉPUISÉ
          </div>
        )}

        {/* Quick View Button */}
        <div className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button className="w-full bg-white text-gray-900 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors">
            APERÇU RAPIDE
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        {/* Vendor */}
        {product.vendor && (
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {product.vendor}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm md:text-base text-gray-900 dark:text-white font-medium group-hover:underline">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
            {product.price.toLocaleString()} Ar
          </span>
          {hasDiscount && (
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-through">
              {product.compareAtPrice?.toLocaleString()} Ar
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

