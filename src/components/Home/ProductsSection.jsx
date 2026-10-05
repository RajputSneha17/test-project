import { Link } from "react-router-dom";
import { useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Heart, Star } from "lucide-react";
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

  // Categories from Products
  const filterButtons = [
    "All",
    ...new Set(Products.map((item) => item.category)),
  ];

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    let data = [...Products];

    // Filter
    if (activeFilter !== "All") {
      data = data.filter((item) => item.category === activeFilter);
    }

    // Sort
    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [Products, activeFilter, sort]);

  return (
    <section className="w-[90%] mx-auto py-20">
      {/* Heading */}
      <div className="text-center px-4">
        <p className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm font-semibold text-amber-700">
          OUR COLLECTION
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
          Shop by Category
        </h1>

        <p className="text-gray-500 mt-4 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-7">
          Filter through our curated products to find exactly what you're
          looking for.
        </p>
      </div>

      {/* Filter + Sort */}
      <div className="flex flex-col lg:flex-row items-center justify-between mt-12 gap-6">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3">
          {filterButtons.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-6 py-2 rounded-full border transition ${
                activeFilter === item
                  ? "bg-amber-700 text-white border-amber-700"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-5 py-2 outline-none cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {filteredProducts.map((item) => {
          const isWishlisted = wishlist.some(
            (product) => product._id === item._id,
          );

          return (
            <Link key={item._id} to={`/detail/${item._id}`}>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-100">
                    {item.category}
                  </span>

                  <h2 className="text-xl font-semibold mt-3">{item.name}</h2>

                  {/* Rating */}
      {/* <div className="flex items-center gap-1 mt-2"> */}
      {/* <span className="text-sm text-gray-500 ml-1"> */}
      {/* ({Number(item.rating || 0).toFixed(1)}) */}
      {/* <StarRating rating={item.rating} /> */}
      {/* </span> */}
      {/* </div> */}

      {/* <p className="text-gray-500 text-sm mt-2">{item.desc}</p>

                  <div className="flex items-center justify-between mt-5">
                    {Number(item.price) > 0 && (
                      <p className="text-2xl font-bold text-amber-700">
                        ₹{item.price}
                      </p>
                    )} */}

      {/* Wishlist */}
      {/* <button
                      onClick={(e) => {
                        e.preventDefault();

                        if (isWishlisted) {
                          // removeFromWishlist(item._id);
                        } else {
                          addToWishlist(item);
                        }
                      }} 
                    //   className="p-2 cursor-pointer rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    // >
                    //   <Heart
                    //     size={22}
                    //     className={`transition ${
                    //       isWishlisted
      //                       ? "fill-red-500 text-red-500"
      //                       : "text-gray-600"
      //                   }`}
      //                 />
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </Link>
      //     );
      //   })}
      // </div> */}
    </section>
  );
};

export default ProductsSection;
