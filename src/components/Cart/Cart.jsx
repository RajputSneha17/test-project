import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, addToCart, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handleCheckout = () => {
    const user = localStorage.getItem("user");

    // User registered nahi hai
    if (!user) {
      navigate("/register");
      return;
    }

    // Confirm page ke liye order save
    const orderData = {
      products: cart,
      subtotal,
    };

    localStorage.setItem("order", JSON.stringify(orderData));

    navigate("/confirm");
  };

  return (
    <section className="w-[90%] mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-gray-500 text-xl">
          Your Cart is Empty
        </h2>
      ) : (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left */}
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>

                    <p className="text-gray-500 mt-1">₹{item.price}</p>

                    <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2 mt-4 w-fit">
                      <button onClick={() => decreaseQty(item.id)}>-</button>

                      <span>{item.qty}</span>

                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold">₹{item.price * item.qty}</h2>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="border border-gray-200 rounded-2xl p-6 h-fit sticky top-28">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr />

            <div className="flex justify-between mt-4 text-xl font-bold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-8 bg-black hover:bg-gray-900 text-white py-3 rounded-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
