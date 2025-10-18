// components/Navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Heart, Menu } from "lucide-react";
import { useState } from "react";

import assets from "@/assets/images/assets";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";

// Shein-style action icon component
const ActionIcon = ({
  icon: Icon,
  onClick,
  itemCount,
  label,
}: {
  icon: React.ElementType;
  onClick?: () => void;
  itemCount?: number;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="relative p-2 hover:bg-gray-50 rounded-full transition-all duration-200 group"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-gray-700 group-hover:text-[#FF6347] transition-colors" />
    {itemCount !== undefined && itemCount > 0 && (
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6347] text-[10px] font-semibold text-white">
        {itemCount}
      </span>
    )}
  </button>
);

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const wishlistItemsCount = useWishlistStore((state) => state.items.length);

  const handleNavigation = (path: string) => router.push(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top banner for promos (Shein-style) */}
      <div className="bg-gradient-to-r from-[#FF6347] to-[#FF8C69] text-white text-center py-2 px-4">
        <p className="text-xs sm:text-sm font-medium">
          🔥 VENTE FLASH: Jusqu'à -70% sur une sélection d'articles | Livraison GRATUITE dès 50 000 Ar
        </p>
      </div>

      <nav className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" aria-label="Page d'accueil de Z-SHOP" className="flex-shrink-0">
                <Image
                  src={assets.logoLight}
                  alt="Z-shop Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>

              {/* Desktop navigation links */}
              <div className="hidden lg:flex items-center gap-6">
                <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#FF6347] transition-colors">
                  NOUVEAUTÉS
                </Link>
                <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#FF6347] transition-colors">
                  FEMMES
                </Link>
                <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#FF6347] transition-colors">
                  HOMMES
                </Link>
                <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#FF6347] transition-colors">
                  ENFANTS
                </Link>
                <Link href="/products" className="text-sm font-bold text-[#FF6347] hover:text-[#E55347] transition-colors">
                  VENTES 🔥
                </Link>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <SearchBar />
            </div>

            {/* Right: Action Icons */}
            <div className="flex items-center gap-1">
              <ActionIcon 
                icon={Search} 
                label="Rechercher"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <ActionIcon 
                icon={Heart} 
                label="Favoris"
                onClick={() => handleNavigation("/wishlist")}
                itemCount={wishlistItemsCount}
              />
              <ActionIcon
                icon={ShoppingBag}
                label="Panier"
                onClick={() => handleNavigation("/cart")}
                itemCount={cartItemsCount}
              />
              <ActionIcon
                icon={User}
                label="Compte"
                onClick={() => handleNavigation("/profile")}
              />
              
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-50 rounded-full transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#FF6347]">
              NOUVEAUTÉS
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#FF6347]">
              FEMMES
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#FF6347]">
              HOMMES
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#FF6347]">
              ENFANTS
            </Link>
            <Link href="/products" className="block py-2 text-sm font-bold text-[#FF6347]">
              VENTES 🔥
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
