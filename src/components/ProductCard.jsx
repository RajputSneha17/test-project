import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Zap, Star, Minus, Plus } from "lucide-react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  if (!product) return null;

  const productId = product.publicId ?? product.public_id ?? product.id;
  const stock = Math.max(0, Number(product.stock) || 0);
  const image = product.image || product.imageUrl || product.images?.[0];
  const name = product.name || "Product";
  const price = Number(product.discountPrice ?? product.price) || 0;
  const rating = Number(product.rating) || 0;

  const isWishlisted = wishlist.some(
    (item) =>
      String(item.publicId ?? item.public_id ?? item.id ?? item._id) ===
      String(productId),
  );

  const handleWishlist = (e) => {
    e.stopPropagation();
    setMessage("");

    if (isWishlisted) {
      removeFromWishlist(productId);
      setMessage("Removed from wishlist");
    } else {
      addToWishlist({ ...product, id: productId });
      setMessage("Added to wishlist");
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setMessage("");

    if (!productId) {
      setMessage("Product ID is missing.");
      return;
    }

    if (stock <= 0) {
      setMessage("This product is out of stock.");
      return;
    }

    if (qty > stock) {
      setMessage(`Only ${stock} items are available.`);
      setQty(stock);
      return;
    }

    addToCart({ ...product, id: productId }, qty);
    setMessage("Added to cart successfully");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    setMessage("");

    if (!productId || stock <= 0) {
      setMessage("This product is currently unavailable.");
      return;
    }

    if (qty > stock) {
      setMessage(`Only ${stock} items are available.`);
      setQty(stock);
      return;
    }

    navigate("/checkout", {
      state: {
        buyNowItems: [{ productId, quantity: qty }],
      },
    });
  };

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#eef7e8] border border-green-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52 md:h-60 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm opacity-50">No Image</span>
          </div>
        )}

        {stock <= 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            className={
              isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
            }
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#285a31] line-clamp-1">
          {name}
        </h3>

        {product.shortDescription && (
          <p className="text-sm opacity-60 mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {rating > 0 && (
          <div className="flex items-center gap-1 mt-3 text-sm">
            <Star size={16} fill="currentColor" className="text-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}

        <div className="mt-3">
          <span className="text-xl font-bold text-[#285a31]">
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Quantity selector */}
        <div
          className="mt-4 flex items-center justify-between gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm font-medium text-[#285a31]">Quantity</span>

          <div className="flex items-center border border-green-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQty((current) => Math.max(1, current - 1))}
              disabled={qty <= 1 || stock <= 0}
              className="p-2 text-[#285a31] hover:bg-green-100 disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-8 text-center text-sm font-semibold text-[#285a31]">
              {qty}
            </span>

            <button
              type="button"
              onClick={() => setQty((current) => Math.min(stock, current + 1))}
              disabled={qty >= stock || stock <= 0}
              className="p-2 text-[#285a31] hover:bg-green-100 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {stock > 0 && stock <= 5 && (
          <p className="mt-2 text-xs text-orange-700">
            Only {stock} left in stock
          </p>
        )}

        {message && (
          <p role="status" className="mt-2 text-xs text-[#285a31]">
            {message}
          </p>
        )}

        <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={stock <= 0 || loading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#285a31] text-white text-sm font-medium hover:bg-[#1f4d29] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={17} />
            <span className="hidden sm:inline">Add</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            disabled={stock <= 0 || loading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#d99b2b] text-white text-sm font-medium hover:bg-[#c88c20] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap size={17} fill="currentColor" />
            <span className="hidden sm:inline">Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
