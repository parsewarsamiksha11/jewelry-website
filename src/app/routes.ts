import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { ProductDetail } from "./pages/ProductDetail";
import { Craftsmanship } from "./pages/Craftsmanship";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "collections", Component: Collections },
      { path: "collections/:id", Component: ProductDetail },
      { path: "craftsmanship", Component: Craftsmanship },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
