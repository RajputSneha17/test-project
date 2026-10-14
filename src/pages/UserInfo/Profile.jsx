import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  UserX,
  Home,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  BriefcaseBusiness,
  MapPinned,
  Star,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const inputClass = (edit = true) =>
  `mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    edit
      ? "border-green-300 bg-[#fafff7] focus:border-green-600 focus:ring-4 focus:ring-green-100"
      : "border-[#e1eadb] bg-[#f3f8ef] text-gray-700"
  }`;
const Field = ({
  label,
  name,
  value,
  onChange,
  edit = true,
  icon: Icon,
  type = "text",
  maxLength,
  placeholder,
  required = false,
  autoComplete = "off",
}) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-[#38533c]">
      {Icon && <Icon size={16} className="text-green-700" />}
      {label}
      {required && <span className="text-red-500">\*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      disabled={!edit}
      maxLength={maxLength}
      placeholder={placeholder || label}
      autoComplete={autoComplete}
      required={required}
      className={inputClass(edit)}
    />
  </div>
);
const emptyAddress = {
  id: null,
  label: "Home",
  receiverName: "",
  mobileNumber: "",
  alternateMobileNumber: "",
  houseNumber: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pinCode: "",
  isDefault: false,
};
const Profile = ({ url }) => {
  const token = localStorage.getItem("token");
  const authHeaders = useMemo(() => ({ token }), [token]);
  const [editProfile, setEditProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const migrationAttempted = useRef(false);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({ ...emptyAddress });
  const defaultUser = {
    username: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    address: {
      email: "",
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      landmark: "",
    },
  };
  const [user, setUser] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("user") || "null");
      if (!parsed || typeof parsed !== "object") return defaultUser;
      return {
        ...defaultUser,
        ...parsed,
        address: { ...defaultUser.address, ...(parsed.address || {}) },
      };
    } catch {
      return defaultUser;
    }
  });
  const showError = (error, fallback) =>
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: error?.response?.data?.message || fallback,
      confirmButtonColor: "#285d39",
    });
  const loadAddresses = useCallback(async () => {
    if (!token) {
      setLoadingAddresses(false);
      return;
    }
    setLoadingAddresses(true);
    try {
      const { data } = await axios.get(`${url}/user/addresses`, {
        headers: authHeaders,
      });
      let list = Array.isArray(data.addresses)
        ? data.addresses
        : Array.isArray(data.data)
          ? data.data
          : [];
      // Registration already collected this address. If the address API table*
      // is empty for an older account, move that existing registration address*
      // into pfc_user_addresses automatically instead of asking the user to*
      // type the same address again.*
      if (list.length === 0 && !migrationAttempted.current) {
        let savedUser = user;
        try {
          const parsed = JSON.parse(localStorage.getItem("user") || "null");
          if (parsed && typeof parsed === "object")
            savedUser = {
              ...user,
              ...parsed,
              address: { ...(user.address || {}), ...(parsed.address || {}) },
            };
        } catch {
          // Continue with the already-loaded user state.*
        }
        const oldAddress = savedUser.address || {};
        const completeAddress = [
          oldAddress.houseNumber,
          oldAddress.street,
          oldAddress.city,
          oldAddress.state,
          oldAddress.pinCode,
        ].every((value) => String(value || "").trim());
        if (completeAddress) {
          migrationAttempted.current = true;
          try {
            const { data: createdData } = await axios.post(
              `${url}/user/addresses`,
              {
                label: oldAddress.addressType || oldAddress.label || "Home",
                receiverName: savedUser.username || "",
                mobileNumber: savedUser.mobileNumber || "",
                alternateMobileNumber: savedUser.alternateMobileNumber || "",
                houseNumber: oldAddress.houseNumber,
                street: oldAddress.street,
                landmark: oldAddress.landmark || null,
                city: oldAddress.city,
                state: oldAddress.state,
                pinCode: oldAddress.pinCode,
                isDefault: true,
              },
              { headers: authHeaders },
            );
            const createdAddress = createdData.address || createdData.data;
            if (createdAddress && typeof createdAddress === "object") {
              list = [createdAddress];
            } else {
              const refreshed = await axios.get(`${url}/user/addresses`, {
                headers: authHeaders,
              });
              list = Array.isArray(refreshed.data.addresses)
                ? refreshed.data.addresses
                : Array.isArray(refreshed.data.data)
                  ? refreshed.data.data
                  : [];
            }
          } catch (migrationError) {
            // Keep the page usable if this account's address was not migrated;*
            // the existing registration details are still shown below as a fallback.*
            console.error(
              "Could not migrate the registration address:",
              migrationError,
            );
          }
        }
      }
      setAddresses(list);
    } catch (error) {
      showError(error, "Could not load your saved delivery addresses.");
    } finally {
      setLoadingAddresses(false);
    }
  }, [url, token, authHeaders, user]);
  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" || name === "alternateMobileNumber") {
      setUser((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveProfile = async () => {
    if (!user.username?.trim()) {
      return Swal.fire(
        "Name required",
        "Please enter your full name.",
        "error",
      );
    }
    if (!/^[6-9]\d{9}$/.test(user.mobileNumber || "")) {
      return Swal.fire(
        "Invalid Mobile",
        "Enter a valid 10-digit Indian mobile number.",
        "error",
      );
    }
    if (
      user.alternateMobileNumber &&
      !/^[6-9]\d{9}$/.test(user.alternateMobileNumber)
    ) {
      return Swal.fire(
        "Invalid Alternate Mobile",
        "Enter a valid 10-digit mobile number or leave it blank.",
        "error",
      );
    }
    try {
      setSavingProfile(true);
      // The current backend updateUser validates legacy address fields too.
      // Reuse the already-saved address here; do not ask the user to re-enter it.
      const savedAddress =
        addresses.find((address) => Boolean(address.isDefault)) ||
        addresses[0] ||
        {};
      const existingAddress = user.address || {};
      const addressForProfileUpdate = {
        houseNumber:
          savedAddress.houseNumber || existingAddress.houseNumber || "",
        street: savedAddress.street || existingAddress.street || "",
        city: savedAddress.city || existingAddress.city || "",
        state: savedAddress.state || existingAddress.state || "",
        pinCode: savedAddress.pinCode || existingAddress.pinCode || "",
        // Older backend validation incorrectly requires landmark. Preserve its
        // current value; use a neutral fallback only when no landmark exists.
        landmark: savedAddress.landmark || existingAddress.landmark || "N/A",
      };

      if (
        !addressForProfileUpdate.houseNumber ||
        !addressForProfileUpdate.street ||
        !addressForProfileUpdate.city ||
        !addressForProfileUpdate.state ||
        !/^\d{6}$/.test(String(addressForProfileUpdate.pinCode))
      ) {
        return Swal.fire({
          icon: "error",
          title: "Address details missing",
          text: "Your saved address is incomplete. Please use Edit Address to correct it first.",
          confirmButtonColor: "#285d39",
        });
      }

      const { data } = await axios.put(
        `${url}/user/update`,
        {
          username: user.username.trim(),
          mobileNumber: user.mobileNumber,
          alternateMobileNumber: user.alternateMobileNumber || "",
          // Backend updateUser expects address fields nested under `address`.
          address: addressForProfileUpdate,
        },
        { headers: authHeaders },
      );
      const updatedUser = {
        ...user,
        ...(data.user || {}),
        address: { ...user.address, ...(data.user?.address || {}) },
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditProfile(false);
      await Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: data.message || "Your personal information has been updated.",
        confirmButtonColor: "#285d39",
      });
      // Keep receiver details in sync with all saved addresses.*
      await loadAddresses();
    } catch (error) {
      showError(error, "Could not update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };
  const resetAddressForm = () => {
    setAddressForm({
      ...emptyAddress,
      receiverName: user.username || "",
      mobileNumber: user.mobileNumber || "",
      alternateMobileNumber: user.alternateMobileNumber || "",
    });
    setEditingAddressId(null);
    setAddressFormOpen(true);
  };
  const editAddress = (address) => {
    setEditingAddressId(address.id);
    setAddressForm({
      ...emptyAddress,
      ...address,
      id: address.id,
      label: address.label || address.addressType || "Home",
      receiverName: address.receiverName || user.username || "",
      mobileNumber: address.mobileNumber || user.mobileNumber || "",
      alternateMobileNumber:
        address.alternateMobileNumber || user.alternateMobileNumber || "",
      isDefault: Boolean(address.isDefault),
    });
    setAddressFormOpen(true);
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (["mobileNumber", "alternateMobileNumber"].includes(name)) {
      setAddressForm((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }
    if (name === "pinCode") {
      setAddressForm((prev) => ({
        ...prev,
        pinCode: value.replace(/\D/g, "").slice(0, 6),
      }));
      return;
    }
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };
  const validateAddress = () => {
    if (!addressForm.receiverName.trim())
      return "Enter the receiver's full name.";
    if (!/^[6-9]\d{9}$/.test(addressForm.mobileNumber || ""))
      return "Enter a valid 10-digit mobile number.";
    if (
      addressForm.alternateMobileNumber &&
      !/^[6-9]\d{9}$/.test(addressForm.alternateMobileNumber)
    )
      return "Enter a valid alternate mobile number or leave it blank.";
    for (const [key, label] of [
      ["houseNumber", "House / Flat / Building No."],
      ["street", "Street / Colony / Area"],
      ["city", "City"],
      ["state", "State"],
    ]) {
      if (!addressForm[key]?.trim()) return `${label} is required.`;
    }
    if (!/^\d{6}$/.test(addressForm.pinCode || ""))
      return "Enter a valid 6-digit PIN code.";
    return "";
  };
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    const validationError = validateAddress();
    if (validationError) {
      return Swal.fire("Check address details", validationError, "error");
    }
    const payload = {
      label: addressForm.label,
      receiverName: addressForm.receiverName.trim(),
      mobileNumber: addressForm.mobileNumber,
      alternateMobileNumber: addressForm.alternateMobileNumber || "",
      houseNumber: addressForm.houseNumber.trim(),
      street: addressForm.street.trim(),
      landmark: addressForm.landmark.trim() || null,
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      pinCode: addressForm.pinCode,
      isDefault: Boolean(addressForm.isDefault),
    };
    try {
      setSavingAddress(true);
      if (editingAddressId) {
        await axios.put(`${url}/user/addresses/${editingAddressId}`, payload, {
          headers: authHeaders,
        });
      } else {
        await axios.post(`${url}/user/addresses`, payload, {
          headers: authHeaders,
        });
      }
      setAddressFormOpen(false);
      setEditingAddressId(null);
      await loadAddresses();
      await Swal.fire({
        icon: "success",
        title: editingAddressId ? "Address Updated" : "Address Saved",
        text: "Your delivery address has been saved.",
        confirmButtonColor: "#285d39",
      });
    } catch (error) {
      showError(error, "Could not save this delivery address.");
    } finally {
      setSavingAddress(false);
    }
  };
  const handleDeleteAddress = async (address) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete address?",
      text: "This saved delivery address will be removed.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`${url}/user/addresses/${address.id}`, {
        headers: authHeaders,
      });
      await loadAddresses();
      Swal.fire("Deleted", "Delivery address removed.", "success");
    } catch (error) {
      showError(error, "Could not delete this address.");
    }
  };
  const handleSetDefault = async (address) => {
    try {
      await axios.patch(
        `${url}/user/addresses/${address.id}/default`,
        {},
        {
          headers: authHeaders,
        },
      );
      await loadAddresses();
      Swal.fire({
        icon: "success",
        title: "Default Address Updated",
        text: "This address will be selected as your default delivery address.",
        confirmButtonColor: "#285d39",
      });
    } catch (error) {
      showError(error, "Could not update the default address.");
    }
  };
  const handleCancelProfile = () => {
    try {
      const parsed =
        JSON.parse(localStorage.getItem("user") || "null") || defaultUser;
      setUser({
        ...defaultUser,
        ...parsed,
        address: { ...defaultUser.address, ...(parsed.address || {}) },
      });
    } catch {
      setUser(defaultUser);
    }
    setEditProfile(false);
  };
  if (!token) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f1f7eb] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-green-100 bg-[#fafff7] p-8 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#dcebd2] text-green-800">
            <UserX size={36} />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[#1f3d2b]">
            Login Required
          </h2>
          <p className="mt-3 leading-7 text-gray-600">
            Please log in or create an account to view and manage your profile.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="flex-1 rounded-xl bg-[#285d39] px-5 py-3 font-semibold text-white transition hover:bg-[#1f4a2d]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 rounded-xl border border-green-200 bg-[#e6f1dc] px-5 py-3 font-semibold text-[#1f3d2b] transition hover:bg-[#d8eacb]"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="min-h-screen bg-[#edf4e7] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-800">
            My Account
          </p>
          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1f3d2b] sm:text-4xl">
                My Profile
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                Manage your personal details and saved delivery addresses.
              </p>
            </div>
            {!editProfile ? (
              <button
                type="button"
                onClick={() => setEditProfile(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#285d39] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1f4a2d]"
              >
                <Pencil size={17} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancelProfile}
                  disabled={savingProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-[#fafff7] px-4 py-3 font-semibold text-gray-700 transition hover:bg-[#e4efdc] disabled:opacity-60"
                >
                  <X size={17} /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#285d39] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1f4a2d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-green-100 bg-[#fafff7] shadow-sm">
          <div className="h-2 bg-gradient-to-r from-[#285d39] via-[#78a766] to-[#c7dfb9]" />
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#dcebd2] text-3xl font-bold text-[#285d39] sm:h-24 sm:w-24 sm:text-4xl">
              {user.username?.trim()?.charAt(0)?.toUpperCase() || (
                <User size={38} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-green-800">Welcome back</p>
              <h2 className="mt-1 break-words text-2xl font-bold text-[#1f3d2b] sm:text-3xl">
                {user.username || "Your Account"}
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <span className="flex min-w-0 items-center gap-2 break-all">
                  <Phone size={16} className="shrink-0 text-green-700" />
                  {user.mobileNumber || "Mobile not added"}
                </span>
                <span className="flex min-w-0 items-center gap-2 break-all">
                  <Mail size={16} className="shrink-0 text-green-700" />
                  {user.address?.email || "Email not added"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-3xl border border-green-100 bg-[#fafff7] p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e1eed8] text-[#285d39]">
              <User size={23} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1f3d2b] sm:text-2xl">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Your basic account and contact details.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              onChange={handleProfileChange}
              edit={editProfile}
              label="Full Name"
              name="username"
              value={user.username}
              icon={User}
              maxLength={100}
              required
            />
            <Field
              onChange={handleProfileChange}
              edit={editProfile}
              label="Mobile Number"
              name="mobileNumber"
              value={user.mobileNumber}
              icon={Phone}
              maxLength={10}
              placeholder="10-digit mobile number"
              required
            />
            <Field
              onChange={handleProfileChange}
              edit={editProfile}
              label="Alternate Mobile Number"
              name="alternateMobileNumber"
              value={user.alternateMobileNumber}
              icon={Phone}
              maxLength={10}
              placeholder="Optional alternate mobile"
            />
            <Field
              edit={false}
              label="Email Address"
              name="email"
              value={user.address?.email}
              icon={Mail}
              type="email"
              maxLength={254}
            />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Your email address is read-only.
          </p>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-green-200 bg-[#fafff7] shadow-sm">
          <div className="border-b border-green-200 bg-[#e4efdc] p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c8dfba] text-[#285d39]">
                <MapPin size={25} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1f3d2b] sm:text-2xl">
                  Your Delivery Address
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#49624b]">
                  This is the address you provided during registration. You do
                  not need to enter it again.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-5 sm:p-7">
            {loadingAddresses ? (
              <div className="py-8 text-center text-sm text-gray-600">
                Loading your registered address...
              </div>
            ) : addresses.length > 0 ? (
              addresses.map((address) => {
                const label = address.label || address.addressType || "Home";
                const addressText = [
                  address.houseNumber,
                  address.street,
                  address.landmark,
                  address.city,
                  address.state,
                  address.pinCode ? `PIN: ${address.pinCode}` : "",
                ]
                  .filter(Boolean)
                  .join(", ");
                return (
                  <article
                    key={address.id}
                    className="rounded-2xl border border-green-300 bg-[#f3f9ee] p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#e1eed8] px-3 py-1 text-sm font-bold text-[#285d39]">
                        {label === "Home" ? (
                          <Home size={15} />
                        ) : label === "Office" ? (
                          <BriefcaseBusiness size={15} />
                        ) : (
                          <MapPin size={15} />
                        )}
                        {label}
                      </span>
                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                          <CheckCircle2 size={13} /> Default for checkout
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 break-words font-bold text-[#1f3d2b]">
                      {address.receiverName || user.username}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {address.mobileNumber || user.mobileNumber}
                      {address.alternateMobileNumber
                        ? ` · Alternate: ${address.alternateMobileNumber}`
                        : ""}
                    </p>
                    <p className="mt-2 break-words text-sm leading-6 text-gray-700">
                      {addressText || "Address details are incomplete."}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => editAddress(address)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#285d39] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f4a2d]"
                      >
                        <Pencil size={15} /> Edit Address
                      </button>
                      {addresses.length > 1 && !address.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(address)}
                          className="inline-flex items-center gap-2 rounded-xl border border-green-300 px-4 py-2 text-sm font-semibold text-[#285d39] hover:bg-[#e4efdc]"
                        >
                          <Star size={15} /> Set as Default
                        </button>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              <article className="rounded-2xl border border-green-200 bg-[#f4f9ef] p-5">
                <h3 className="font-bold text-[#1f3d2b]">
                  Registration address
                </h3>
                <p className="mt-2 text-sm text-gray-600">{user.username}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {user.mobileNumber}
                </p>
                <p className="mt-2 break-words text-sm leading-6 text-gray-700">
                  {[
                    user.address?.houseNumber,
                    user.address?.street,
                    user.address?.landmark,
                    user.address?.city,
                    user.address?.state,
                    user.address?.pinCode ? `PIN: ${user.address.pinCode}` : "",
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                    "Your registration address is not present in the saved profile data. The backend must return the address collected during registration."}
                </p>
              </article>
            )}
            {addressFormOpen && (
              <form
                onSubmit={handleSaveAddress}
                className="mt-5 rounded-2xl border border-green-200 bg-[#f3f9ee] p-5 sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#1f3d2b]">
                    {editingAddressId
                      ? "Update Delivery Address"
                      : "Save Delivery Address"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setAddressFormOpen(false);
                      setEditingAddressId(null);
                    }}
                    className="rounded-lg p-2 text-gray-600 hover:bg-green-100"
                    aria-label="Close address form"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-[#38533c]">
                      Address Type
                    </label>
                    <select
                      name="label"
                      value={addressForm.label}
                      onChange={handleAddressChange}
                      className={inputClass(true)}
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <Field
                    label="Receiver Name"
                    name="receiverName"
                    value={addressForm.receiverName}
                    onChange={handleAddressChange}
                    icon={User}
                    required
                  />
                  <Field
                    label="Mobile Number"
                    name="mobileNumber"
                    value={addressForm.mobileNumber}
                    onChange={handleAddressChange}
                    icon={Phone}
                    maxLength={10}
                    required
                  />
                  <Field
                    label="Alternate Mobile (Optional)"
                    name="alternateMobileNumber"
                    value={addressForm.alternateMobileNumber}
                    onChange={handleAddressChange}
                    icon={Phone}
                    maxLength={10}
                  />
                  <Field
                    label="House / Flat / Building No."
                    name="houseNumber"
                    value={addressForm.houseNumber}
                    onChange={handleAddressChange}
                    icon={Home}
                    required
                  />
                  <Field
                    label="Street / Colony / Area"
                    name="street"
                    value={addressForm.street}
                    onChange={handleAddressChange}
                    icon={MapPinned}
                    required
                  />
                  <Field
                    label="Landmark (Optional)"
                    name="landmark"
                    value={addressForm.landmark}
                    onChange={handleAddressChange}
                    icon={MapPin}
                  />
                  <Field
                    label="City"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    icon={MapPin}
                    required
                  />
                  <Field
                    label="State"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    icon={MapPin}
                    required
                  />
                  <Field
                    label="PIN Code"
                    name="pinCode"
                    value={addressForm.pinCode}
                    onChange={handleAddressChange}
                    icon={MapPin}
                    maxLength={6}
                    required
                  />
                </div>
                <label className="mt-4 flex items-center gap-2 text-sm font-medium text-[#38533c]">
                  <input
                    type="checkbox"
                    checked={Boolean(addressForm.isDefault)}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        isDefault: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-green-700"
                  />
                  Set as default delivery address
                </label>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={savingAddress}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#285d39] px-5 py-3 font-semibold text-white hover:bg-[#1f4a2d] disabled:opacity-60"
                  >
                    <Save size={17} />{" "}
                    {savingAddress
                      ? "Saving..."
                      : editingAddressId
                        ? "Update Address"
                        : "Save Address"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddressFormOpen(false);
                      setEditingAddressId(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-[#fafff7] px-5 py-3 font-semibold text-gray-700 hover:bg-[#e4efdc]"
                  >
                    <X size={17} /> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
