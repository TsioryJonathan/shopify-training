import assets from "@/assets/images/assets";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import HeroShopify from "@/components/home/HeroShopify";
import TrustBadges from "@/components/home/TrustBadges";
import ShopByCollection from "@/components/home/ShopByCollection";
import MinimalProductCard from "@/components/home/MinimalProductCard";
import NewsletterShopify from "@/components/home/NewsletterShopify";
import { getProducts } from "@/services/shopify.service";
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
  // 🛍️ Récupération des produits depuis Shopify
  const allProducts = await getProducts({ first: 20 });
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
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Acheter par Collection
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Découvrez nos collections
            </p>
          </div>
          <ShopByCollection collections={collections} />
        </section>

        {/* Featured Products */}
        <section className="bg-gray-50 dark:bg-neutral-900 py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  Produits Populaires
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Notre sélection du moment
                </p>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-block text-sm font-semibold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1 hover:opacity-70 transition-opacity"
              >
                Voir tout
              </Link>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <MinimalProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-400">
                  Aucun produit disponible
                </p>
              </div>
            )}

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/products"
                className="inline-block text-sm font-semibold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1"
              >
                Voir tous les produits
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
