// Shopify Storefront API client.
// The Storefront Access Token is a publishable, client-safe token.
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "hd70bt-gn.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "71a0b34349d794bd159b0b87efa34496";

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: Array<{ url: string; altText: string | null }>;
  variants: ShopifyVariant[];
  options: Array<{ name: string; values: string[] }>;
}

interface RawProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

function normalizeProduct(node: RawProductNode): ShopifyProduct {
  return {
    id: node.id,
    title: node.title,
    description: node.description,
    handle: node.handle,
    availableForSale: node.availableForSale,
    priceRange: node.priceRange,
    images: node.images.edges.map((e) => e.node),
    variants: node.variants.edges.map((e) => e.node),
    options: node.options,
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    throw new Error("Shopify billing required: the store needs an active paid plan.");
  }
  if (!response.ok) {
    throw new Error(`Shopify HTTP error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return data;
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 6) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

const COLLECTION_QUERY = `
  query CollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

const PRODUCT_SEARCH_QUERY = `
  query SearchProducts($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export async function fetchCollectionProducts(handle: string, first = 100): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(COLLECTION_QUERY, { handle, first });
  const edges = data?.data?.collection?.products?.edges ?? [];
  return edges.map((e: { node: RawProductNode }) => normalizeProduct(e.node));
}

/** Full-text keyword search across the whole store catalogue. */
export async function searchProducts(term: string, first = 50): Promise<ShopifyProduct[]> {
  const trimmed = term.trim();
  if (!trimmed) return [];
  // Match the term as a prefix across the default searchable fields so partial
  // keywords still surface products (e.g. "sema" → "Semaglutide").
  const query = trimmed
    .split(/\s+/)
    .map((word) => `${word}*`)
    .join(" ");
  const data = await storefrontApiRequest(PRODUCT_SEARCH_QUERY, { first, query });
  const edges = data?.data?.products?.edges ?? [];
  return edges.map((e: { node: RawProductNode }) => normalizeProduct(e.node));
}


export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const node = data?.data?.product;
  return node ? normalizeProduct(node as RawProductNode) : null;
}

/** Fetch the entire catalogue (used for client-side category grouping). */
const ALL_PRODUCTS_QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export async function fetchAllProducts(first = 250): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(ALL_PRODUCTS_QUERY, { first });
  const edges = data?.data?.products?.edges ?? [];
  return edges.map((e: { node: RawProductNode }) => normalizeProduct(e.node));
}

/**
 * Goal-based categories shown on the home page. Each category lists the exact
 * product handles that belong inside it. The store uses coded product titles
 * (e.g. "KILK-157" = BPC-157), so products are grouped by handle rather than
 * by name matching. Edit these lists to move products between categories.
 */
export interface Category {
  handle: string;
  /** Internal/collection name */
  title: string;
  /** Customer-facing call to action */
  label: string;
  blurb: string;
  /** Shopify product handles that belong to this category. */
  productHandles: string[];
}

export const CATEGORIES: Category[] = [
  {
    handle: "weight-loss",
    title: "Weight Loss",
    label: "Lose Weight",
    blurb: "Retatrutide, Tirzepatide, AOD-9604, HGH Fragment and more.",
    productHandles: [
      "retakilk-35mg",
      "retakilk-30mg",
      "reatkilk-60mg",
      "retakilk-15mg",
      "kilktide-10mg",
      "kilk-aod-10mg",
      "kilk-frag-10mg",
      "kilk51mq-100mg",
    ],
  },
  {
    handle: "recovery",
    title: "Recovery",
    label: "Recover Faster",
    blurb: "BPC-157, TB-500, KPV, DSIP and recovery blends.",
    productHandles: [
      "klik-tb157-bpc-157-tb-500-10mg",
      "kilk-157-10mg",
      "bpc-157-10mg",
      "kilk-500-10mg",
      "kilk-pv-10mg",
      "dsip-10mg",
      "kilk-vip-10mg",
    ],
  },
  {
    handle: "energy-longevity",
    title: "Energy & Longevity",
    label: "Increase Energy",
    blurb: "NAD+, MOTS-C, Epitalon, SS-31, Glutathione and GHK-Cu.",
    productHandles: [
      "kilk-nad-500mg",
      "kilkmots-c-10mg",
      "mots-c-10mg",
      "kilkepilon-20mg",
      "kilk-ss31-10mg",
      "glutakilk-2000mg",
      "kilk-ghk-100mg",
      "ghk-cu-10mg",
      "kilk-glow-40mg",
    ],
  },
  {
    handle: "brain-performance",
    title: "Brain Performance",
    label: "Sharpen Focus",
    blurb: "Semax, Selank, PT-141, Kisspeptin, AICAR and SLU-PP-332.",
    productHandles: [
      "kilk-semax-10mg",
      "semax-10mg",
      "kilk-selank-10mg",
      "selank-10mg",
      "kilk-pt141-10mg",
      "pt-141-10mg",
      "kilk-peptin-10mg-1",
      "kilk-car-50mg",
      "kilkslupp332-10mg",
      "mtii-10mg",
    ],
  },
  {
    handle: "hormone-optimization",
    title: "Hormone Optimization",
    label: "Optimize Hormones",
    blurb: "Ipamorelin, Sermorelin, Tesamorelin, CJC-1295, GHRP-2/6 and Somatropin.",
    productHandles: [
      "kilk-ipam-10mg",
      "kilk-serm-10mg",
      "tesakilk-15mg",
      "tesamorelin-10mg",
      "kilk-cjc-no-dac-10mg",
      "kilkpam-1295-15mg",
      "kilk-rp2-10mg",
      "kilk-rp6-10mg",
      "kilktropin-100iu",
    ],
  },
];

export function getCategory(handle: string): Category | undefined {
  return CATEGORIES.find((c) => c.handle === handle);
}

/** Fetch the products for a goal-based category, preserving the listed order. */
export async function fetchCategoryProducts(handle: string): Promise<ShopifyProduct[]> {
  const category = getCategory(handle);
  if (!category) return [];
  const all = await fetchAllProducts();
  const byHandle = new Map(all.map((p) => [p.handle, p]));
  return category.productHandles
    .map((h) => byHandle.get(h))
    .filter((p): p is ShopifyProduct => Boolean(p));
}

/* ----------------------------- Cart (checkout) ---------------------------- */

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

type UserError = { field: string[] | null; message: string };

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist"),
  );
}

export async function createShopifyCart(
  variantId: string,
  quantity: number,
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const result = data?.data?.cartCreate;
  if (result?.userErrors?.length > 0) {
    console.error("Cart creation failed:", result.userErrors);
    return null;
  }
  const cart = result?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const userErrors: UserError[] = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("Add line failed:", userErrors);
    return { success: false };
  }
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find(
    (l: { node: { id: string; merchandise: { id: string } } }) => l.node.merchandise.id === variantId,
  );
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const userErrors: UserError[] = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("Update line failed:", userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  const userErrors: UserError[] = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("Remove line failed:", userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function fetchCartTotalQuantity(cartId: string): Promise<number | null> {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  const cart = data?.data?.cart;
  if (!cart) return null;
  return cart.totalQuantity as number;
}
