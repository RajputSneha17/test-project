import React from "react";
import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f7fbf3] mt-20 border-t border-gray-200">
      {/* Footer */}
      <div className="w-[90%] mx-auto py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold font-serif">
            PACHAURI FOOD CORPORATION (PFC)
          </h1>

          <p className="text-gray-600 mt-5 leading-8">
            Healthy vegan food made with love. Discover premium tofu, soy milk,
            vegan ghee and more for a healthier lifestyle.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Shop</h2>

          <ul className="space-y-3 text-gray-600">
            <li>Tofu</li>
            <li>Soy Milk</li>
            <li>Vegan Ghee</li>
            <li>Vegetables</li>
            <li>Fruits</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Company</h2>

          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="about">AboutUs</Link>
            </li>
            <li>
              <Link to="orders">MyOrders</Link>
            </li>
            <li>
              <Link to="contactUs">ContactUs</Link>
            </li>
            <li>
              <Link to="wishlist">Wishlist</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Contact Info</h2>

          <div className="space-y-5 text-gray-600">
            <div>
              <h3 className="font-semibold text-black mb-2">Phone Numbers</h3>
              <p>+91 9351462231</p>
              <p>+91 9311365550</p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">Address</h3>
              <p>
                Pooran Vihar Colony,
                <br />
                Dholpur, Rajasthan - 328001
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="w-[90%] mx-auto py-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Silken. All rights reserved.</p>

          <p>Crafted with ❤️ | Healthy • Vegan • Fresh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
