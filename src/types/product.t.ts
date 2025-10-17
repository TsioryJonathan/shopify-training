import { StaticImageData } from "next/image";

export type Product = {
  id: string;
  title: string;
  price: string;
  description?: string;
  image: string | StaticImageData;
  href: string;
  rating?: number;
  reviewsCount?: number;
};
