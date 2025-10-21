"use client";

import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Ravaka",
    role: "Cliente fidèle",
    rating: 5,
    comment: "Excellente expérience ! Les produits sont de qualité et la livraison est rapide. Je recommande vivement Z-SHOP !"
  },
  {
    name: "Andry",
    role: "Acheteur régulier",
    rating: 5,
    comment: "Le meilleur site d'e-commerce à Madagascar. Prix compétitifs et service client au top !"
  },
  {
    name: "Miora",
    role: "Nouvelle cliente",
    rating: 4,
    comment: "Très satisfaite de ma première commande. L'interface est intuitive et les produits correspondent parfaitement aux descriptions."
  }
];

export default function TestimonialsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  );
}

