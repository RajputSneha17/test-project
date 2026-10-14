import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, LockKeyhole, ArrowLeft } from "lucide-react";

const ResetPassword = ({ url }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Reset link is missing or invalid. Please request a new link.");
      return;
    }

    const { password, confirmPassword } = formData;

    if (
      password.length < 8 ||
      password.length > 128 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^A-Za-z\d]/.test(password)
    ) {
      setError(
        "Password must contain at least 8 characters, uppercase, lowercase, a number and a special character.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${url}/user/reset-password`, {
        token,
        password,
        confirmPassword,
      });

      setSuccess(
        response.data.message || "Password reset successfully. Please log in.",
      );

      setFormData({
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f7fbf3] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#dce9d6] bg-[#edf5e8] p-6 shadow-lg sm:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcebd4] text-[#315c38]">
          <LockKeyhole size={27} />
        </div>

        <h1 className="text-center text-2xl font-bold text-[#24492c]">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-sm text-[#607661]">
          Create a new password for your PFC account.
        </p>

        {!token ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Reset token is missing. Please request a new password reset link.
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="mt-3 block font-semibold underline"
            >
              Request a new link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#315c38]"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  maxLength={128}
                  required
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-[#cbdcc4] bg-[#f7fbf3] px-4 py-3 pr-12 text-sm text-[#24492c] outline-none transition focus:border-[#58845b] focus:ring-2 focus:ring-[#58845b]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#607661] hover:text-[#24492c]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#315c38]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  maxLength={128}
                  required
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-[#cbdcc4] bg-[#f7fbf3] px-4 py-3 pr-12 text-sm text-[#24492c] outline-none transition focus:border-[#58845b] focus:ring-2 focus:ring-[#58845b]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#607661] hover:text-[#24492c]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs leading-5 text-[#607661]">
              Use at least 8 characters with uppercase, lowercase, a number and
              a special character.
            </p>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#315c38] px-4 py-3 font-semibold text-white transition hover:bg-[#24492c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mx-auto mt-6 flex items-center gap-2 text-sm font-medium text-[#315c38] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
