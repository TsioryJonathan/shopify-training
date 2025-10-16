"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import assets from "@/assets/images/assets";

const IconButton = ({
  icon: Icon,
  onClick,
  className = "",
}: {
  icon: React.ElementType;
  onClick?: () => void;
  className?: string;
}) => (
  <Button
    size="icon"
    onClick={onClick}
    className={`transition-transform hover:scale-110 cursor-pointer bg-transparent! ${className}`}
  >
    <Icon className="h-7 w-7" />
  </Button>
);

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => router.push(path);

  return (
    <nav className="fixed top-0 z-50 w-screen bg-black border-b shadow-sm overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* --- Logo --- */}
          <Link href="/">
            <Image
              src={assets.logoDark}
              alt="Z-shop"
              className="w-40 object-contain"
            />
          </Link>

          {/* --- Desktop Search Bar --- */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-10 bg-amber-50"
              />
            </div>
          </div>

          {/* --- Action Icons --- */}
          <div className="flex items-center gap-2">
            {/* Search (Mobile only) */}
            <div className="md:hidden">
              <IconButton
                icon={Search}
                onClick={() => setSearchOpen((prev) => !prev)}
              />
            </div>

            {/* Wishlist */}
            <IconButton icon={Heart} />

            {/* Cart */}
            <IconButton
              icon={ShoppingBag}
              onClick={() => handleNavigation("/cart")}
              className="relative"
            />

            {/* Profile */}
            <IconButton
              icon={User}
              onClick={() => handleNavigation("/profile")}
            />
          </div>
        </div>

        {/* --- Mobile Search Bar --- */}
        {searchOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-10"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
