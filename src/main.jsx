import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CartProvider from "./context/CartContext.jsx";
import WishlistProvider from "./context/WishlistContext.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CartProvider>
    </WishlistProvider>
  </BrowserRouter>,
);
