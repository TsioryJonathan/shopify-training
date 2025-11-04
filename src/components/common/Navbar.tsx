// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Heart, Menu, Wallet, Settings, LogOut, Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useAuthStore } from "@/stores/useAuthStore";
import Logo from "./Logo";

// Enhanced action icon component
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
    className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 group hover:scale-110"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-[#10b981] transition-all duration-300" />
    {itemCount !== undefined && itemCount > 0 && (
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-[10px] font-bold text-white shadow-lg animate-pulse">
        {itemCount}
      </span>
    )}
  </button>
);

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Fix hydration issue: use local state and update after mount
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuthStore();

  // Sync counts after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const updateCounts = () => {
      setCartItemsCount(useCartStore.getState().getTotalItems());
      setWishlistItemsCount(useWishlistStore.getState().items.length);
    };
    
    updateCounts();
    
    // Subscribe to store changes
    const unsubscribeCart = useCartStore.subscribe(updateCounts);
    const unsubscribeWishlist = useWishlistStore.subscribe(updateCounts);
    
    return () => {
      unsubscribeCart();
      unsubscribeWishlist();
    };
  }, []);

  const handleNavigation = (path: string) => router.push(path);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
      {/* Top banner for promos */}
      <div className="bg-gradient-to-r from-[#10b981] via-[#059669] to-[#10b981] text-white text-center py-2 px-4 animate-pulse">
        <p className="text-xs font-bold tracking-wide">
          🔥 VENTE FLASH: -70% | Livraison GRATUITE dès 50 000 Ar
        </p>
      </div>

      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" aria-label="Page d'accueil de Z-SHOP" className="flex-shrink-0">
                <Logo className="h-8 w-auto object-contain" />
              </Link>

              {/* Desktop navigation links */}
              <div className="hidden lg:flex items-center gap-6">
                <Link href="/products" className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#10b981] transition-all relative group">
                  NOUVEAUTÉS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10b981] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link href="/products" className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#10b981] transition-all relative group">
                  FEMMES
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10b981] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link href="/products" className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#10b981] transition-all relative group">
                  HOMMES
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10b981] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link href="/products" className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#10b981] transition-all relative group">
                  ENFANTS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10b981] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link href="/products" className="text-xs font-bold text-[#10b981] hover:text-[#059669] transition-all relative group">
                  VENTES 🔥
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#10b981]" />
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
              <ThemeToggle />
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
              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      handleNavigation("/auth");
                    } else {
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }
                  }}
                  className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200 group"
                  aria-label="Compte"
                >
                  {isAuthenticated && user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-[#6366F1] transition-colors"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-[#6366F1] transition-colors" />
                  )}
                </button>

                {/* User Dropdown */}
                {isAuthenticated && isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        {user?.avatar && (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-12 w-12 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{user?.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          handleNavigation("/profile");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Mon profil</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavigation("/wallet");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Wallet className="h-5 w-5" />
                        <div className="flex-1 text-left">
                          <div>Portefeuille</div>
                          {user?.wallet && (
                            <div className="text-xs text-gray-500">
                              {user.wallet.balance.toLocaleString("fr-FR")} {user.wallet.currency}
                            </div>
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          handleNavigation("/orders");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Package className="h-5 w-5" />
                        <span>Mes commandes</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavigation("/settings");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Réglages</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Se déconnecter</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
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
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#6366F1]">
              NOUVEAUTÉS
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#6366F1]">
              FEMMES
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#6366F1]">
              HOMMES
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#6366F1]">
              ENFANTS
            </Link>
            <Link href="/products" className="block py-2 text-sm font-bold text-[#6366F1]">
              VENTES 🔥
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
