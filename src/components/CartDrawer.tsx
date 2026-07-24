"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { GlassButton } from "@/components/GlassButton";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export function CartDrawer() {
  const { isOpen, close, lines, setQty, remove, subtotal, checkout, isLoading } = useCart();
  const { format } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/30" onClick={close} />
          <motion.aside
            role="dialog"
            aria-label="Cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute inset-y-0 right-0 flex w-full flex-col rounded-l-3xl rounded-r-none p-5 sm:max-w-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">Your cart</h2>
              <GlassButton variant="glass" size="iconSm" aria-label="Close cart" onClick={close}>
                <X className="size-4" />
              </GlassButton>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <div className="glass flex size-16 items-center justify-center rounded-full">
                  <ShoppingBag className="size-6 text-ink-soft" />
                </div>
                <p className="text-ink-soft">Your cart is empty.</p>
                <GlassButton variant="solid" onClick={close}>
                  Continue shopping
                </GlassButton>
              </div>
            ) : (
              <>
                <div className="-mx-1 mt-4 flex-1 space-y-3 overflow-y-auto px-1">
                  {lines.map((l) => (
                    <div
                      key={l.variantId}
                      className="glass flex items-center gap-3 rounded-2xl p-3"
                    >
                      {l.image && (
                        <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-offwhite">
                          <img
                            src={l.image}
                            alt={l.title}
                            className="size-full object-contain"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col">
                        <span className="font-medium text-ink">{l.title}</span>
                        <span className="text-sm text-ink-soft">
                          {format(parseFloat(l.price.amount))}
                        </span>
                        <div className="mt-2 flex items-center gap-2">
                          <GlassButton
                            variant="glass"
                            size="iconSm"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(l.variantId, l.qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </GlassButton>
                          <span className="w-6 text-center text-sm font-medium text-ink">
                            {l.qty}
                          </span>
                          <GlassButton
                            variant="glass"
                            size="iconSm"
                            aria-label="Increase quantity"
                            onClick={() => setQty(l.variantId, l.qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </GlassButton>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(l.variantId)}
                        className="text-xs text-ink-soft transition-colors hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-border/60 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="text-lg font-semibold text-ink">
                      {format(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    Shipping calculated at checkout.
                  </p>
                  <GlassButton
                    variant="solid"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={checkout}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Checkout"}
                  </GlassButton>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
