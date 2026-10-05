import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SEO from "../components/SEO";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setLoading(true);

      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return;
      }

      const user = JSON.parse(savedUser);
      const mobile = user?.mobileNumber || user?.mobile;

      if (!mobile) {
        setOrders([]);
        return;
      }

      const { data } = await axios.post(`${url}/order/fetch-customer`, {
        mobile,
      });

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-2xl">Loading...</div>;
  }

  return (
    <section className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto py-8 md:py-12">
      <SEO
        title="Order Fresh Paneer, Tofu & Vegan Products | PFC Foods"
        description="Browse and order fresh paneer, tofu, soy milk, vegan ghee, and other healthy products from PFC Foods with ease."
        keywords="Order Paneer, Buy Tofu, Soy Milk, Vegan Ghee, Healthy Products, PFC Foods"
        url="https://pfcpaneer.in/orders"
        image="https://pfcpaneer.in/logo.png"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="text-gray-500 mt-2">Track your recent purchases.</p>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            {/* Header */}

            <div className="bg-[#fcfaf7] border-b p-4 flex flex-col md:flex-row justify-between gap-4">
              <div className="grid grid-cols-2 md:flex gap-8">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>

                  <h3 className="font-semibold">{order._id.slice(-8)}</h3>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Placed On</p>

                  <h3 className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Total</p>

                  <h3 className="font-semibold">₹{order.totalAmount}</h3>
                </div>
              </div>

              <span
                className={`w-fit text-xs px-3 py-1 rounded-full font-medium
                ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Products */}

            {order.products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b px-5 py-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">{item.productId?.name}</h2>

                    <p className="text-gray-500 text-sm">
                      {item.productId?.category}
                    </p>

                    <p className="text-sm">Qty : {item.quantity}</p>
                  </div>
                </div>

                <h3 className="font-bold">₹{item.price * item.quantity}</h3>
              </div>
            ))}

            {/* ========= PART 2 ========= */}
            {/* Footer */}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Payment :</span>{" "}
                  {order.paymentMethod}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Delivery :</span>{" "}
                  {order.deliveryDate
                    ? new Date(order.deliveryDate).toLocaleDateString()
                    : "Not Assigned"}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="border border-gray-300 hover:bg-gray-100 transition px-5 py-2 rounded-lg text-sm">
                  <Link to="/contactUs">Buy Again</Link>
                </button>

                <button
                  className="bg-black hover:bg-gray-800 transition text-white px-5 py-2 rounded-lg text-sm"
                  onClick={() => window.location.reload()}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="border rounded-xl p-12 text-center">
            <h2 className="text-2xl font-bold">No Orders Found</h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
