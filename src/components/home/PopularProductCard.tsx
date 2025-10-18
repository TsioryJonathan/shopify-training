"use client";

// components/ProductCardShop.tsx - Shein-inspired design
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

type Thumb = { src: string; alt?: string };

type Props = {
  id: string | number;
  title: string;
  category?: string;
  price: string;
  oldPrice?: string;
  discountLabel?: string;
  image: string | StaticImageData;
  thumbnails?: Thumb[];
  href: string;
  rating?: number;
  reviewsCount?: number;
  onAdd?: () => void;
  onWish?: () => void;
  className?: string;
};

export default function ProductCardShop({
  id,
  title,
  category,
  price,
  oldPrice,
  discountLabel,
  image,
  thumbnails = [],
  href,
  rating,
  reviewsCount,
  onAdd,
  onWish,
  className = "",
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isWished, setIsWished] = useState(false);
  const gallery = thumbnails.length ? thumbnails : [{ src: image, alt: title }];

  const active = gallery[Math.min(activeIdx, gallery.length - 1)];

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWished(!isWished);
    onWish?.();
  };

  return (
    <article
      key={id}
      className={[
        "group relative w-full max-w-[280px] bg-white overflow-hidden",
        "transition-all duration-300 hover:shadow-md rounded-lg border border-gray-100",
        className,
      ].join(" ")}
    >
      {/* Image container */}
      <a href={href} className="relative block aspect-[3/4] overflow-hidden bg-gray-50">
        {/* Sale badge */}
        {discountLabel && (
          <div className="absolute left-2 top-2 z-10 rounded-md bg-gray-900 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {discountLabel}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWish}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:bg-white hover:scale-105"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWished ? "fill-rose-500 text-rose-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Product image */}
        <Image
          src={active?.src || image}
          alt={active?.alt || title}
          width={280}
          height={373}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick add overlay (appears on hover) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAdd?.();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter au panier
          </button>
        </div>
      </a>

      {/* Product info */}
      <div className="p-3">
        {/* Category */}
        {category && (
          <p className="mb-1 text-xs text-gray-500 uppercase tracking-wide">
            {category}
          </p>
        )}

        {/* Title */}
        <a
          href={href}
          className="block mb-2 text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors"
        >
          {title}
        </a>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            {reviewsCount && (
              <span className="text-xs text-gray-500">({reviewsCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">{price}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">{oldPrice}</span>
          )}
        </div>

        {/* Color options / Thumbnails */}
        {gallery.length > 1 && (
          <div className="mt-3 flex items-center gap-1.5">
        {gallery.slice(0, 5).map((t, i) => {
          const selected = i === activeIdx;
          return (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
                  className={[
                    "relative h-6 w-6 overflow-hidden rounded border-2 transition-all",
                    selected
                      ? "border-gray-900 scale-110"
                      : "border-gray-200 hover:border-gray-400",
                  ].join(" ")}
              aria-pressed={selected}
              title={t.alt || title}
            >
              <Image
                src={t.src}
                alt={t.alt || title}
                fill
                    className="object-cover"
              />
            </button>
          );
        })}
        {gallery.length > 5 && (
              <span className="text-xs text-gray-500">+{gallery.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
