"use client";

import { useMemo } from "react";
import { Product } from "@/types/product.t";

export interface FilterOptions {
  searchQuery?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "relevance" | "price-asc" | "price-desc" | "newest" | "popular";
}

/**
 * Hook to filter and sort products
 */
export function useProductFilters(products: Product[], filters: FilterOptions) {
  return useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category && filters.category !== "") {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    // Price filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter((product) => {
        // Extract numeric price from string like "98 900 Ar"
        const priceStr = product.price.replace(/[^0-9]/g, "");
        const price = parseInt(priceStr, 10);

        if (filters.minPrice !== undefined && price < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice !== undefined && price > filters.maxPrice) {
          return false;
        }
        return true;
      });
    }

    // Stock filter (for now, assume all products are in stock)
    // You can add a 'inStock' property to Product type if needed
    if (filters.inStock) {
      // filtered = filtered.filter((product) => product.inStock);
      // For now, we'll keep all products
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
          return priceB - priceA;
        });
        break;
      case "popular":
        filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case "newest":
        // For now, reverse order (assuming newer products are added last)
        filtered.reverse();
        break;
      case "relevance":
      default:
        // Default order or by rating
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return filtered;
  }, [products, filters]);
}

/**
 * Parse price string to number
 */
export function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
}

/**
 * Format number to price string
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")} Ar`;
}

