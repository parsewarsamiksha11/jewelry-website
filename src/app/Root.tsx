import { useState, useEffect, useMemo } from "react";
import { Outlet, NavLink, Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Heart, ShoppingBag, Search } from "lucide-react";
import { SEARCH_PRODUCTS } from "./data/products";

const CART_COUNT_KEY = "jewelcasa-cart-count";
const CART_ITEMS_KEY = "jewelcasa-cart-items";
const FAVORITES_COUNT_KEY = "jewelcasa-favorites-count";

const readStoredCount = (key: string) => {
  if (typeof window === "undefined") return 0;

  const value = Number(window.localStorage.getItem(key) ?? "0");
  return Number.isFinite(value) ? value : 0;
};

const readStoredCartTotal = () => {
  if (typeof window === "undefined") return 0;

  try {
    const raw = window.localStorage.getItem(CART_ITEMS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) return 0;

    return parsed.reduce((sum, item) => {
      if (typeof item === "string") return sum + 1;
      if (item && typeof item.id === "string" && typeof item.quantity === "number") return sum + item.quantity;
      return sum;
    }, 0);
  } catch {
    return 0;
  }
};

const NAV_LINKS = [
  { label: "Collections", to: "/collections" },
  { label: "Contact", to: "/contact" },
];

const FOOTER_COLS = [
  {
    heading: "Collections",
    links: [
      { label: "All", to: "/collections" },
      { label: "22KT Ready", to: "/collections?cat=22KT Ready" },
      { label: "18KT Ready", to: "/collections?cat=18KT Ready" },
      { label: "Chain", to: "/collections?cat=Chain" },
      { label: "Mangalsutra", to: "/collections?cat=Mangalsutra" },
      { label: "Bracelet", to: "/collections?cat=Bracelet" },
      { label: "Silver Ready", to: "/collections?cat=Silver Ready" },
    ],
  },
  {
    heading: "Atelier",
    links: [
      { label: "Bespoke Orders", to: "/contact" },
      { label: "Book a Visit", to: "/contact" },
      { label: "Care Guide", to: "/contact" },
      { label: "Returns & Sizing", to: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Collections", to: "/collections" },
      { label: "Cart", to: "/cart" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
];

const SEARCH_SUGGESTIONS = SEARCH_PRODUCTS.map((product) => product.label);

export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(() => readStoredCartTotal());
  const [favoriteCount, setFavoriteCount] = useState(() => readStoredCount(FAVORITES_COUNT_KEY));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isProductDetailPage = /^\/collections\/[^/]+$/.test(location.pathname);

  const filteredSearchItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return SEARCH_SUGGESTIONS.slice(0, 8);
    return SEARCH_SUGGESTIONS.filter((item) => item.toLowerCase().includes(query));
  }, [searchTerm]);

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchTerm("");
  };

  const handleSearchSelect = (item: string) => {
    const query = item.trim();
    const match = SEARCH_PRODUCTS.find(
      (product) => product.label.toLowerCase() === query.toLowerCase()
    );

    handleSearchClose();

    if (match) {
      navigate(`/collections/${match.id}`);
      return;
    }

    const fallback = SEARCH_PRODUCTS.find((product) =>
      product.label.toLowerCase().includes(query.toLowerCase())
    );

    if (fallback) {
      navigate(`/collections/${fallback.id}`);
      return;
    }

    navigate("/collections");
  };

  const handleSearchSubmit = () => {
    const query = searchTerm.trim();
    if (!query) return;

    const exactMatch = SEARCH_PRODUCTS.find(
      (product) => product.label.toLowerCase() === query.toLowerCase()
    );

    handleSearchClose();

    if (exactMatch) {
      navigate(`/collections/${exactMatch.id}`);
      return;
    }

    const partialMatch = SEARCH_PRODUCTS.find((product) =>
      product.label.toLowerCase().includes(query.toLowerCase())
    );

    if (partialMatch) {
      navigate(`/collections/${partialMatch.id}`);
      return;
    }

    navigate("/collections");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncCart = (event: Event) => {
      const nextCount = (event as CustomEvent<{ count: number }>).detail?.count ?? readStoredCartTotal();
      setCartCount(nextCount);
      window.localStorage.setItem(CART_COUNT_KEY, String(nextCount));
    };

    const syncFavorites = (event: Event) => {
      const nextCount = (event as CustomEvent<{ count: number }>).detail?.count ?? readStoredCount(FAVORITES_COUNT_KEY);
      setFavoriteCount(nextCount);
      window.localStorage.setItem(FAVORITES_COUNT_KEY, String(nextCount));
    };

    window.addEventListener("cart-updated", syncCart);
    window.addEventListener("favorites-updated", syncFavorites);

    return () => {
      window.removeEventListener("cart-updated", syncCart);
      window.removeEventListener("favorites-updated", syncFavorites);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchTerm("");
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Jost', sans-serif" }}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
        } border-b border-border`}
      >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.slice(0, 2).map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <Link to="/" className="flex flex-col items-center leading-none select-none">
              <span
                className="text-2xl tracking-widest uppercase"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, letterSpacing: "0.35em" }}
              >
                Vêlore
              </span>
              <span
                className="text-[8px] tracking-[0.4em] uppercase text-accent mt-0.5"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Fine Jewellery
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.slice(2).map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3 ml-6">
              <Link
                to="/wishlist"
                aria-label="Favorites"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7c5ae] bg-[#f8f3ee] text-[#1d1a17] transition-colors hover:bg-[#efe4d8]"
              >
                <Heart size={16} />
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d98e6d] px-1 text-[9px] font-medium text-white">{favoriteCount}</span>
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7c5ae] bg-[#f8f3ee] text-[#1d1a17] transition-colors hover:bg-[#efe4d8]"
              >
                <ShoppingBag size={16} />
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d98e6d] px-1 text-[9px] font-medium text-white">{cartCount}</span>
              </Link>

              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7c5ae] bg-[#f8f3ee] text-[#1d1a17] transition-colors hover:bg-[#efe4d8]"
              >
                <Search size={16} />
              </button>
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {searchOpen && (
            <div className="border-t border-border bg-background/95 px-6 pb-6 pt-3 shadow-sm backdrop-blur-md">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 border border-[#c9c2b7] rounded-md bg-transparent px-4 py-3">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearchSubmit();
                    }}
                    placeholder="Search for product..."
                    className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-foreground hover:text-accent transition-colors"
                    aria-label="Submit search"
                  >
                    <Search size={18} />
                  </button>
                </div>

                {filteredSearchItems.length > 0 && (
                  <div className="mt-6 flex flex-col gap-3">
                    {filteredSearchItems.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSearchSelect(item)}
                        className="w-full rounded-full border border-[#2d2a29] bg-transparent px-5 py-3 text-center text-lg text-foreground transition-colors hover:bg-[#f7f2ec]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </header>
      )

      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {!isProductDetailPage && (
        <footer className="bg-primary text-primary-foreground py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
              <div className="md:col-span-1">
                <Link to="/">
                  <p
                    className="text-2xl tracking-widest mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, letterSpacing: "0.3em" }}
                  >
                    Vêlore
                  </p>
                </Link>
                <p className="text-xs font-light text-primary-foreground/60 leading-relaxed">
                  Vêlore Atelier
                  <br />
                  Tanish Orchid Phase 2,
                  <br />
                  Charoli (B.K)
                  <br />
                  Pune 412105
                </p>
              </div>

              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <p
                    className="text-[9px] tracking-[0.35em] uppercase text-accent mb-5"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          className="text-xs font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors tracking-wide"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-primary-foreground/15 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-primary-foreground/40"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                © 2026 Vêlore SAS · All rights reserved
              </p>
              <div className="flex items-center gap-6">
                {[
                  { label: "Privacy Policy", to: "/contact" },
                  { label: "Legal", to: "/contact" },
                  { label: "Sitemap", to: "/collections" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}


