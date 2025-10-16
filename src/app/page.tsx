import assets from "@/assets/images/assets";
import Carousel from "@/components/carousel/Carousel";
import Slide from "@/components/carousel/Slide";
import CategoryRounded from "@/components/home/CategoryRounded";
import MiniCategoryCard from "@/components/home/MiniCategoryCard";
import PopularProductCard from "@/components/home/PopularProductCard";
import SectionWrapper from "@/components/home/SectionWrapper";

const slides = [
  <Slide
    image={assets.heroIllus1}
    title="Produit populaire"
    price="29 900 Ar"
    key={1}
  />,
  <Slide
    image={assets.heroIllus2}
    title="Produit populaire"
    price="29 900 Ar"
    key={2}
  />,
  <Slide
    image={assets.heroIllus3}
    title="Produit populaire"
    price="29 900 Ar"
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

const mockPopularProducts = [
  {
    id: "p-001",
    title: "Wireless Earbuds, IPX8",
    price: "98 900 Ar",
    image: assets.electronicsCategory,
    href: "/p/001",
    rating: 4.6,
    reviewsCount: 213,
  },
  {
    id: "p-002",
    title: "AirPods Max",
    price: "559 900 Ar",
    image: assets.heroIllus2,
    href: "/p/002",
    rating: 4.8,
    reviewsCount: 412,
  },
  {
    id: "p-003",
    title: "BOSE BT Earphones",
    price: "289 900 Ar",
    image: assets.heroIllus3,
    href: "/p/003",
    rating: 4.4,
    reviewsCount: 178,
  },
  {
    id: "p-004",
    title: "JBL Tune 600BTNC",
    price: "199 900 Ar",
    image: assets.heroIllus1,
    href: "/p/004",
    rating: 4.3,
    reviewsCount: 95,
  },
  {
    id: "p-005",
    title: "TAGRY Bluetooth",
    price: "109 900 Ar",
    image: assets.electronicsCategory,
    href: "/p/005",
    rating: 4.2,
    reviewsCount: 268,
  },
  {
    id: "p-006",
    title: "Monster MNFLEX",
    price: "189 900 Ar",
    image: assets.heroIllus3,
    href: "/p/006",
    rating: 4.1,
    reviewsCount: 73,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen px-4 w-full flex flex-col">
      {/* Carousel */}
      <div className="md:px-10 md:grid md:grid-cols-10 w-full gap-5 ">
        <div className="col-span-2 flex flex-col gap-4">
          {categoryOverview.slice(0, 3).map((cat, index) => (
            <MiniCategoryCard key={index} title={cat.title} image={cat.image} />
          ))}
        </div>
        <div className="col-span-6 h-full">
          <Carousel slides={slides} />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          {categoryOverview.slice(3).map((cat, index) => (
            <MiniCategoryCard key={index} title={cat.title} image={cat.image} />
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <SectionWrapper title="Catégories populaires" className="mt-5 px-20!">
        <div className="flex justify-between">
          {popularCategories.map(({ title, image }) => (
            <CategoryRounded label={title} image={image} key={title} />
          ))}
        </div>
      </SectionWrapper>

      {/* Popular Products */}
      <SectionWrapper title="Produits populaires" className="mt-5 px-20!">
        <div className="flex flex-wrap gap-6">
          {mockPopularProducts.map((item) => (
            <PopularProductCard {...item} key={item.id} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
