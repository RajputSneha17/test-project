import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext";

const Confirm = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const order = JSON.parse(localStorage.getItem("order"));

  if (!user || !order) {
    navigate("/");
    return null;
  }

  const handlePlaceOrder = async () => {
    // API Call baad me yaha kar dena

    clearCart();
    localStorage.removeItem("order");

    await Swal.fire({
      icon: "success",
      title: "Your Order is Placed 🎉",
      text: "Our team will contact you shortly.",
      confirmButtonColor: "#000",
      confirmButtonText: "Continue",
    });

    navigate("/");
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="w-[90%] max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Confirm Your Order</h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* LEFT */}

          <div className="space-y-8">
            {/* Delivery Address */}

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Delivery Address</h2>

                <button
                  onClick={() => navigate("/profile")}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Edit Address
                </button>
              </div>

              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">Name :</span> {user.username}
                </p>

                <p>
                  <span className="font-semibold">Mobile :</span>{" "}
                  {user.mobileNumber}
                </p>

                <p>
                  <span className="font-semibold">Email :</span>{" "}
                  {user.address?.email || "N/A"}
                </p>

                <p className="leading-7">
                  <span className="font-semibold">Address :</span>{" "}
                  {user.address?.houseNumber}, {user.address?.street},{" "}
                  {user.address?.city}, {user.address?.state} -{" "}
                  {user.address?.pinCode}
                </p>

                <p>
                  <span className="font-semibold">Landmark :</span>{" "}
                  {user.address?.landmark}
                </p>
              </div>
            </div>

            {/* Ordered Products */}

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Ordered Products</h2>

              <div className="space-y-5">
                {order.products.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>

                        <p className="text-gray-500 mt-1">₹{item.price}</p>

                        <p className="text-gray-500">Quantity : {item.qty}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold">
                      ₹{item.price * item.qty}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Products</span>
                <span>{order.products.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Quantity</span>
                <span>
                  {order.products.reduce((total, item) => total + item.qty, 0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total Amount</span>
                <span>₹{order.subtotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-black hover:bg-gray-900 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confirm;
