export type Product = {
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
  size: string;
  color: string;
  expectedDelivery: string;
  exchangeEligibility: string;
  details: { label: string; value: string }[];
  images: { src: string; alt: string }[];
  related: { id: string; name: string; price: string; image: string; alt: string }[];
};

export const PRODUCTS: Record<string, Product> = {
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
    size: "7",
    color: "White Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "3.79 gm" },
      { label: "Size", value: "7" },
      { label: "Color", value: "White Gold" },
      { label: "Category", value: "22KT Ready" },
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
      { id: "JW-0028", name: "Verdure Cocktail Ring", price: "₹ 5,90,000", image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format", alt: "Emerald gold ring" },
      { id: "JW-0033", name: "Nocturne Band", price: "₹ 3,20,000", image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=400&h=500&fit=crop&auto=format", alt: "Ring on dark surface" },
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
    size: "7",
    color: "Yellow Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "4.15 gm" },
      { label: "Size", value: "7" },
      { label: "Color", value: "Yellow Gold" },
      { label: "Category", value: "22KT Ready" },
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
      { id: "JW-0041", name: "Lumière Solitaire", price: "₹ 8,40,000", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format", alt: "Solitaire ring" },
      { id: "JW-0033", name: "Nocturne Band", price: "₹ 3,20,000", image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=400&h=500&fit=crop&auto=format", alt: "Dark ring" },
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
    size: "7",
    color: "Black Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "2.85 gm" },
      { label: "Size", value: "7" },
      { label: "Color", value: "Black Gold" },
      { label: "Category", value: "18KT Ready" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=1200&h=1400&fit=crop&auto=format", alt: "Nocturne Band front view" },
      { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format", alt: "Band detail view" },
    ],
    related: [
      { id: "JW-0041", name: "Lumière Solitaire", price: "₹ 8,40,000", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format", alt: "Solitaire ring" },
      { id: "JW-0028", name: "Verdure Cocktail Ring", price: "₹ 5,90,000", image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format", alt: "Emerald ring" },
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
    size: "6.5",
    color: "Yellow Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "3.25 gm" },
      { label: "Size", value: "6.5" },
      { label: "Color", value: "Yellow Gold" },
      { label: "Category", value: "18KT Ready" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?w=1200&h=1400&fit=crop&auto=format", alt: "Trèfle Ring front view" },
      { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format", alt: "Ring detail view" },
    ],
    related: [
      { id: "JW-0041", name: "Lumière Solitaire", price: "₹ 8,40,000", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format", alt: "Solitaire ring" },
      { id: "JW-0055", name: "Arc Pearl Strand", price: "₹ 4,10,000", image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format", alt: "Pearl necklace" },
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
    size: "45 cm",
    color: "Pearl White",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "17.5 gm" },
      { label: "Size", value: "45 cm" },
      { label: "Color", value: "Pearl White" },
      { label: "Category", value: "Silver Ready" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=1200&h=1400&fit=crop&auto=format", alt: "Arc Pearl Strand close up" },
      { src: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=1200&h=1400&fit=crop&auto=format", alt: "Pearl necklace on grey textile" },
    ],
    related: [
      { id: "JW-0041", name: "Lumière Solitaire", price: "₹ 8,40,000", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=500&fit=crop&auto=format", alt: "Solitaire ring" },
      { id: "JW-0044", name: "Nacre Statement", price: "₹ 6,80,000", image: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=400&h=500&fit=crop&auto=format", alt: "Pearl statement necklace" },
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
    size: "42 cm",
    color: "White Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "12.40 gm" },
      { label: "Size", value: "42 cm" },
      { label: "Color", value: "White Gold" },
      { label: "Category", value: "Chain" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=1200&h=1400&fit=crop&auto=format", alt: "Rivière Necklace front view" },
      { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format", alt: "Necklace detail view" },
    ],
    related: [
      { id: "JW-0055", name: "Arc Pearl Strand", price: "₹ 4,10,000", image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format", alt: "Pearl necklace" },
      { id: "JW-0044", name: "Nacre Statement", price: "₹ 6,80,000", image: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=400&h=500&fit=crop&auto=format", alt: "Pearl statement necklace" },
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
    size: "48 cm",
    color: "Yellow Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "8.50 gm" },
      { label: "Size", value: "48 cm" },
      { label: "Color", value: "Yellow Gold" },
      { label: "Category", value: "Mangalsutra" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1595345705177-ffe090eb0784?w=1200&h=1400&fit=crop&auto=format", alt: "Nacre Statement front view" },
      { src: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=1200&h=1400&fit=crop&auto=format", alt: "Necklace detail view" },
    ],
    related: [
      { id: "JW-0055", name: "Arc Pearl Strand", price: "₹ 4,10,000", image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format", alt: "Pearl necklace" },
      { id: "JW-0062", name: "Rivière Necklace", price: "₹ 12,60,000", image: "https://images.unsplash.com/photo-1631832722475-dd2ecfc47257?w=400&h=500&fit=crop&auto=format", alt: "Diamond necklace" },
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
    size: "7.5 cm",
    color: "Rose Gold",
    expectedDelivery: "",
    exchangeEligibility: "Yes",
    details: [
      { label: "Availability", value: "Ready Stock" },
      { label: "Net Weight", value: "5.75 gm" },
      { label: "Size", value: "7.5 cm" },
      { label: "Color", value: "Rose Gold" },
      { label: "Category", value: "Bracelet" },
      { label: "Exchange Eligibility", value: "Yes" },
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1561812350-932aed735105?w=1200&h=1400&fit=crop&auto=format", alt: "Aube Pendant bracelet front view" },
      { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format", alt: "Bracelet detail view" },
    ],
    related: [
      { id: "JW-0028", name: "Verdure Cocktail Ring", price: "₹ 5,90,000", image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format", alt: "Emerald ring" },
      { id: "JW-0055", name: "Arc Pearl Strand", price: "₹ 4,10,000", image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=400&h=500&fit=crop&auto=format", alt: "Pearl necklace" },
    ],
  },
};

export const PRODUCT_LOOKUP = PRODUCTS;

export const parseProductMetric = (value: string) => Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

export const getExpectedDeliveryDate = () => {
  const today = new Date();
  const deliveryDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
  return deliveryDate.toLocaleDateString('en-GB');
};

export const formatPrice = (price: string | number | undefined) => {
  if (!price) return '₹ 0';
  const priceStr = String(price).trim();
  // Add rupee symbol if not already present
  if (!priceStr.includes('₹')) {
    return `₹ ${priceStr}`;
  }
  return priceStr;
};

export const getProductCartMeta = (product: Product, quantity = 1) => {
  const netWeight = parseProductMetric(product.netWeight);
  const purityValue = product.purity.toLowerCase().includes("silver") ? 0.92 : 0.9;
  const fineWeight = netWeight * purityValue;

  return {
    code: product.id,
    image: product.images[0]?.src ?? "",
    readyState: product.availability,
    estimateDelivery: getExpectedDeliveryDate(),
    laborCharges: "Not Applicable",
    fineWeight: `${fineWeight.toFixed(2)} gm`,
    totalNetWt: `${(netWeight * quantity).toFixed(2)} gm`,
    totalFineWt: `${(fineWeight * quantity).toFixed(2)} gm`,
  };
};

export const getWishlistProductMeta = (product: Product) => {
  const netWeight = parseProductMetric(product.netWeight);
  const purityValue = product.purity.toLowerCase().includes("silver") ? 0.92 : 0.9;
  const fineWeight = netWeight * purityValue;

  return {
    id: product.id,
    name: product.name,
    image: product.images[0]?.src ?? "",
    netWeight: product.netWeight,
    purity: product.purity,
    laborCharges: "Not Applicable",
    fineWeight: `${fineWeight.toFixed(2)} gm`,
    expectedDelivery: getExpectedDeliveryDate(),
  };
};

export const PRODUCT_CATALOG = Object.values(PRODUCTS);

export const PRODUCT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCT_CATALOG.map((product) => product.category))),
];

export const SEARCH_PRODUCTS = PRODUCT_CATALOG.map((product) => ({
  id: product.id,
  label: product.name,
}));

export const FEATURED_PRODUCT_IDS = ["JW-0041", "JW-0028", "JW-0033", "JW-0055"] as const;

export const FEATURED_PRODUCTS = FEATURED_PRODUCT_IDS.map((id) => PRODUCTS[id]).filter(
  (product): product is Product => Boolean(product)
);

const COLLECTION_SUBTITLES: Record<string, string> = {
  "22KT Ready": "Gold jewellery",
  "18KT Ready": "Fine craftsmanship",
  Chain: "Everyday wear",
  Mangalsutra: "Traditional design",
  Bracelet: "Polished finish",
  "Silver Ready": "Modern styles",
};

export const COLLECTION_SUMMARY = PRODUCT_CATEGORIES.filter((category) => category !== "All").map(
  (category) => {
    const items = PRODUCT_CATALOG.filter((product) => product.category === category);
    const sample = items[0];

    return {
      id: category,
      slug: category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: category,
      subtitle: COLLECTION_SUBTITLES[category] ?? "Fine jewelry",
      image: sample?.images[0]?.src ?? "",
      alt: sample?.images[0]?.alt ?? category,
      count: `${items.length} pieces`,
    };
  }
);
