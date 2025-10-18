"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type MiniCategoryCardProps = {
  image: string | StaticImageData;
  title: string;
  className?: string;
};

export default function MiniCategoryCard({
  image,
  title,
  className = "",
}: MiniCategoryCardProps) {
  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(`/category/${title.toLowerCase()}`);
  };

  return (
    <div
      className={`relative w-full h-24 rounded-lg overflow-hidden shadow-sm group cursor-pointer transition-all hover:shadow-md ${className}`}
      onClick={() => handleClick(title)}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end justify-center p-3">
        <p className="text-white text-sm font-bold tracking-wide drop-shadow-lg">
          {title}
        </p>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-[#FF6347]/0 group-hover:bg-[#FF6347]/10 transition-colors duration-300" />
    </div>
  );
}
