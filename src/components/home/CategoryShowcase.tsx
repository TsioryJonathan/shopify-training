"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

interface Category {
  title: string;
  image: StaticImageData;
  count?: number;
  link?: string;
}

interface CategoryShowcaseProps {
  categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={category.link || `/products?category=${category.title.toLowerCase()}`}
          className="group"
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-[#6366F1] dark:hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 group-hover:from-[#6366F1]/80 group-hover:via-[#8B5CF6]/40 transition-all" />
              <Image
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Hover Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-[#6366F1]" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#6366F1] dark:group-hover:text-[#8B5CF6] transition-colors">
                {category.title}
              </h3>
              {category.count !== undefined && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {category.count}+ produits
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

