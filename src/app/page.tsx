import assets from "@/assets/images/assets";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import HeroShopify from "@/components/home/HeroShopify";
import TrustBadges from "@/components/home/TrustBadges";
import ShopByCollection from "@/components/home/ShopByCollection";
import MinimalProductCard from "@/components/home/MinimalProductCard";
import NewsletterShopify from "@/components/home/NewsletterShopify";
import { getRawShopifyProducts } from "@/services/shopify.service";
import { shopifyConfig } from "@/lib/shopify/client";
import Link from "next/link";

const collections = [
  { 
    name: "Nouvelle Collection", 
    image: assets.clothesCategory,
    description: "Découvrez nos dernières nouveautés",
    link: "/products?collection=new"
  },
  { name: "Mode Femme", image: assets.beautyCategory, link: "/products?category=femme" },
  { name: "Mode Homme", image: assets.electronicsCategory, link: "/products?category=homme" },
  { name: "Accessoires", image: assets.accessoriesCategory, link: "/products?category=accessoires" },
  { name: "Chaussures", image: assets.shoesCategory, link: "/products?category=chaussures" },
];

export default async function Home() {
  // 🛍️ Récupération des produits Shopify bruts depuis Shopify
  const allProducts = await getRawShopifyProducts({ first: 20 });
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-black transition-colors">
      {/* Category navbar - Fixed below main navbar */}
      <CategoryNavbar />
      
      {/* Main content with padding for fixed navbars */}
      <div className="pt-[122px]">
        {/* Shopify Status Indicator */}
        {!shopifyConfig.isConfigured && (
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm">
              <span className="text-yellow-800 dark:text-yellow-300">
                ⚠️ <strong>Mode développement</strong> - Configurez Shopify dans <code className="bg-yellow-100 dark:bg-yellow-900 px-1">.env.local</code>
              </span>
            </div>
          </div>
        )}

        {/* Hero Section - Full Width */}
        <section>
          <HeroShopify />
        </section>

        {/* Trust Badges */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </section>

        {/* Shop by Collection */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Acheter par Collection
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Découvrez nos collections exclusives
            </p>
          </div>
          <ShopByCollection collections={collections} />
        </section>

        {/* Featured Products */}
        <section className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-neutral-900 dark:to-black py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Produits Populaires
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Notre sélection du moment
                </p>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1 hover:gap-3 transition-all group"
              >
                <span>Voir tout</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <MinimalProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
                <p className="text-gray-600 dark:text-gray-400">
                  Aucun produit disponible
                </p>
              </div>
            )}

            <div className="text-center mt-10 md:hidden">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1 hover:gap-3 transition-all group"
              >
                <span>Voir tous les produits</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section>
          <NewsletterShopify />
        </section>
      </div>
    </div>
  );
}
