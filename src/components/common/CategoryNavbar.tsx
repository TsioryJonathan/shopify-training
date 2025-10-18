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
        "w-full border-b border-gray-100 bg-white shadow-sm",
        "py-2",
        "sticky top-[112px] left-0 z-30",
        className,
      ].join(" ")}
    >
      <div className="flex max-w-[1400px] mx-auto items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile Category Dropdown */}
        <div className="md:hidden shrink-0">
          <label className="sr-only" htmlFor="cat-select">
            Catégories
          </label>
          <div className="relative">
            <select
              id="cat-select"
              onChange={handleSelect}
              className={[
                "peer block w-full rounded-lg border border-gray-200 bg-white",
                "px-3 py-2 text-sm text-gray-900",
                "outline-none transition focus:border-[#FF6347] focus:ring-1 focus:ring-[#FF6347]",
              ].join(" ")}
              defaultValue={categories[0]?.href ?? "/categories"}
            >
              {categories.map((c) => (
                <option key={c.href} value={c.href}>
                  {c.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Desktop Category Pills */}
        <div className="hidden md:block relative flex-1 overflow-hidden">
          {/* Navigation Arrows */}
          <button
            aria-label="Précédent"
            className={[
              "cat-prev absolute left-0 top-1/2 z-10 -translate-y-1/2",
              "h-7 w-7 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700",
              "hover:bg-gray-50 hover:border-[#FF6347] hover:text-[#FF6347] hidden md:flex transition-all shadow-sm",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M15.5 19.1 8.4 12l7.1-7.1-1.4-1.4L5.6 12l8.5 8.5 1.4-1.4Z" />
            </svg>
          </button>

          <button
            aria-label="Suivant"
            className={[
              "cat-next absolute right-0 top-1/2 z-10 -translate-y-1/2",
              "h-7 w-7 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700",
              "hover:bg-gray-50 hover:border-[#FF6347] hover:text-[#FF6347] hidden md:flex transition-all shadow-sm",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="m8.5 4.9 7.1 7.1-7.1 7.1 1.4 1.4 8.5-8.5L9.9 3.5 8.5 4.9Z" />
            </svg>
          </button>

          {/* Carousel */}
          <div className="mx-8">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".cat-prev",
                nextEl: ".cat-next",
              }}
              slidesPerView="auto"
              spaceBetween={8}
              grabCursor
              className="!py-2"
            >
              {categories.map((c) => (
                <SwiperSlide
                  key={`slide-${c.href}`}
                  className="!w-auto"
                >
                  <a
                    href={c.href}
                    className={[
                      "inline-flex items-center justify-center rounded-full",
                      "border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700",
                      "hover:border-[#FF6347] hover:bg-[#FF6347] hover:text-white",
                      "transition-all duration-200",
                      c.label === "All" && "bg-[#FF6347] text-white border-[#FF6347]",
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
