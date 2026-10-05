import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Nav from "./layout/Nav";
import Footer from "./layout/Footer";

import Welcome from "./layout/Welcome";

import Home from "./pages/Home";
import About from "./pages/About";
import Orders from "./pages/Orders";
import Detail from "./pages/Detail";

import Auth from "./layout/Auth";
import Rabby from "./layout/Rabby";
import Profile from "./pages/Profile";
import Confirm from "./components/Cart/Confirm";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";

import Grocery from "./components/Grocery";
import FruitsVegetables from "./components/FruitsVegetables";
import Dairy from "./components/Dairy";
import Clothes from "./components/Clothes";
import Household from "./components/Household";
import Category from "./components/Category";

import ScrollToTop from "./components/ScrollToTop";
import MagicCursor from "./layout/MagicCursor";

import PfcSpecial from "./pages/PfcSpecial";

import "./App.css";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const url = "http://localhost:8000/api";

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
      <ScrollToTop />

      <MagicCursor />

      <Nav />

      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home url={url} />} />

          <Route path="/about" element={<About />} />

          <Route path="/orders" element={<Orders url={url} />} />

          <Route path="/detail/:id" element={<Detail url={url} />} />

          <Route path="/register" element={<Auth url={url} />} />

          <Route path="/profile" element={<Profile url={url} />} />

          <Route path="/confirm" element={<Confirm />} />

          <Route path="/contactUs" element={<ContactUs url={url} />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/category/pfc-special" element={<PfcSpecial />} />

          <Route path="/category/grocery" element={<Grocery url={url} />} />

          <Route
            path="/category/fruits-vegetables"
            element={<FruitsVegetables url={url} />}
          />

          <Route path="/category/dairy" element={<Dairy url={url} />} />

          <Route path="/category/clothes" element={<Clothes url={url} />} />

          <Route path="/category/household" element={<Household url={url} />} />

          <Route
            path="/category/:slug/:subcategory"
            element={<Category url={url} />}
          />
        </Routes>
      </main>

      <Rabby />

      <Footer />
    </>
  );
};

export default App;
