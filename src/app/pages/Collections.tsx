import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = ["All", "Rings", "Necklaces", "Pearls", "Bracelets", "Earrings"];

const ALL_PIECES = [
  {
    id: "JW-0041",
    name: "Lumière Solitaire",
    category: "Rings",
    material: "18k White Gold · 1.2ct Diamond",
    price: "€ 8,400",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=700&fit=crop&auto=format",
    alt: "Diamond solitaire ring on white surface",
    tag: "New",
  },
  {
    id: "JW-0028",
    name: "Verdure Cocktail Ring",
    category: "Rings",
    material: "18k Yellow Gold · Emerald",
    price: "€ 5,900",
    image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=600&h=700&fit=crop&auto=format",
    alt: "Gold ring with emerald gemstone",
    tag: "Rare",
  },
  {
    id: "JW-0033",
    name: "Nocturne Band",
    category: "Rings",
    material: "18k Black Gold · Pavé",
    price: "€ 3,200",
    image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=600&h=700&fit=crop&auto=format",
    alt: "Ring on dark surface",
    tag: null,
  },
  {
    id: "JW-0017",
    name: "Trèfle Ring",
    category: "Rings",
    material: "22k Yellow Gold · Clover Motif",
    price: "€ 2,800",
    image: "https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?w=600&h=700&fit=crop&auto=format",
    alt: "Gold ring on white surface",
    tag: null,
  },
  {
    id: "JW-0055",
    name: "Arc Pearl Strand",
    category: "Pearls",
    material: "Akoya Pearls · 14k Clasp",
    price: "€ 4,100",
    image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=600&h=700&fit=crop&auto=format",
    alt: "Pearl necklace strand close up",
    tag: "Signature",
  },
  {
    id: "JW-0062",
    name: "Rivière Necklace",
    category: "Necklaces",
    material: "18k White Gold · Diamond Line",
    price: "€ 12,600",
    image: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=600&h=700&fit=crop&auto=format",
    alt: "Diamond line necklace on black background",
    tag: "New",
  },
  {
    id: "JW-0044",
    name: "Nacre Statement",
    category: "Pearls",
    material: "South Sea Pearl · 18k Setting",
    price: "€ 6,800",
    image: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=600&h=700&fit=crop&auto=format",
    alt: "Pearl necklace on grey textile",
    tag: null,
  },
  {
    id: "JW-0039",
    name: "Aube Pendant",
    category: "Necklaces",
    material: "18k Rose Gold · Sapphire Drop",
    price: "€ 3,750",
    image: "https://images.unsplash.com/photo-1561812350-932aed735105?w=600&h=700&fit=crop&auto=format",
    alt: "Gold and blue sapphire ring",
    tag: null,
  },
];

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

export function Collections() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat");
  const [activeCategory, setActiveCategory] = useState(
    initialCat
      ? CATEGORIES.find((c) => c.toLowerCase() === initialCat) ?? "All"
      : "All"
  );
  const [sort, setSort] = useState("Featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = ALL_PIECES.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/\D/g, ""));
    const priceB = parseInt(b.price.replace(/\D/g, ""));
    if (sort === "Price: Low to High") return priceA - priceB;
    if (sort === "Price: High to Low") return priceB - priceA;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border px-6 lg:px-12 py-16 max-w-7xl mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Vêlore — 2026
        </p>
        <h1
          className="text-5xl lg:text-6xl"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
        >
          Collections
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + filter */}
          <div className="flex items-center gap-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-border text-xs tracking-[0.15em] px-3 py-2 text-muted-foreground outline-none cursor-pointer hover:border-foreground transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o} value={o} className="bg-background">
                  {o}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 border border-border px-3 py-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              {filterOpen ? <X size={12} /> : <SlidersHorizontal size={12} />}
              Filter
            </button>
          </div>
        </div>

        {/* Filter drawer */}
        {filterOpen && (
          <div className="bg-card border border-border p-8 mb-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Metal", opts: ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"] },
              { label: "Stone", opts: ["Diamond", "Emerald", "Sapphire", "Pearl", "Ruby"] },
              { label: "Price", opts: ["Under €3,000", "€3,000–€6,000", "€6,000–€12,000", "Above €12,000"] },
              { label: "Availability", opts: ["In Stock", "Made to Order", "Bespoke"] },
            ].map((group) => (
              <div key={group.label}>
                <p
                  className="text-[9px] tracking-[0.35em] uppercase text-accent mb-4"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {group.label}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.opts.map((opt) => (
                    <li key={opt}>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        <input type="checkbox" className="accent-accent" />
                        {opt}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Count */}
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {sorted.length} pieces
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {sorted.map((piece) => (
            <Link to={`/collections/${piece.id}`} key={piece.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                <img
                  src={piece.image}
                  alt={piece.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {piece.tag && (
                  <span
                    className="absolute top-3 right-3 bg-accent text-accent-foreground text-[9px] tracking-[0.25em] uppercase px-2 py-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {piece.tag}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <p
                  className="text-[9px] text-muted-foreground tracking-[0.25em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {piece.id}
                </p>
                <h3
                  className="text-lg leading-tight mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                >
                  {piece.name}
                </h3>
                <p className="text-xs text-muted-foreground font-light mb-3 leading-relaxed">
                  {piece.material}
                </p>
                <p className="text-sm tracking-wider text-foreground">{piece.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
