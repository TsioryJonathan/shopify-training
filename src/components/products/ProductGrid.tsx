import React from "react";
import type { Product } from "@/types/product.t";
import ProductCardShop from "../home/PopularProductCard";

export default function ProductGrid({ data }: { data: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {data.map((p) => (
        <ProductCardShop {...p} key={p.id} />
      ))}
    </div>
  );
}
