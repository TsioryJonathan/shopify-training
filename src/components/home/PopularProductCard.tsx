"use client";

// components/ProductCardShop.tsx
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

type Thumb = { src: string; alt?: string };

type Props = {
  id: string | number;
  title: string;
  category?: string;
  price: string; // "€139.99" ou "139 999 Ar"
  oldPrice?: string; // optionnel : prix barré
  discountLabel?: string; // ex: "10% OFF"
  image: string | StaticImageData; // image principale par défaut
  thumbnails?: Thumb[]; // miniatures (la 1ère sélectionnée par défaut)
  href: string;
  onAdd?: () => void;
  onWish?: () => void;
  className?: string;
};

export default function ProductCardShop({
  id,
  title,
  category = "WOMEN SHOES",
  price,
  oldPrice,
  discountLabel,
  image,
  thumbnails = [],
  href,
  onAdd,
  onWish,
  className = "",
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const gallery = thumbnails.length ? thumbnails : [{ src: image, alt: title }];

  const active = gallery[Math.min(activeIdx, gallery.length - 1)];

  return (
    <article
      key={id}
      className={[
        "group relative w-[250px] rounded-2xl border flex flex-col gap-2 border-neutral-200/70 bg-white shadow-sm",
        "transition-all hover:-translate-y-0.5 hover:shadow-md",
        className,
      ].join(" ")}
    >
      {/* Top image area (dark) */}
      <a href={href} className="relative block rounded-t-2xl p-5">
        {discountLabel && (
          <span className="absolute left-4 top-4 rounded-md bg-amber-400 px-2 py-1 text-[11px] font-semibold text-slate-900">
            {discountLabel}
          </span>
        )}
        <Image
          src={active?.src || image}
          alt={active?.alt || title}
          width={520}
          height={360}
          className="mx-auto h-[180px] object-cover transition-transform duration-300 group-hover:scale-[1.03] rounded-xl"
        />
      </a>

      {/* Thumbnails */}
      <div className="-mt-3 flex items-center gap-2 px-4">
        {gallery.slice(0, 5).map((t, i) => {
          const selected = i === activeIdx;
          return (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={[
                "relative h-10 w-10 overflow-hidden rounded-md border bg-white",
                selected
                  ? "border-sky-500 ring-2 ring-sky-200"
                  : "border-neutral-200",
              ].join(" ")}
              aria-pressed={selected}
              title={t.alt || title}
            >
              <Image
                src={t.src}
                alt={t.alt || title}
                fill
                className="object-contain p-1"
              />
            </button>
          );
        })}
        {gallery.length > 5 && (
          <span className="ml-1 text-xs text-neutral-500">
            +{gallery.length - 5}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <a
              href={href}
              className="line-clamp-1 text-[15px] font-medium text-neutral-900 hover:underline underline-offset-4"
            >
              {title}
            </a>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-500">
              {category}
            </p>
          </div>

          {/* price block */}
          <div className="text-right">
            <div className="text-[15px] font-semibold text-neutral-900">
              {price}
            </div>
            {oldPrice && (
              <div className="text-xs text-neutral-400 line-through">
                {oldPrice}
              </div>
            )}
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAdd?.();
            }}
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-slate-800"
          >
            ADD TO CART
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onWish?.();
            }}
            aria-label="Ajouter aux favoris"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-slate-900 hover:bg-neutral-50"
          >
            <HeartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Icons ---------------- */
function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12.1 20.3S3 15 3 8.9A4.4 4.4 0 0 1 7.4 4.5 5 5 0 0 1 12 7a5 5 0 0 1 4.6-2.5 4.4 4.4 0 0 1 4.4 4.4c0 6.1-9 11.4-9 11.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
