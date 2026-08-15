import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { PRODUCT_LOOKUP, getProductCartMeta, parseProductMetric } from "../data/products";

const CART_ITEMS_KEY = "jewelcasa-cart-items";
const FAVORITES_KEY = "jewelcasa-favorites";

type CartEntry = {
  id: string;
  quantity: number;
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

export function Cart() {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  useEffect(() => {
    setCartItems(getStoredCartEntries());
  }, []);

  const items = useMemo(
    () =>
      cartItems
        .map((entry) => {
          const product = PRODUCT_LOOKUP[entry.id];
          if (!product) return null;
          return { ...product, ...getProductCartMeta(product, entry.quantity), quantity: entry.quantity };
        })
        .filter((item): item is (typeof PRODUCT_LOOKUP)[keyof typeof PRODUCT_LOOKUP] & { quantity: number; code: string; estimateDelivery: string; laborCharges: string; fineWeight: string } => Boolean(item)),
    [cartItems]
  );

  const totalNetWeight = items.reduce((sum, item) => sum + parseProductMetric(item.netWeight) * item.quantity, 0);
  const totalFineWeight = items.reduce((sum, item) => sum + parseProductMetric(item.fineWeight) * item.quantity, 0);

  const updateCartItems = (next: CartEntry[]) => {
    const totalCount = next.reduce((sum, entry) => sum + entry.quantity, 0);
    window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(next));
    window.localStorage.setItem("jewelcasa-cart-count", String(totalCount));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: totalCount } }));
    setCartItems(next);
  };

  const removeItem = (id: string) => {
    updateCartItems(cartItems.filter((item) => item.id !== id));
  };

  const adjustQuantity = (id: string, delta: number) => {
    const next = cartItems
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0);

    updateCartItems(next);
  };

  const moveToWishlist = (id: string) => {
    const favorites = getStoredIds(FAVORITES_KEY);
    const nextFavorites = favorites.includes(id) ? favorites : [...favorites, id];
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { count: nextFavorites.length } }));
    removeItem(id);
  };

  const clearCart = () => {
    updateCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-6 py-10 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-light tracking-[-0.06em] text-[#1b1a19] mb-8">Shopping Cart</h1>

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 overflow-hidden border border-[#d7cdb8] bg-white/20">
            <div className="flex border-b border-[#d7cdb8] bg-[#e7e0d9]">
              <div className="w-[24%] px-4 py-3 text-center text-[15px] font-medium text-[#2c2926]">Product</div>
              <div className="w-[8%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Net Wt.</div>
              <div className="w-[8%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Purity</div>
              <div className="w-[9%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Wastage</div>
              <div className="w-[12%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Labour Charges</div>
              <div className="w-[12%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Quantity</div>
              <div className="w-[9%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Total Net Wt.</div>
              <div className="w-[9%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Total Fine Wt.</div>
              <div className="w-[9%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Size</div>
              <div className="w-[10%] px-2 py-3 text-center text-[15px] font-medium text-[#2c2926]">Comment</div>
            </div>

            {items.length === 0 ? (
              <div className="p-10 text-center text-[#3d3935]">
                <p className="text-xl mb-4">Your cart is empty.</p>
                <Link to="/collections" className="inline-flex items-center gap-2 border border-[#caa777] px-4 py-2 text-xs tracking-[0.2em] uppercase text-[#5d4838] hover:bg-[#f4eadf]">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex border-b border-[#d7cdb8] last:border-b-0 bg-[#fbfaf7]">
                  <div className="w-[24%] px-4 py-4 flex gap-4 items-start">
                    <div className="w-[96px] h-[90px] border border-[#ded5c7] bg-[#f4f1eb] overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="text-left text-[14px] text-[#2a2723]">
                      <p className="font-semibold text-[#1c1a18]">{item.name}</p>
                      <p className="text-[11px] text-[#1a73b7] mt-1 tracking-[0.18em] uppercase">{item.code}</p>
                      <p className="mt-3 text-[12px] text-[#3e3a36]">(Ready Stock)</p>
                      <p className="mt-2 text-[12px] text-[#3e3a36]">• {item.category}</p>
                      <p className="text-[12px] text-[#3e3a36]">• {item.color}</p>
                      <p className="mt-2 text-[12px] text-[#3e3a36]">Est Delivery :<br />{item.estimateDelivery}</p>
                    </div>
                  </div>

                  <div className="w-[8%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">{item.netWeight}</div>
                  <div className="w-[8%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">{item.purity}</div>
                  <div className="w-[9%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">{item.wastage}</div>
                  <div className="w-[12%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">{item.laborCharges}</div>

                  <div className="w-[12%] px-2 py-4 flex items-center justify-center gap-2 text-[15px] text-[#2d2a27]">
                    <button
                      onClick={() => adjustQuantity(item.id, -1)}
                      className="w-7 h-7 border border-[#cbb89c] bg-white flex items-center justify-center hover:bg-[#f7efe7]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[18px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => adjustQuantity(item.id, 1)}
                      className="w-7 h-7 border border-[#cbb89c] bg-white flex items-center justify-center hover:bg-[#f7efe7]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-2 text-[11px] uppercase text-[#b75e4e] hover:text-[#8d463a]">Remove</button>
                  </div>

                  <div className="w-[9%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">
                    {(parseProductMetric(item.netWeight) * item.quantity).toFixed(2)} gm
                  </div>
                  <div className="w-[9%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">
                    {(parseProductMetric(item.fineWeight) * item.quantity).toFixed(2)} gm
                  </div>
                  <div className="w-[9%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">-</div>
                  <div className="w-[10%] px-2 py-4 text-center text-[15px] text-[#2d2a27]">
                    <input
                      type="text"
                      placeholder="Write your comment here..."
                      className="w-full bg-transparent border border-[#d7cdb8] px-2 py-2 text-[12px] placeholder:text-[#735b41] outline-none"
                    />
                    <button onClick={() => moveToWishlist(item.id)} className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase text-[#7d684d] hover:text-[#5b4636]">
                      <Heart size={12} /> Move to wishlist
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="w-full xl:max-w-[300px] pt-10 xl:pt-0">
            <div className="space-y-4 text-[15px] text-[#2d2a27] border-l border-[#d7cdb8] pl-6">
              <div className="flex justify-between gap-6">
                <span>Appx. Net Weight:</span>
                <span>{totalNetWeight.toFixed(2)} gm</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Appx. Fine Weight:</span>
                <span>{totalFineWeight.toFixed(2)} gm</span>
              </div>
            </div>

            <div className="mt-8 border-t border-[#d7cdb8] pt-6 text-[14px] text-[#453e39] leading-relaxed">
              <p className="flex items-start gap-2"><span className="text-[#d84a4a] font-bold">!</span><span>Stock weight may vary by 5-10%</span></p>
              <p className="mt-3 flex items-start gap-2"><span className="text-[#d84a4a] font-bold">!</span><span>Update comments for size specifications</span></p>
              <p className="mt-3 flex items-start gap-2"><span className="text-[#d84a4a] font-bold">!</span><span>Following stone rates will apply for stone less items: Cz 1000 Rs/Gm, 600 Rs/Gm, Moti 200 Rs/Gm, Kundan 80 Rs/Stone, Swarovski Kundan: 7 Rs/Stone</span></p>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => {
                  if (items.length === 0) {
                    alert("Please add items to your cart before proceeding to checkout.");
                    return;
                  }
                  alert("Proceeding to checkout...");
                  // TODO: Implement actual checkout flow
                }}
                disabled={items.length === 0}
                className="w-full bg-[#1a1d22] text-white text-[16px] font-medium py-3 uppercase tracking-[0.12em] hover:bg-[#111417] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Proceed To Checkout
              </button>
              <button 
                onClick={clearCart}
                disabled={items.length === 0}
                className="w-full border border-[#caa777] bg-transparent text-[#55483a] text-[15px] font-medium py-3 uppercase tracking-[0.12em] hover:bg-[#f4eadf] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Clear Cart
              </button>
              <Link to="/collections" className="block w-full border border-[#caa777] bg-transparent text-[#55483a] text-[15px] font-medium py-3 uppercase tracking-[0.12em] text-center hover:bg-[#f4eadf]">
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
