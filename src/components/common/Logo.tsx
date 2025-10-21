"use client";

import Image from "next/image";
import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect, useState } from "react";
import assets from "@/assets/images/assets";

export default function Logo({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculer le thème effectif
  const getEffectiveTheme = () => {
    if (!mounted) return 'light';
    
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();
  const logo = effectiveTheme === 'dark' ? assets.logoDark : assets.logoLight;

  if (!mounted) {
    // Afficher le logo light par défaut pendant le chargement
    return (
      <Image
        src={assets.logoLight}
        alt="Z-shop Logo"
        className={className}
      />
    );
  }

  return (
    <Image
      src={logo}
      alt="Z-shop Logo"
      className={className}
    />
  );
}

