"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Category = { label: string; href: string };

type Props = {
  /** Liste complète des catégories. Le premier élément peut être "All". */
  categories?: Category[];
  /** Classe externe optionnelle */
  className?: string;
};

const defaultCategories: Category[] = [
  { label: "All", href: "/categories" },
  { label: "Vêtements", href: "/categories/vetements" },
  { label: "Chaussures", href: "/categories/chaussures" },
  { label: "Accessoires", href: "/categories/accessoires" },
  { label: "Beauté", href: "/categories/beaute" },
  { label: "Électronique", href: "/categories/electronique" },
  { label: "Maison", href: "/categories/maison" },
  { label: "Sport", href: "/categories/sport" },
  { label: "Jeux & Jouets", href: "/categories/jeux" },
  { label: "Informatique", href: "/categories/informatique" },
];

export default function CategoryNavbar({
  categories = defaultCategories,
  className = "",
}: Props) {
  const router = useRouter();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const href = e.target.value;
    if (href) router.push(href);
  };

  return (
    <div
      className={[
        "w-full border-b border-neutral-200 bg-white",
        "py-3 md:py-4",
        "fixed top-16 left-0 z-20",
        className,
      ].join(" ")}
    >
      <div className="flex max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="shrink-0">
          <label className="sr-only" htmlFor="cat-select">
            Catégories
          </label>
          <div className="relative">
            <select
              id="cat-select"
              onChange={handleSelect}
              className={[
                "peer block w-[210px] rounded-lg border border-neutral-300 bg-white",
                "px-3 py-2 text-sm text-neutral-900",
                "outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200",
              ].join(" ")}
              defaultValue={categories[0]?.href ?? "/categories"}
            >
              {categories.map((c) => (
                <option key={c.href} value={c.href}>
                  {c.label}
                </option>
              ))}
            </select>
            {/* petite icône chevron */}
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500">
              ▼
            </span>
          </div>
        </div>

        {/* Séparateur (optionnel) */}
        <div className="hidden h-6 w-px bg-neutral-200 md:block" />

        {/* Zone droite : Swiper catégories + flèches */}
        <div className="relative flex-1">
          {/* Flèches custom */}
          <button
            aria-label="Précédent"
            className={[
              "cat-prev absolute left-0 top-1/2 z-10 -translate-y-1/2",
              "hidden h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700",
              "hover:bg-neutral-50 md:flex",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M15.5 19.1 8.4 12l7.1-7.1-1.4-1.4L5.6 12l8.5 8.5 1.4-1.4Z" />
            </svg>
          </button>

          <button
            aria-label="Suivant"
            className={[
              "cat-next absolute right-0 top-1/2 z-10 -translate-y-1/2",
              "hidden h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700",
              "hover:bg-neutral-50 md:flex",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="m8.5 4.9 7.1 7.1-7.1 7.1 1.4 1.4 8.5-8.5L9.9 3.5 8.5 4.9Z" />
            </svg>
          </button>

          {/* Carousel */}
          <div className="mx-10 md:mx-9">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".cat-prev",
                nextEl: ".cat-next",
              }}
              slidesPerView="auto"
              spaceBetween={10}
              grabCursor
              className="!py-1"
            >
              {categories.map((c) => (
                <SwiperSlide
                  key={`slide-${c.href}`}
                  className="!w-auto" // largeur auto pour des "chips"
                >
                  <a
                    href={c.href}
                    className={[
                      "inline-flex items-center justify-center rounded-full",
                      "border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800",
                      "hover:border-emerald-400 hover:text-emerald-700",
                      "transition",
                    ].join(" ")}
                  >
                    {c.label}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
