import { Link } from "react-router-dom";
import { useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import StarRating from "../StarRating.jsx";

const ProductsSection = ({ url }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [Products, setProducts] = useState([]);

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

  const filterButtons = [
    "All",
    ...new Set(Products.map((item) => item.category)),
  ];

  const filteredProducts = useMemo(() => {
    let data = [...Products];

    if (activeFilter !== "All") {
      data = data.filter((item) => item.category === activeFilter);
    }

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [Products, activeFilter, sort]);

  return (
    <section className="w-[90%] mx-auto py-16 md:py-20">
      <div className="text-center px-4">
        <p className="uppercase tracking-[4px] text-xs sm:text-sm font-bold text-green-700">
          CURATED FOR YOU
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight text-green-950">
          Just For You
        </h1>
        <p className="text-gray-500 mt-4 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-7">
          Discover products picked to make every choice a little better.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between mt-10 gap-5">
        <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
          {filterButtons.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                activeFilter === item
                  ? "bg-green-800 text-white border-green-800 shadow-md shadow-green-800/20"
                  : "bg-white text-green-900 border-green-200 hover:bg-green-50 hover:border-green-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-green-200 bg-green-50/50 text-green-900 rounded-full px-5 py-2 outline-none cursor-pointer focus:border-green-600"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mt-10">
        {filteredProducts.map((item) => {
          const isWishlisted = wishlist.some(
            (product) => product._id === item._id,
          );

          return (
            <Link key={item._id} to={`/detail/${item._id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-green-100 shadow-sm hover:shadow-xl hover:shadow-green-900/10 hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden bg-green-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-green-800 backdrop-blur-sm">
                    {item.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      if (isWishlisted) {
                        removeFromWishlist(item._id);
                      } else {
                        addToWishlist(item);
                      }
                    }}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-green-800 hover:text-white transition-all duration-300"
                  >
                    <Heart
                      size={20}
                      className={`transition ${
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-green-800"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-green-950 group-hover:text-green-700 transition-colors">
                    {item.name}
                  </h2>

                  <div className="flex items-center gap-1 mt-2">
                    <StarRating rating={item.rating} />
                  </div>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    {Number(item.price) > 0 && (
                      <p className="text-2xl font-bold text-green-800">
                        ₹{item.price}
                      </p>
                    )}

                    <span className="text-sm font-medium text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsSection;
