// Utilitaires pour Shopify

import { LocalProduct } from './types';
import { mockProducts } from '@/constants';

/**
 * Formate un prix en Ariary (Madagascar)
 */
export function formatPriceToAr(amount: string | number, currencyCode = 'USD'): string {
  const price = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Taux de conversion (exemple, à ajuster selon vos besoins)
  const rates: Record<string, number> = {
    USD: 4500,
    EUR: 5000,
    MGA: 1, // MGA = Ariary
  };

  const rate = rates[currencyCode] || rates.USD;
  const priceInAr = Math.round(price * rate);
  
  return `${priceInAr.toLocaleString('fr-FR')} Ar`;
}

/**
 * Calcule le pourcentage de réduction
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Vérifie si un produit est en promotion
 */
export function isProductOnSale(product: LocalProduct): boolean {
  return Boolean(product.oldPrice && product.oldPrice !== product.price);
}

/**
 * Extrait les options uniques des variantes (tailles, couleurs, etc.)
 */
export function getUniqueVariantOptions(product: LocalProduct): Record<string, string[]> {
  const optionsMap: Record<string, Set<string>> = {};

  product.variants.forEach(variant => {
    Object.entries(variant.options).forEach(([key, value]) => {
      if (!optionsMap[key]) {
        optionsMap[key] = new Set();
      }
      optionsMap[key].add(value);
    });
  });

  // Convertir les Sets en arrays
  const options: Record<string, string[]> = {};
  Object.entries(optionsMap).forEach(([key, valueSet]) => {
    options[key] = Array.from(valueSet);
  });

  return options;
}

/**
 * Trouve une variante spécifique selon les options sélectionnées
 */
export function findVariantByOptions(
  product: LocalProduct,
  selectedOptions: Record<string, string>
): LocalProduct['variants'][0] | undefined {
  return product.variants.find(variant => {
    return Object.entries(selectedOptions).every(
      ([key, value]) => variant.options[key] === value
    );
  });
}

/**
 * Retourne les produits selon la configuration Shopify
 * Si Shopify est configuré, retourne une promesse vide (à remplir par l'API)
 * Sinon retourne les mock products
 * @deprecated Utilisez plutôt useShopifyProducts hook
 */
export function getProductsSource(isShopifyConfigured: boolean): LocalProduct[] {
  return [];
}

/**
 * Parse un Shopify Global ID vers un ID numérique
 * Ex: "gid://shopify/Product/123456" -> "123456"
 */
export function parseShopifyId(gid: string): string {
  const parts = gid.split('/');
  return parts[parts.length - 1];
}

/**
 * Crée un Shopify Global ID depuis un ID numérique
 * Ex: "123456" -> "gid://shopify/Product/123456"
 */
export function createShopifyGid(id: string, resource = 'Product'): string {
  return `gid://shopify/${resource}/${id}`;
}

/**
 * Valide un handle Shopify
 */
export function isValidHandle(handle: string): boolean {
  // Un handle Shopify ne contient que des lettres minuscules, chiffres et tirets
  return /^[a-z0-9-]+$/.test(handle);
}

/**
 * Crée un handle à partir d'un titre
 */
export function createHandleFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Retire les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garde seulement lettres, chiffres, espaces et tirets
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Remplace les tirets multiples par un seul
    .replace(/^-|-$/g, ''); // Retire les tirets en début/fin
}

/**
 * Filtre les produits disponibles seulement
 */
export function filterAvailableProducts(products: LocalProduct[]): LocalProduct[] {
  return products.filter(p => p.availableForSale);
}

/**
 * Trie les produits
 */
export function sortProducts(
  products: LocalProduct[],
  sortKey: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
): LocalProduct[] {
  const sorted = [...products];

  switch (sortKey) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\s/g, '').replace('Ar', ''));
        const priceB = parseFloat(b.price.replace(/\s/g, '').replace('Ar', ''));
        return priceA - priceB;
      });

    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\s/g, '').replace('Ar', ''));
        const priceB = parseFloat(b.price.replace(/\s/g, '').replace('Ar', ''));
        return priceB - priceA;
      });

    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case 'newest':
      // Pour l'instant on retourne tel quel, à implémenter avec les dates Shopify
      return sorted;

    default:
      return sorted;
  }
}

