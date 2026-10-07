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
        confirmButtonColor: "#16a34a",
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
    <div className="min-h-screen bg-[#f7fbf3]">
      {isRegistered ? (
        /* =========================
           ALREADY REGISTERED
        ========================= */
        <section className="min-h-screen flex items-center justify-center bg-[#f7fbf3] px-4 py-12">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-green-100 p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#dcebd2] flex items-center justify-center">
              <span className="text-3xl text-green-700">✓</span>
            </div>

            <h2 className="text-2xl font-bold text-[#1f3d2b] mt-6">
              Already Registered
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              Your delivery information is already saved. You can manage it
              anytime from your profile.
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="mt-6 bg-[#d2e8c8] hover:bg-[#c4dfb9] text-black px-6 py-3 rounded-xl font-semibold transition"
            >
              Go to My Profile
            </button>
          </div>
        </section>
      ) : (
        /* =========================
           REGISTRATION FORM
        ========================= */
        <section className="min-h-screen bg-[#f7fbf3] py-12 px-4">
          <div className="max-w-2xl mx-auto">
            {/* HEADING */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1f3d2b]">
                Delivery Information
              </h1>

              <p className="text-green-700 mt-2">
                Complete your details for a smooth shopping experience
              </p>
            </div>

            {/* FORM CARD */}
            <div className="bg-white shadow-sm rounded-2xl border border-green-100 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* FULL NAME */}
                <div>
                  <label className="block mb-2 font-medium text-[#1f3d2b]">
                    <span className="text-red-500">*</span> Full Name
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                {/* MOBILE */}
                <div>
                  <label className="block mb-2 font-medium text-[#1f3d2b]">
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
                    className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 font-medium text-[#1f3d2b]">
                    Email <span className="text-gray-400">(Optional)</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.address.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                {/* HOUSE + STREET */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-[#1f3d2b]">
                      <span className="text-red-500">*</span> House Number
                    </label>

                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.address.houseNumber}
                      onChange={handleChange}
                      placeholder="House / Flat No."
                      required
                      className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#1f3d2b]">
                      <span className="text-red-500">*</span> Street
                    </label>

                    <input
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={handleChange}
                      placeholder="Street"
                      required
                      className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>
                </div>

                {/* CITY + STATE */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-[#1f3d2b]">
                      <span className="text-red-500">*</span> City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#1f3d2b]">
                      <span className="text-red-500">*</span> State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.address.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                      className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>
                </div>

                {/* PIN + LANDMARK */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-[#1f3d2b]">
                      <span className="text-red-500">*</span> Pin Code
                    </label>

                    <input
                      type="text"
                      name="pinCode"
                      value={formData.address.pinCode}
                      onChange={handleChange}
                      placeholder="Pin Code"
                      required
                      className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#1f3d2b]">
                      <span className="text-red-500">*</span> Landmark
                    </label>

                    <input
                      type="text"
                      name="landmark"
                      value={formData.address.landmark}
                      onChange={handleChange}
                      placeholder="Nearby Landmark"
                      required
                      className="w-full border border-green-100 rounded-xl px-4 py-3 outline-none bg-[#f7fbf3] focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-[#d2e8c8] hover:bg-[#c4dfb9] text-black py-3 rounded-xl font-semibold transition"
                >
                  Save Information
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Auth;
