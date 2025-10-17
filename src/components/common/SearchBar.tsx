// components/ui/SearchBar.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  // Le terme de recherche initial, généralement tiré des paramètres de l'URL.
  searchTerm?: string;
  // Un placeholder personnalisé si besoin.
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  searchTerm = "",
  placeholder = "Que cherchez-vous aujourd'hui ?",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      router.push(`/search?q=${encodeURIComponent(trimmedValue)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="lg:w-150 rounded-lg bg-background pl-10 h-12 text-md shadow-sm outline-none focus:outline-none"
        />
      </div>
    </form>
  );
}
