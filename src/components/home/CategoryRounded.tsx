"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function CategoryRounded({
  image,
  label,
  className = "",
}: {
  image: string | StaticImageData;
  label: string;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/categories/${category.toLowerCase()}`);
  };
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center cursor-pointer group ${className}`}
      onClick={() => handleClick(label)}
    >
      {/* Category Image Circle */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-[#FF6347] transition-all duration-300">
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Label */}
      <p className="text-xs md:text-sm font-medium text-gray-700 text-center group-hover:text-[#FF6347] transition-colors duration-300 line-clamp-1">
        {label}
      </p>
    </div>
  );
}
