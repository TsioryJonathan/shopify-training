import assets from "@/assets/images/assets";
import Carousel from "@/components/carousel/Carousel";
import Slide from "@/components/carousel/Slide";
import CategoryRounded from "@/components/home/CategoryRounded";
import MiniCategoryCard from "@/components/home/MiniCategoryCard";
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

export default function Home() {
  return (
    <div className="min-h-screen px-4 w-full flex flex-col">
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

      <SectionWrapper title="Catégories populaires" className="mt-5 px-20!">
        <div className="flex justify-between">
          {popularCategories.map(({ title, image }) => (
            <CategoryRounded label={title} image={image} key={title} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
