"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie L.",
    comment: "Produits de qualité exceptionnelle. Livraison rapide et service client au top !",
    rating: 5
  },
  {
    name: "Jean-Paul R.",
    comment: "Je recommande vivement. Les articles correspondent parfaitement aux descriptions.",
    rating: 5
  },
  {
    name: "Sophie M.",
    comment: "Ma boutique en ligne préférée. Prix compétitifs et large choix de produits.",
    rating: 5
  }
];

export default function SocialProof() {
  return (
    <div className="py-12 md:py-16">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 text-center">
        <div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            50K+
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Clients Satisfaits
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            4.8
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Note Moyenne
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            98%
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Taux de Satisfaction
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <Quote className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-3" />
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
              {testimonial.comment}
            </p>
            
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

