# Intégration Shopify

Ce dossier contient toute l'intégration avec l'API Shopify Storefront.

## ⚡ Approche moderne

Cette intégration utilise **l'API Storefront GraphQL** directement avec `graphql-request`, **sans** utiliser le SDK `shopify-buy` qui est obsolète.

### Pourquoi cette approche ?

- ✅ **Plus flexible** : Contrôle total sur les requêtes GraphQL
- ✅ **Plus performant** : Requêtes optimisées et ciblées
- ✅ **Plus moderne** : Compatible avec Next.js 15 et React Server Components
- ✅ **Mieux maintenu** : `graphql-request` est activement maintenu
- ✅ **Plus léger** : Une seule dépendance au lieu de multiples packages

## 📁 Structure

```
src/lib/shopify/
├── client.ts       # Client GraphQL et configuration
├── queries.ts      # Requêtes GraphQL
├── types.ts        # Types TypeScript
├── utils.ts        # Fonctions utilitaires
├── index.ts        # Point d'entrée principal
└── README.md       # Ce fichier
```

## 🚀 Utilisation rapide

### 1. Configurer les variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=votre_token
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

### 2. Utiliser dans un composant Server

```tsx
// app/products/page.tsx
import { getProducts } from '@/services/shopify.service';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

### 3. Utiliser dans un composant Client

```tsx
// components/ProductList.tsx
"use client";

import { useShopifyProducts } from '@/hooks/useShopifyProducts';

export default function ProductList() {
  const { products, loading, error } = useShopifyProducts();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

## 📚 Services disponibles

### Produits

```typescript
import {
  getProducts,
  getProductByHandle,
  getProductById,
  searchProducts,
} from '@/services/shopify.service';

// Récupérer tous les produits
const products = await getProducts();

// Récupérer un produit par handle
const product = await getProductByHandle('mon-produit');

// Rechercher
const results = await searchProducts('t-shirt');
```

### Collections

```typescript
import {
  getCollections,
  getCollectionByHandle,
  getProductsByCollection,
} from '@/services/shopify.service';

// Toutes les collections
const collections = await getCollections();

// Une collection spécifique
const collection = await getCollectionByHandle('nouveautes');

// Produits d'une collection
const products = await getProductsByCollection('nouveautes');
```

### Panier

```typescript
import {
  createCart,
  addToCart,
  updateCartLines,
  removeFromCart,
  getCart,
} from '@/services/shopify.service';

// Créer un panier
const cart = await createCart([
  { merchandiseId: 'variant-id', quantity: 1 }
]);

// Ajouter au panier
await addToCart(cartId, [
  { merchandiseId: 'variant-id', quantity: 2 }
]);
```

## 🎯 Hooks disponibles

### useShopifyProducts

```typescript
const { products, loading, error, isShopifyConfigured } = useShopifyProducts({
  first: 20,
  sortKey: 'CREATED_AT',
  reverse: true,
});
```

### useShopifyProduct

```typescript
const { product, loading, error } = useShopifyProduct('product-handle');
```

### useShopifySearch

```typescript
const { products, loading, error } = useShopifySearch('query', enabled);
```

## 🛠️ Utilitaires

```typescript
import {
  formatPriceToAr,
  calculateDiscount,
  isProductOnSale,
  getUniqueVariantOptions,
  findVariantByOptions,
} from '@/lib/shopify/utils';

// Formater un prix
const price = formatPriceToAr('19.99', 'USD'); // "89 955 Ar"

// Calculer une réduction
const discount = calculateDiscount(100, 80); // 20%

// Vérifier si en promo
const onSale = isProductOnSale(product);

// Extraire les options (tailles, couleurs)
const options = getUniqueVariantOptions(product);
// { Size: ['S', 'M', 'L'], Color: ['Red', 'Blue'] }
```

## 🔄 Fallback sur Mock Data

Si Shopify n'est pas configuré, l'intégration utilise automatiquement les données mock existantes :

```typescript
// Détecte automatiquement si Shopify est configuré
const { products, isShopifyConfigured } = useShopifyProducts();

if (isShopifyConfigured) {
  console.log('✅ Utilisation des données Shopify réelles');
} else {
  console.log('📦 Utilisation des données mock');
}
```

## 📝 Types importants

### LocalProduct

Type unifié pour représenter un produit (qu'il vienne de Shopify ou des mocks) :

```typescript
interface LocalProduct {
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
```

## 🔐 Sécurité

- Les tokens avec `NEXT_PUBLIC_` peuvent être exposés côté client
- Les tokens `SHOPIFY_ADMIN_ACCESS_TOKEN` sont PRIVÉS et ne doivent jamais être exposés
- Utilisez toujours le Storefront API pour les opérations côté client
- Utilisez l'Admin API uniquement dans les Server Components ou API Routes

## 📖 Documentation Shopify

- [Storefront API Documentation](https://shopify.dev/api/storefront)
- [GraphQL Admin API](https://shopify.dev/api/admin-graphql)
- [Shopify Buy SDK](https://github.com/Shopify/js-buy-sdk)

