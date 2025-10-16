import assets from "@/assets/images/assets";
import Carousel from "@/components/carousel/Carousel";
import Slide from "@/components/carousel/Slide";
import MiniCategoryCard from "@/components/home/MiniCategoryCard";

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

const category = [
  { title: "Vêtements", image: assets.clothesCategory },
  { title: "Chaussures", image: assets.shoesCategory },
  { title: "Accessoires", image: assets.accessoriesCategory },
  { title: "Électronique", image: assets.electronicsCategory },
  { title: "Maison", image: assets.houseCategory },
  { title: "Beauté", image: assets.beautyCategory },
];

export default function Home() {
  return (
    <div className="min-h-screen px-4">
      <div className="md:px-10 md:grid md:grid-cols-10 w-full gap-5 ">
        <div className="col-span-2 flex flex-col gap-4">
          {category.slice(0, 3).map((cat, index) => (
            <MiniCategoryCard key={index} title={cat.title} image={cat.image} />
          ))}
        </div>
        <div className="col-span-6 h-full">
          <Carousel slides={slides} />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          {category.slice(3).map((cat, index) => (
            <MiniCategoryCard key={index} title={cat.title} image={cat.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
