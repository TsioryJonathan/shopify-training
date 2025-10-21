# Constants

Ce dossier contient toutes les constantes et données mock utilisées dans l'application.

## Structure

### `products.ts`
Contient tous les produits mock de l'application.

#### Format des produits
```typescript
{
  id: string;           // Format: "001", "002", etc.
  title: string;        // Nom du produit
  category?: string;    // Catégorie du produit
  price: string;        // Prix actuel (ex: "98 900 Ar")
  oldPrice?: string;    // Prix barré (optionnel)
  image: StaticImageData | string; // Image du produit
  href: string;         // URL du produit (format: "/products/001")
  rating?: number;      // Note sur 5
  reviewsCount?: number; // Nombre d'avis
}
```

#### Utilisation
```typescript
import { mockProducts, MOCK_PRODUCTS } from "@/constants";
// ou
import { mockProducts } from "@/constants/products";

// Obtenir un produit par ID
const product = mockProducts.find(p => p.id === "001");
```

## Notes importantes

- **IDs des produits** : Les IDs doivent correspondre aux paramètres d'URL (ex: ID "001" → URL "/products/001")
- **Images** : Utilisez les images depuis `@/assets/images/assets`
- **Prix** : Format Ariary (ex: "98 900 Ar")
- **Categories** : Utilisez des noms en français pour la cohérence

## Ajout de nouveaux produits

1. Ouvrez `src/constants/products.ts`
2. Ajoutez votre produit à l'array `MOCK_PRODUCTS`
3. Assurez-vous que :
   - L'ID est unique et au format "XXX" (3 chiffres)
   - Le href correspond à l'ID: `/products/XXX`
   - Toutes les propriétés requises sont présentes

Exemple :
```typescript
{
  id: "013",
  title: "Nouveau Produit",
  category: "Électronique",
  price: "150 000 Ar",
  oldPrice: "200 000 Ar",
  image: assets.electronicsCategory,
  href: "/products/013",
  rating: 4.5,
  reviewsCount: 100,
}
```

