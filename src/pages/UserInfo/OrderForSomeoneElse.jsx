import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  Copy,
  Share2,
  Link as LinkIcon,
  User,
  Phone,
  House,
  LoaderCircle,
  Star,
} from "lucide-react";

const emptyAddress = {
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

const OrderForSomeoneElse = ({ url }) => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatingLink, setGeneratingLink] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const loadAddresses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/FriendAddress/addresses");

      setAddresses(response.data.addresses || []);
    } catch (error) {
      console.error("Load addresses:", error);

      await Swal.fire({
        icon: "error",
        title: "Unable to load addresses",
        text: error.response?.data?.message || "Please try again later.",
        confirmButtonColor: "#287c45",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
    // Load saved addresses when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyAddress);
    setShowForm(true);
  };

  const startEdit = (address) => {
    setEditingId(address.id);
    setForm({
      ...emptyAddress,
      ...address,
    });
    setShowForm(true);
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) {
      return Swal.fire(
        "Invalid mobile number",
        "Enter a valid 10-digit mobile number.",
        "warning",
      );
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      return Swal.fire(
        "Invalid PIN code",
        "Enter a valid 6-digit PIN code.",
        "warning",
      );
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/FriendAddress/addresses/${editingId}`, form);
      } else {
        await api.post("/FriendAddress/addresses", form);
      }

      await loadAddresses();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyAddress);

      await Swal.fire({
        icon: "success",
        title: "Address saved",
        text: "Your delivery address has been saved.",
        confirmButtonColor: "#287c45",
      });
    } catch (error) {
      await Swal.fire(
        "Unable to save address",
        error.response?.data?.message || "Please try again later.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteAddress = async (id) => {
    const result = await Swal.fire({
      title: "Delete address?",
      text: "You can add this address again later.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/FriendAddress/addresses/${id}`);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      await Swal.fire(
        "Unable to delete",
        error.response?.data?.message || "Please try again later.",
        "error",
      );
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      await api.patch(`/FriendAddress/addresses/${id}/default`);

      await loadAddresses();
    } catch (error) {
      await Swal.fire(
        "Unable to update",
        error.response?.data?.message || "Please try again later.",
        "error",
      );
    }
  };

  const generateShareLink = async () => {
    try {
      setGeneratingLink(true);

      const response = await api.post("/FriendAddress/address-share-link");

      const link = response.data.link;

      setShareLink(link);

      await Swal.fire({
        icon: "success",
        title: "Link created",
        text: "Share this link with the person who will fill in the delivery address.",
        confirmButtonColor: "#287c45",
      });
    } catch (error) {
      await Swal.fire(
        "Unable to create link",
        error.response?.data?.message || "Please try again later.",
        "error",
      );
    } finally {
      setGeneratingLink(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);

      await Swal.fire({
        icon: "success",
        title: "Copied",
        text: "The address link has been copied.",
        confirmButtonColor: "#287c45",
      });
    } catch {
      await Swal.fire("Copy failed", "Please copy the link manually.", "info");
    }
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `Please fill in my delivery address using this link: ${shareLink}`,
    );

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const inputClass =
    "w-full rounded-lg border border-green-200 bg-[#f7fbf3] px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-[#f0f7e9] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <MapPin size={28} />
          </div>

          <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
            Delivery Addresses
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage your saved addresses and choose where your PFC order should
            be delivered.
          </p>
        </div>

        {/* Actions */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={startAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-4 font-semibold text-white transition hover:bg-green-800"
          >
            <Plus size={20} />
            Add New Address
          </button>

          <button
            type="button"
            onClick={generateShareLink}
            disabled={generatingLink}
            className="flex items-center justify-center gap-2 rounded-xl border border-green-300 bg-[#e3f1d7] px-5 py-4 font-semibold text-green-900 transition hover:bg-[#d6eac6] disabled:opacity-60"
          >
            {generatingLink ? (
              <LoaderCircle size={20} className="animate-spin" />
            ) : (
              <Share2 size={20} />
            )}
            {generatingLink ? "Creating Link..." : "Get Address Link"}
          </button>
        </div>

        {/* Share Link */}
        {shareLink && (
          <div className="mb-6 rounded-xl border border-green-300 bg-[#e5f2d9] p-5">
            <div className="flex items-center gap-2 font-semibold text-green-900">
              <LinkIcon size={19} />
              Your Address Link
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Send this link to the person who will fill in your delivery
              address.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                readOnly
                value={shareLink}
                className={`${inputClass} flex-1`}
              />

              <button
                type="button"
                onClick={copyLink}
                className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 font-medium text-white hover:bg-green-800"
              >
                <Copy size={17} />
                Copy
              </button>

              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#d6eac6] px-4 py-3 font-medium text-green-950 hover:bg-[#c8e1b5]"
              >
                <Share2 size={17} />
                WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Address Form */}
        {showForm && (
          <form
            onSubmit={saveAddress}
            className="mb-7 rounded-2xl border border-green-200 bg-[#f7fbf3] p-5 shadow-sm sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-green-950">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-green-100"
              >
                Cancel
              </button>
            </div>

            <div className="mb-5">
              <label className={labelClass}>Address Type</label>

              <div className="flex flex-wrap gap-2">
                {["Home", "Office", "Other"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, label }))}
                    className={`rounded-full border px-5 py-2 text-sm font-medium ${
                      form.label === label
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-green-200 bg-[#eaf4e1] text-green-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Receiver's Full Name *</label>
                <input
                  name="receiverName"
                  value={form.receiverName}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="Full name"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className={labelClass}>Mobile Number *</label>
                <input
                  name="mobileNumber"
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  value={form.mobileNumber}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Alternate Mobile Number</label>
                <input
                  name="alternateMobileNumber"
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  value={form.alternateMobileNumber}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className={labelClass}>
                  House / Flat / Building No. *
                </label>
                <input
                  name="houseNumber"
                  value={form.houseNumber}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="House or flat number"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className={labelClass}>Street / Colony / Area *</label>
                <input
                  name="street"
                  value={form.street}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="Street, colony or area"
                  required
                  maxLength={150}
                />
              </div>

              <div>
                <label className={labelClass}>Landmark</label>
                <input
                  name="landmark"
                  value={form.landmark}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="Nearby landmark"
                  maxLength={150}
                />
              </div>

              <div>
                <label className={labelClass}>City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="City"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className={labelClass}>State *</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="State"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className={labelClass}>PIN Code *</label>
                <input
                  name="pinCode"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={form.pinCode}
                  onChange={updateField}
                  className={inputClass}
                  placeholder="6-digit PIN code"
                  required
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-lg bg-[#eaf4e1] p-3 text-sm text-green-950">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={updateField}
                className="h-4 w-4 accent-green-700"
              />
              Set as my default delivery address
            </label>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60 sm:w-auto"
            >
              {saving ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Check size={18} />
              )}
              {saving ? "Saving..." : "Save Address"}
            </button>
          </form>
        )}

        {/* Saved Addresses */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-950">Saved Addresses</h2>

          <span className="rounded-full bg-[#dceccc] px-3 py-1 text-sm font-medium text-green-900">
            {addresses.length} saved
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoaderCircle size={32} className="animate-spin text-green-700" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-green-300 bg-[#eaf4e1] px-5 py-12 text-center">
            <House size={38} className="mx-auto text-green-700" />
            <h3 className="mt-4 font-semibold text-green-950">
              No saved addresses yet
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Add an address to make your next order easier.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <article
                key={address.id}
                className="rounded-2xl border border-green-200 bg-[#f7fbf3] p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e1efd5] text-green-800">
                      {address.label === "Home" ? (
                        <House size={21} />
                      ) : (
                        <MapPin size={21} />
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-green-950">
                        {address.label || "Address"}
                      </h3>

                      {address.isDefault && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                          <Star size={13} fill="currentColor" />
                          Default address
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(address)}
                      aria-label="Edit address"
                      className="rounded-lg p-2 text-green-800 hover:bg-[#e1efd5]"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteAddress(address.id)}
                      aria-label="Delete address"
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2 font-semibold text-gray-900">
                    <User size={16} className="text-green-700" />
                    {address.receiverName || address.username}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-green-700" />
                    {address.mobileNumber}
                  </p>

                  <p className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-green-700"
                    />
                    <span>
                      {[
                        address.houseNumber,
                        address.street,
                        address.landmark,
                        address.city,
                        address.state,
                        address.pinCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </p>

                  {address.alternateMobileNumber && (
                    <p className="text-gray-500">
                      Alternate: {address.alternateMobileNumber}
                    </p>
                  )}
                </div>

                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(address.id)}
                    className="mt-4 rounded-lg border border-green-300 px-3 py-2 text-sm font-medium text-green-800 hover:bg-[#e1efd5]"
                  >
                    Set as default
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForSomeoneElse;
