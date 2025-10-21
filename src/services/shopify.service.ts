// Services pour interagir avec l'API Shopify

import { shopifyFetch, isShopifyConfigured } from '@/lib/shopify/client';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCT_BY_ID,
  GET_ALL_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  SEARCH_PRODUCTS,
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_FROM_CART,
  GET_CART,
} from '@/lib/shopify/queries';
import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyProductsResponse,
  ShopifyCollectionsResponse,
  ProductSortKey,
  LocalProduct,
  ShopifyCart,
} from '@/lib/shopify/types';

// Fonction pour convertir un produit Shopify vers notre format local
export function convertShopifyProduct(shopifyProduct: ShopifyProduct): LocalProduct {
  const minPrice = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice.amount;
  
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);
  const mainImage = images[0] || '/placeholder.jpg';

  // Formater le prix en Ar (pour Madagascar)
  const formatPrice = (amount: string, currencyCode: string = 'MGA') => {
    const price = parseFloat(amount);
    
    // Taux de conversion vers Ariary
    const conversionRates: Record<string, number> = {
      MGA: 1,    // MGA = Ariary, pas de conversion
      USD: 4500, // 1 USD ≈ 4500 Ar
      EUR: 5000, // 1 EUR ≈ 5000 Ar
    };
    
    const rate = conversionRates[currencyCode] || 1;
    const priceInAr = Math.round(price * rate);
    return `${priceInAr.toLocaleString('fr-FR')} Ar`;
  };

  // Récupérer le code de devise
  const currencyCode = shopifyProduct.priceRange.minVariantPrice.currencyCode;

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    price: formatPrice(shopifyProduct.priceRange.minVariantPrice.amount, currencyCode),
    oldPrice: compareAtPrice ? formatPrice(compareAtPrice, currencyCode) : undefined,
    image: mainImage,
    images,
    category: shopifyProduct.productType || 'Général',
    vendor: shopifyProduct.vendor,
    availableForSale: shopifyProduct.availableForSale,
    href: `/products/${shopifyProduct.handle}`,
    handle: shopifyProduct.handle,
    tags: shopifyProduct.tags,
    variants: shopifyProduct.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      price: formatPrice(node.price.amount, node.price.currencyCode),
      available: node.availableForSale,
      options: node.selectedOptions.reduce((acc, option) => {
        acc[option.name] = option.value;
        return acc;
      }, {} as Record<string, string>),
    })),
    // Mock rating et reviews pour l'instant
    rating: 4 + Math.random(),
    reviewsCount: Math.floor(Math.random() * 100) + 10,
  };
}

/**
 * Récupère tous les produits
 */
export async function getProducts(options?: {
  first?: number;
  after?: string;
  query?: string;
}): Promise<LocalProduct[]> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré - Retour de données mock');
    return [];
  }

  try {
    const data = await shopifyFetch<ShopifyProductsResponse>(GET_ALL_PRODUCTS, {
      first: options?.first || 20,
      after: options?.after,
      query: options?.query,
    });

    return data.products.edges.map(({ node }) => convertShopifyProduct(node));
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return [];
  }
}

/**
 * Récupère un produit par son handle
 */
export async function getProductByHandle(handle: string): Promise<LocalProduct | null> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré - Retour de données mock');
    return null;
  }

  try {
    const data = await shopifyFetch<{ product: ShopifyProduct }>(GET_PRODUCT_BY_HANDLE, {
      handle,
    });

    if (!data.product) {
      return null;
    }

    return convertShopifyProduct(data.product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return null;
  }
}

/**
 * Récupère un produit par son ID
 */
export async function getProductById(id: string): Promise<LocalProduct | null> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré - Retour de données mock');
    return null;
  }

  try {
    const data = await shopifyFetch<{ product: ShopifyProduct }>(GET_PRODUCT_BY_ID, {
      id,
    });

    if (!data.product) {
      return null;
    }

    return convertShopifyProduct(data.product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return null;
  }
}

/**
 * Recherche des produits
 */
export async function searchProducts(
  query: string,
  options?: {
    first?: number;
    after?: string;
  }
): Promise<LocalProduct[]> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré - Retour de données mock');
    return [];
  }

  try {
    const data = await shopifyFetch<ShopifyProductsResponse>(SEARCH_PRODUCTS, {
      query,
      first: options?.first || 20,
      after: options?.after,
    });

    return data.products.edges.map(({ node }) => convertShopifyProduct(node));
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
    return [];
  }
}

/**
 * Récupère toutes les collections
 */
export async function getCollections(options?: {
  first?: number;
  after?: string;
}): Promise<ShopifyCollection[]> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré - Retour de données mock');
    return [];
  }

  try {
    const data = await shopifyFetch<ShopifyCollectionsResponse>(GET_ALL_COLLECTIONS, {
      first: options?.first || 20,
      after: options?.after,
    });

    return data.collections.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Erreur lors de la récupération des collections:', error);
    return [];
  }
}

/**
 * Récupère une collection par son handle
 */
export async function getCollectionByHandle(
  handle: string,
  productsFirst?: number
): Promise<ShopifyCollection | null> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré - Retour de données mock');
    return null;
  }

  try {
    const data = await shopifyFetch<{ collection: ShopifyCollection }>(
      GET_COLLECTION_BY_HANDLE,
      {
        handle,
        first: productsFirst || 20,
      }
    );

    return data.collection || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la collection:', error);
    return null;
  }
}

/**
 * Récupère les produits d'une collection
 */
export async function getProductsByCollection(
  collectionHandle: string,
  limit?: number
): Promise<LocalProduct[]> {
  const collection = await getCollectionByHandle(collectionHandle, limit);
  
  if (!collection) {
    return [];
  }

  return collection.products.edges.map(({ node }) => convertShopifyProduct(node));
}

// ============================================
// FONCTIONS POUR LE PANIER SHOPIFY
// ============================================

/**
 * Crée un nouveau panier
 */
export async function createCart(lines: Array<{ merchandiseId: string; quantity: number }>) {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré');
    return null;
  }

  try {
    const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(CREATE_CART, {
      input: { lines },
    });

    return data.cartCreate.cart;
  } catch (error) {
    console.error('Erreur lors de la création du panier:', error);
    return null;
  }
}

/**
 * Ajoute des articles au panier
 */
export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
) {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré');
    return null;
  }

  try {
    const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(ADD_TO_CART, {
      cartId,
      lines,
    });

    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    return null;
  }
}

/**
 * Met à jour les quantités dans le panier
 */
export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
) {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré');
    return null;
  }

  try {
    const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
      UPDATE_CART_LINES,
      {
        cartId,
        lines,
      }
    );

    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du panier:', error);
    return null;
  }
}

/**
 * Supprime des articles du panier
 */
export async function removeFromCart(cartId: string, lineIds: string[]) {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré');
    return null;
  }

  try {
    const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
      REMOVE_FROM_CART,
      {
        cartId,
        lineIds,
      }
    );

    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error);
    return null;
  }
}

/**
 * Récupère un panier existant
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) {
    console.warn('⚠️ Shopify non configuré');
    return null;
  }

  try {
    const data = await shopifyFetch<{ cart: ShopifyCart }>(GET_CART, {
      cartId,
    });

    return data.cart;
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return null;
  }
}

