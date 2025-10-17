// components/Navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Heart } from "lucide-react";

import assets from "@/assets/images/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchBar from "./SearchBar";

// Un composant réutilisable pour les icônes, légèrement amélioré
const ActionIcon = ({
  icon: Icon,
  onClick,
  itemCount, // Optionnel: pour afficher un badge sur l'icône
}: {
  icon: React.ElementType;
  onClick?: () => void;
  itemCount?: number;
}) => (
  <Button
    variant="ghost" // Utilise le style "ghost" pour un meilleur effet au survol
    size="icon"
    onClick={onClick}
    className="relative rounded-full transition-transform hover:scale-110"
  >
    <Icon className="h-6 w-6" />
    {itemCount !== undefined && itemCount > 0 && (
      <span className="absolute top-0 right-0 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-xs text-white">
        {itemCount}
      </span>
    )}
  </Button>
);

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => router.push(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container px-10">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-10 justify-between">
              <Link href="/" aria-label="Page d'accueil de Z-SHOP">
                <Image
                  src={assets.logoLight}
                  alt="Z-shop Logo"
                  className="w-70 object-contain "
                />
              </Link>

              <SearchBar />
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-4">
              <ActionIcon icon={Heart} />
              <ActionIcon
                icon={ShoppingBag}
                onClick={() => handleNavigation("/cart")}
                itemCount={3}
              />
              <ActionIcon
                icon={User}
                onClick={() => handleNavigation("/profile")}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
