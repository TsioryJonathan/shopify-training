"use client";
import React from "react";
import Image from "next/image";
import assets from "@/assets/images/assets";

export default function FooterShop() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 mt-12">
      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-[#FF6347] to-[#FF8C69]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-6 md:grid-cols-3 items-center">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Restez à la mode ! 👗
              </h3>
              <p className="text-white/90 text-sm">
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
                  placeholder="Entrez votre email"
                  className="flex-1 rounded-full border-0 px-6 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
              <button
                type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-white font-semibold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                  S'inscrire
              </button>
            </div>
              <p className="mt-3 text-xs text-white/80">
                🎁 -10% sur votre première commande en vous inscrivant !
            </p>
          </form>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-white">
        <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <Image
              src={assets.logoLight}
              alt="Z-SHOP"
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-600 mb-4 max-w-xs">
              Votre destination shopping en ligne pour les dernières tendances de mode à Madagascar
            </p>
            <div className="flex items-center gap-3 mb-6">
              <Social icon="facebook" href="#" />
              <Social icon="instagram" href="#" />
              <Social icon="tiktok" href="#" />
              <Social icon="x" href="#" />
              <Social icon="youtube" href="#" />
            </div>
          </div>

          {/* Shop */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Acheter</h4>
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
                  <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href={`/c/${slug(t)}`}>
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

          {/* Customer Service */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Service Client</h4>
            <ul className="space-y-3 text-sm">
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/support">
                  Centre d'aide
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/shipping">
                Livraison & Suivi
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/returns">
                  Retours
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/payments">
                Paiements
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/faq">
                FAQ
              </a>
            </li>
          </ul>
        </div>

          {/* About */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">À Propos</h4>
            <ul className="space-y-3 text-sm">
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/about">
                  Notre Histoire
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/careers">
                Carrières
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/partners">
                  Partenaires
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/press">
                Presse
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

          {/* Legal & Apps */}
        <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Informations</h4>
            <ul className="space-y-3 text-sm mb-6">
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/terms">
                  Conditions
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/privacy">
                  Confidentialité
              </a>
            </li>
            <li>
                <a className="text-gray-600 hover:text-[#FF6347] transition-colors" href="/cookies">
                Cookies
              </a>
            </li>
          </ul>

            {/* Payment methods */}
            <h4 className="text-sm font-bold text-gray-900 mb-3">Paiement</h4>
            <div className="flex flex-wrap gap-2">
              {["visa", "mastercard", "mvola"].map((p) => (
                <PaymentPill key={p} label={p} />
              ))}
            </div>
          </div>
        </nav>
          </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {year} Z-SHOP. Tous droits réservés. Made with ❤️ in Madagascar
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <a className="hover:text-[#FF6347] transition-colors" href="/accessibility">
                Accessibilité
              </a>
              <span className="text-gray-300">•</span>
              <a className="hover:text-[#FF6347] transition-colors" href="/sitemap">
                Plan du site
              </a>
              <span className="text-gray-300">•</span>
              <a className="hover:text-[#FF6347] transition-colors" href="/security">
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#FF6347] hover:text-white transition-all hover:scale-110"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        {svg}
      </svg>
    </a>
  );
}

function PaymentPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold capitalize text-gray-700 shadow-sm">
      {label}
    </span>
  );
}

