"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterShopify() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Merci de vous être inscrit !");
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Restez Informé
        </h2>
        
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
          Inscrivez-vous pour recevoir nos nouveautés, offres exclusives et codes promo
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <span>S'inscrire</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          En vous inscrivant, vous acceptez de recevoir nos emails marketing
        </p>
      </div>
    </div>
  );
}

