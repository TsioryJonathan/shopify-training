// Client GraphQL pour l'API Shopify Storefront
// 
// Cette implémentation utilise l'API Storefront GraphQL directement,
// sans le SDK shopify-buy qui est obsolète.
// 
// Approche moderne recommandée par Shopify pour 2024+

import { GraphQLClient } from 'graphql-request';

// Configuration de l'API Shopify
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01';

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.warn('⚠️ Configuration Shopify manquante. Vérifiez vos variables d\'environnement.');
}

// URL de l'API Storefront
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Création du client GraphQL
export const shopifyClient = new GraphQLClient(SHOPIFY_GRAPHQL_URL, {
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
});

// Fonction helper pour exécuter les requêtes
export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  try {
    const data = await shopifyClient.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête Shopify:', error);
    throw error;
  }
}

// Configuration pour vérifier si Shopify est configuré
export const isShopifyConfigured = () => {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
};

// Export des configs pour utilisation ailleurs
export const shopifyConfig = {
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION,
  isConfigured: isShopifyConfigured(),
};

