"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface Collection {
  name: string;
  image: StaticImageData;
  description?: string;
  link: string;
}

interface ShopByCollectionProps {
  collections: Collection[];
}

export default function ShopByCollection({ collections }: ShopByCollectionProps) {
  // Split into main feature (first) and grid (rest)
  const [featured, ...gridCollections] = collections;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {/* Featured Collection - Large */}
      {featured && (
        <Link
          href={featured.link}
          className="group relative h-[300px] md:h-[400px] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
        >
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">{featured.name}</h3>
            {featured.description && (
              <p className="text-white/95 text-sm md:text-base mb-4 group-hover:text-white transition-colors">{featured.description}</p>
            )}
            <div className="inline-flex items-center gap-2 text-sm md:text-base font-bold border-b-2 border-white pb-1 group-hover:gap-3 transition-all">
              <span>Découvrir</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid Collections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {gridCollections.slice(0, 4).map((collection, index) => (
          <Link
            key={index}
            href={collection.link}
            className="group relative h-[190px] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-base md:text-lg font-bold mb-2 group-hover:translate-y-[-2px] transition-transform duration-300">{collection.name}</h3>
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold border-b-2 border-white pb-1 group-hover:gap-3 transition-all">
                <span>Voir</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

