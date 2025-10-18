import { StaticImageData } from "next/image";

export type Product = {
  id: string;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  description?: string;
  image: string | StaticImageData;
  href: string;
  rating?: number;
  reviewsCount?: number;
  features?: string[];
  specifications?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  discount?: string;
};
