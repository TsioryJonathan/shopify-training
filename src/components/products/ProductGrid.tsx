import React from "react";
import type { Product } from "@/types/product.t";
import ProductCardShop from "../home/PopularProductCard";

export default function ProductGrid({ data }: { data: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6">
      {data.map((p) => (
        <ProductCardShop {...p} />
      ))}
    </div>
  );
}
