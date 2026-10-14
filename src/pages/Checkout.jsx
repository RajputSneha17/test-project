import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Checkout = ({ url }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, cartTotal, refreshCart, clearCart } = useContext(CartContext);

  const buyNowItems = location.state?.buyNowItems;

  const [products, setProducts] = useState([]);
  const [myAddresses, setMyAddresses] = useState([]);
  const [alternateAddresses, setAlternateAddresses] = useState([]);
  const [recipientType, setRecipientType] = useState("self");
  const [addressId, setAddressId] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const selectedItems = useMemo(
    () =>
      Array.isArray(buyNowItems) && buyNowItems.length
        ? buyNowItems
        : cart.map((item) => ({
            productId: item.publicId ?? item.id,
            quantity: item.qty,
          })),
    [buyNowItems, cart],
  );

  const addresses = useMemo(
    () => (recipientType === "someone_else" ? alternateAddresses : myAddresses),
    [recipientType, alternateAddresses, myAddresses],
  );

  const subtotal = useMemo(
    () =>
      buyNowItems?.length
        ? products.reduce(
            (sum, item) =>
              sum +
              Number(item.discountPrice ?? item.price ?? 0) *
                Number(item.quantity),
            0,
          )
        : Number(cartTotal || 0),
    [buyNowItems, products, cartTotal],
  );

  // Load addresses and products.
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", {
        state: { from: "/checkout" },
        replace: true,
      });
      return;
    }

    let cancelled = false;

    const loadCheckout = async () => {
      setLoading(true);
      setError("");

      try {
        const syncedCart = buyNowItems?.length ? [] : await refreshCart();
        const token = localStorage.getItem("token");

        const [mine, alternate] = await Promise.all([
          axios.get(`${url}/user/addresses`, {
            headers: { token },
          }),
          axios.get(`${url}/FriendAddress/addresses`, {
            headers: { token },
          }),
        ]);

        if (cancelled) return;

        const userAddresses = mine.data?.addresses || [];
        const savedAlternateAddresses = alternate.data?.addresses || [];

        setMyAddresses(userAddresses);
        setAlternateAddresses(savedAlternateAddresses);

        const defaultAddress =
          userAddresses.find((address) => address.isDefault) ||
          userAddresses[0];

        setAddressId(defaultAddress?.id || "");

        const lines = buyNowItems?.length
          ? buyNowItems
          : syncedCart.map((item) => ({
              productId: item.publicId ?? item.id,
              quantity: item.qty,
            }));

        const fetchedProducts = await Promise.all(
          lines.map(async (item) => {
            const { data } = await axios.get(
              `${url}/product/show/${encodeURIComponent(item.productId)}`,
            );

            return {
              ...data.product,
              quantity: item.quantity,
            };
          }),
        );

        if (!cancelled) setProducts(fetchedProducts);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError.response?.data?.message ||
              "Checkout data could not be loaded. Please retry.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCheckout();

    return () => {
      cancelled = true;
    };
  }, [buyNowItems, navigate, refreshCart, url]);

  // Keep the default address selected for the chosen recipient.
  useEffect(() => {
    const defaultAddress =
      addresses.find((address) => address.isDefault) || addresses[0];

    setAddressId(defaultAddress?.id || "");
  }, [addresses]);

  // Load the coupon dropdown independently of Apply.
  useEffect(() => {
    let cancelled = false;

    const loadAvailableCoupons = async () => {
      setCouponsLoading(true);

      try {
        const { data } = await axios.get(`${url}/coupons/available`, {
          headers: { token: localStorage.getItem("token") },
          timeout: 8000,
        });

        if (!cancelled && data.success) {
          setAvailableCoupons(data.coupons || []);
        }
      } catch (couponLoadError) {
        if (!cancelled) {
          setAvailableCoupons([]);
          console.error(
            "Available coupons could not load:",
            couponLoadError.response?.data?.message || couponLoadError.message,
          );
        }
      } finally {
        if (!cancelled) setCouponsLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      loadAvailableCoupons();
    }

    return () => {
      cancelled = true;
    };
  }, [url]);

  // Apply a coupon using the backend validation endpoint.
  const applyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Please select a coupon.");
      return;
    }

    if (!Number.isFinite(subtotal) || subtotal < 0) {
      setCouponError("Order subtotal is invalid.");
      return;
    }

    setCouponLoading(true);
    setCouponError("");
    setCouponMessage("");

    try {
      const { data } = await axios.post(
        `${url}/coupons/validate`,
        { code },
        {
          headers: { token: localStorage.getItem("token") },
          timeout: 8000,
        },
      );

      if (!data.success) {
        throw new Error(data.message || "Invalid coupon.");
      }

      const coupon = {
        code: data.code || code,
        title: data.title || "Coupon applied",
        discountType: data.discountType,
        discountValue: Number(data.discountValue || 0),
        maxDiscount: data.maxDiscount == null ? null : Number(data.maxDiscount),
        minimumOrder: Number(data.minimumOrder || 0),
        firstOrderOnly: Boolean(data.firstOrderOnly),
      };

      if (subtotal < coupon.minimumOrder) {
        setAppliedCoupon(null);
        setCouponError(
          `This coupon requires a minimum order of ₹${coupon.minimumOrder.toFixed(2)}.`,
        );
        return;
      }

      setAppliedCoupon(coupon);
      setCouponCode(coupon.code);
      setCouponMessage(
        "Coupon selected. Final discount is subject to server verification.",
      );
    } catch (applyError) {
      setAppliedCoupon(null);
      setCouponError(
        applyError.code === "ECONNABORTED"
          ? "Coupon check timed out. Please try again."
          : applyError.response?.data?.message ||
              applyError.message ||
              "Could not apply coupon.",
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    setCouponMessage("");
  };

  // Preview only. The order backend must independently calculate the final total.
  const discountAmount = useMemo(() => {
    if (!appliedCoupon || subtotal <= 0) return 0;

    if (subtotal < appliedCoupon.minimumOrder) return 0;

    let discount = 0;

    if (appliedCoupon.discountType === "percentage") {
      discount = (subtotal * appliedCoupon.discountValue) / 100;

      if (appliedCoupon.maxDiscount !== null) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.discountType === "fixed") {
      discount = appliedCoupon.discountValue;
    }

    // Delivery is already free in this checkout.
    if (appliedCoupon.discountType === "free_delivery") {
      discount = 0;
    }

    return Math.min(Math.max(0, discount), Math.max(0, subtotal));
  }, [appliedCoupon, subtotal]);

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const placeOrder = async (event) => {
    event.preventDefault();
    setError("");

    if (!selectedItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!addressId) {
      setError("Choose a saved delivery address before placing your order.");
      return;
    }

    setSubmitting(true);

    try {
      const { data } = await axios.post(
        `${url}/order/create`,
        {
          recipientType,
          addressId,
          items: selectedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          couponCode: appliedCoupon?.code || null,
        },
        {
          headers: { token: localStorage.getItem("token") },
        },
      );

      if (!data.success || !data.order) {
        throw new Error(data.message || "Order could not be placed.");
      }

      if (!buyNowItems?.length) {
        await clearCart();
      }

      navigate("/orders", {
        state: { placedOrder: data.order },
      });
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          submitError.message ||
          "Order could not be placed. Please try again.",
      );

      if (!buyNowItems?.length) {
        await refreshCart().catch(() => {});
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f9ee]">
        Loading checkout...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f3f9ee] px-4 py-10 text-green-950">
      <form
        onSubmit={placeOrder}
        className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Cash on Delivery Checkout</h1>

          {error && (
            <p role="alert" className="rounded-xl bg-red-100 p-4 text-red-800">
              {error}
            </p>
          )}

          {/* Delivery recipient */}
          <section className="rounded-2xl bg-[#e8f4df] p-6">
            <h2 className="text-xl font-bold">Delivery recipient</h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                ["self", "My address"],
                ["someone_else", "Someone else"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-green-200 bg-[#f3f9ee] px-4 py-3"
                >
                  <input
                    type="radio"
                    name="recipientType"
                    value={value}
                    checked={recipientType === value}
                    onChange={() => setRecipientType(value)}
                  />
                  {label}
                </label>
              ))}
            </div>

            <h3 className="mt-6 font-semibold">Saved delivery address</h3>

            {addresses.length ? (
              <div className="mt-3 space-y-3">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className="flex cursor-pointer gap-3 rounded-xl border border-green-200 bg-[#f3f9ee] p-4"
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={String(addressId) === String(address.id)}
                      onChange={() => setAddressId(address.id)}
                    />

                    <span>
                      <strong>{address.receiverName}</strong>
                      {" · "}
                      {address.mobileNumber}
                      <br />
                      {address.houseNumber}, {address.street}, {address.city},{" "}
                      {address.state} - {address.pinCode}
                      {address.landmark ? ` · ${address.landmark}` : ""}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="mt-3 rounded-xl bg-[#f3f9ee] p-4">
                <p>
                  No saved address for this recipient. Add one before checkout.
                </p>
                <Link
                  to={
                    recipientType === "someone_else"
                      ? "/orderforsomeoneelse"
                      : "/profile"
                  }
                  className="mt-3 inline-block font-semibold text-green-700 underline"
                >
                  Add an address
                </Link>
              </div>
            )}
          </section>

          {/* Products */}
          <section className="rounded-2xl bg-[#e8f4df] p-6">
            <h2 className="text-xl font-bold">Items</h2>

            <div className="mt-4 space-y-4">
              {products.map((product) => (
                <div
                  key={product.publicId}
                  className="flex items-center justify-between gap-4 border-b border-green-200 pb-4 last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={product.images?.[0] || ""}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-green-800/70">
                        Qty: {product.quantity}
                      </p>
                    </div>
                  </div>

                  <strong className="shrink-0">
                    ₹
                    {(
                      Number(product.discountPrice ?? product.price ?? 0) *
                      Number(product.quantity)
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Order summary and coupon dropdown */}
        <aside className="h-fit rounded-2xl bg-[#e8f4df] p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Order summary</h2>

          <div className="mt-4 rounded-xl border border-green-200 bg-[#f3f9ee] p-4">
            <label htmlFor="coupon-select" className="font-bold">
              Apply Coupon
            </label>

            <div className="mt-3 flex min-w-0 gap-2">
              <select
                id="coupon-select"
                value={couponCode}
                disabled={couponsLoading || !!appliedCoupon}
                onChange={(event) => {
                  setCouponCode(event.target.value);
                  setCouponError("");
                  setCouponMessage("");
                }}
                className="min-w-0 flex-1 rounded-lg border border-green-200 bg-white px-2 py-2 text-sm outline-none focus:border-green-700"
              >
                <option value="">
                  {couponsLoading
                    ? "Loading coupons..."
                    : availableCoupons.length
                      ? "Select a coupon"
                      : "No coupons available"}
                </option>

                {availableCoupons.map((coupon) => (
                  <option key={coupon.id} value={coupon.code}>
                    {coupon.code} — {coupon.title}
                  </option>
                ))}
              </select>

              {!appliedCoupon ? (
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                  className="shrink-0 rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {couponLoading ? "Checking..." : "Apply"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {appliedCoupon && (
              <p className="mt-3 text-sm font-medium text-green-800">
                {appliedCoupon.code}: {appliedCoupon.title}
              </p>
            )}

            {couponMessage && (
              <p className="mt-2 text-xs text-green-800">{couponMessage}</p>
            )}

            {couponError && (
              <p role="alert" className="mt-2 text-sm text-red-700">
                {couponError}
              </p>
            )}
          </div>

          <div className="mt-5 flex justify-between gap-3">
            <span>Subtotal</span>
            <span>₹{Number(subtotal).toFixed(2)}</span>
          </div>

          <div className="mt-3 flex justify-between gap-3">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          {appliedCoupon && (
            <div className="mt-3 flex justify-between gap-3 text-green-800">
              <span>Coupon discount (preview)</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="mt-4 flex justify-between gap-3 border-t border-green-200 pt-4 text-lg font-bold">
            <span>Total (preview)</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <p className="mt-4 text-sm text-green-800/70">
            Pay cash when your order is delivered.
          </p>

          <button
            type="submit"
            disabled={submitting || !addresses.length || !selectedItems.length}
            className="mt-6 w-full rounded-xl bg-green-700 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Placing order..." : "Place COD order"}
          </button>
        </aside>
      </form>
    </section>
  );
};

export default Checkout;
