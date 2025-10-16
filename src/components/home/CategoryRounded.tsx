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
      className={`flex flex-col gap-3 items-center justify-center cursor-pointer group ${className}`}
      onClick={() => handleClick(label)}
    >
      {/* --- Image ronde avec effet hover --- */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover group-hover:brightness-90 transition-all duration-300"
        />
      </div>

      {/* --- Label --- */}
      <p className="text-base md:text-lg font-semibold text-center tracking-tight group-hover:text-black/70 transition-colors duration-300">
        {label}
      </p>
    </div>
  );
}
