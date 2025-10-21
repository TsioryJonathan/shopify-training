"use client";

import { useState, useEffect } from 'react';
import { getProducts, getProductByHandle, searchProducts } from '@/services/shopify.service';
import { LocalProduct } from '@/lib/shopify/types';
import { mockProducts } from '@/constants';
import { shopifyConfig } from '@/lib/shopify/client';
import { Product } from '@/types/product.t';

// Fonction pour convertir Product en LocalProduct
function convertProductToLocalProduct(product: Product): LocalProduct {
  // Convertir l'image (peut être StaticImageData) en string
  const imageUrl = typeof product.image === 'string' 
    ? product.image 
    : product.image.src;

  return {
    id: product.id,
    title: product.title,
    description: product.description || '',
    price: product.price,
    oldPrice: product.oldPrice,
    image: imageUrl,
    images: [imageUrl],
    category: product.category,
    vendor: product.category,
    availableForSale: true,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    href: product.href,
    handle: product.id,
    tags: product.features || [],
    variants: product.sizes?.map((size, index) => ({
      id: `${product.id}-${size}-${index}`,
      title: size,
      price: product.price,
      available: true,
      options: { Size: size },
    })) || [{
      id: product.id,
      title: 'Default',
      price: product.price,
      available: true,
      options: {},
    }],
  };
}

interface UseProductsOptions {
  first?: number;
  query?: string;
}

/**
 * Hook pour récupérer les produits depuis Shopify
 * Retourne automatiquement les mock products si Shopify n'est pas configuré
 */
export function useShopifyProducts(options?: UseProductsOptions) {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        if (shopifyConfig.isConfigured) {
          const data = await getProducts(options);
          setProducts(data);
        } else {
          // Utiliser les mock products si Shopify n'est pas configuré
          console.log('📦 Utilisation des mock products');
          const convertedProducts = mockProducts.map(convertProductToLocalProduct);
          setProducts(convertedProducts);
        }
      } catch (err) {
        setError(err as Error);
        // Fallback sur mock products en cas d'erreur
        const convertedProducts = mockProducts.map(convertProductToLocalProduct);
        setProducts(convertedProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options?.first, options?.query]);

  return { products, loading, error, isShopifyConfigured: shopifyConfig.isConfigured };
}

/**
 * Hook pour récupérer un produit spécifique par son handle
 */
export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<LocalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        if (shopifyConfig.isConfigured) {
          const data = await getProductByHandle(handle);
          setProduct(data);
        } else {
          // Utiliser les mock products si Shopify n'est pas configuré
          const mockProduct = mockProducts.find(p => p.id === handle);
          setProduct(mockProduct ? convertProductToLocalProduct(mockProduct) : null);
        }
      } catch (err) {
        setError(err as Error);
        // Fallback sur mock product
        const mockProduct = mockProducts.find(p => p.id === handle);
        setProduct(mockProduct ? convertProductToLocalProduct(mockProduct) : null);
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      fetchProduct();
    }
  }, [handle]);

  return { product, loading, error, isShopifyConfigured: shopifyConfig.isConfigured };
}

/**
 * Hook pour rechercher des produits
 */
export function useShopifySearch(query: string, enabled = true) {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function search() {
      if (!enabled || !query.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (shopifyConfig.isConfigured) {
          const data = await searchProducts(query);
          setProducts(data);
        } else {
          // Recherche dans les mock products
          const filtered = mockProducts.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase())
          );
          const convertedProducts = filtered.map(convertProductToLocalProduct);
          setProducts(convertedProducts);
        }
      } catch (err) {
        setError(err as Error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [query, enabled]);

  return { products, loading, error, isShopifyConfigured: shopifyConfig.isConfigured };
}

