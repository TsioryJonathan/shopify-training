import assets from "@/assets/images/assets";
import Carousel from "@/components/carousel/Carousel";
import Slide from "@/components/carousel/Slide";

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

export default function Home() {
  return (
    <div className="min-h-screen px-4">
      <div className="lg:px-50">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}
