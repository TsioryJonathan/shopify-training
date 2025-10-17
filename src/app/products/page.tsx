import assets from "@/assets/images/assets";
import Banner from "@/components/products/Banner";
import ProductGrid from "@/components/products/ProductGrid";
import SectionWrapper from "@/components/products/SectionWrapper";
import mockProducts from "@/data/mockProducts";
import React from "react";


export default function Products() {
  return (
    <div className="min-h-screen mb-20">
      {/* <Banner image={assets.productBanner} alt="Product Banner" /> */}
      <SectionWrapper
        title="Découvrez nos produits"
        divider
        className="pl-5"
        description="Les meilleurs produits aux meilleurs prix."
      >
        <ProductGrid data={mockProducts} />
      </SectionWrapper>
    </div>
  );
}
