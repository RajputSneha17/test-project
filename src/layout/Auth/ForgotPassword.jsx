import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = ({ url }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = forgotEmail.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Swal.fire(
        "Invalid Email",
        "Enter a valid email address.",
        "error",
      );
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${url}/user/forgot-password`, {
        email,
      });

      await Swal.fire(
        "Check Your Email",
        data.message ||
          "If an account exists, password reset instructions will be sent.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Unable to process your request.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf3e3] px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1f3d2b] sm:text-4xl">
            Forgot Password
          </h1>
          <p className="mt-3 text-green-800">
            Enter your registered email to receive reset instructions.
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-[#f0f7e9] p-5 shadow-sm sm:p-8">
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1f3d2b]">
                Registered Email Address *
              </label>
              <input
                className="w-full rounded-xl border border-green-200 bg-[#edf5e7] px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>

            <button
              className="w-full rounded-xl bg-[#c7dfb9] py-3 font-bold text-[#1f3d2b] transition hover:bg-[#b4d4a3] disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>

            <p className="text-center text-sm text-gray-700">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-bold text-green-800 hover:underline"
              >
                Login
              </Link>
            </p>
            <p className="text-center text-sm text-gray-700">
              New to PFC?{" "}
              <Link
                to="/register"
                className="font-bold text-green-800 hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
