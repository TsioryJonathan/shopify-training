# ✅ Intégration Shopify - Installation Complète

L'intégration Shopify a été installée avec succès ! Voici ce qui a été fait :

## 📦 Dépendance installée

```json
{
  "graphql-request": "^6.x.x"
}
```

**Note importante :** Cette intégration utilise **l'API Storefront GraphQL** directement via `graphql-request`, et **NON** le SDK `shopify-buy` qui est obsolète et n'est plus maintenu par Shopify.

Cette approche moderne offre :
- ✅ Plus de flexibilité et de contrôle
- ✅ Meilleures performances
- ✅ Support complet des dernières fonctionnalités Shopify
- ✅ Maintenance active et mise à jour régulière
- ✅ Compatible avec Next.js 15 et React Server Components

## 📁 Fichiers créés

### Configuration et Client
- `src/lib/shopify/client.ts` - Client GraphQL Shopify
- `src/lib/shopify/types.ts` - Types TypeScript pour Shopify
- `src/lib/shopify/queries.ts` - Requêtes GraphQL
- `src/lib/shopify/utils.ts` - Fonctions utilitaires
- `src/lib/shopify/index.ts` - Point d'entrée
- `src/lib/shopify/README.md` - Documentation

### Services
- `src/services/shopify.service.ts` - Services pour récupérer les données

### Hooks
- `src/hooks/useShopifyProducts.ts` - Hooks React pour Shopify

### Documentation
- `SHOPIFY_SETUP.md` - Guide de configuration
- `src/lib/shopify/README.md` - Documentation détaillée

## ⚙️ Configuration requise

### 1. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Shopify Storefront API Configuration

# L'URL de votre boutique Shopify (ex: votre-boutique.myshopify.com)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Storefront API Access Token (Public - peut être exposé côté client)
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# Version de l'API Shopify à utiliser
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01

# Admin API Access Token (Privé - pour les opérations serveur uniquement)
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token_here
```

### 2. Obtenir vos credentials Shopify

1. Connectez-vous à votre **Shopify Admin**
2. Allez dans **Settings** → **Apps and sales channels**
3. Cliquez sur **Develop apps**
4. Cliquez sur **Create an app**
5. Donnez un nom (ex: "Mon Site Next.js")
6. Dans **Configuration**, activez :
   - **Storefront API** avec permissions :
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_collection_listings`
7. Cliquez sur **Install app**
8. Copiez le **Storefront API access token**

## 🚀 Utilisation

### Composant Server (Recommandé)

```tsx
// app/products/page.tsx
import { getProducts } from '@/services/shopify.service';

export default async function ProductsPage() {
  const products = await getProducts({
    first: 20,
    sortKey: 'CREATED_AT',
    reverse: true,
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Composant Client

```tsx
// components/ProductList.tsx
"use client";

import { useShopifyProducts } from '@/hooks/useShopifyProducts';

export default function ProductList() {
  const { products, loading, error, isShopifyConfigured } = useShopifyProducts({
    first: 20,
    sortKey: 'CREATED_AT',
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      {!isShopifyConfigured && (
        <div className="bg-yellow-50 p-4 mb-4">
          ⚠️ Mode développement : Utilisation des données mock
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
```

## 🔄 Fallback automatique

L'intégration inclut un **fallback automatique** :
- ✅ Si Shopify est configuré → Utilise les données réelles
- 📦 Si Shopify n'est pas configuré → Utilise les données mock existantes

**Vous pouvez donc développer sans Shopify et l'activer quand vous êtes prêt !**

## 📚 API disponibles

### Produits
```typescript
import {
  getProducts,          // Récupérer tous les produits
  getProductByHandle,   // Récupérer un produit par handle
  getProductById,       // Récupérer un produit par ID
  searchProducts,       // Rechercher des produits
} from '@/services/shopify.service';
```

### Collections
```typescript
import {
  getCollections,           // Récupérer toutes les collections
  getCollectionByHandle,    // Récupérer une collection
  getProductsByCollection,  // Produits d'une collection
} from '@/services/shopify.service';
```

### Panier
```typescript
import {
  createCart,         // Créer un panier
  addToCart,          // Ajouter au panier
  updateCartLines,    // Mettre à jour les quantités
  removeFromCart,     // Supprimer du panier
  getCart,            // Récupérer un panier
} from '@/services/shopify.service';
```

### Hooks React
```typescript
import {
  useShopifyProducts,  // Hook pour les produits
  useShopifyProduct,   // Hook pour un produit
  useShopifySearch,    // Hook pour la recherche
} from '@/hooks/useShopifyProducts';
```

## 🎯 Prochaines étapes

### 1. Remplacer les mock products dans votre app

Dans `src/app/products/(catalog)/page.tsx` :

```tsx
// Avant
import { mockProducts } from '@/constants';

// Après (Server Component)
import { getProducts } from '@/services/shopify.service';

export default async function ProductsPage() {
  const products = await getProducts();
  // Utiliser products au lieu de mockProducts
}
```

Ou avec un Client Component :

```tsx
"use client";
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

export default function ProductsPage() {
  const { products, loading } = useShopifyProducts();
  // ...
}
```

### 2. Mettre à jour la page produit individuelle

Dans `src/app/products/[id]/page.tsx`, remplacez :

```tsx
// Avant
const product = mockProducts.find((p) => p.id === id);

// Après
import { getProductByHandle } from '@/services/shopify.service';
const product = await getProductByHandle(id as string);
```

### 3. Connecter le panier Shopify

Le système de panier actuel utilise Zustand. Pour intégrer Shopify Cart :

1. Modifier `src/stores/useCartStore.ts`
2. Appeler les fonctions `createCart`, `addToCart`, etc.
3. Stocker le `cartId` dans le localStorage
4. Synchroniser avec l'API Shopify

### 4. Tester l'intégration

1. Ajoutez vos credentials dans `.env.local`
2. Redémarrez le serveur : `npm run dev`
3. Vérifiez la console :
   - ✅ Pas de warnings = Shopify configuré
   - ⚠️ Warnings = Mode mock actif

## 🐛 Dépannage

### "Shopify non configuré"
→ Vérifiez que `.env.local` existe avec les bonnes variables

### "Network error"
→ Vérifiez que votre store domain est correct (sans https://)

### "Access denied"
→ Vérifiez les permissions de votre Storefront API token

### Les produits n'apparaissent pas
→ Vérifiez que vos produits sont publiés sur le "Online Store" sales channel

## 📖 Documentation complète

- `SHOPIFY_SETUP.md` - Guide de configuration
- `src/lib/shopify/README.md` - Documentation de l'API
- [Shopify Storefront API Docs](https://shopify.dev/api/storefront)

## ✨ Fonctionnalités

- ✅ Récupération de produits
- ✅ Recherche de produits
- ✅ Collections
- ✅ Gestion du panier
- ✅ Types TypeScript complets
- ✅ Fallback automatique sur mock data
- ✅ Hooks React optimisés
- ✅ Support Server et Client Components
- ✅ Formatage des prix en Ariary
- ✅ Utilitaires pour variantes et options

---

**🎉 Vous êtes prêt à utiliser Shopify !**

N'oubliez pas de remplir vos credentials dans `.env.local` quand vous serez prêt à connecter votre vraie boutique Shopify.

