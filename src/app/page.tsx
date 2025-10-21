import assets from "@/assets/images/assets";
import Carousel from "@/components/carousel/Carousel";
import Slide from "@/components/carousel/Slide";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import CategoryRounded from "@/components/home/CategoryRounded";
import MiniCategoryCard from "@/components/home/MiniCategoryCard";
import PopularProductCard from "@/components/home/PopularProductCard";
import SectionWrapper from "@/components/home/SectionWrapper";
import FeaturesSection from "@/components/home/FeaturesSection";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { getProducts } from "@/services/shopify.service";
import { shopifyConfig } from "@/lib/shopify/client";

const slides = [
  <Slide
    image={assets.heroIllus1}
    title="Collection Été 2024"
    subtitle="Découvrez les dernières tendances mode"
    price="29 900 Ar"
    discount="-50%"
    ctaText="Découvrir"
    ctaLink="/products"
    key={1}
  />,
  <Slide
    image={assets.heroIllus2}
    title="Offres Spéciales"
    subtitle="Jusqu'à 70% de réduction sur une sélection"
    discount="-70%"
    ctaText="Profiter maintenant"
    ctaLink="/products"
    key={2}
  />,
  <Slide
    image={assets.heroIllus3}
    title="Nouveautés Tendance"
    subtitle="Soyez les premiers à porter les nouvelles pièces"
    discount="-30%"
    ctaText="Voir la collection"
    ctaLink="/products"
    key={3}
  />,
];

const categoryOverview = [
  { title: "Vêtements", image: assets.clothesCategory },
  { title: "Chaussures", image: assets.shoesCategory },
  { title: "Accessoires", image: assets.accessoriesCategory },
  { title: "Électronique", image: assets.electronicsCategory },
  { title: "Maison", image: assets.houseCategory },
  { title: "Beauté", image: assets.beautyCategory },
];

const popularCategories = [
  { title: "Vêtements", image: assets.clothesCategory },
  { title: "Chaussures", image: assets.shoesCategory },
  { title: "Accessoires", image: assets.accessoriesCategory },
  { title: "Électronique", image: assets.electronicsCategory },
  { title: "Maison", image: assets.houseCategory },
  { title: "Beauté", image: assets.beautyCategory },
];

export default async function Home() {
  // 🛍️ Récupération des produits depuis Shopify
  const allProducts = await getProducts({ first: 20 });
  const popularProducts = allProducts.slice(0, 6);
  const trendingProducts = allProducts.slice(6, 11);
  return (
    <div className="min-h-screen w-full flex flex-col pt-[136px] bg-white dark:bg-gray-900 transition-colors">
      {/* Category navbar */}
      <CategoryNavbar />
      
      {/* Shopify Status Indicator */}
      {!shopifyConfig.isConfigured && (
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Mode développement :</strong> Shopify n'est pas configuré. Les produits affichés sont des exemples. 
              Configurez vos credentials dans <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">.env.local</code> pour voir vos vrais produits.
            </p>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Hero Carousel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6 mb-8">
          {/* Left sidebar - Mini categories */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-3">
            {categoryOverview.slice(0, 3).map((cat, index) => (
              <MiniCategoryCard key={index} title={cat.title} image={cat.image} />
            ))}
          </div>

          {/* Center - Main carousel */}
          <div className="col-span-1 lg:col-span-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Carousel slides={slides} />
            </div>
          </div>

          {/* Right sidebar - Mini categories */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-3">
            {categoryOverview.slice(3).map((cat, index) => (
              <MiniCategoryCard key={index} title={cat.title} image={cat.image} />
            ))}
          </div>
        </div>

        {/* Flash Sale Banner */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-6 text-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">⚡ Vente Flash</h2>
              <p className="text-white/90">Ne manquez pas nos offres exclusives - Stock limité !</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">12</div>
                <div className="text-xs opacity-90">HEURES</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">34</div>
                <div className="text-xs opacity-90">MINUTES</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">56</div>
                <div className="text-xs opacity-90">SECONDES</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <SectionWrapper 
          title="Acheter par catégorie" 
          subtitle="Trouvez ce que vous cherchez"
          className="mb-12"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
            {popularCategories.map(({ title, image }) => (
              <CategoryRounded label={title} image={image} key={title} />
            ))}
          </div>
        </SectionWrapper>

        {/* Popular Products */}
        <SectionWrapper 
          title="Produits populaires" 
          subtitle={shopifyConfig.isConfigured ? "Vos derniers produits Shopify" : "Exemples de produits"}
          actionLink="/products"
          className="mb-12"
        >
          {popularProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {popularProducts.map((item) => (
                <PopularProductCard {...item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                Aucun produit disponible. Configurez Shopify ou ajoutez des produits à votre boutique.
              </p>
            </div>
          )}
        </SectionWrapper>

        {/* Trending Now Section */}
        <SectionWrapper 
          title="Tendances du moment 🔥" 
          subtitle="Ne manquez pas ces offres limitées"
          actionLink="/products"
          actionText="Voir plus"
          className="mb-12"
        >
          {trendingProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trendingProducts.map((item) => (
                <PopularProductCard 
                  {...item} 
                  key={`trending-${item.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                Aucun produit tendance disponible.
              </p>
            </div>
          )}
        </SectionWrapper>

        {/* Features Section */}
        <SectionWrapper 
          title="Pourquoi choisir Z-SHOP ?" 
          subtitle="Votre satisfaction est notre priorité"
          className="mb-12"
        >
          <FeaturesSection />
        </SectionWrapper>

        {/* Promo Banner */}
        <div className="mb-12">
          <PromoBanner />
        </div>

        {/* Testimonials Section */}
        <SectionWrapper 
          title="Ce que disent nos clients" 
          subtitle="Des milliers de clients satisfaits"
          className="mb-12"
        >
          <TestimonialsSection />
        </SectionWrapper>

        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Restez informé de nos nouveautés
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et recevez en exclusivité nos offres spéciales, nouveautés et codes promo.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                S'inscrire
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </div>
        </div>

        {/* Brands Section */}
        <SectionWrapper 
          title="Nos marques partenaires" 
          subtitle="Découvrez nos collaborations"
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                  Logo {i}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
