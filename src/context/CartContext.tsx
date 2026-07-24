"use client";

import * as React from "react";
import {
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchCartTotalQuantity,
  type ShopifyMoney,
} from "@/lib/shopify";

export interface CartLine {
  /** Shopify cart line id — null until synced with Shopify */
  lineId: string | null;
  variantId: string;
  handle: string;
  title: string;
  variantTitle: string;
  image?: string;
  price: ShopifyMoney;
  qty: number;
}

export interface AddToCartInput {
  variantId: string;
  handle: string;
  title: string;
  variantTitle?: string;
  image?: string;
  price: ShopifyMoney;
  qty?: number;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  count: number;
  /** subtotal as a numeric amount in the store currency (AED) */
  subtotal: number;
  open: () => void;
  close: () => void;
  add: (input: AddToCartInput) => Promise<void>;
  setQty: (variantId: string, qty: number) => Promise<void>;
  remove: (variantId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

const STORAGE_KEY = "aevo-cart";

interface PersistedCart {
  lines: CartLine[];
  cartId: string | null;
  checkoutUrl: string | null;
}

function loadPersisted(): PersistedCart {
  if (typeof window === "undefined") return { lines: [], cartId: null, checkoutUrl: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [], cartId: null, checkoutUrl: null };
    const parsed = JSON.parse(raw) as PersistedCart;
    return {
      lines: parsed.lines ?? [],
      cartId: parsed.cartId ?? null,
      checkoutUrl: parsed.checkoutUrl ?? null,
    };
  } catch {
    return { lines: [], cartId: null, checkoutUrl: null };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [cartId, setCartId] = React.useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  // Hydrate from localStorage on mount (client only)
  React.useEffect(() => {
    const p = loadPersisted();
    setLines(p.lines);
    setCartId(p.cartId);
    setCheckoutUrl(p.checkoutUrl);
    setHydrated(true);
  }, []);

  // Persist whenever cart changes
  React.useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, cartId, checkoutUrl }));
  }, [lines, cartId, checkoutUrl, hydrated]);

  const clearCart = React.useCallback(() => {
    setLines([]);
    setCartId(null);
    setCheckoutUrl(null);
  }, []);

  // Sync with Shopify (clears cart after a completed checkout)
  const syncCart = React.useCallback(async () => {
    if (!cartId) return;
    try {
      const total = await fetchCartTotalQuantity(cartId);
      if (total === 0) clearCart();
    } catch (error) {
      console.error("Cart sync failed:", error);
    }
  }, [cartId, clearCart]);

  React.useEffect(() => {
    if (!hydrated) return;
    syncCart();
    const onVisible = () => {
      if (document.visibilityState === "visible") syncCart();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [hydrated, syncCart]);

  const add = React.useCallback(
    async (input: AddToCartInput) => {
      const qty = input.qty ?? 1;
      setIsLoading(true);
      setIsOpen(true);
      try {
        const existing = lines.find((l) => l.variantId === input.variantId);

        if (!cartId) {
          const result = await createShopifyCart(input.variantId, qty);
          if (result) {
            setCartId(result.cartId);
            setCheckoutUrl(result.checkoutUrl);
            setLines([
              {
                lineId: result.lineId,
                variantId: input.variantId,
                handle: input.handle,
                title: input.title,
                variantTitle: input.variantTitle ?? "",
                image: input.image,
                price: input.price,
                qty,
              },
            ]);
          }
        } else if (existing && existing.lineId) {
          const newQty = existing.qty + qty;
          const result = await updateShopifyCartLine(cartId, existing.lineId, newQty);
          if (result.success) {
            setLines((prev) =>
              prev.map((l) => (l.variantId === input.variantId ? { ...l, qty: newQty } : l)),
            );
          } else if (result.cartNotFound) {
            clearCart();
          }
        } else {
          const result = await addLineToShopifyCart(cartId, input.variantId, qty);
          if (result.success) {
            setLines((prev) => [
              ...prev,
              {
                lineId: result.lineId ?? null,
                variantId: input.variantId,
                handle: input.handle,
                title: input.title,
                variantTitle: input.variantTitle ?? "",
                image: input.image,
                price: input.price,
                qty,
              },
            ]);
          } else if (result.cartNotFound) {
            clearCart();
          }
        }
      } catch (error) {
        console.error("Failed to add item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, lines, clearCart],
  );

  const setQty = React.useCallback(
    async (variantId: string, qty: number) => {
      if (qty <= 0) {
        // remove
        const item = lines.find((l) => l.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        setIsLoading(true);
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const next = lines.filter((l) => l.variantId !== variantId);
            next.length === 0 ? clearCart() : setLines(next);
          } else if (result.cartNotFound) {
            clearCart();
          }
        } finally {
          setIsLoading(false);
        }
        return;
      }

      const item = lines.find((l) => l.variantId === variantId);
      if (!item?.lineId || !cartId) return;
      setIsLoading(true);
      try {
        const result = await updateShopifyCartLine(cartId, item.lineId, qty);
        if (result.success) {
          setLines((prev) => prev.map((l) => (l.variantId === variantId ? { ...l, qty } : l)));
        } else if (result.cartNotFound) {
          clearCart();
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, lines, clearCart],
  );

  const remove = React.useCallback(
    async (variantId: string) => {
      await setQty(variantId, 0);
    },
    [setQty],
  );

  const checkout = React.useCallback(() => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setIsOpen(false);
    }
  }, [checkoutUrl]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * parseFloat(l.price.amount), 0);

  const value: CartContextValue = {
    lines,
    isOpen,
    isLoading,
    count,
    subtotal,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add,
    setQty,
    remove,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
