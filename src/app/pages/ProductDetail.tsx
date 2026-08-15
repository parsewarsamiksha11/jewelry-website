import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Heart, Share2 } from "lucide-react";

const PRODUCTS: Record<string, {
  id: string;
  name: string;
  category: string;
  sku: string;
  vendor: string;
  purity: string;
  price: string;
  material: string;
  tag: string | null;
  description: string;
  availability: string;
  netWeight: string;
  wastage: string;
  size: string;
  color: string;
  subCategory: string;
  expectedDelivery: string;
  exchangeEligibility: string;
  details: { label: string; value: string }[];
  images: { src: string; alt: string }[];
  related: { id: string; name: string; price: string; image: string; alt: string }[];
}> = {
  "JW-0041": {
    id: "JW-0041",
    name: "Lumière Solitaire",
    category: "22KT Ready",
    sku: "ZZCAJE937472",
    vendor: "SKU: ST-NZYXAO",
    purity: "18KT",
    price: "₹ 8,40,000",
    material: "18k White Gold · 1.2ct Diamond",
    tag: "New",
    description:
      "An elegant solitaire ring featuring a brilliant 1.2 carat diamond set in 18k white gold, perfect for timeless elegance and special occasions.",
    availability: "Ready Stock",
    netWeight: "3.79 gm",
    wastage: "4.5 %",
    size: "7",
    color: "White Gold",
    subCategory: "DIAMOND",
    expectedDelivery: "16/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "3.79 gm" },
      { label: "Wastage", value: "4.5 %" },
      { label: "Size", value: "7" },
      { label: "Color", value: "White Gold" },
      { label: "Category", value: "22KT Ready" },
      { label: "Sub Category", value: "DIAMOND" },
      { label: "Expected Delivery Date", value: "16/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=1200&h=1400&fit=crop&auto=format",
        alt: "Lumière Solitaire ring front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format",
        alt: "Diamond ring detail view",
      },
      {
        src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&h=1400&fit=crop&auto=format",
        alt: "Ring with jewelry styling",
      },
    ],
    related: [
      {
        id: "JW-0028",
        name: "Verdure Cocktail Ring",
        price: "₹ 5,90,000",
        image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format",
        alt: "Emerald gold ring",
      },
      {
        id: "JW-0033",
        name: "Nocturne Band",
        price: "₹ 3,20,000",
        image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=400&h=500&fit=crop&auto=format",
        alt: "Ring on dark surface",
      },
    ],
  },
  "JW-0028": {
    id: "JW-0028",
    name: "Verdure Cocktail Ring",
    category: "22KT Ready",
    sku: "ZZVDR347891",
    vendor: "SKU: ST-EMRLD",
    purity: "18KT",
    price: "₹ 5,90,000",
    material: "18k Yellow Gold · Emerald",
    tag: "Rare",
    description:
      "A richly coloured emerald ring set in yellow gold with a statement silhouette suited for festive and bridal styling.",
    availability: "Ready Stock",
    netWeight: "4.15 gm",
    wastage: "3.5 %",
    size: "7",
    color: "Yellow Gold",
    subCategory: "EMERALD",
    expectedDelivery: "20/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "4.15 gm" },
      { label: "Wastage", value: "3.5 %" },
      { label: "Size", value: "7" },
      { label: "Color", value: "Yellow Gold" },
      { label: "Category", value: "22KT Ready" },
      { label: "Sub Category", value: "EMERALD" },
      { label: "Expected Delivery Date", value: "20/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=1200&h=1400&fit=crop&auto=format",
        alt: "Verdure Cocktail Ring front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format",
        alt: "Gold ring detail view",
      },
    ],
    related: [
      {
        id: "JW-0041",
        name: "Lumière Solitaire",
        price: "₹ 8,40,000",
        image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format",
        alt: "Solitaire ring",
      },
      {
        id: "JW-0033",
        name: "Nocturne Band",
        price: "₹ 3,20,000",
        image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=400&h=500&fit=crop&auto=format",
        alt: "Dark ring",
      },
    ],
  },
  "JW-0033": {
    id: "JW-0033",
    name: "Nocturne Band",
    category: "18KT Ready",
    sku: "ZZNOC234567",
    vendor: "SKU: ST-BLACK",
    purity: "18KT",
    price: "₹ 3,20,000",
    material: "18k Black Gold · Pavé",
    tag: null,
    description:
      "A sophisticated black gold band featuring pavé-set diamonds for a contemporary and luxurious aesthetic perfect for modern style.",
    availability: "Ready Stock",
    netWeight: "2.85 gm",
    wastage: "3.8 %",
    size: "7",
    color: "Black Gold",
    subCategory: "BAND",
    expectedDelivery: "17/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "2.85 gm" },
      { label: "Wastage", value: "3.8 %" },
      { label: "Size", value: "7" },
      { label: "Color", value: "Black Gold" },
      { label: "Category", value: "18KT Ready" },
      { label: "Sub Category", value: "BAND" },
      { label: "Expected Delivery Date", value: "17/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=1200&h=1400&fit=crop&auto=format",
        alt: "Nocturne Band front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format",
        alt: "Band detail view",
      },
    ],
    related: [
      {
        id: "JW-0041",
        name: "Lumière Solitaire",
        price: "₹ 8,40,000",
        image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format",
        alt: "Solitaire ring",
      },
      {
        id: "JW-0028",
        name: "Verdure Cocktail Ring",
        price: "₹ 5,90,000",
        image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format",
        alt: "Emerald ring",
      },
    ],
  },
  "JW-0017": {
    id: "JW-0017",
    name: "Trèfle Ring",
    category: "18KT Ready",
    sku: "ZZTRF123456",
    vendor: "SKU: ST-CLOVER",
    purity: "22KT",
    price: "₹ 2,80,000",
    material: "22k Yellow Gold · Clover Motif",
    tag: null,
    description:
      "An elegant clover-motif ring crafted in 22k yellow gold, symbolizing luck and prosperity with intricate traditional detailing.",
    availability: "Ready Stock",
    netWeight: "3.25 gm",
    wastage: "4.2 %",
    size: "6.5",
    color: "Yellow Gold",
    subCategory: "MOTIF",
    expectedDelivery: "18/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "3.25 gm" },
      { label: "Wastage", value: "4.2 %" },
      { label: "Size", value: "6.5" },
      { label: "Color", value: "Yellow Gold" },
      { label: "Category", value: "18KT Ready" },
      { label: "Sub Category", value: "MOTIF" },
      { label: "Expected Delivery Date", value: "18/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?w=1200&h=1400&fit=crop&auto=format",
        alt: "Trèfle Ring front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format",
        alt: "Ring detail view",
      },
    ],
    related: [
      {
        id: "JW-0041",
        name: "Lumière Solitaire",
        price: "₹ 8,40,000",
        image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format",
        alt: "Solitaire ring",
      },
      {
        id: "JW-0055",
        name: "Arc Pearl Strand",
        price: "₹ 4,10,000",
        image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format",
        alt: "Pearl necklace",
      },
    ],
  },
  "JW-0055": {
    id: "JW-0055",
    name: "Arc Pearl Strand",
    category: "Silver Ready",
    sku: "ZZARCP8750",
    vendor: "SKU: ST-PEARL",
    purity: "Silver",
    price: "₹ 4,10,000",
    material: "Akoya Pearls · 14k Clasp",
    tag: "Signature",
    description:
      "A refined statement necklace featuring hand-selected Akoya pearls in a graceful arc finish with a polished 14k gold clasp.",
    availability: "Ready Stock",
    netWeight: "17.5 gm",
    wastage: "4.2 %",
    size: "45 cm",
    color: "Pearl White",
    subCategory: "PEARL",
    expectedDelivery: "18/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "17.5 gm" },
      { label: "Wastage", value: "4.2 %" },
      { label: "Size", value: "45 cm" },
      { label: "Color", value: "Pearl White" },
      { label: "Category", value: "Silver Ready" },
      { label: "Sub Category", value: "PEARL" },
      { label: "Expected Delivery Date", value: "18/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=1200&h=1400&fit=crop&auto=format",
        alt: "Arc Pearl Strand close up",
      },
      {
        src: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=1200&h=1400&fit=crop&auto=format",
        alt: "Pearl necklace on grey textile",
      },
    ],
    related: [
      {
        id: "JW-0041",
        name: "Lumière Solitaire",
        price: "₹ 8,40,000",
        image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format",
        alt: "Solitaire ring",
      },
      {
        id: "JW-0044",
        name: "Nacre Statement",
        price: "₹ 6,80,000",
        image: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=400&h=500&fit=crop&auto=format",
        alt: "Pearl statement necklace",
      },
    ],
  },
  "JW-0062": {
    id: "JW-0062",
    name: "Rivière Necklace",
    category: "Chain",
    sku: "ZZRVR567890",
    vendor: "SKU: ST-RIVER",
    purity: "18KT",
    price: "₹ 12,60,000",
    material: "18k White Gold · Diamond Line",
    tag: "New",
    description:
      "A stunning rivière necklace featuring a continuous line of brilliant diamonds set in 18k white gold for timeless elegance.",
    availability: "Ready Stock",
    netWeight: "12.40 gm",
    wastage: "3.5 %",
    size: "42 cm",
    color: "White Gold",
    subCategory: "DIAMOND LINE",
    expectedDelivery: "19/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "12.40 gm" },
      { label: "Wastage", value: "3.5 %" },
      { label: "Size", value: "42 cm" },
      { label: "Color", value: "White Gold" },
      { label: "Category", value: "Chain" },
      { label: "Sub Category", value: "DIAMOND LINE" },
      { label: "Expected Delivery Date", value: "19/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=1200&h=1400&fit=crop&auto=format",
        alt: "Rivière Necklace front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format",
        alt: "Necklace detail view",
      },
    ],
    related: [
      {
        id: "JW-0055",
        name: "Arc Pearl Strand",
        price: "₹ 4,10,000",
        image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format",
        alt: "Pearl necklace",
      },
      {
        id: "JW-0044",
        name: "Nacre Statement",
        price: "₹ 6,80,000",
        image: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=400&h=500&fit=crop&auto=format",
        alt: "Pearl statement necklace",
      },
    ],
  },
  "JW-0044": {
    id: "JW-0044",
    name: "Nacre Statement",
    category: "Mangalsutra",
    sku: "ZZNACR234567",
    vendor: "SKU: ST-NACRE",
    purity: "18KT",
    price: "₹ 6,80,000",
    material: "South Sea Pearl · 18k Setting",
    tag: null,
    description:
      "An exquisite mangalsutra featuring lustrous South Sea pearls set in 18k gold, combining tradition with contemporary elegance.",
    availability: "Ready Stock",
    netWeight: "8.50 gm",
    wastage: "3.8 %",
    size: "48 cm",
    color: "Yellow Gold",
    subCategory: "PEARL MANGALSUTRA",
    expectedDelivery: "21/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "8.50 gm" },
      { label: "Wastage", value: "3.8 %" },
      { label: "Size", value: "48 cm" },
      { label: "Color", value: "Yellow Gold" },
      { label: "Category", value: "Mangalsutra" },
      { label: "Sub Category", value: "PEARL MANGALSUTRA" },
      { label: "Expected Delivery Date", value: "21/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=1200&h=1400&fit=crop&auto=format",
        alt: "Nacre Statement front view",
      },
      {
        src: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=1200&h=1400&fit=crop&auto=format",
        alt: "Necklace detail view",
      },
    ],
    related: [
      {
        id: "JW-0055",
        name: "Arc Pearl Strand",
        price: "₹ 4,10,000",
        image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format",
        alt: "Pearl necklace",
      },
      {
        id: "JW-0062",
        name: "Rivière Necklace",
        price: "₹ 12,60,000",
        image: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=400&h=500&fit=crop&auto=format",
        alt: "Diamond necklace",
      },
    ],
  },
  "JW-0039": {
    id: "JW-0039",
    name: "Aube Pendant",
    category: "Bracelet",
    sku: "ZZAUB345678",
    vendor: "SKU: ST-AUBE",
    purity: "18KT",
    price: "₹ 3,75,000",
    material: "18k Rose Gold · Sapphire Drop",
    tag: null,
    description:
      "A delicate rose gold bracelet featuring a stunning sapphire drop pendant, perfect for adding a sophisticated touch to any occasion.",
    availability: "Ready Stock",
    netWeight: "5.75 gm",
    wastage: "4.0 %",
    size: "7.5 cm",
    color: "Rose Gold",
    subCategory: "SAPPHIRE",
    expectedDelivery: "19/08/2026",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "5.75 gm" },
      { label: "Wastage", value: "4.0 %" },
      { label: "Size", value: "7.5 cm" },
      { label: "Color", value: "Rose Gold" },
      { label: "Category", value: "Bracelet" },
      { label: "Sub Category", value: "SAPPHIRE" },
      { label: "Expected Delivery Date", value: "19/08/2026" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1561812350-932aed735105?w=1200&h=1400&fit=crop&auto=format",
        alt: "Aube Pendant bracelet front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format",
        alt: "Bracelet detail view",
      },
    ],
    related: [
      {
        id: "JW-0028",
        name: "Verdure Cocktail Ring",
        price: "₹ 5,90,000",
        image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format",
        alt: "Emerald ring",
      },
      {
        id: "JW-0055",
        name: "Arc Pearl Strand",
        price: "₹ 4,10,000",
        image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format",
        alt: "Pearl necklace",
      },
    ],
  },
};

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
  wastage: "N/A",
  size: "N/A",
  color: "N/A",
  subCategory: "N/A",
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
        entries.push({ id: item.id, quantity: Math.max(1, item.quantity) });
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartEntries = getStoredCartEntries();
      const existing = cartEntries.find((entry) => entry.id === product.id);
      const isInCart = !!existing;
      setWished(getStoredFavoriteIds().includes(product.id));
      setAddedToBag(isInCart);
      setQty(existing?.quantity ?? 0);
    }
  }, [product.id]);

  function handleAddToBag() {
    if (typeof window === "undefined") return;

    const currentQty = qty + 1;
    const cartEntries = getStoredCartEntries();
    const existingIndex = cartEntries.findIndex((entry) => entry.id === product.id);
    const nextCartEntries = [...cartEntries];

    if (existingIndex >= 0) {
      nextCartEntries[existingIndex] = { ...nextCartEntries[existingIndex], quantity: currentQty };
    } else {
      nextCartEntries.push({ id: product.id, quantity: currentQty });
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
      const nextCartEntries = [...filtered, { id: product.id, quantity: nextQty }];
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
              JEWEL CASA
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
              <span className="font-medium">Wastage:</span>
              <span className="text-right">{product.wastage}</span>
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
              <span className="font-medium">Sub Category:</span>
              <span className="text-right uppercase">{product.subCategory}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="font-medium">Expected Delivery Date:</span>
              <span className="text-right">{product.expectedDelivery}</span>
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
