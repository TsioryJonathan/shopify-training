import assets from "@/assets/images/assets";
import Carousel from "@/components/carousel/Carousel";
import Slide from "@/components/carousel/Slide";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import CategoryRounded from "@/components/home/CategoryRounded";
import MiniCategoryCard from "@/components/home/MiniCategoryCard";
import PopularProductCard from "@/components/home/PopularProductCard";
import SectionWrapper from "@/components/home/SectionWrapper";
import { mockProducts } from "@/constants";

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
    ctaLink="/sales"
    key={2}
  />,
  <Slide
    image={assets.heroIllus3}
    title="Nouveautés Tendance"
    subtitle="Soyez les premiers à porter les nouvelles pièces"
    discount="-30%"
    ctaText="Voir la collection"
    ctaLink="/new-arrivals"
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

// Use products from constants
const mockPopularProducts = mockProducts.slice(0, 6);

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col pt-[136px]">
      {/* Category navbar */}
      <CategoryNavbar />
      
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
        <div className="mb-8 rounded-xl bg-gradient-to-r from-[#FF6347] to-[#FF8C69] p-6 text-white shadow-lg">
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
          subtitle="Les articles les plus vendus"
          actionLink="/products"
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockPopularProducts.map((item) => (
              <PopularProductCard {...item} key={item.id} />
            ))}
          </div>
        </SectionWrapper>

        {/* Trending Now Section */}
        <SectionWrapper 
          title="Tendances du moment 🔥" 
          subtitle="Ne manquez pas ces offres limitées"
          actionLink="/trending"
          actionText="Voir plus"
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockProducts.slice(6, 11).map((item) => (
              <PopularProductCard 
                {...item} 
                key={`trending-${item.id}`}
                discountLabel="-20%"
              />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
