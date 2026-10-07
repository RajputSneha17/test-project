import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f7fbf3] mt-20 border-t border-gray-200">
      {/* Main Footer */}
      <div className="w-[90%] mx-auto py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-xl font-bold font-serif text-black">
            PACHAURI FOOD CORPORATION (PFC)
          </h1>

          <p className="text-gray-600 mt-5 leading-7">
            Quality products, trusted service and a better shopping experience.
            Explore our wide range of food and everyday products, carefully
            selected for you.
          </p>

          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Shop with confidence. Quality you can trust.
            </p>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-black">Shop</h2>

          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/products" className="hover:text-black transition">
                All Products
              </Link>
            </li>

            <li>
              <Link to="/categories" className="hover:text-black transition">
                Categories
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-black transition">
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/orders" className="hover:text-black transition">
                My Orders
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-black transition">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-black">
            Customer Support
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/about" className="hover:text-black transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contactUs" className="hover:text-black transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/shipping-policy"
                className="hover:text-black transition"
              >
                Shipping Policy
              </Link>
            </li>

            <li>
              <Link to="/return-policy" className="hover:text-black transition">
                Return & Refund Policy
              </Link>
            </li>

            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-black transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-black">Contact Us</h2>

          <div className="space-y-5 text-gray-600">
            <div>
              <h3 className="font-semibold text-black mb-2">Phone</h3>

              <p>+91 7732917826</p>
              <p>+91 9311365550</p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">Address</h3>

              <p className="leading-6">
                Pooran Vihar Colony,
                <br />
                Dholpur, Rajasthan - 328001
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">Email</h3>

              <p>rsolution2011@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="w-[90%] mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500 text-sm">
          <p>© 2026 Pachauri Food Corporation. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-black transition">
              Terms & Conditions
            </Link>

            <span>|</span>

            <span>Secure & Trusted Shopping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
