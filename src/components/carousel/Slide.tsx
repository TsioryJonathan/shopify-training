"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";

interface SlideProps {
  image?: string | StaticImageData;
  title?: string;
  price?: string;
}

export default function Slide({
  image = "https://picsum.photos/400/300?random=1",
  title = "Produit tendance",
  price = "19 900 Ar",
}: SlideProps) {
  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(`/products/${title.toLowerCase()}`);
  };

  return (
    <div
      className="relative w-full max-h-74 rounded-xl overflow-hidden h-full shadow-md group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => handleClick(title)}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay (texte en bas) */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-gray-200 text-sm">{price}</p>
      </div>
    </div>
  );
}
