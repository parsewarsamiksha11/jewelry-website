import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Heart } from "lucide-react";

const PRODUCTS: Record<string, {
  id: string; name: string; category: string; material: string;
  price: string; tag: string | null; description: string;
  details: { label: string; value: string }[];
  images: { src: string; alt: string }[];
  related: { id: string; name: string; price: string; image: string; alt: string }[];
}> = {
  "JW-0041": {
    id: "JW-0041",
    name: "Lumière Solitaire",
    category: "Rings",
    material: "18k White Gold · 1.2ct Diamond",
    price: "€ 8,400",
    tag: "New",
    description:
      "The Lumière Solitaire distills decades of diamond-setting craft into a single, unforgettable gesture. A brilliant-cut stone of exceptional clarity is raised on a hand-forged white gold shank, allowing light to enter from every angle. The result is a ring that appears to hold its own light source.",
    details: [
      { label: "Metal", value: "18k White Gold (750‰)" },
      { label: "Stone", value: "1.20ct Round Brilliant Diamond" },
      { label: "Colour", value: "G — Near Colourless" },
      { label: "Clarity", value: "VS1" },
      { label: "Certificate", value: "GIA #6274839102" },
      { label: "Setting", value: "4-Claw Solitaire" },
      { label: "Width", value: "1.8mm" },
      { label: "Origin", value: "Atelier Vêlore, Paris" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=900&h=1100&fit=crop&auto=format",
        alt: "Lumière Solitaire — front view",
      },
      {
        src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&h=1100&fit=crop&auto=format",
        alt: "Lumière Solitaire — group of gold rings",
      },
      {
        src: "https://images.unsplash.com/photo-1720093601709-66ce9c0068a1?w=900&h=1100&fit=crop&auto=format",
        alt: "Lumière Solitaire — on box",
      },
    ],
    related: [
      {
        id: "JW-0028",
        name: "Verdure Cocktail Ring",
        price: "€ 5,900",
        image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format",
        alt: "Emerald gold ring",
      },
      {
        id: "JW-0033",
        name: "Nocturne Band",
        price: "€ 3,200",
        image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=400&h=500&fit=crop&auto=format",
        alt: "Ring on dark surface",
      },
      {
        id: "JW-0017",
        name: "Trèfle Ring",
        price: "€ 2,800",
        image: "https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?w=400&h=500&fit=crop&auto=format",
        alt: "Gold ring on white",
      },
    ],
  },
  "JW-0028": {
    id: "JW-0028",
    name: "Verdure Cocktail Ring",
    category: "Rings",
    material: "18k Yellow Gold · Colombian Emerald",
    price: "€ 5,900",
    tag: "Rare",
    description:
      "Verdure draws its name from the rich, living green of the Colombian emerald at its heart. Set in warm 22-karat yellow gold with an open-claw silhouette, the stone is given full visibility — its inclusions and natural character celebrated rather than hidden.",
    details: [
      { label: "Metal", value: "18k Yellow Gold (750‰)" },
      { label: "Stone", value: "2.4ct Colombian Emerald" },
      { label: "Colour", value: "Vivid Green" },
      { label: "Origin", value: "Muzo, Colombia" },
      { label: "Setting", value: "Open Claw" },
      { label: "Width", value: "4mm at centre" },
      { label: "Certificate", value: "Gübelin #25-034871" },
      { label: "Atelier", value: "Vêlore, Paris" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=900&h=1100&fit=crop&auto=format",
        alt: "Verdure Cocktail Ring — front",
      },
      {
        src: "https://images.unsplash.com/photo-1561812350-932aed735105?w=900&h=1100&fit=crop&auto=format",
        alt: "Gold and blue gemstone ring",
      },
    ],
    related: [
      {
        id: "JW-0041",
        name: "Lumière Solitaire",
        price: "€ 8,400",
        image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format",
        alt: "Diamond solitaire ring",
      },
      {
        id: "JW-0033",
        name: "Nocturne Band",
        price: "€ 3,200",
        image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=400&h=500&fit=crop&auto=format",
        alt: "Ring on dark surface",
      },
    ],
  },
};

const FALLBACK_PRODUCT = {
  id: "JW-0055",
  name: "Arc Pearl Strand",
  category: "Pearls",
  material: "Akoya Pearls · 14k Gold Clasp",
  price: "€ 4,100",
  tag: "Signature",
  description:
    "Fifty-three perfectly matched Akoya pearls, hand-knotted on natural silk, culminate in a 14-karat gold box clasp bearing the Vêlore hallmark. The Arc Pearl Strand is the house's most enduring design — unchanged since 1992.",
  details: [
    { label: "Pearl type", value: "Akoya (Pinctada fucata)" },
    { label: "Diameter", value: "7.0–7.5mm" },
    { label: "Lustre", value: "AAA — Exceptional" },
    { label: "Count", value: "53 pearls" },
    { label: "Length", value: "45cm" },
    { label: "Clasp", value: "14k Yellow Gold Box" },
    { label: "Knotting", value: "Hand-knotted, natural silk" },
    { label: "Origin", value: "Akoya Sea, Japan" },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=900&h=1100&fit=crop&auto=format",
      alt: "Arc Pearl Strand — close up",
    },
    {
      src: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=900&h=1100&fit=crop&auto=format",
      alt: "Pearl necklace on grey textile",
    },
    {
      src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=1100&fit=crop&auto=format",
      alt: "Pearl necklace in box",
    },
  ],
  related: [
    {
      id: "JW-0041",
      name: "Lumière Solitaire",
      price: "€ 8,400",
      image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format",
      alt: "Diamond ring",
    },
    {
      id: "JW-0062",
      name: "Rivière Necklace",
      price: "€ 12,600",
      image: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=400&h=500&fit=crop&auto=format",
      alt: "Diamond necklace",
    },
  ],
};

const SIZES = ["46", "48", "50", "52", "54", "56", "58"];

const ACCORDIONS = [
  {
    id: "care",
    title: "Care & Wear",
    content:
      "Store your Vêlore piece in the provided velvet pouch, away from direct sunlight and moisture. Avoid contact with perfumes, chlorine, and ultrasonic cleaners. We recommend an annual professional inspection and re-polishing at our Paris atelier.",
  },
  {
    id: "delivery",
    title: "Delivery & Packaging",
    content:
      "Each piece ships in a lacquered Vêlore box with velvet lining, certificate of authenticity, and care card. Standard delivery is 3–5 business days within Europe. International delivery typically takes 5–10 business days. Fully insured and tracked.",
  },
  {
    id: "bespoke",
    title: "Bespoke Sizing",
    content:
      "All Vêlore rings are available in half and quarter sizes on request. Bespoke sizing requires 2–3 additional weeks. Contact our atelier team to discuss your requirements.",
  },
];

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = (id && PRODUCTS[id]) ? PRODUCTS[id] : FALLBACK_PRODUCT;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [wished, setWished] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  function handleAddToBag() {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2500);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center gap-3">
        <Link
          to="/collections"
          className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} />
          Collections
        </Link>
        <span className="text-muted-foreground/40 text-xs">/</span>
        <span
          className="text-xs tracking-[0.15em] uppercase text-muted-foreground"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {product.id}
        </span>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 aspect-square overflow-hidden bg-muted border-2 transition-colors ${
                  activeImage === i ? "border-foreground" : "border-transparent"
                }`}
              >
                <img src={img.src.replace("w=900&h=1100", "w=160&h=160")} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 relative overflow-hidden bg-muted aspect-[4/5]">
            <img
              src={product.images[activeImage].src}
              alt={product.images[activeImage].alt}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span
                className="absolute top-4 left-4 bg-accent text-accent-foreground text-[9px] tracking-[0.25em] uppercase px-2 py-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {product.tag}
              </span>
            )}

            {/* Mobile thumbnail dots */}
            <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    activeImage === i ? "bg-primary-foreground" : "bg-primary-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {product.category} — {product.id}
          </p>
          <h1
            className="text-4xl lg:text-5xl leading-tight mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground font-light mb-6">{product.material}</p>
          <p
            className="text-2xl tracking-wider text-foreground mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {product.price}
          </p>

          <p className="text-sm leading-[1.85] text-muted-foreground font-light mb-10 max-w-md">
            {product.description}
          </p>

          {/* Size selector — only for rings */}
          {product.category === "Rings" && (
            <div className="mb-8">
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Select Size (EU)
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 text-xs border transition-colors ${
                      selectedSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex gap-3 mb-10">
            <button
              onClick={handleAddToBag}
              className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                addedToBag
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground hover:bg-accent"
              }`}
            >
              {addedToBag ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button
              onClick={() => setWished(!wished)}
              className={`px-4 border transition-colors ${
                wished ? "border-accent text-accent" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={16} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Details table */}
          <div className="mb-8 border-t border-border">
            {product.details.map((d, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-border text-xs"
              >
                <span
                  className="text-muted-foreground tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {d.label}
                </span>
                <span className="text-foreground font-light">{d.value}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="flex flex-col">
            {ACCORDIONS.map((acc) => (
              <div key={acc.id} className="border-b border-border">
                <button
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                  className="w-full flex items-center justify-between py-4 text-xs tracking-[0.2em] uppercase text-left hover:text-accent transition-colors"
                >
                  {acc.title}
                  {openAccordion === acc.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                {openAccordion === acc.id && (
                  <p className="text-sm text-muted-foreground font-light leading-relaxed pb-5">
                    {acc.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related pieces */}
      {product.related.length > 0 && (
        <div className="bg-secondary py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 border-b border-border pb-6">
              <h2
                className="text-3xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                You may also like
              </h2>
              <Link
                to="/collections"
                className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {product.related.map((p) => (
                <Link to={`/collections/${p.id}`} key={p.id} className="group">
                  <div className="overflow-hidden bg-muted aspect-[3/4] mb-4">
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3
                    className="text-lg mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-sm tracking-wider">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
