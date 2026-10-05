import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Auth = ({ url }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    address: {
      email: "",
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      landmark: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) return;

      setFormData((prev) => ({
        ...prev,
        mobileNumber: value,
      }));

      return;
    }

    if (
      [
        "email",
        "houseNumber",
        "street",
        "city",
        "state",
        "pinCode",
        "landmark",
      ].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${url}/user/register`, formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: data.message || "Your information has been saved successfully.",
        confirmButtonColor: "#000",
        confirmButtonText: "Continue",
      });

      setFormData({
        username: "",
        mobileNumber: "",
        address: {
          email: "",
          houseNumber: "",
          street: "",
          city: "",
          state: "",
          pinCode: "",
          landmark: "",
        },
      });

      navigate("/profile");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const isRegistered = Boolean(token && user);

  return (
    <>
      {isRegistered ? (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold">Already Registered</h2>

            <p className="text-gray-500 mt-3">
              Your delivery information is already saved. You can manage it
              anytime from your profile.
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl"
            >
              Go to My Profile
            </button>
          </div>
        </section>
      ) : (
        <section className="min-h-screen bg-gray-100 py-12 px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-center">
              Delivery Information
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Fill in your delivery details
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  <span className="text-red-500">*</span> Full Name
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  <span className="text-red-500">*</span> Mobile Number
                </label>

                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email <span className="text-gray-400">(Optional)</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.address.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">
                    <span className="text-red-500">*</span> House Number
                  </label>

                  <input
                    type="text"
                    name="houseNumber"
                    value={formData.address.houseNumber}
                    onChange={handleChange}
                    placeholder="House / Flat No."
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    <span className="text-red-500">*</span> Street
                  </label>

                  <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="Street"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">
                    <span className="text-red-500">*</span> City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    <span className="text-red-500">*</span> State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">
                    <span className="text-red-500">*</span> Pin Code
                  </label>

                  <input
                    type="text"
                    name="pinCode"
                    value={formData.address.pinCode}
                    onChange={handleChange}
                    placeholder="Pin Code"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    <span className="text-red-500">*</span> Landmark
                  </label>

                  <input
                    type="text"
                    name="landmark"
                    value={formData.address.landmark}
                    onChange={handleChange}
                    placeholder="Nearby Landmark"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
              >
                Save Information
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Auth;
