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
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] mb-4">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Restez informé
        </h2>
        
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
          Recevez nos nouveautés et offres exclusives directement dans votre boîte mail
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre adresse email"
            required
            className="flex-1 px-5 py-3.5 text-sm border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all shadow-sm hover:shadow-md"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold rounded-full hover:from-[#059669] hover:to-[#047857] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <span>S'inscrire</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          🎁 Recevez -10% sur votre première commande en vous inscrivant !
        </p>
      </div>
    </div>
  );
}

