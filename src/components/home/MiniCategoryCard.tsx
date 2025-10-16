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
      className={`relative w-full max-w-md h-22 rounded-xl overflow-hidden shadow-md group cursor-pointer ${className}`}
      onClick={() => handleClick(title)}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-y-0 left-0 w-full flex items-center justify-center ">
        <div className="relative w-full flex justify-center bg-black/50">
          <div className="relative z-10 px-6 py-2 rounded-md ">
            <p className="text-white text-lg font-semibold text-start">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
