import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff, MapPin, PackageCheck } from "lucide-react";
const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = true,
  maxLength,
  inputMode,
  autoComplete,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-[#1f3d2b]">
      {label}
      {required ? " *" : " (Optional)"}
    </label>
    <input
      className="w-full rounded-xl border border-green-200 bg-[#edf5e7] px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      required={required}
      maxLength={maxLength}
      inputMode={inputMode}
      autoComplete={autoComplete}
    />
  </div>
);
const Register = ({ url }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    password: "",
    confirmPassword: "",
    address: {
      email: "",
      addressType: "Home",
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      landmark: "",
    },
  });
  const email = formData.address.email.trim().toLowerCase();
  const buttonClass =
    "w-full rounded-xl bg-[#c7dfb9] py-3 font-bold text-[#1f3d2b] transition hover:bg-[#b4d4a3] disabled:cursor-not-allowed disabled:opacity-60";
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["mobileNumber", "alternateMobileNumber"].includes(name)) {
      if (!/^\d{0,10}$/.test(value)) return;
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    if (name === "pinCode") {
      if (!/^\d{0,6}$/.test(value)) return;
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
      return;
    }
    if (
      [
        "email",
        "addressType",
        "houseNumber",
        "street",
        "city",
        "state",
        "landmark",
      ].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      return Swal.fire(
        "Invalid Mobile",
        "Enter a valid 10-digit Indian mobile number.",
        "error",
      );
    }
    if (
      formData.alternateMobileNumber &&
      !/^[6-9]\d{9}$/.test(formData.alternateMobileNumber)
    ) {
      return Swal.fire(
        "Invalid Alternate Mobile",
        "Enter a valid 10-digit Indian mobile number.",
        "error",
      );
    }
    if (
      formData.alternateMobileNumber &&
      formData.alternateMobileNumber === formData.mobileNumber
    ) {
      return Swal.fire(
        "Invalid Numbers",
        "Both mobile numbers must be different.",
        "error",
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Swal.fire(
        "Invalid Email",
        "Enter a valid email address.",
        "error",
      );
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,128}$/.test(
        formData.password,
      )
    ) {
      return Swal.fire(
        "Weak Password",
        "Use at least 8 characters with uppercase, lowercase, a number and a special character.",
        "error",
      );
    }
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Password Mismatch", "Passwords do not match.", "error");
    }
    if (!/^\d{6}$/.test(formData.address.pinCode)) {
      return Swal.fire(
        "Invalid PIN Code",
        "Enter a valid 6-digit PIN code.",
        "error",
      );
    }
    try {
      setLoading(true);
      await axios.post(`${url}/user/register`, {
        ...formData,
        address: {
          ...formData.address,
          email,
          receiverName: formData.username,
          receiverMobileNumber: formData.mobileNumber,
          receiverAlternateMobileNumber: formData.alternateMobileNumber,
        },
      });
      setVerifiedEmail(email);
      setIsVerifying(true);
      await Swal.fire(
        "Verify Your Email",
        "Enter the verification code sent to your email.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Registration Failed",
        error.response?.data?.message ||
          "Unable to register. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      return Swal.fire(
        "Invalid OTP",
        "Enter the 6-digit verification code.",
        "error",
      );
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${url}/user/verify-email`, {
        email: verifiedEmail,
        otp,
      });
      if (!data.token || !data.user) {
        throw new Error("The server did not return a valid session.");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      await Swal.fire("Success", "Your email has been verified.", "success");
      navigate("/profile", { replace: true });
    } catch (error) {
      Swal.fire(
        "Verification Failed",
        error.response?.data?.message || error.message,
        "error",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#eaf3e3] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1f3d2b] sm:text-4xl">
            {isVerifying ? "Verify Your Email" : "Create Your Account"}
          </h1>
          <p className="mt-3 text-green-800">
            {isVerifying
              ? `Enter the code sent to ${verifiedEmail}.`
              : "Enter your details for a smooth shopping experience."}
          </p>
        </div>
        <div className="rounded-2xl border border-green-200 bg-[#f0f7e9] p-5 shadow-sm sm:p-8">
          {!isVerifying ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <Field
                label="Full Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
              />
              <div>
                <Field
                  label="Primary Mobile Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                />
                <p className="mt-2 text-xs leading-5 text-amber-800">
                  Please double-check this number. We will use it to contact you
                  about your orders and delivery.
                </p>
              </div>
              <Field
                label="Alternate Mobile Number"
                name="alternateMobileNumber"
                value={formData.alternateMobileNumber}
                onChange={handleChange}
                required={false}
                maxLength={10}
                inputMode="numeric"
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={formData.address.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={254}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <Field
                    label="Create Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    maxLength={128}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    maxLength={128}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <p className="-mt-3 text-xs text-gray-600">
                Password must contain at least 8 characters, including
                uppercase, lowercase, a number and a special character.
              </p>
              {/* Separate delivery address section */}
              <section className="mt-8 rounded-2xl border border-green-300 bg-[#e6f1dc] p-4 sm:p-6">
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c7dfb9] text-[#1f3d2b]">
                    <MapPin size={23} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1f3d2b] sm:text-xl">
                      Delivery Address
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-green-900">
                      Where should we deliver your orders? Enter your address so
                      we can deliver your purchases to the right place.
                    </p>
                  </div>
                </div>
                <div className="mb-5 flex items-start gap-2 rounded-xl border border-green-200 bg-[#f0f7e9] p-3">
                  <PackageCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-green-800"
                  />
                  <p className="text-xs leading-5 text-green-900">
                    This address will be saved with your account. You can manage
                    additional delivery addresses later.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1f3d2b]">
                      Address Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      className="w-full rounded-xl border border-green-200 bg-[#edf5e7] px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      name="addressType"
                      value={formData.address.addressType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <Field
                    label="House / Flat / Building No."
                    name="houseNumber"
                    value={formData.address.houseNumber}
                    onChange={handleChange}
                    placeholder="e.g. House 12, Flat 3"
                    maxLength={100}
                    autoComplete="address-line1"
                  />
                  <Field
                    label="Street / Colony / Area"
                    name="street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="Street or area name"
                    maxLength={150}
                    autoComplete="address-line2"
                  />
                  <Field
                    label="City"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="address-level2"
                  />
                  <Field
                    label="State"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="address-level1"
                  />
                  <Field
                    label="PIN Code"
                    name="pinCode"
                    value={formData.address.pinCode}
                    onChange={handleChange}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                  <Field
                    label="Landmark"
                    name="landmark"
                    value={formData.address.landmark}
                    onChange={handleChange}
                    placeholder="Nearby landmark"
                    maxLength={150}
                    required={false}
                  />
                </div>
              </section>
              <button className={buttonClass} type="submit" disabled={loading}>
                {loading ? "Please Wait..." : "Create Account & Verify Email"}
              </button>
              <p className="text-center text-sm text-gray-700">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-bold text-green-800 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <Field
                label="6-Digit Email Verification Code"
                value={otp}
                onChange={(e) => {
                  if (/^\d{0,6}$/.test(e.target.value)) {
                    setOtp(e.target.value);
                  }
                }}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
              />
              <button className={buttonClass} type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
              </button>
              <button
                className="w-full py-2 text-sm font-semibold text-green-800 hover:underline"
                type="button"
                onClick={() => {
                  setIsVerifying(false);
                  setOtp("");
                }}
              >
                Back to Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Register;
