import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

import contactData from "../../data/contactData.js";
import SEO from "../components/SEO.jsx";

const ContactUs = ({ url }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    product: "",
    quantity: 1,
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${url}/products/show`);

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const web3FormData = new FormData();

      web3FormData.append("access_key", import.meta.env.VITE_ACCESS_KEY);

      web3FormData.append("subject", "New Product Order Request");
      web3FormData.append("from_name", "PFC Product Website");

      web3FormData.append(
        "message",
        `Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Product: ${formData.product}
Quantity: ${formData.quantity}`,
      );

      web3FormData.append("name", formData.name);
      web3FormData.append("phone", formData.phone);
      web3FormData.append("address", formData.address);
      web3FormData.append("product", formData.product);
      web3FormData.append("quantity", formData.quantity);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });

      const data = await response.json();

      if (!data.success) {
        setStatus("error");
        return;
      }

      await axios.post(`${url}/data/order`, formData);

      setStatus("success");

      setFormData({
        name: "",
        phone: "",
        address: "",
        product: "",
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50/30 py-16 md:py-20 px-4 sm:px-6">
      <SEO
        title="Contact PFC Foods | Get in Touch"
        description="Contact PFC Foods for product inquiries, bulk orders, customer support, and delivery assistance."
        keywords="Contact PFC Foods, Customer Support, Bulk Orders, Fresh Paneer, Vegan Products"
        url="https://pfcpaneer.in/contactUs"
        image="https://pfcpaneer.in/logo.png"
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14 md:mb-16">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm font-bold text-green-700">
            GET IN TOUCH
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-950 mt-3">
            Contact Us
          </h1>

          <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Feel free to reach out anytime.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-20">
          <div className="bg-white border border-green-100 rounded-3xl shadow-lg shadow-green-900/5 p-6 sm:p-8 md:p-10">
            {/* Phone */}
            <div className="flex items-start gap-4 sm:gap-5 mb-8 sm:mb-10">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaPhoneAlt className="text-green-700 text-xl sm:text-2xl" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-950 mb-3">
                  Phone Numbers
                </h3>

                <div className="space-y-2">
                  {contactData.phones.map((phone, index) => (
                    <p
                      key={index}
                      className="text-gray-600 text-sm sm:text-base break-all"
                    >
                      {phone}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-green-700 text-xl sm:text-2xl" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-950 mb-3">
                  Address
                </h3>

                <p className="text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
                  {contactData.address}
                </p>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex flex-col justify-center">
            <p className="uppercase tracking-[3px] text-xs font-semibold text-green-600">
              PFC FOODS
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mt-2">
              {contactData.name}
            </h2>

            <p className="text-gray-600 mt-5 leading-8 text-base sm:text-lg">
              {contactData.paragraph}
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <div className="text-center mb-10 md:mb-12">
            <p className="uppercase tracking-[3px] text-xs sm:text-sm font-bold text-green-700">
              ORDER WITH US
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-green-950 mt-3">
              Want to Place an Order?
            </h2>

            <p className="text-gray-500 mt-3 text-base sm:text-lg">
              Fill out the form below and our team will contact you shortly.
            </p>
          </div>

          <form
            onSubmit={submitHandler}
            className="bg-white border border-green-100 rounded-3xl shadow-xl shadow-green-900/5 p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8"
          >
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-green-950">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-green-200 px-4 sm:px-5 py-3 outline-none transition-all duration-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-green-950">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-green-200 px-4 sm:px-5 py-3 outline-none transition-all duration-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 font-medium text-green-950">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                className="w-full rounded-xl border border-green-200 px-4 sm:px-5 py-3 resize-none outline-none transition-all duration-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Product & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-green-950">
                  Product
                </label>

                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-green-200 px-4 sm:px-5 py-3 outline-none transition-all duration-300 focus:border-green-600 focus:ring-4 focus:ring-green-100 bg-white"
                  required
                >
                  <option value="">Select Product</option>

                  {products.map((item) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-green-950">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-green-200 px-4 sm:px-5 py-3 outline-none transition-all duration-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-green-800 hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 sm:px-10 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20 cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>

            {/* Success Message */}
            {status === "success" && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4">
                <p className="text-green-700 font-medium text-sm sm:text-base">
                  ✅ Request submitted successfully! We'll contact you soon.
                </p>
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                <p className="text-red-700 font-medium text-sm sm:text-base">
                  ❌ Something went wrong. Please try again.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
