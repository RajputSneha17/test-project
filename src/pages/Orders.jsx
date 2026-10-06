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
    return (
      <div className="min-h-screen bg-[#f7fbf3] py-20 text-center text-2xl text-[#1f3d2b]">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7fbf3]">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto py-8 md:py-12">
        <SEO
          title="My Orders | PFC Foods"
          description="View and track your orders from PFC Foods."
          keywords="PFC Foods Orders, My Orders, Track Order"
          url="https://pfcpaneer.in/orders"
          image="https://pfcpaneer.in/logo.png"
        />

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f3d2b]">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">Track your recent purchases.</p>
        </div>

        {/* Orders */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white
                border border-green-100
                rounded-xl
                overflow-hidden
                shadow-sm
              "
            >
              {/* Header */}
              <div className="bg-[#eef6e9] border-b border-green-100 p-4 flex flex-col md:flex-row justify-between gap-4">
                <div className="grid grid-cols-2 md:flex gap-8">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>

                    <h3 className="font-semibold text-[#1f3d2b]">
                      {order._id.slice(-8)}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Placed On</p>

                    <h3 className="font-semibold text-[#1f3d2b]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total</p>

                    <h3 className="font-semibold text-[#1f3d2b]">
                      ₹{order.totalAmount}
                    </h3>
                  </div>
                </div>

                {/* Status */}
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
                  className="flex justify-between items-center border-b border-gray-100 px-5 py-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div>
                      <h2 className="font-semibold text-[#1f3d2b]">
                        {item.productId?.name}
                      </h2>

                      <p className="text-gray-500 text-sm">
                        {item.productId?.category}
                      </p>

                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-bold text-[#1f3d2b]">
                    ₹{item.price * item.quantity}
                  </h3>
                </div>
              ))}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#1f3d2b]">
                      Payment:
                    </span>{" "}
                    {order.paymentMethod}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#1f3d2b]">
                      Delivery:
                    </span>{" "}
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleDateString()
                      : "Not Assigned"}
                  </p>
                </div>

                <div className="flex gap-3">
                  {/* Buy Again */}
                  <button
                    className="
                      border border-green-700
                      text-green-700
                      hover:bg-green-700
                      hover:text-white
                      transition
                      px-5 py-2
                      rounded-lg
                      text-sm
                      font-medium
                    "
                  >
                    <Link to="/contactUs">Buy Again</Link>
                  </button>

                  {/* Track Order */}
                  <button
                    className="
                      bg-green-700
                      hover:bg-green-800
                      transition
                      text-white
                      px-5 py-2
                      rounded-lg
                      text-sm
                      font-medium
                    "
                    onClick={() => window.location.reload()}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* No Orders */}
          {orders.length === 0 && (
            <div className="bg-white border border-green-100 rounded-xl p-12 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-[#1f3d2b]">
                No Orders Found
              </h2>

              <p className="text-gray-500 mt-2">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/"
                className="
                  inline-block
                  mt-6
                  bg-green-700
                  hover:bg-green-800
                  text-white
                  px-8 py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
