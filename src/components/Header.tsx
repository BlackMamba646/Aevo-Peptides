"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { GlassButton } from "@/components/GlassButton";
import { CurrencyToggle } from "@/components/CurrencyToggle";
const logo = "/assets/aevo-logo.svg";

type NavItem = { label: string; href?: string; to?: string };

const NAV: NavItem[] = [
  { label: "Products", href: "#products" },
  { label: "Science", to: "/science" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (item: NavItem) => {
    setMenuOpen(false);
    if (item.to) {
      router.push(item.to);
      return;
    }
    if (!item.href) return;
    go(item.href);
  };

  const go = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="glass border-x-0 border-t-0 rounded-none">
          <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
            <button
              onClick={() => go("#top")}
              aria-label="aevo home"
              className="flex items-center"
            >
              <img
                src={logo}
                alt="aevo"
                className="h-6 w-auto transition-all duration-300"
                style={{ filter: scrolled ? "brightness(0)" : "none" }}
              />
            </button>

            {/* Desktop nav */}
            <div className="hidden items-center gap-2 md:flex">
              {NAV.map((n) => (
                <GlassButton
                  key={n.label}
                  variant="glass"
                  size="sm"
                  onClick={() => goTo(n)}
                >
                  {n.label}
                </GlassButton>
              ))}
              <CurrencyToggle compact className="ml-1 mr-1" />
              <GlassButton
                variant="glass"
                size="iconSm"
                aria-label="Search products"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <Search className="size-4" />
              </GlassButton>
              <GlassButton variant="solid" size="sm" onClick={() => go("#products")}>
                Shop
              </GlassButton>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <CurrencyToggle compact className="mr-0.5" />
              <GlassButton
                variant="glass"
                size="iconSm"
                aria-label="Search products"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <Search className="size-4" />
              </GlassButton>
              <GlassButton
                variant="glass"
                size="iconSm"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-4" />
              </GlassButton>
            </div>
          </nav>

          {/* Expandable search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <form
                  onSubmit={submitSearch}
                  className="mx-auto flex max-w-6xl items-center gap-2 px-4 pb-3 sm:px-6"
                >
                  <div className="glass flex flex-1 items-center gap-2 rounded-full px-4 py-2.5">
                    <Search className="size-4 shrink-0 text-ink-soft" />
                    <input
                      autoFocus
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      placeholder="Search by name or keyword…"
                      className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
                      aria-label="Search products"
                    />
                    {term && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => setTerm("")}
                        className="text-ink-soft hover:text-ink"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                  <GlassButton variant="solid" size="sm" type="submit">
                    Search
                  </GlassButton>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile slide-over menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="glass absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col gap-3 rounded-l-3xl rounded-r-none p-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-2 flex items-center justify-between">
                <img src={logo} alt="aevo" className="h-6 w-auto brightness-0" />
                <GlassButton
                  variant="glass"
                  size="iconSm"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="size-4" />
                </GlassButton>
              </div>
              {NAV.map((n) => (
                <GlassButton
                  key={n.label}
                  variant="glass"
                  size="lg"
                  className="w-full justify-start text-lg"
                  onClick={() => goTo(n)}
                >
                  {n.label}
                </GlassButton>
              ))}
              <GlassButton
                variant="solid"
                size="lg"
                className="mt-2 w-full"
                onClick={() => go("#products")}
              >
                Shop the range
              </GlassButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
