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
          className="group relative h-[300px] md:h-[400px] overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-1">{featured.name}</h3>
            {featured.description && (
              <p className="text-white/90 text-xs md:text-sm mb-3">{featured.description}</p>
            )}
            <div className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold border-b border-white pb-1 group-hover:gap-2 transition-all">
              <span>Découvrir</span>
              <span>→</span>
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
            className="group relative h-[190px] overflow-hidden bg-gray-100 dark:bg-gray-800"
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 className="text-base font-bold mb-1">{collection.name}</h3>
              <div className="inline-flex items-center gap-1 text-xs font-semibold border-b border-white pb-1 group-hover:gap-2 transition-all">
                <span>Voir</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

