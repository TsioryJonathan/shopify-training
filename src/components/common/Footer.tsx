"use client";
import React from "react";
import Image from "next/image";
import assets from "@/assets/images/assets";

export default function FooterShop() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-neutral-700 border-t border-neutral-200">
      {/* Top band: newsletter */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3">
          <div>
            <Image
              src={assets.logoLight}
              alt="Z-SHOP"
              className="w-30 object-cover"
            />
            {/* <div className="text-2xl font-bold text-neutral-900">Z-SHOP</div> */}
            <p className="mt-2 text-sm text-neutral-600">
              Des produits sélectionnés avec soin, livrés rapidement partout à
              Madagascar.
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
            <label
              htmlFor="newsletter"
              className="block text-sm font-medium text-neutral-900"
            >
              Inscrivez-vous à notre newsletter
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Votre email"
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-700 transition"
              >
                S’abonner
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              En vous inscrivant, vous acceptez de recevoir nos emails. Vous
              pouvez vous désinscrire à tout moment.
            </p>
          </form>
        </div>
      </section>

      {/* Middle: link columns */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">Catégories</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Vêtements",
              "Chaussures",
              "Accessoires",
              "Beauté",
              "Électronique",
              "Maison",
            ].map((t) => (
              <li key={t}>
                <a className="hover:text-neutral-900" href={`/c/${slug(t)}`}>
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-neutral-900">Aide</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-neutral-900" href="/support">
                Centre d’aide
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/shipping">
                Livraison & Suivi
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/returns">
                Retours & Remboursements
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/payments">
                Paiements
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/faq">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-neutral-900">Entreprise</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-neutral-900" href="/about">
                À propos
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/careers">
                Carrières
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/partners">
                Devenir partenaire
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/press">
                Presse
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-neutral-900">Légal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-neutral-900" href="/terms">
                Conditions d’utilisation
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/privacy">
                Politique de confidentialité
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/cookies">
                Cookies
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/legal">
                Mentions légales
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/compliance">
                Conformité
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-neutral-900">
            Rejoignez-nous
          </h4>
          <div className="mt-4 flex items-center gap-3">
            <Social icon="facebook" href="#" />
            <Social icon="instagram" href="#" />
            <Social icon="tiktok" href="#" />
            <Social icon="x" href="#" />
            <Social icon="youtube" href="#" />
          </div>

          <h4 className="mt-8 text-sm font-semibold text-neutral-900">
            Moyens de paiement
          </h4>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {["visa", "mastercard", "paypal", "mvola", "orange", "airtel"].map(
              (p) => (
                <PaymentPill key={p} label={p} />
              )
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-sm">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
            >
              {/* App Store icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c2.3 0 2.6 0 3.5.1 2 .2 3 .9 3.8 1.7.8.8 1.5 1.8 1.7 3.8.1.9.1 1.2.1 3.5s0 2.6-.1 3.5c-.2 2-1 3-1.7 3.8-.8.8-1.8 1.5-3.8 1.7-.9.1-1.2.1-3.5.1s-2.6 0-3.5-.1c-2-.2-3-.9-3.8-1.7-.8-.8-1.5-1.8-1.7-3.8C3 14.6 3 14.3 3 12s0-2.6.1-3.5c.2-2 1-3 1.7-3.8C5.6 3.9 6.6 3.2 8.6 3c.9-.1 1.2-.1 3.4-.1H12Z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m1 21 22-9L1 3v7l15 1-15 3v7z" />
              </svg>
              Google Play
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* langue/devise */}
            <SelectLike label="Français (MG)" />
            <SelectLike label="MGA – Ariary" />
          </div>
        </div>
      </nav>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-500">
            © {year} Z-SHOP. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-4 text-sm">
            <li>
              <a className="hover:text-neutral-900" href="/accessibility">
                Accessibilité
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/sitemap">
                Plan du site
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/security">
                Sécurité
              </a>
            </li>
            <li>
              <a className="hover:text-neutral-900" href="/status">
                Statut
              </a>
            </li>
          </ul>
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {svg}
      </svg>
    </a>
  );
}

function PaymentPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium capitalize">
      {label}
    </span>
  );
}

function SelectLike({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-50"
      aria-haspopup="listbox"
      aria-label={label}
    >
      {label}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-neutral-500"
      >
        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
      </svg>
    </button>
  );
}
