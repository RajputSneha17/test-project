import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import axios from "axios";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { addReview as submitProductReview } from "../../services/reviewApi";

const ProductDetails = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const getImageUrl = (image) => image || "";
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${url}/product/show/${id}`);
      const data = response.data;

      if (data?.product) {
        setProduct(data.product);
      } else if (data?.data) {
        setProduct(data.data);
      } else if (data?.publicId || data?.public_id) {
        setProduct(data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("PRODUCT FETCH ERROR:", error.response?.data || error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id, url]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/reviews/show/${id}`);

      if (response.data?.success) {
        setReviews(response.data.reviews || []);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, url]);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [fetchProduct, fetchReviews]);

  const isWishlisted = wishlist.some(
    (item) =>
      String(item.publicId ?? item.public_id ?? item.id ?? item._id) ===
      String(product?.publicId),
  );

  const images = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const validRatings = reviews
    .map((review) => Number(review.rating))
    .filter((rating) => rating >= 1 && rating <= 5);

  const averageRating =
    validRatings.length > 0
      ? validRatings.reduce((sum, rating) => sum + rating, 0) /
        validRatings.length
      : null;

  const productRating =
    Number(product?.rating) >= 1 && Number(product?.rating) <= 5
      ? Number(product.rating)
      : null;

  const rating = averageRating ?? productRating;

  const reviewType = product?.reviewSettings?.enabled
    ? product?.reviewSettings?.type
    : "none";

  const hasRating = rating !== null;
  const currentPrice = Number(product?.discountPrice ?? product?.price ?? 0);

  const oldPrice =
    product?.discountPrice !== null &&
    product?.discountPrice !== undefined &&
    Number(product?.discountPrice) < Number(product?.price)
      ? Number(product.price)
      : null;

  const discountPercent =
    oldPrice && currentPrice
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;

  const hasIngredients =
    Array.isArray(product?.ingredients) && product.ingredients.length > 0;

  const hasBenefits =
    Array.isArray(product?.benefits) && product.benefits.length > 0;

  const hasNutrition =
    Array.isArray(product?.nutrition) &&
    product.nutrition.some((item) => item?.title || item?.value);

  const additionalInformation = [
    ["Weight", product?.weight],
    ["Shelf Life", product?.shelfLife],
    ["Country of Origin", product?.country],
    ["Manufacturer", product?.manufacturer],
    ["Storage", product?.storage],
  ].filter(([, value]) => value);

  const hasShipping = product?.shipping || product?.delivery;

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    addToCart({ ...product, id: product.publicId }, qty);
  };

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) return;

    navigate("/checkout", {
      state: {
        buyNowItems: [{ productId: product.publicId, quantity: qty }],
      },
    });
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewMessage("");
    setReviewSubmitting(true);

    try {
      await submitProductReview(url, {
        productId: product.publicId,
        name: reviewName.trim(),
        rating: reviewRating,
        review: reviewText.trim(),
      });
      setReviewText("");
      setReviewMessage("Thanks! Your review was submitted.");
      await fetchReviews();
    } catch (error) {
      setReviewMessage(
        error.response?.data?.message || "Unable to submit your review.",
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.shortDescription || product.name,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-950">
            Product Not Found
          </h1>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 mt-6 bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f9ee] text-green-950">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center gap-2 text-sm text-green-800/60 mb-8">
          <Link to="/" className="hover:text-green-700">
            Home
          </Link>
          <span>/</span>
          <Link to="/product" className="hover:text-green-700">
            Products
          </Link>
          <span>/</span>
          <span className="text-green-950 font-medium truncate">
            {product.name}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-14">
          <div>
            <div className="bg-[#e8f4df] rounded-3xl p-4 sm:p-8">
              <div className="relative h-[420px] sm:h-[560px] lg:h-[620px] rounded-2xl bg-[#f3f9ee] flex items-center justify-center overflow-hidden">
                {images.length > 0 ? (
                  <img
                    src={getImageUrl(images[selectedImage])}
                    alt={product.name}
                    className="w-full h-full object-contain p-5 sm:p-10"
                  />
                ) : (
                  <div className="text-green-700/40 text-center">
                    No image available
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow flex items-center justify-center text-green-800 hover:bg-white"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow flex items-center justify-center text-green-800 hover:bg-white"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 mt-5 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 bg-[#f3f9ee] ${
                        selectedImage === index
                          ? "border-green-700"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:pt-2">
            {hasRating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= Math.round(rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-green-200"
                      }
                    />
                  ))}
                </div>

                <span className="font-semibold text-green-950">
                  {rating.toFixed(1)}
                </span>

                {validRatings.length > 0 && (
                  <span className="text-sm text-green-800/60">
                    {validRatings.length}{" "}
                    {validRatings.length === 1 ? "rating" : "ratings"}
                  </span>
                )}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="text-green-800/70 text-base sm:text-lg leading-7 mt-4">
                {product.shortDescription}
              </p>
            )}

            <div className="flex items-end gap-3 mt-7">
              <span className="text-3xl sm:text-4xl font-bold text-green-800">
                ₹{currentPrice.toFixed(2)}
              </span>

              {oldPrice && (
                <>
                  <span className="text-lg text-green-800/40 line-through mb-1">
                    ₹{oldPrice.toFixed(2)}
                  </span>

                  {discountPercent > 0 && (
                    <span className="mb-1 px-2.5 py-1 rounded-lg bg-green-700 text-white text-xs font-bold">
                      {discountPercent}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="mt-6">
              {Number(product.stock) > 0 ? (
                <div className="inline-flex items-center gap-2 text-green-700 text-sm font-semibold">
                  <Check size={17} />
                  In Stock
                </div>
              ) : (
                <div className="text-red-600 text-sm font-semibold">
                  Out of Stock
                </div>
              )}
            </div>

            {product.description && (
              <div className="mt-7">
                <p className="text-green-900/75 leading-8 text-[15px]">
                  {product.description}
                </p>
              </div>
            )}

            {Number(product.stock) > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="flex items-center border border-green-300 rounded-xl bg-[#e8f4df] overflow-hidden">
                  <button
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#dcefd2]"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="w-12 text-center font-bold">{qty}</span>

                  <button
                    onClick={() =>
                      setQty((prev) =>
                        Math.min(Number(product.stock), prev + 1),
                      )
                    }
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#dcefd2]"
                  >
                    <Plus size={17} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[180px] bg-[#dcefd2] hover:bg-[#cfe6c4] text-green-950 font-semibold rounded-xl px-6 py-3.5 flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 min-w-[180px] bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl px-6 py-3.5 transition"
                >
                  Buy Now
                </button>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  isWishlisted
                    ? removeFromWishlist(product.publicId)
                    : addToWishlist(product)
                }
                className="flex-1 border border-green-300 rounded-xl py-3 flex items-center justify-center gap-2 text-green-900 hover:bg-[#e8f4df]"
              >
                <Heart
                  size={19}
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>

              <button
                onClick={handleShare}
                className="flex-1 border border-green-300 rounded-xl py-3 flex items-center justify-center gap-2 text-green-900 hover:bg-[#e8f4df]"
              >
                {copied ? <Check size={19} /> : <Share2 size={19} />}
                {copied ? "Copied" : "Share"}
              </button>
            </div>

            {hasShipping && (
              <div className="mt-8 rounded-2xl bg-[#e8f4df] p-5 flex gap-4">
                <div className="w-11 h-11 rounded-full bg-[#dcefd2] flex items-center justify-center shrink-0">
                  <Truck size={21} className="text-green-700" />
                </div>

                <div>
                  {product.shipping && (
                    <p className="font-semibold">{product.shipping}</p>
                  )}

                  {product.delivery && (
                    <p className="text-sm text-green-800/65 mt-1 leading-6">
                      {product.delivery}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          {product.description && (
            <section className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                About this product
              </h2>
              <p className="text-green-900/75 leading-8">
                {product.description}
              </p>
            </section>
          )}

          {(hasBenefits || hasIngredients) && (
            <section className="grid md:grid-cols-2 gap-6">
              {hasBenefits && (
                <div className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold mb-5">Benefits</h2>
                  <div className="space-y-3">
                    {product.benefits.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center shrink-0">
                          <Check size={12} />
                        </div>
                        <p className="text-green-900/75 leading-6">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasIngredients && (
                <div className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold mb-5">Ingredients</h2>
                  <div className="space-y-3">
                    {product.ingredients.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-700 shrink-0" />
                        <p className="text-green-900/75 leading-6">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {hasNutrition && (
            <section className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Nutrition Information
              </h2>

              <div className="overflow-hidden rounded-2xl border border-green-200">
                <table className="w-full">
                  <tbody>
                    {product.nutrition
                      .filter((item) => item?.title || item?.value)
                      .map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-green-200 last:border-b-0"
                        >
                          <td className="px-5 py-4 text-green-800/65">
                            {item.title}
                          </td>
                          <td className="px-5 py-4 text-right font-semibold">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {additionalInformation.length > 0 && (
            <section className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Product Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {additionalInformation.map(([label, value]) => (
                  <div key={label} className="border-b border-green-200 pb-4">
                    <p className="text-sm text-green-800/55">{label}</p>
                    <p className="font-semibold mt-1 leading-6">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {reviewType === "rating_and_review" && (
            <section className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Customer Reviews
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={
                            star <= Math.round(rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-green-200"
                          }
                        />
                      ))}
                    </div>

                    <span className="font-semibold">{rating?.toFixed(1)}</span>

                    <span className="text-green-800/55">
                      {reviews.length} reviews
                    </span>
                  </div>
                </div>

                {reviews.length > 3 && (
                  <button
                    onClick={() => setShowReviews(true)}
                    className="text-green-700 font-semibold hover:text-green-900"
                  >
                    View all reviews
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-7">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-[#f3f9ee] rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold truncate">
                        {review.name || "Customer"}
                      </h3>

                      <div className="flex shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= Number(review.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-green-200"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {review.review && (
                      <p className="text-sm text-green-900/70 leading-6 mt-4">
                        {review.review}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {reviews.length > 3 && (
                <button
                  onClick={() => setShowReviews(true)}
                  className="mt-6 w-full border border-green-300 rounded-xl py-3 text-green-800 font-semibold hover:bg-[#dcefd2]"
                >
                  Load More Reviews
                </button>
              )}
            </section>
          )}

          {reviewType !== "none" && (
            <section className="bg-[#e8f4df] rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Rate this product</h2>
              <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium">Your name</span>
                  <input
                    value={reviewName}
                    onChange={(event) => setReviewName(event.target.value)}
                    maxLength={100}
                    required
                    className="mt-1 w-full rounded-xl border border-green-200 bg-[#f3f9ee] px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Rating</span>
                  <select
                    value={reviewRating}
                    onChange={(event) =>
                      setReviewRating(Number(event.target.value))
                    }
                    className="mt-1 block rounded-xl border border-green-200 bg-[#f3f9ee] px-4 py-3"
                  >
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value} {value === 1 ? "star" : "stars"}
                      </option>
                    ))}
                  </select>
                </label>
                {reviewType === "rating_and_review" && (
                  <label className="block">
                    <span className="text-sm font-medium">Your review</span>
                    <textarea
                      value={reviewText}
                      onChange={(event) => setReviewText(event.target.value)}
                      maxLength={2000}
                      required
                      rows={4}
                      className="mt-1 w-full rounded-xl border border-green-200 bg-[#f3f9ee] px-4 py-3"
                    />
                  </label>
                )}
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {reviewSubmitting ? "Submitting..." : "Submit review"}
                </button>
                {reviewMessage && (
                  <p role="status" className="text-sm text-green-900">
                    {reviewMessage}
                  </p>
                )}
              </form>
            </section>
          )}
        </div>
      </div>

      {showReviews && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[85vh] bg-[#f3f9ee] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-green-200 bg-[#e8f4df]">
              <div>
                <h2 className="text-2xl font-bold">All Reviews</h2>
                <p className="text-sm text-green-800/60 mt-1">
                  {reviews.length} customer reviews
                </p>
              </div>

              <button
                onClick={() => setShowReviews(false)}
                className="w-10 h-10 rounded-full bg-[#dcefd2] flex items-center justify-center hover:bg-green-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-6 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#e8f4df] rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{review.name || "Customer"}</h3>

                      {review.createdAt && (
                        <p className="text-xs text-green-800/50 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={17}
                          className={
                            star <= Number(review.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-green-200"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {review.review && (
                    <p className="text-green-900/70 leading-7 mt-4">
                      {review.review}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
