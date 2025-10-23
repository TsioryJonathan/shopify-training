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
    <div className="bg-gray-50 dark:bg-gray-800 py-10 md:py-12">
      <div className="max-w-xl mx-auto text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Newsletter
        </h2>
        
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
          Recevez nos nouveautés et offres exclusives
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="flex-1 px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <span>OK</span>
          </button>
        </form>
      </div>
    </div>
  );
}

