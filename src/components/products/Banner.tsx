import Image, { StaticImageData } from "next/image";
import React from "react";

export default function Banner({
  image,
  alt,
}: {
  image: string | StaticImageData;
  alt: string;
}) {
  return (
    <div className="w-[calc(100vw-240px)] h-64 overflow-hidden bg-[#8fd5fd]">
      <Image src={image} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
}
