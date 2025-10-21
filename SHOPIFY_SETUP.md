# Configuration Shopify

## ⚠️ Note importante

Cette intégration utilise **l'API Storefront GraphQL de Shopify** (la méthode moderne et recommandée), et **NON** le SDK `shopify-buy` qui est obsolète.

Nous utilisons `graphql-request` pour interagir directement avec l'API Storefront, ce qui offre :
- ✅ Plus de flexibilité
- ✅ Meilleures performances
- ✅ Support des dernières fonctionnalités Shopify
- ✅ Maintenance active

## Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Shopify Storefront API Configuration

# L'URL de votre boutique Shopify (ex: votre-boutique.myshopify.com)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Storefront API Access Token (Public - peut être exposé côté client)
# Créez-le dans: Shopify Admin > Apps > Develop apps > Create an app > API credentials
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# Version de l'API Shopify à utiliser
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01

# Admin API Access Token (Privé - pour les opérations serveur uniquement)
# NE PAS exposer côté client (sans NEXT_PUBLIC_)
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token_here
```

## Comment obtenir vos credentials Shopify

1. Connectez-vous à votre admin Shopify
2. Allez dans **Settings** > **Apps and sales channels**
3. Cliquez sur **Develop apps**
4. Cliquez sur **Create an app**
5. Donnez un nom à votre app (ex: "Mon site Next.js")
6. Dans l'onglet **Configuration**, configurez:
   - **Storefront API**: Activez les permissions nécessaires
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_collection_listings`
   - **Admin API** (optionnel): Pour les opérations serveur
7. Cliquez sur **Install app**
8. Copiez le **Storefront API access token**

## Structure du projet

```
src/
├── lib/
│   └── shopify/
│       ├── client.ts          # Client Shopify
│       ├── queries.ts         # GraphQL queries
│       └── types.ts           # Types TypeScript
├── services/
│   └── shopify.service.ts     # Services pour récupérer les données
```

## Utilisation

```typescript
import { getProducts, getProduct } from '@/services/shopify.service';

// Récupérer tous les produits
const products = await getProducts();

// Récupérer un produit spécifique
const product = await getProduct('product-handle');
```

