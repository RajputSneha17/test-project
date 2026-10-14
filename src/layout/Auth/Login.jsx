import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-[#1f3d2b]">
      {label} *
    </label>
    <input
      className="w-full rounded-xl border border-green-200 bg-[#edf5e7] px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      type={type}
      value={value}
      onChange={onChange}
      required
      autoComplete={autoComplete}
      maxLength={maxLength}
    />
  </div>
);

const Login = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = loginData.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Swal.fire(
        "Invalid Email",
        "Enter a valid email address.",
        "error",
      );
    }
    if (!loginData.password) {
      return Swal.fire("Password Required", "Enter your password.", "error");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${url}/user/login`, {
        email,
        password: loginData.password,
      });

      if (!data.token || !data.user) {
        throw new Error("The server did not return a valid session.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(location.state?.from || "/profile", { replace: true });
    } catch (error) {
      Swal.fire(
        "Login Failed",
        error.response?.data?.message ||
          error.message ||
          "Invalid email or password.",
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
            Welcome Back
          </h1>
          <p className="mt-3 text-green-800">
            Login to manage your account and orders.
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-[#f0f7e9] p-5 shadow-sm sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <Field
              label="Email Address"
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
              autoComplete="email"
              maxLength={254}
            />

            <div className="relative">
              <Field
                label="Password"
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                autoComplete="current-password"
                maxLength={128}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-green-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="w-full rounded-xl bg-[#c7dfb9] py-3 font-bold text-[#1f3d2b] transition hover:bg-[#b4d4a3] disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

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

export default Login;
