// Types TypeScript pour l'API Shopify

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  availableForSale: boolean;
  totalInventory?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable?: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  image?: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  weight?: number;
  weightUnit?: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image?: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
  updatedAt: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: ShopifyProduct;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  };
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: Array<{
      node: ShopifyCollection;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

// Types de filtrage
export interface ProductFilter {
  available?: boolean;
  productType?: string;
  vendor?: string;
  variantOption?: {
    name: string;
    value: string;
  };
  price?: {
    min?: number;
    max?: number;
  };
  tag?: string;
}

export interface ProductSortKeys {
  TITLE: "TITLE";
  CREATED_AT: "CREATED_AT";
  UPDATED_AT: "UPDATED_AT";
  PRICE: "PRICE";
  BEST_SELLING: "BEST_SELLING";
  RELEVANCE: "RELEVANCE";
}

export type ProductSortKey = keyof ProductSortKeys;

// Type pour convertir un produit Shopify vers notre format local
export interface LocalProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  image: string;
  images: string[];
  category: string;
  vendor: string;
  availableForSale: boolean;
  rating?: number;
  reviewsCount?: number;
  href: string;
  handle: string;
  tags: string[];
  variants: Array<{
    id: string;
    title: string;
    price: string;
    available: boolean;
    options: Record<string, string>;
  }>;
}

