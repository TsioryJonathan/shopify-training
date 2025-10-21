# Stores - Gestion d'État Globale

Ce dossier contient tous les stores Zustand pour la gestion d'état globale de l'application.

## Stores Disponibles

### 🛒 `useCartStore` - Gestion du Panier

Store pour gérer le panier d'achat avec persistance locale.

#### État
```typescript
{
  items: CartItem[];  // Liste des produits dans le panier
}
```

#### Actions

##### `addItem(product, quantity?, size?)`
Ajoute un produit au panier
```typescript
const addToCart = useCartStore(state => state.addItem);
addToCart(product, 2, "L"); // Ajoute 2 articles taille L
```

##### `removeItem(productId)`
Supprime un produit du panier
```typescript
const removeItem = useCartStore(state => state.removeItem);
removeItem("001");
```

##### `updateQuantity(productId, quantity)`
Met à jour la quantité d'un produit
```typescript
const updateQuantity = useCartStore(state => state.updateQuantity);
updateQuantity("001", 3);
```

##### `clearCart()`
Vide complètement le panier
```typescript
const clearCart = useCartStore(state => state.clearCart);
clearCart();
```

##### `getTotalItems()`
Retourne le nombre total d'articles
```typescript
const totalItems = useCartStore(state => state.getTotalItems());
```

##### `getTotalPrice()`
Retourne le prix total en Ariary
```typescript
const totalPrice = useCartStore(state => state.getTotalPrice());
```

#### Exemple d'utilisation
```typescript
"use client";
import { useCartStore } from "@/stores";

export function CartButton() {
  const { items, addItem, getTotalItems } = useCartStore();
  const itemCount = getTotalItems();
  
  return (
    <button onClick={() => addItem(product, 1)}>
      Panier ({itemCount})
    </button>
  );
}
```

---

### ❤️ `useWishlistStore` - Gestion de la Liste de Souhaits

Store pour gérer la liste de favoris avec persistance locale.

#### État
```typescript
{
  items: Product[];  // Liste des produits favoris
}
```

#### Actions

##### `addItem(product)`
Ajoute un produit à la wishlist
```typescript
const addToWishlist = useWishlistStore(state => state.addItem);
addToWishlist(product);
```

##### `removeItem(productId)`
Retire un produit de la wishlist
```typescript
const removeFromWishlist = useWishlistStore(state => state.removeItem);
removeFromWishlist("001");
```

##### `isInWishlist(productId)`
Vérifie si un produit est dans la wishlist
```typescript
const isInWishlist = useWishlistStore(state => state.isInWishlist("001"));
// Returns: boolean
```

##### `toggleItem(product)`
Ajoute ou retire un produit (toggle)
```typescript
const toggleWishlist = useWishlistStore(state => state.toggleItem);
toggleWishlist(product); // Ajoute si absent, retire si présent
```

##### `clearWishlist()`
Vide la wishlist
```typescript
const clearWishlist = useWishlistStore(state => state.clearWishlist);
clearWishlist();
```

#### Exemple d'utilisation
```typescript
"use client";
import { useWishlistStore } from "@/stores";
import { Heart } from "lucide-react";

export function WishlistButton({ product }) {
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));
  
  return (
    <button onClick={() => toggleWishlist(product)}>
      <Heart className={isInWishlist ? "fill-rose-500" : ""} />
    </button>
  );
}
```

---

## Persistance

Les deux stores utilisent la persistance avec `zustand/middleware`:
- **Clé localStorage** : 
  - Cart: `cart-storage`
  - Wishlist: `wishlist-storage`
- **Comportement** : Les données sont automatiquement sauvegardées et restaurées

## Types

### CartItem
```typescript
interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}
```

### Product
```typescript
interface Product {
  id: string;
  title: string;
  category?: string;
  price: string;
  oldPrice?: string;
  image: StaticImageData | string;
  href: string;
  rating?: number;
  reviewsCount?: number;
}
```

---

## Pages Associées

- **Panier** : `/cart` - Affiche et gère les produits du panier
- **Wishlist** : `/wishlist` - Affiche et gère les produits favoris

## Composants Intégrés

Les stores sont déjà intégrés dans :
- ✅ `Navbar` - Affiche les compteurs
- ✅ `PopularProductCard` - Boutons wishlist et panier
- ✅ `ProductDetailPage` - Actions complètes panier/wishlist

---

## Bonnes Pratiques

### ✅ À Faire
- Utiliser `getTotalItems()` et `getTotalPrice()` pour les calculs
- Toujours vérifier `isInWishlist()` avant d'afficher l'état
- Utiliser `toggleItem()` pour les boutons wishlist
- Ajouter des notifications toast après les actions

### ❌ À Éviter
- Ne pas muter directement `items`
- Ne pas oublier `"use client"` dans les composants
- Ne pas calculer les totaux manuellement

---

## Debugging

Pour inspecter l'état des stores en développement :
```javascript
// Dans la console du navigateur
console.log(localStorage.getItem('cart-storage'));
console.log(localStorage.getItem('wishlist-storage'));
```

