import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const {
    cart,
    cartError,
    cartTotal,
    refreshCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [syncing, setSyncing] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setSyncing(false);
      return;
    }

    refreshCart()
      .catch(() => {})
      .finally(() => setSyncing(false));
  }, []);

  const getId = (item) => item.publicId || item.public_id || item.id || item._id;

  const getPrice = (item) => {
    return Number(item.discountPrice ?? item.price ?? 0);
  };

  const totalAmount = cartTotal;

  if (syncing) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center">
        Checking your cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#dcefd2] flex items-center justify-center">
            <ShoppingBag size={42} className="text-green-700" />
          </div>

          <h1 className="text-3xl font-bold text-green-900 mb-3">
            Your Cart is Empty
          </h1>

          <p className="text-green-800/70 mb-7">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f9ee] px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-green-950">
              Shopping Cart
            </h1>
            <p className="text-green-800/70 mt-1">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          {cartError && (
            <p role="alert" className="mb-5 rounded-xl bg-red-100 p-4 text-red-800">
              {cartError}
            </p>
          )}

          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-4">
            {cart.map((item) => {
              const id = getId(item);
              const price = getPrice(item);
              const image = item.images?.[0] || item.image || item.imageUrl;

              return (
                <div
                  key={id}
                  className="bg-[#e8f4df] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
                >
                  <div className="w-full sm:w-32 h-32 bg-[#dcefd2] rounded-xl overflow-hidden flex-shrink-0">
                    {image ? (
                      <img
                        src={image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-green-700">
                        <ShoppingBag size={35} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-green-950">
                          {item.name}
                        </h2>

                        <button
                          onClick={() => removeFromCart(id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {item.shortDescription && (
                        <p className="text-sm text-green-800/60 mt-1 line-clamp-2">
                          {item.shortDescription}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                      <div>
                        <span className="text-xl font-bold text-green-800">
                          ₹{price.toFixed(2)}
                        </span>

                        {item.discountPrice != null &&
                          Number(item.discountPrice) < Number(item.price) && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{Number(item.price).toFixed(2)}
                            </span>
                          )}
                      </div>

                      <div className="flex items-center border border-green-300 rounded-xl overflow-hidden bg-[#f3f9ee]">
                        <button
                          onClick={() => decreaseQty(id)}
                          className="w-10 h-10 flex items-center justify-center text-green-800 hover:bg-green-100 transition"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-10 text-center font-semibold text-green-950">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseQty(id)}
                          className="w-10 h-10 flex items-center justify-center text-green-800 hover:bg-green-100 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-28 sm:text-right flex sm:block items-center justify-between">
                    <span className="text-sm text-green-800/60">Subtotal</span>
                    <p className="text-lg font-bold text-green-950">
                      ₹{(price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit bg-[#e8f4df] rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold text-green-950 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 border-b border-green-200 pb-5">
              <div className="flex justify-between text-green-900">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-green-900">
                <span>Delivery</span>
                <span className="text-green-700 font-medium">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-5">
              <span className="text-lg font-semibold text-green-950">
                Total
              </span>

              <span className="text-2xl font-bold text-green-800">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-semibold transition"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              className="w-full mt-3 flex items-center justify-center text-green-800 hover:text-green-950 font-medium py-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
