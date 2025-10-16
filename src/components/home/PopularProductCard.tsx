"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  id: string | number;
  title: string;
  price: string;          // ex: "89 900 Ar"
  image: string | StaticImageData;
  href: string;
  rating?: number;        // 0..5
  reviewsCount?: number;  // ex: 213
  onAdd?: () => void;
  onWish?: () => void;
  className?: string;
};

export default function ProductCardShop({
  id, title, price, image, href,
  rating = 4.5, reviewsCount = 128,
  onAdd, onWish, className = "",
}: Props) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;

  return (
    <article
      key={id}
      className={[
        "group relative flex w-[260px] flex-col rounded-xl bg-white",
        "border border-neutral-200/80 shadow-sm transition-all",
        "hover:shadow-md hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      {/* Image */}
      <a href={href} className="relative block h-[180px] overflow-hidden rounded-t-xl bg-neutral-50">
        <Image
          src={image}
          alt={title}
          fill
          sizes="260px"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          priority={false}
        />
      </a>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); onWish?.(); }}
        aria-label="Ajouter aux favoris"
        className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 text-neutral-700 hover:bg-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12.1 20.3S3 15 3 8.9A4.4 4.4 0 0 1 7.4 4.5 5 5 0 0 1 12 7a5 5 0 0 1 4.6-2.5 4.4 4.4 0 0 1 4.4 4.4c0 6.1-9 11.4-9 11.4Z"
                stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Contenu bas */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <a href={href} className="line-clamp-2 text-[15px] font-medium text-neutral-900 hover:underline underline-offset-4">
          {title}
        </a>

        {/* Rating + nombre d’avis */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
          <div className="flex items-center text-emerald-600">
            {Array.from({ length: full }).map((_, i) => <Star key={`f-${i}`} />)}
            {half && <Star half />}
            {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => <Star key={`e-${i}`} empty />)}
          </div>
          <span className="text-neutral-400">({reviewsCount})</span>
        </div>

        {/* Bas: prix + bouton */}
        <div className="mt-auto flex items-center justify-between">
          <div className="text-[15px] font-semibold text-neutral-900">{price}</div>

          <button
            onClick={(e) => { e.preventDefault(); onAdd?.(); }}
            className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

/* --- petite étoile verte --- */
function Star({ empty, half }: { empty?: boolean; half?: boolean }) {
  if (half) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" className="fill-emerald-600">
        <defs>
          <linearGradient id="halfStar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="m12 17.27 6.18 3.73-1.64-7.03L21.5 9.24l-7.19-.61L12 2 9.69 8.63 2.5 9.24l4.96 4.73-1.64 7.03L12 17.27Z"
              fill="url(#halfStar)" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24"
         className={empty ? "text-emerald-600" : "fill-emerald-600 text-emerald-600"}>
      <path
        d="m12 17.27 6.18 3.73-1.64-7.03L21.5 9.24l-7.19-.61L12 2 9.69 8.63 2.5 9.24l4.96 4.73-1.64 7.03L12 17.27Z"
        fill={empty ? "none" : "currentColor"} stroke="currentColor" strokeWidth="0.5"
      />
    </svg>
  );
}
