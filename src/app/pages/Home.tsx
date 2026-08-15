import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { COLLECTION_SUMMARY, FEATURED_PRODUCTS } from "../data/products";

const COLLECTIONS = COLLECTION_SUMMARY;
const FEATURED = FEATURED_PRODUCTS;

const MATERIALS = [
  { label: "Gold", spec: "18k, 22k, 24k" },
  { label: "Diamonds", spec: "GIA Certified" },
  { label: "Pearls", spec: "Akoya · South Sea" },
  { label: "Gemstones", spec: "Ethically Sourced" },
  { label: "Platinum", spec: "950 Grade" },
];

export function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-24 lg:py-0 order-2 lg:order-1">
          <p
            className="text-xs tracking-[0.35em] uppercase text-accent mb-8"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Est. 1990 — Paris
          </p>
          <h1
            className="text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-8 text-foreground"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
            }}
          >
            Where metal
            <br />
            <em>remembers</em>
            <br />
            the light.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground max-w-sm mb-12 font-light">
            Each Vêlore piece is conceived by hand in our Marais
            atelier — a singular conversation between craftsman,
            material, and time.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/collections"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
            >
              Explore Collections
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/collections"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground hover:border-foreground pb-0.5"
            >
              Explore now
            </Link>
          </div>
        </div>

        <div className="relative h-[60vw] lg:h-auto order-1 lg:order-2 overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1727784892009-f3cf06199b65?w=1200&h=1400&fit=crop&auto=format"
            alt="Woman with hands raised showing fine jewelry"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-foreground/10" />
          <div
            className="absolute bottom-8 right-8 text-primary-foreground text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            SS 2026 — Collection
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-border pb-6">
          <div>
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-accent mb-3"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Shop by Category
            </p>
            <h2
              className="text-4xl lg:text-5xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
              }}
            >
              Discover collections
            </h2>
          </div>
          <Link
            to="/collections"
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            View all collections <ChevronRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {COLLECTIONS.map((col) => (
            <Link
              to={`/collections?cat=${encodeURIComponent(col.slug)}`}
              key={col.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-muted aspect-[4/5]">
                <img
                  src={col.image}
                  alt={col.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {col.id}
                  </p>
                  <h3
                    className="text-2xl"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                    }}
                  >
                    {col.title}
                  </h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1 font-light">
                    {col.subtitle}
                  </p>
                </div>
                <span
                  className="text-[10px] text-muted-foreground"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {col.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Pieces ── */}
      <section className="py-20 bg-secondary">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 border-b border-border pb-6">
            <div>
              <p
                className="text-[10px] tracking-[0.35em] uppercase text-accent mb-2"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Selected Works
              </p>
              <h2
                className="text-4xl lg:text-5xl"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                }}
              >
                Featured Pieces
              </h2>
            </div>
            <Link
              to="/collections"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {FEATURED.map((piece) => (
              <Link
                to={`/collections/${piece.id}`}
                key={piece.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                  <img
                    src={piece.image}
                    alt={piece.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {piece.tag && (
                    <span
                      className="absolute top-3 right-3 bg-accent text-accent-foreground text-[9px] tracking-[0.25em] uppercase px-2 py-1"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {piece.tag}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p
                    className="text-[9px] text-muted-foreground tracking-[0.25em] mb-1"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {piece.id}
                  </p>
                  <h3
                    className="text-lg leading-tight mb-1"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                    }}
                  >
                    {piece.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light mb-3 leading-relaxed">
                    {piece.material}
                  </p>
                  <p className="text-sm tracking-wider text-foreground">
                    {piece.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collection story teaser ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden bg-muted h-[60vw] lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&h=1200&fit=crop&auto=format"
            alt="Pearl necklace in velvet box"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-foreground/20" />
        </div>
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-24 bg-card">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-8"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            § Signature edit
          </p>
          <h2
            className="text-4xl xl:text-5xl leading-[1.1] mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
            }}
          >
            Fine pieces,
            <br />
            <em>curated for daily ritual.</em>
          </h2>
          <p className="text-sm leading-[1.85] text-muted-foreground font-light mb-10 max-w-sm">
            Discover statement silhouettes, heirloom-inspired forms, and softly sculpted details designed to feel personal from the first wear.
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-0.5 w-fit hover:text-accent hover:border-accent transition-colors duration-200"
          >
            Explore the collection <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ── Materials strip ── */}
      <section className="bg-primary text-primary-foreground py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0 md:divide-x divide-primary-foreground/20">
            {MATERIALS.map((m) => (
              <div
                key={m.label}
                className="flex-1 md:px-8 first:pl-0 last:pr-0"
              >
                <p
                  className="text-[10px] tracking-[0.35em] uppercase text-accent mb-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {m.spec}
                </p>
                <p
                  className="text-xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                  }}
                >
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-28 px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-accent mb-10"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          — Client words
        </p>
        <blockquote
          className="text-3xl lg:text-4xl leading-[1.3] text-foreground mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          "The ring arrived in a lacquered box that already felt
          like an heirloom. I have never owned something that
          felt so completely inevitable."
        </blockquote>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">
          Margaux D. — Paris, 2025
        </p>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-secondary py-24 px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-6"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Private Correspondence
          </p>
          <h2
            className="text-3xl lg:text-4xl mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
            }}
          >
            Join our circle.
          </h2>
          <p className="text-sm text-muted-foreground font-light mb-10 leading-relaxed">
            Receive invitations to private viewings, new
            arrivals, and the occasional letter from our
            atelier.
          </p>
          {submitted ? (
            <p
              className="text-sm tracking-widest uppercase text-accent"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Thank you. We will be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-0 border border-border"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none font-light"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}