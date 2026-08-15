import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { ProductDetail } from "./pages/ProductDetail";
import { Contact } from "./pages/Contact";
import { Wishlist } from "./pages/Wishlist";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "collections", Component: Collections },
      { path: "collections/:id", Component: ProductDetail },
      { path: "wishlist", Component: Wishlist },
      { path: "cart", Component: Cart },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
