import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";

const FAVORITES_KEY = "jewelcasa-favorites";
const CART_ITEMS_KEY = "jewelcasa-cart-items";

const PRODUCT_LOOKUP: Record<string, {
  id: string;
  name: string;
  image: string;
  netWeight: string;
  purity: string;
  wastage: string;
  laborCharges: string;
  fineWeight: string;
  expectedDelivery: string;
}> = {
  "JW-0041": {
    id: "JW-0041",
    name: "CZ GENTS RING (92+4.5)",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=700&fit=crop&auto=format",
    netWeight: "15.18 gm",
    purity: "92%",
    wastage: "4.5%",
    laborCharges: "₹ Per Kg",
    fineWeight: "5.00gm",
    expectedDelivery: "17/08/2026",
  },
  "JW-0028": {
    id: "JW-0028",
    name: "Verdure Cocktail Ring",
    image: "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=600&h=700&fit=crop&auto=format",
    netWeight: "14.10 gm",
    purity: "91.6%",
    wastage: "3.5%",
    laborCharges: "₹ 7,200 / Kg",
    fineWeight: "4.90gm",
    expectedDelivery: "20/08/2026",
  },
  "JW-0033": {
    id: "JW-0033",
    name: "Nocturne Band",
    image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=600&h=700&fit=crop&auto=format",
    netWeight: "12.40 gm",
    purity: "92%",
    wastage: "4.2%",
    laborCharges: "₹ 6,800 / Kg",
    fineWeight: "4.20gm",
    expectedDelivery: "18/08/2026",
  },
  "JW-0055": {
    id: "JW-0055",
    name: "Arc Pearl Strand",
    image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=600&h=700&fit=crop&auto=format",
    netWeight: "17.50 gm",
    purity: "92%",
    wastage: "4.2%",
    laborCharges: "₹ 8,300 / Kg",
    fineWeight: "5.80gm",
    expectedDelivery: "18/08/2026",
  },
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

export function Wishlist() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getStoredIds(FAVORITES_KEY));
  }, []);

  const items = useMemo(
    () =>
      favoriteIds
        .map((id) => PRODUCT_LOOKUP[id])
        .filter((item): item is (typeof PRODUCT_LOOKUP)[keyof typeof PRODUCT_LOOKUP] => Boolean(item)),
    [favoriteIds]
  );

  const clearWishlist = () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { count: 0 } }));
    setFavoriteIds([]);
  };

  const removeItem = (id: string) => {
    const next = favoriteIds.filter((itemId) => itemId !== id);
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { count: next.length } }));
    setFavoriteIds(next);
  };

  const moveToCart = (id: string) => {
    const existing = getStoredIds(CART_ITEMS_KEY);
    const nextCart = existing.includes(id) ? existing : [...existing, id];
    window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(nextCart));
    window.localStorage.setItem("jewelcasa-cart-count", String(nextCart.length));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: nextCart.length } }));
    removeItem(id);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-6 py-10 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl lg:text-7xl font-light tracking-[-0.06em] text-[#1c1a18] mb-10">Wishlist</h1>

        {items.length === 0 ? (
          <div className="border border-[#d8d0c3] bg-white/30 p-10 text-center text-[#3d3935]">
            <p className="text-xl mb-4">Your wishlist is empty.</p>
            <Link to="/collections" className="inline-flex items-center gap-2 border border-[#caa777] px-4 py-2 text-xs tracking-[0.2em] uppercase text-[#5d4838] hover:bg-[#f4eadf]">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="border border-[#d8d0c3] bg-white/20">
            <div className="border-b border-[#d8d0c3] bg-[#e4e1dc]">
              <div className="px-6 py-4 text-center text-xl font-medium text-[#1c1a18]">Product</div>
            </div>

            <div>
              <div className="px-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="py-4 border-b border-[#e5dfd7] last:border-b-0">
                    <div className="grid grid-cols-[170px_1fr] gap-5">
                      <div className="w-[170px] h-[170px] border border-[#ded5c7] bg-[#f1efe9] overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-[12px] tracking-[0.25em] uppercase text-[#5d584f] mb-3">{item.id}</p>
                          <div className="space-y-2 text-[15px] text-[#2b2926]">
                            <p><span className="font-semibold">Net Weight</span> : {item.netWeight}</p>
                            <p><span className="font-semibold">Purity</span> : {item.purity}</p>
                            <p><span className="font-semibold">Wastage</span> : {item.wastage}</p>
                            <p><span className="font-semibold">Labour Charges</span> : {item.laborCharges}</p>
                            <p><span className="font-semibold">Fine Weight</span> : {item.fineWeight}</p>
                            <p><span className="font-semibold">Estimate Delivery</span> : {item.expectedDelivery}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-3">
                          <button
                            onClick={() => moveToCart(item.id)}
                            className="inline-flex items-center justify-center gap-2 border border-[#caa777] bg-[#d7b17b] px-5 py-3 text-[13px] tracking-[0.12em] uppercase text-[#1d1a17] hover:opacity-95 transition-colors"
                          >
                            <ShoppingBag size={16} />
                            Move To Cart
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[13px] tracking-[0.12em] uppercase text-[#ad5a4b] hover:text-[#8d463a] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-6 border-t border-[#d8d0c3] flex flex-col gap-4">
                <button
                  onClick={clearWishlist}
                  className="border border-[#caa777] bg-transparent px-5 py-3 text-[13px] tracking-[0.12em] uppercase text-[#7c5f39] hover:bg-[#f4eadf] transition-colors"
                >
                  Clear Wishlist
                </button>

                <Link
                  to="/collections"
                  className="border border-[#caa777] bg-transparent px-5 py-3 text-[13px] tracking-[0.12em] uppercase text-[#7c5f39] text-center hover:bg-[#f4eadf] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
