import { createContext, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

export const CartContext = createContext();

const getStoredCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .filter((item) => item && (item.id != null || item._id != null))
      .map((item) => ({
        ...item,
        qty: Math.max(1, Math.floor(Number(item.qty) || 1)),
      }));
  } catch {
    return [];
  }
};

const getId = (product) => {
  const id = product?.publicId ?? product?.public_id ?? product?.id ?? product?._id;
  return id == null ? null : String(id);
};

const getStockLimit = (product) => {
  if (
    product?.stock === undefined ||
    product?.stock === null ||
    product?.stock === ""
  ) {
    return Infinity;
  }

  return Math.max(0, Number(product.stock) || 0);
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getStoredCart);
  const [serverTotal, setServerTotal] = useState(null);
  const [cartError, setCartError] = useState("");
  const cartRef = useRef(cart);

  const applyServerCart = useCallback((serverCart = {}) => {
    const products = Array.isArray(serverCart.products)
      ? serverCart.products.map((item) => ({
          ...item,
          id: item.publicId ?? item.id,
          qty: Math.max(1, Math.floor(Number(item.qty) || 1)),
        }))
      : [];

    setCart(products);
    setServerTotal(Number(serverCart.totalAmount) || 0);
    setCartError("");
    return products;
  }, []);

  const refreshCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return cartRef.current;

    try {
      const { data } = await axios.get(`${API_URL}/cart/list`, {
        headers: { token },
      });
      const remoteProducts = data?.cart?.products || [];
      let synchronizedCart = data.cart;

      if (remoteProducts.length === 0 && cartRef.current.length > 0) {
        for (const item of cartRef.current) {
          const productId = getId(item);
          if (!productId) continue;
          const result = await axios.post(
            `${API_URL}/cart/add`,
            { productId, quantity: item.qty },
            { headers: { token } },
          );
          synchronizedCart = result.data.cart;
        }
      }

      return applyServerCart(synchronizedCart);
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to sync your cart.";
      setCartError(message);
      console.error("Cart sync failed:", error);
      throw error;
    }
  }, [applyServerCart]);

  const updateServerCart = async (method, path, body) => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const { data } = await axios({
        method,
        url: `${API_URL}/cart/${path}`,
        data: body,
        headers: { token },
      });
      applyServerCart(data.cart);
      return data.cart;
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to update your cart.";
      setCartError(message);
      console.error("Cart update failed:", error);
      return null;
    }
  };

  useEffect(() => {
    cartRef.current = cart;
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cart]);

  // Add a product with the requested quantity.
  // Example: addToCart(product, 3)
  const addToCart = (product, quantity = 1) => {
    const productId = getId(product);

    if (!product || productId === null) {
      console.error("Cannot add product: product ID is missing.");
      return;
    }

    const stockLimit = getStockLimit(product);
    const requestedQty = Math.max(1, Math.floor(Number(quantity) || 1));

    if (stockLimit <= 0) {
      console.warn("This product is out of stock.");
      return;
    }

    if (localStorage.getItem("token")) {
      return updateServerCart(
        "post",
        "add",
        { productId, quantity: requestedQty },
      );
    }

    setServerTotal(null);
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => getId(item) === productId,
      );

      if (existingItem) {
        const newQty = Math.min(existingItem.qty + requestedQty, stockLimit);

        return previousCart.map((item) =>
          getId(item) === productId
            ? { ...item, ...product, qty: newQty }
            : item,
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          qty: Math.min(requestedQty, stockLimit),
        },
      ];
    });
  };

  // Increase quantity by one.
  const increaseQty = (id) => {
    const productId = String(id);
    const item = cart.find((entry) => getId(entry) === productId);
    if (localStorage.getItem("token") && item) {
      return updateServerCart("put", `item/${encodeURIComponent(productId)}`, {
        quantity: item.qty + 1,
      });
    }

    setServerTotal(null);
    setCart((previousCart) =>
      previousCart.map((item) => {
        if (getId(item) !== productId) return item;

        const stockLimit = getStockLimit(item);

        if (item.qty >= stockLimit) return item;

        return {
          ...item,
          qty: item.qty + 1,
        };
      }),
    );
  };

  // Decrease quantity by one; remove the item at zero.
  const decreaseQty = (id) => {
    const productId = String(id);
    const item = cart.find((entry) => getId(entry) === productId);
    if (localStorage.getItem("token") && item) {
      return updateServerCart("put", `item/${encodeURIComponent(productId)}`, {
        quantity: Math.max(0, item.qty - 1),
      });
    }

    setServerTotal(null);
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          getId(item) === productId ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const updateQty = (id, quantity) => {
    const productId = String(id);
    const requestedQty = Math.floor(Number(quantity));

    if (!Number.isFinite(requestedQty)) return;

    if (requestedQty <= 0) {
      if (localStorage.getItem("token")) {
        return updateServerCart(
          "put",
          `item/${encodeURIComponent(productId)}`,
          { quantity: 0 },
        );
      }
      setServerTotal(null);
      setCart((previousCart) =>
        previousCart.filter((item) => getId(item) !== productId),
      );
      return;
    }

    if (localStorage.getItem("token")) {
      return updateServerCart("put", `item/${encodeURIComponent(productId)}`, {
        quantity: requestedQty,
      });
    }

    setServerTotal(null);
    setCart((previousCart) =>
      previousCart.map((item) => {
        if (getId(item) !== productId) return item;

        return {
          ...item,
          qty: Math.min(requestedQty, getStockLimit(item)),
        };
      }),
    );
  };

  const removeFromCart = (id) => {
    const productId = getId(id) ?? String(id);
    if (localStorage.getItem("token")) {
      return updateServerCart(
        "delete",
        `delete/${encodeURIComponent(productId)}`,
      );
    }

    setServerTotal(null);
    setCart((previousCart) =>
      previousCart.filter((item) => getId(item) !== productId),
    );
  };

  const clearCart = () => {
    if (localStorage.getItem("token")) {
      return updateServerCart("delete", "clear");
    }

    setServerTotal(null);
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const localTotal = cart.reduce((total, item) => {
    const price = Number(item.discountPrice ?? item.price ?? 0);
    return total + price * item.qty;
  }, 0);
  const cartTotal = serverTotal ?? localTotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartError,
        cartCount,
        cartTotal,
        refreshCart,
        addToCart,
        increaseQty,
        decreaseQty,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
