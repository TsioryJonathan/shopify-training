import assets from "@/assets/images/assets";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import HeroSection from "@/components/home/HeroSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductGrid from "@/components/home/ProductGrid";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import BrandsSection from "@/components/home/BrandsSection";
import { getProducts } from "@/services/shopify.service";
import { shopifyConfig } from "@/lib/shopify/client";
import Link from "next/link";
import ArrowRightIcon from "@/components/home/ArrowRightIcon";

const categories = [
  { title: "Vêtements", image: assets.clothesCategory, count: 2500 },
  { title: "Chaussures", image: assets.shoesCategory, count: 850 },
  { title: "Accessoires", image: assets.accessoriesCategory, count: 1200 },
  { title: "Électronique", image: assets.electronicsCategory, count: 680 },
  { title: "Maison", image: assets.houseCategory, count: 950 },
  { title: "Beauté", image: assets.beautyCategory, count: 420 },
];

export default async function Home() {
  // 🛍️ Récupération des produits depuis Shopify
  const allProducts = await getProducts({ first: 20 });
  const featuredProducts = allProducts.slice(0, 8);
  const trendingProducts = allProducts.slice(8, 16);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Category navbar - Fixed below main navbar */}
      <CategoryNavbar />
      
      {/* Main content with padding for fixed navbars */}
      <div className="pt-[124px]">
        {/* Shopify Status Indicator */}
        {!shopifyConfig.isConfigured && (
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                    Mode Développement Actif
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Shopify n'est pas configuré. Les produits affichés sont des exemples. 
                    Configurez vos credentials dans <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded text-xs">
                      .env.local
                    </code> pour voir vos vrais produits Shopify.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          {/* Hero Section */}
          <section className="mt-6 mb-16">
            <HeroSection />
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <StatsSection />
          </section>

          {/* Categories Section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Parcourir par Catégorie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Trouvez exactement ce que vous cherchez parmi nos collections
              </p>
            </div>
            <CategoryShowcase categories={categories} />
          </section>

          {/* Featured Products Section */}
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                  <span>✨</span>
                  <span>Sélection Premium</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Produits en Vedette
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {shopifyConfig.isConfigured 
                    ? "Découvrez nos produits les plus populaires" 
                    : "Exemples de produits disponibles"}
                </p>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-2 text-[#6366F1] dark:text-[#8B5CF6] font-semibold hover:gap-3 transition-all group"
              >
                <span>Voir tout</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {featuredProducts.length > 0 ? (
              <>
                <ProductGrid products={featuredProducts} columns={4} />
                <div className="mt-8 text-center md:hidden">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
                  >
                    <span>Voir tous les produits</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Aucun produit disponible. Configurez Shopify ou ajoutez des produits à votre boutique.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 mt-6 text-[#6366F1] dark:text-[#8B5CF6] font-semibold hover:gap-3 transition-all"
                >
                  <span>Voir le catalogue</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <CTASection />
          </section>

          {/* Trending Products Section */}
          {trendingProducts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    <span>🔥</span>
                    <span>Hot Right Now</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Tendances du Moment
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Les produits qui font le buzz en ce moment
                  </p>
                </div>
                <Link
                  href="/products?sort=trending"
                  className="hidden md:inline-flex items-center gap-2 text-[#6366F1] dark:text-[#8B5CF6] font-semibold hover:gap-3 transition-all group"
                >
                  <span>Explorer tout</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <ProductGrid products={trendingProducts} columns={4} />
            </section>
          )}

          {/* Testimonials Section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                <span>⭐</span>
                <span>Avis Clients</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Ce Que Disent Nos Clients
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Plus de 50 000 clients satisfaits nous font confiance
              </p>
            </div>
            <TestimonialsSection />
          </section>

          {/* Newsletter Section */}
          <section className="mb-16">
            <NewsletterSection />
          </section>

          {/* Brands Section */}
          <section>
            <BrandsSection />
          </section>
        </div>
      </div>
    </div>
  );
}
