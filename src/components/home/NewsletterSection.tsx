"use client";

import { Mail, Send, Gift } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Merci de vous être inscrit ! Vous recevrez bientôt nos offres exclusives.");
      setEmail("");
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#5B21B6] rounded-3xl p-8 md:p-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
          <Mail className="w-8 h-8" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Rejoignez Notre Communauté
        </h2>

        {/* Description */}
        <p className="text-lg text-white/90 mb-8">
          Inscrivez-vous à notre newsletter et recevez <strong>10% de réduction</strong> sur votre première commande, 
          plus un accès exclusif à nos offres spéciales et nouveautés.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span className="text-sm">Offres exclusives</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span className="text-sm">Codes promo</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span className="text-sm">Accès anticipé</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium"
            />
          </div>
          <button
            type="submit"
            className="group px-8 py-4 bg-white text-[#6366F1] rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>S'inscrire</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Privacy */}
        <p className="text-xs text-white/70 mt-4">
          En vous inscrivant, vous acceptez notre politique de confidentialité. Désinscription possible à tout moment.
        </p>
      </div>
    </div>
  );
}

