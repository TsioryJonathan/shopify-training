"use client";
import React from "react";
import Image from "next/image";
import assets from "@/assets/images/assets";

export default function FooterShop() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors">
      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-3 items-center">
            <div className="md:col-span-1">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <span className="text-2xl">👗</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Restez à la mode !
              </h3>
              <p className="text-white/95 text-base">
                Recevez les dernières tendances et offres exclusives
            </p>
          </div>

          <form
            className="md:col-span-2"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: handle submit
            }}
            aria-label="Inscription newsletter"
          >
              <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="newsletter"
                type="email"
                required
                  placeholder="Entrez votre adresse email"
                  className="flex-1 rounded-full border-0 px-6 py-3.5 text-gray-900 dark:text-white dark:bg-gray-800/90 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl transition-all"
              />
              <button
                type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-gray-900 px-8 py-3.5 font-bold hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                  <span>S'inscrire</span>
                  <span>→</span>
              </button>
            </div>
              <p className="mt-4 text-sm text-white/90 font-medium">
                🎁 -10% sur votre première commande en vous inscrivant !
            </p>
          </form>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-white dark:bg-gray-900 transition-colors">
        <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <Image
              src={assets.logoLight}
              alt="Z-SHOP"
              className="h-10 w-auto mb-5 dark:brightness-0 dark:invert"
            />
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
              Votre destination shopping en ligne pour les dernières tendances de mode à Madagascar
            </p>
            <div className="flex items-center gap-3">
              <Social icon="facebook" href="#" />
              <Social icon="instagram" href="#" />
              <Social icon="tiktok" href="#" />
              <Social icon="x" href="#" />
              <Social icon="youtube" href="#" />
            </div>
          </div>

          {/* Shop */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5">Acheter</h4>
            <ul className="space-y-3 text-sm">
            {[
              "Vêtements",
              "Chaussures",
              "Accessoires",
              "Beauté",
              "Électronique",
              "Maison",
            ].map((t) => (
              <li key={t}>
                  <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors hover:translate-x-1 inline-block" href="/products">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

          {/* Customer Service */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5">Service Client</h4>
            <ul className="space-y-3 text-sm">
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                  Centre d'aide
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Livraison & Suivi
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                  Retours
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Paiements
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                FAQ
              </a>
            </li>
          </ul>
        </div>

          {/* About */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5">À Propos</h4>
            <ul className="space-y-3 text-sm">
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                  Notre Histoire
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Carrières
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                  Partenaires
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Presse
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>

          {/* Legal & Apps */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5">Informations</h4>
            <ul className="space-y-3 text-sm mb-6">
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                  Conditions
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Confidentialité
              </a>
            </li>
            <li>
                <a className="text-gray-600 dark:text-gray-400 hover:text-[#10b981] transition-colors cursor-not-allowed opacity-60 hover:translate-x-1 inline-block" href="#">
                Cookies
              </a>
            </li>
          </ul>

            {/* Payment methods */}
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Paiement</h4>
            <div className="flex flex-wrap gap-2">
              {["visa", "mastercard", "mvola"].map((p) => (
                <PaymentPill key={p} label={p} />
              ))}
            </div>
          </div>
        </nav>
          </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {year} Z-SHOP. Tous droits réservés. Made with ❤️ in Madagascar
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <a className="hover:text-[#6366F1] transition-colors cursor-not-allowed opacity-60" href="#">
                Accessibilité
              </a>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <a className="hover:text-[#6366F1] transition-colors cursor-not-allowed opacity-60" href="#">
                Plan du site
              </a>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <a className="hover:text-[#6366F1] transition-colors cursor-not-allowed opacity-60" href="#">
                Sécurité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- helpers & small components ---------- */
function slug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Social({
  icon,
  href,
}: {
  icon: "facebook" | "instagram" | "tiktok" | "x" | "youtube";
  href: string;
}) {
  const svg = {
    facebook: (
      <path d="M15 8h-2V6c0-.6.4-1 1-1h1V3h-2a3 3 0 0 0-3 3v2H8v3h2v8h3v-8h2l1-3Z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" />
      </>
    ),
    tiktok: (
      <path d="M15 3h3c.2 1.7 1.4 3.2 3 3.7V9c-1.6-.1-3-.6-4-1.4v6.2a5.8 5.8 0 1 1-5-5.7V11a2.8 2.8 0 1 0 2 2.7V3Z" />
    ),
    x: (
      <path d="M16.7 3H19l-5.8 6.6L20 21h-6.6l-4.1-5.6L4.6 21H3l6.3-7.2L4 3h6.6l3.7 5.1L16.7 3z" />
    ),
    youtube: (
      <path d="M22 12c0-2.6-.3-4.2-1-5-1-1.1-3.2-1.3-7-1.3H10C6.2 5.7 4 5.9 3 7 2.3 7.8 2 9.4 2 12s.3 4.2 1 5c1 1.1 3.2 1.3 7 1.3h4c3.8 0 6-.2 7-1.3.7-.8 1-2.4 1-5Zm-12 3.2V8.8L15.5 12 10 15.2Z" />
    ),
  }[icon];

  return (
    <a
      href={href}
      aria-label={icon}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-[#10b981] hover:to-[#059669] hover:text-white transition-all hover:scale-110 shadow-md hover:shadow-lg"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {svg}
      </svg>
    </a>
  );
}

function PaymentPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-bold capitalize text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:border-[#10b981] transition-all">
      {label}
    </span>
  );
}

