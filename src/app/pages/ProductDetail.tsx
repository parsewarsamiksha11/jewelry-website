import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Heart, Share2 } from "lucide-react";
import { PRODUCTS as PRODUCT_DATA, getExpectedDeliveryDate } from "../data/products";

const PRODUCTS = PRODUCT_DATA;

const FALLBACK_PRODUCT = {
  id: "UNKNOWN",
  name: "Product Not Found",
  category: "Unknown",
  sku: "N/A",
  vendor: "N/A",
  purity: "N/A",
  price: "Contact for price",
  material: "N/A",
  tag: null,
  description: "This product is not available. Please visit our collections for more options.",
  availability: "Not Available",
  netWeight: "N/A",
  size: "N/A",
  color: "N/A",
  expectedDelivery: "N/A",
  exchangeEligibility: "N/A",
  details: [],
  images: [
    {
      src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=1400&fit=crop&auto=format",
      alt: "Product not found",
    },
  ],
  related: [],
};

const SIZES = ["46", "48", "50", "52", "54", "56", "58"];

const ACCORDIONS = [
  { id: "care", title: "Description", content: "Premium handcrafted jewelry built with enduring craftsmanship and elegant modern silhouettes." },
  { id: "delivery", title: "Comment", content: "Write your comment here..." },
];

const FAVORITES_KEY = "jewelcasa-favorites";
const CART_ITEMS_KEY = "jewelcasa-cart-items";

type CartEntry = {
  id: string;
  quantity: number;
  comment?: string;
  size?: string;
};

const getStoredIds = (key: string) => {
  if (typeof window === "undefined") return [] as string[];

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [] as string[];
  }
};

const getStoredCartEntries = () => {
  if (typeof window === "undefined") return [] as CartEntry[];

  try {
    const raw = window.localStorage.getItem(CART_ITEMS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [] as CartEntry[];

    return parsed.reduce((entries, item) => {
      if (typeof item === "string") {
        entries.push({ id: item, quantity: 1 });
        return entries;
      }

      if (item && typeof item.id === "string" && typeof item.quantity === "number") {
        entries.push({
          id: item.id,
          quantity: Math.max(1, item.quantity),
          comment: typeof item.comment === "string" ? item.comment : undefined,
          size: typeof item.size === "string" ? item.size : undefined,
        });
      }

      return entries;
    }, [] as CartEntry[]);
  } catch {
    return [] as CartEntry[];
  }
};

const getStoredFavoriteIds = () => getStoredIds(FAVORITES_KEY);
const getStoredCartIds = () => getStoredCartEntries().map((item) => item.id);

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id && PRODUCTS[id] ? PRODUCTS[id] : FALLBACK_PRODUCT;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>("care");
  const [wished, setWished] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [qty, setQty] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartEntries = getStoredCartEntries();
      const existing = cartEntries.find((entry) => entry.id === product.id);
      const isInCart = !!existing;
      setWished(getStoredFavoriteIds().includes(product.id));
      setAddedToBag(isInCart);
      setQty(existing?.quantity ?? 0);
      setComment(existing?.comment || "");
      setSelectedSize(existing?.size ?? product.size ?? null);
    }
  }, [product.id, product.size]);

  function handleAddToBag() {
    if (typeof window === "undefined") return;

    const currentQty = qty + 1;
    const cartEntries = getStoredCartEntries();
    const existingIndex = cartEntries.findIndex((entry) => entry.id === product.id);
    const nextCartEntries = [...cartEntries];

    const chosenSize = selectedSize ?? product.size ?? "-";

    if (existingIndex >= 0) {
      nextCartEntries[existingIndex] = { ...nextCartEntries[existingIndex], quantity: currentQty, comment, size: chosenSize };
    } else {
      nextCartEntries.push({ id: product.id, quantity: currentQty, comment, size: chosenSize });
    }

    const totalCount = nextCartEntries.reduce((sum, entry) => sum + entry.quantity, 0);
    window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(nextCartEntries));
    window.localStorage.setItem("jewelcasa-cart-count", String(totalCount));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: totalCount } }));

    setQty(currentQty);
    setAddedToBag(true);
  }

  function handleQuantityChange(delta: number) {
    const nextQty = Math.max(0, qty + delta);
    setQty(nextQty);

    if (typeof window === "undefined") return;

    const cartEntries = getStoredCartEntries();
    const filtered = cartEntries.filter((entry) => entry.id !== product.id);

    if (nextQty > 0) {
      const nextCartEntries = [...filtered, { id: product.id, quantity: nextQty, comment, size: selectedSize ?? product.size ?? "-" }];
      const totalCount = nextCartEntries.reduce((sum, entry) => sum + entry.quantity, 0);
      window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(nextCartEntries));
      window.localStorage.setItem("jewelcasa-cart-count", String(totalCount));
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: totalCount } }));
      setAddedToBag(true);
      return;
    }

    const totalCount = filtered.reduce((sum, entry) => sum + entry.quantity, 0);
    window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(filtered));
    window.localStorage.setItem("jewelcasa-cart-count", String(totalCount));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: totalCount } }));
    setAddedToBag(false);
  }

  function handleFavoriteToggle() {
    if (typeof window === "undefined") return;

    const favorites = getStoredFavoriteIds();
    const exists = favorites.includes(product.id);
    const nextFavorites = exists ? favorites.filter((favId) => favId !== product.id) : [...favorites, product.id];

    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    const nextCount = nextFavorites.length;
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { count: nextCount } }));
    setWished(!exists);
  }

  function handleShare() {
    const shareText = `Check out this product: ${product.name} - ${product.price}`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#1f1b18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 bg-[#c77c6d] text-white px-3 py-2 text-[10px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={12} />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden bg-[#f3efe7] border border-[#e2d8ca] aspect-[4/4.8]">
            <img
              src={product.images[activeImage].src}
              alt={product.images[activeImage].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-4 text-[#b38d5d] text-[11px] tracking-[0.3em] uppercase italic bg-white/20 px-2 py-1">
              Velore
            </div>
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#c29c67] text-white text-[9px] tracking-[0.2em] uppercase px-2 py-1">
                {product.tag}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xl">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`overflow-hidden border ${
                  activeImage === i ? "border-[#b38d5d]" : "border-[#d9d1c2]"
                }`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <h1 className="text-4xl lg:text-[3rem] leading-none mb-2 text-[#171310]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
            {product.name}
          </h1>
          <p className="text-[14px] text-[#5e584e] mb-6 uppercase tracking-[0.08em]">{product.id}</p>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3b7bc7] text-white px-4 py-2 text-[12px] font-medium hover:bg-[#2f6bb4] transition-colors"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>

          <div className="mb-6">
            <p className="text-[12px] uppercase tracking-[0.18em] text-[#7a6d60] mb-2">Purity :</p>
            <div className="inline-flex bg-[#c89a8a] text-white px-4 py-2 text-[16px] font-semibold uppercase">
              {product.purity}
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            {addedToBag ? (
              <div className="flex items-center justify-between flex-1 border border-[#c89a8a] bg-[#f5e7df] px-4 py-3 text-[#3e2d20]">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center border border-[#c89a8a] bg-white text-xl font-medium"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-[18px] font-medium min-w-[30px] text-center">{qty}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center border border-[#c89a8a] bg-white text-xl font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToBag}
                className="flex-1 py-4 text-[14px] tracking-[0.2em] uppercase font-semibold bg-[#c7a18c] text-white hover:opacity-90"
              >
                Add to Cart
              </button>
            )}

            <button
              type="button"
              onClick={handleFavoriteToggle}
              aria-label={wished ? "Remove from favorites" : "Add to favorites"}
              className={`inline-flex items-center justify-center gap-2 border px-4 py-4 text-[12px] tracking-[0.18em] uppercase transition-colors ${
                wished
                  ? "border-[#c98b52] bg-[#f4e3d3] text-[#7f4d2a]"
                  : "border-[#d9c7b5] bg-transparent text-[#3a312d] hover:bg-[#f3efe9]"
              }`}
            >
              <Heart size={16} className={wished ? "fill-current" : ""} />
              {wished ? "Saved" : "Favorite"}
            </button>
          </div>

          <div className="space-y-3 text-[16px] text-[#1b1815]">
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Availability:</span>
              <span className="text-right">{product.availability}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Net Weight:</span>
              <span className="text-right">{product.netWeight}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Size:</span>
              <span className="text-right">{product.size || "—"}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Color:</span>
              <span className="text-right">{product.color}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Category:</span>
              <span className="text-right uppercase">{product.category}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Expected Delivery Date:</span>
              <span className="text-right">{getExpectedDeliveryDate()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Exchange Eligibility:</span>
              <span className="text-right">{product.exchangeEligibility}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#7a6d60] mb-3">Description :</p>
            <p className="text-[15px] text-[#3d352e] leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#7a6d60] mb-3">Comment :</p>
            <div className="flex items-center border border-[#cbbcac] bg-transparent min-h-[72px] p-3">
              <input
                type="text"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] placeholder:text-[#7a6d60]"
              />
              <button className="ml-3 text-[#7a6d60] hover:text-[#1f1b18]" aria-label="Send comment">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
