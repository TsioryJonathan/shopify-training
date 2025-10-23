import assets from "@/assets/images/assets";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import HeroShopify from "@/components/home/HeroShopify";
import TrustBadges from "@/components/home/TrustBadges";
import ShopByCollection from "@/components/home/ShopByCollection";
import MinimalProductCard from "@/components/home/MinimalProductCard";
import BrandStory from "@/components/home/BrandStory";
import SocialProof from "@/components/home/SocialProof";
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
  const newArrivals = allProducts.slice(8, 16);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-gray-900 transition-colors">
      {/* Category navbar - Fixed below main navbar */}
      <CategoryNavbar />
      
      {/* Main content with padding for fixed navbars */}
      <div className="pt-[152px]">
        {/* Shopify Status Indicator */}
        {!shopifyConfig.isConfigured && (
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Mode développement :</strong> Shopify n'est pas configuré. 
                  Configurez vos credentials dans <code className="bg-yellow-100 dark:bg-yellow-900 px-1">.env.local</code>
                </div>
          </div>
            </div>
          </div>
        )}

        {/* Hero Section - Full Width */}
        <section className="mb-0">
          <HeroShopify />
        </section>

        {/* Trust Badges */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </section>

        {/* Shop by Collection */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Acheter par Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Découvrez nos collections soigneusement sélectionnées
            </p>
          </div>
          <ShopByCollection collections={collections} />
        </section>

        {/* Featured Products */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Nos Coups de Cœur
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {shopifyConfig.isConfigured 
                  ? "Découvrez notre sélection premium" 
                  : "Exemples de produits"}
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
            <div className="text-center py-20 bg-white dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                Aucun produit disponible. Configurez Shopify.
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
        </section>

        {/* Brand Story */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <BrandStory />
        </section>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 block mb-2">
                  Nouveautés
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Nouvelles Arrivées
                </h2>
              </div>
              <Link
                href="/products?sort=new"
                className="hidden md:inline-block text-sm font-semibold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1 hover:opacity-70 transition-opacity"
              >
                Tout voir
              </Link>
        </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product) => (
                <MinimalProductCard key={product.id} {...product} />
            ))}
          </div>
          </section>
        )}

        {/* Social Proof */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SocialProof />
        </section>

        {/* Newsletter */}
        <section className="mb-0">
          <NewsletterShopify />
        </section>

        {/* Final CTA Banner */}
        <section className="relative h-[400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Prêt à Découvrir Notre Collection ?
              </h2>
              <Link
                href="/products"
                className="inline-block bg-white text-gray-900 px-10 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explorer Maintenant
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
