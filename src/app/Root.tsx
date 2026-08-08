import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Collections", to: "/collections" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "Heritage", to: "/craftsmanship" },
  { label: "Contact", to: "/contact" },
];

const FOOTER_COLS = [
  {
    heading: "Collections",
    links: ["Rings", "Necklaces", "Pearls", "Bracelets", "Earrings"],
  },
  {
    heading: "Atelier",
    links: ["Our Heritage", "Craftsmanship", "Materials", "Bespoke Orders"],
  },
  {
    heading: "Support",
    links: ["Contact", "Book a Visit", "Care Guide", "Returns & Sizing"],
  },
];

export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ── Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
        } border-b border-border`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Left links */}
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

          {/* Logo */}
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

          {/* Right links */}
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

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

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
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* ── Footer ── */}
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
                Maison de Joaillerie
                <br />
                12, Rue de Bretagne
                <br />
                Paris, 75003
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
                    <li key={l}>
                      <a
                        href="#"
                        className="text-xs font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors tracking-wide"
                      >
                        {l}
                      </a>
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
              {["Privacy Policy", "Legal", "Sitemap"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
