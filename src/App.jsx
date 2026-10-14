import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Layout
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Welcome from "./layout/Welcome";
import Rabby from "./layout/Rabby";
import MagicCursor from "./layout/MagicCursor";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Orders from "./pages/Orders";
import Detail from "./pages/Detail";

// User Information
import OrderForSomeoneElse from "./pages/UserInfo/OrderForSomeoneElse";
import Profile from "./pages/UserInfo/Profile";
import Login from "./layout/Auth/Login";
import Register from "./layout/Auth/Register";
import ForgotPassword from "./layout/Auth/ForgotPassword";
import ResetPassword from "./layout/Auth/ResetPassword";
import FillAddress from "./pages/UserInfo/FillAddress";

import Confirm from "./components/Cart/Confirm";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

// Category
import Categories from "./pages/Category/Categories";
import CategoryDetails from "./pages/Category/CategoryDetails";

// SubCategory
import SubCategories from "./pages/SubCategory/SubCategories";
import SubCategoryProducts from "./pages/SubCategory/SubCategoryProducts";

// Product
import Products from "./pages/Product/Products";
import ProductDetails from "./pages/Product/ProductDetails";

// PFC Special
import PfcSpecial from "./pages/PfcSpecial";

// Other
import ScrollToTop from "./components/ScrollToTop";
import { API_URL } from "./services/api";

import "./App.css";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const url = API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      const expireTime = decoded.exp * 1000;
      const remainingTime = expireTime - Date.now();

      if (remainingTime <= 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.reload();
        return;
      }

      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.reload();
      }, remainingTime);

      return () => clearTimeout(timer);
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.reload();
    }
  }, []);

  return (
    <>
      {/* {showWelcome && <Welcome onComplete={() => setShowWelcome(false)} />} */}

      {/* {!showWelcome && ( */}
      <>
        <ScrollToTop />

        <MagicCursor />

        <Nav />

        <main className="pt-30">
          <Routes>
            {/* ================= HOME ================= */}
            <Route path="/" element={<Home url={url} />} />
            {/* ================= BASIC PAGES ================= */}
            <Route path="/about" element={<About />} />
            <Route path="/orders" element={<Orders url={url} />} />
            {/* ================= Authentication ================= */}
            <Route path="/login" element={<Login url={url} />} />
            <Route path="/register" element={<Register url={url} />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword url={url} />}
            />
            {/* User Information */}
            <Route path="/profile" element={<Profile url={url} />} />
            <Route
              path="/orderforsomeoneelse"
              element={<OrderForSomeoneElse url={url} />}
            />
            <Route path="/fill-address" element={<FillAddress url={url} />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/contactUs" element={<ContactUs url={url} />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout url={url} />} />
            <Route
              path="/reset-password"
              element={<ResetPassword url={url} />}
            />
            {/* ================= PRODUCTS ================= */}
            <Route path="/products" element={<Products url={url} />} />
            <Route path="/product/:id" element={<ProductDetails url={url} />} />
            <Route path="/detail/:id" element={<Detail url={url} />} />
            {/* ================= CATEGORIES ================= */}
            {/* All categories */}
            <Route path="/categories" element={<Categories url={url} />} />
            {/* Single category */}
            <Route
              path="/category/:categoryId"
              element={<SubCategories url={url} />}
            />
            {/* ================= SUBCATEGORIES ================= */}
            {/* Subcategories inside a category */}
            <Route
              path="/category/:categoryId/subcategories"
              element={<SubCategories url={url} />}
            />
            {/* Products inside a subcategory */}
            <Route
              path="/subcategory/:subCategoryId"
              element={<SubCategoryProducts url={url} />}
            />
            {/* ================= PFC SPECIAL ================= */}
            <Route path="/pfc-special" element={<PfcSpecial url={url} />} />
          </Routes>
        </main>

        <Rabby />

        <Footer />
      </>
      {/* )} */}
    </>
  );
};

export default App;
