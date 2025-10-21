"use client";

import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  role: string;
  image?: string | StaticImageData;
  rating: number;
  comment: string;
};

export default function TestimonialCard({ name, role, image, rating, comment }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{comment}"
      </p>
      
      <div className="flex items-center gap-3">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  );
}

