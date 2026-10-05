import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const getItemId = (item) => item._id || item.id;

  const addToWishlist = (product) => {
    const productId = getItemId(product);
    const exists = wishlist.find((item) => getItemId(item) === productId);

    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => getItemId(item) !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
