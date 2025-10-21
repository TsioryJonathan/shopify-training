// GraphQL Queries pour l'API Shopify Storefront

// Fragments de base - NE PAS les imbriquer dans d'autres fragments
const priceFragment = `
  fragment PriceFragment on MoneyV2 {
    amount
    currencyCode
  }
`;

const imageFragment = `
  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`;

const variantFragment = `
  fragment VariantFragment on ProductVariant {
    id
    title
    sku
    availableForSale
    quantityAvailable
    price {
      ...PriceFragment
    }
    compareAtPrice {
      ...PriceFragment
    }
    image {
      ...ImageFragment
    }
    selectedOptions {
      name
      value
    }
    weight
    weightUnit
  }
`;

const productFragment = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    priceRange {
      minVariantPrice {
        ...PriceFragment
      }
      maxVariantPrice {
        ...PriceFragment
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...PriceFragment
      }
      maxVariantPrice {
        ...PriceFragment
      }
    }
    images(first: 10) {
      edges {
        node {
          ...ImageFragment
        }
      }
    }
    variants(first: 250) {
      edges {
        node {
          ...VariantFragment
        }
      }
    }
    availableForSale
    totalInventory
    createdAt
    updatedAt
  }
`;

// Composer tous les fragments nécessaires pour les produits
const allProductFragments = `
  ${priceFragment}
  ${imageFragment}
  ${variantFragment}
  ${productFragment}
`;

// Query pour récupérer tous les produits
export const GET_ALL_PRODUCTS = `
  ${allProductFragments}
  
  query GetAllProducts(
    $first: Int = 20
    $after: String
    $query: String
  ) {
    products(
      first: $first
      after: $after
      query: $query
    ) {
      edges {
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Query pour récupérer un produit par son handle
export const GET_PRODUCT_BY_HANDLE = `
  ${allProductFragments}
  
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

// Query pour récupérer un produit par son ID
export const GET_PRODUCT_BY_ID = `
  ${allProductFragments}
  
  query GetProductById($id: ID!) {
    product(id: $id) {
      ...ProductFragment
    }
  }
`;

// Query pour récupérer les collections
export const GET_ALL_COLLECTIONS = `
  ${imageFragment}
  
  query GetAllCollections(
    $first: Int = 20
    $after: String
  ) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          image {
            ...ImageFragment
          }
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// Query pour récupérer une collection par son handle
export const GET_COLLECTION_BY_HANDLE = `
  ${allProductFragments}
  
  query GetCollectionByHandle($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image {
        ...ImageFragment
      }
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
      updatedAt
    }
  }
`;

// Query pour rechercher des produits
export const SEARCH_PRODUCTS = `
  ${allProductFragments}
  
  query SearchProducts(
    $query: String!
    $first: Int = 20
    $after: String
  ) {
    products(
      first: $first
      after: $after
      query: $query
    ) {
      edges {
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Query pour créer un panier
export const CREATE_CART = `
  ${priceFragment}
  
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    ...PriceFragment
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  ...PriceFragment
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            ...PriceFragment
          }
          subtotalAmount {
            ...PriceFragment
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

// Query pour ajouter des articles au panier
export const ADD_TO_CART = `
  ${priceFragment}
  
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    ...PriceFragment
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  ...PriceFragment
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            ...PriceFragment
          }
          subtotalAmount {
            ...PriceFragment
          }
        }
      }
    }
  }
`;

// Query pour mettre à jour les quantités du panier
export const UPDATE_CART_LINES = `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;

// Query pour supprimer des articles du panier
export const REMOVE_FROM_CART = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;

// Query pour récupérer un panier existant
export const GET_CART = `
  ${priceFragment}
  ${imageFragment}
  
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        ...ImageFragment
                      }
                    }
                  }
                }
                price {
                  ...PriceFragment
                }
              }
            }
            estimatedCost {
              totalAmount {
                ...PriceFragment
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount {
          ...PriceFragment
        }
        subtotalAmount {
          ...PriceFragment
        }
      }
      createdAt
      updatedAt
    }
  }
`;
