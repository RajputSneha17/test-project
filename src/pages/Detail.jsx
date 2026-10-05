import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Truck, Heart, Share2, Check, ChefHat } from "lucide-react";
import { WishlistContext } from "../context/WishlistContext.jsx";
import ProductReviews from "../components/ProductReviews.jsx";
import StarRating from "../components/StarRating.jsx";
import axios from "axios";
import SEO from "../components/SEO.jsx";
import Recipe from "../components/Recipe.jsx";

const Detail = ({ url }) => {
  const [Products, setProducts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState("details");

  const { id } = useParams();

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/products/show`);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const product = Products.find((item) => item._id === id);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  const isWishlisted = wishlist.some(
    (wishItem) => wishItem._id === product._id,
  );

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text:
        product.shortDescription || `Check out ${product.name} on PFC Paneer!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <section className="w-[90%] mx-auto py-10">
      <SEO
        title={`${product?.name} | PFC Foods`}
        description={product?.shortDescription}
        keywords={`${product?.name}, Fresh Paneer, Tofu, Vegan Products, PFC Foods`}
        url={`https://pfcpaneer.in/detail/${id}`}
        image={product?.image}
      />

      <div className="text-xs text-gray-500 mb-6">
        Home / Products /<span className="text-black"> {product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-[550px] h-[500px] object-contain rounded-xl"
          />

          <div className="hidden lg:block w-full mt-8">
            <div className="mt-6">
              <ProductReviews
                url={url}
                productId={product._id}
                rating={product.rating}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <StarRating rating={product.rating} />
          </div>

          <h1 className="text-3xl font-bold mt-3">{product.name}</h1>

          <p className="text-gray-500 text-base mt-2">
            {product.shortDescription}
          </p>

          {Number(product.price) > 0 && (
            <h2 className="text-3xl font-bold mt-6">₹{product.price}</h2>
          )}

          <div className="flex gap-4 mt-8">
            <Link
              to="/contactUs"
              className="flex-1 bg-orange-500 hover:bg-[#244d2b] text-white rounded-lg flex justify-center items-center py-3 transition"
            >
              Buy Now
            </Link>

            <button
              onClick={handleShare}
              className="p-3 rounded-full border border-[#cfe3c9] hover:bg-[#f0f7ed] transition"
              title="Share Product"
            >
              {copied ? (
                <Check size={22} className="text-[#5c9957]" />
              ) : (
                <Share2 size={22} className="text-[#3f7545]" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();

                if (isWishlisted) {
                  removeFromWishlist(product._id);
                } else {
                  addToWishlist(product);
                }
              }}
              className="p-3 rounded-full border border-[#cfe3c9] hover:bg-[#f0f7ed] transition"
              title="Add to Wishlist"
            >
              <Heart
                size={22}
                className={
                  isWishlisted ? "fill-red-500 text-red-500" : "text-[#3f7545]"
                }
              />
            </button>
          </div>

          <div className="mt-10">
            <div className="flex border-b border-[#d7e8d1]">
              <button
                onClick={() => {
                  setActiveInfoTab("details");
                  setShowDetails(false);
                }}
                className={`relative flex-1 py-4 text-sm font-semibold transition ${
                  activeInfoTab === "details"
                    ? "text-[#244d2b]"
                    : "text-[#708174] hover:text-[#3f7545]"
                }`}
              >
                Product Details
                {activeInfoTab === "details" && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5c9957]" />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveInfoTab("recipes");
                  setShowDetails(false);
                }}
                className={`relative flex-1 py-4 text-sm font-semibold transition ${
                  activeInfoTab === "recipes"
                    ? "text-[#244d2b]"
                    : "text-[#708174] hover:text-[#3f7545]"
                }`}
              >
                Recipes
                {activeInfoTab === "recipes" && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5c9957]" />
                )}
              </button>
            </div>

            {activeInfoTab === "details" && (
              <div>
                <div className="lg:hidden mt-6">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-[#4f8b4a] font-semibold underline cursor-pointer"
                  >
                    {showDetails
                      ? "Hide Product Details"
                      : "View Product Details"}
                  </button>
                </div>

                <div
                  id="product-details"
                  className={`${showDetails ? "block" : "hidden"} lg:block`}
                >
                  <div className="mt-6 bg-[#f1f7ed] rounded-xl p-4 flex gap-3 items-start border border-[#dcebd8]">
                    <Truck size={18} className="text-[#4f8b4a] mt-1" />

                    <div>
                      <p className="font-semibold text-sm text-[#244d2b]">
                        {product.shipping}
                      </p>

                      <p className="text-xs text-[#708174] mt-1">
                        {product.delivery}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#3f7545] mb-6">
                      Product Details
                    </h2>

                    <div className="bg-white border border-[#dcebd8] rounded-xl p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3 text-[#244d2b]">
                          Ingredients
                        </h3>

                        <ul className="space-y-2">
                          {product.ingredients?.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-[#65766a]"
                            >
                              <span className="text-[#5c9957] font-bold">
                                •
                              </span>

                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3 text-[#244d2b]">
                          Benefits
                        </h3>

                        <ul className="space-y-2">
                          {product.benefits?.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-[#65766a]"
                            >
                              <span className="text-[#5c9957] font-bold">
                                •
                              </span>

                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#3f7545] mb-5">
                      Nutrition Facts
                    </h2>

                    <div className="max-w-md border border-[#dcebd8] rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {product.nutrition?.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-[#edf3ea] last:border-b-0"
                            >
                              <td className="px-4 py-3 text-[#65766a]">
                                {item.title}
                              </td>

                              <td className="px-4 py-3 text-right font-semibold text-[#244d2b]">
                                {item.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-10 border border-[#dcebd8] rounded-xl p-6 bg-white">
                    <h2 className="text-2xl font-bold text-[#3f7545] mb-6">
                      Additional Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-[#708174]">Category</p>
                        <h3 className="font-medium mt-1 text-[#244d2b]">
                          {product.category}
                        </h3>
                      </div>

                      <div>
                        <p className="text-[#708174]">Weight</p>
                        <h3 className="font-medium mt-1 text-[#244d2b]">
                          {product.weight}
                        </h3>
                      </div>

                      <div>
                        <p className="text-[#708174]">Shelf Life</p>
                        <h3 className="font-medium mt-1 text-[#244d2b]">
                          {product.shelfLife}
                        </h3>
                      </div>

                      <div>
                        <p className="text-[#708174]">Country</p>
                        <h3 className="font-medium mt-1 text-[#244d2b]">
                          {product.country}
                        </h3>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-[#708174]">Manufacturer</p>
                        <h3 className="font-medium mt-1 text-[#244d2b]">
                          {product.manufacturer}
                        </h3>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-[#708174]">Storage Instructions</p>
                        <p className="text-[#65766a] leading-7 mt-1">
                          {product.storage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeInfoTab === "recipes" && <Recipe />}
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-10">
        <ProductReviews
          url={url}
          productId={product._id}
          rating={product.rating}
        />
      </div>
    </section>
  );
};

export default Detail;
