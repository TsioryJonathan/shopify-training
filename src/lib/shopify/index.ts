// Point d'entrée principal pour toutes les fonctionnalités Shopify

// Client et configuration
export { shopifyClient, shopifyFetch, isShopifyConfigured, shopifyConfig } from './client';

// Queries GraphQL
export * from './queries';

// Types
export type {
  ShopifyProduct,
  ShopifyVariant,
  ShopifyCollection,
  ShopifyCart,
  ShopifyCartLine,
  ShopifyProductsResponse,
  ShopifyCollectionsResponse,
  ProductFilter,
  ProductSortKey,
  LocalProduct,
} from './types';

// Utilitaires
export * from './utils';

