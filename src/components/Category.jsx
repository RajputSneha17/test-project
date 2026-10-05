import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
  ShoppingBag,
  Heart,
  ArrowUpDown,
} from "lucide-react";

const categoryData = {
  grocery: {
    title: "Grocery",
    description: "Everyday essentials for your kitchen and home.",
  },
  "fruits-vegetables": {
    title: "Fruits & Vegetables",
    description: "Fresh fruits and vegetables for everyday meals.",
  },
  "soya-products": {
    title: "Soya Products",
    description: "Nutritious plant-based products made for everyday living.",
  },
  dairy: {
    title: "Dairy",
    description: "Fresh dairy favourites for your everyday needs.",
  },
  clothes: {
    title: "Clothes",
    description: "Comfortable and everyday clothing for everyone.",
  },
  household: {
    title: "Household",
    description: "Useful everyday products for a comfortable home.",
  },
};

const Category = ({ url }) => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState("default");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [availability, setAvailability] = useState("all");
  const [maxPrice, setMaxPrice] = useState(5000);

  const category = categoryData[slug] || {
    title: slug?.replaceAll("-", " "),
    description: "Explore products from PFC.",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${url}/products/show`);

        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  const categoryProducts = useMemo(() => {
    return products.filter((product) => {
      const productCategory = String(
        product.category || product.categoryName || "",
      )
        .toLowerCase()
        .replaceAll(" ", "-");

      return (
        productCategory === slug ||
        productCategory.includes(slug) ||
        slug?.includes(productCategory)
      );
    });
  }, [products, slug]);

  const prices = categoryProducts
    .map((product) => Number(product.price))
    .filter((price) => !Number.isNaN(price) && price > 0);

  const actualMaxPrice = prices.length ? Math.max(...prices) : 5000;

  useEffect(() => {
    setMaxPrice(actualMaxPrice);
  }, [actualMaxPrice]);

  const subcategories = useMemo(() => {
    const values = categoryProducts
      .map(
        (product) =>
          product.subcategory ||
          product.subCategory ||
          product.type ||
          product.productType,
      )
      .filter(Boolean);

    return [...new Set(values)];
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((product) => {
        return (
          String(product.name || "")
            .toLowerCase()
            .includes(query) ||
          String(product.shortDescription || "")
            .toLowerCase()
            .includes(query) ||
          String(product.description || "")
            .toLowerCase()
            .includes(query)
        );
      });
    }

    if (selectedSubcategories.length) {
      result = result.filter((product) => {
        const value =
          product.subcategory ||
          product.subCategory ||
          product.type ||
          product.productType;

        return selectedSubcategories.includes(value);
      });
    }

    result = result.filter((product) => {
      const price = Number(product.price) || 0;
      return price <= maxPrice;
    });

    if (selectedRatings.length) {
      result = result.filter((product) => {
        const rating = Number(product.rating) || 0;

        return selectedRatings.some((selected) => rating >= selected);
      });
    }

    if (availability === "in-stock") {
      result = result.filter((product) => {
        return (
          product.stock > 0 ||
          product.quantity > 0 ||
          product.inStock === true ||
          product.available === true
        );
      });
    }

    if (availability === "out-of-stock") {
      result = result.filter((product) => {
        return (
          product.stock === 0 ||
          product.quantity === 0 ||
          product.inStock === false ||
          product.available === false
        );
      });
    }

    if (sort === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "rating") {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || "")),
      );
    }

    return result;
  }, [
    categoryProducts,
    search,
    selectedSubcategories,
    maxPrice,
    selectedRatings,
    availability,
    sort,
  ]);

  const toggleSubcategory = (value) => {
    setSelectedSubcategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleRating = (value) => {
    setSelectedRatings((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedSubcategories([]);
    setSelectedRatings([]);
    setAvailability("all");
    setMaxPrice(actualMaxPrice);
    setSort("default");
  };

  const ProductCard = ({ product }) => {
    const productRating = Number(product.rating) || 0;
    const productPrice = Number(product.price) || 0;

    return (
      <Link
        to={`/detail/${product._id}`}
        className="group overflow-hidden mt-10  rounded-[24px] border border-[#dcebd8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(52,100,57,0.12)]"
      >
        <div className="relative h-60 overflow-hidden bg-[#f3f8f0]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <button
            onClick={(e) => e.preventDefault()}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#527154] shadow-sm backdrop-blur transition hover:bg-[#244d2b] hover:text-white"
          >
            <Heart size={16} />
          </button>

          {product.stock === 0 || product.inStock === false ? (
            <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              Out of stock
            </span>
          ) : (
            <span className="absolute left-4 top-4 rounded-full bg-[#e8f4e4] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#3f7545]">
              Available
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-1">
            <Star size={13} fill="currentColor" className="text-[#e2aa39]" />
            <span className="text-xs font-medium text-[#65766a]">
              {productRating ? productRating.toFixed(1) : "New"}
            </span>
          </div>

          <h3 className="line-clamp-1 text-base font-semibold text-[#244d2b]">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-2 min-h-[36px] text-xs leading-5 text-[#7a897d]">
            {product.shortDescription || product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-lg font-bold text-[#285a31]">
              {productPrice > 0 ? `₹${productPrice}` : "Price on request"}
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6e9] text-[#3f7545] transition group-hover:bg-[#285a31] group-hover:text-white">
              <ShoppingBag size={16} />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  const Filters = () => (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#244d2b]">Filters</h3>

        <button
          onClick={clearFilters}
          className="text-xs font-semibold text-[#5c9957] hover:underline"
        >
          Clear All
        </button>
      </div>

      {subcategories.length > 0 && (
        <div className="border-b border-[#dcebd8] pb-7">
          <h4 className="mb-4 text-sm font-semibold text-[#315c38]">
            Category
          </h4>

          <div className="space-y-3">
            {subcategories.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 text-sm text-[#65766a]"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(item)}
                  onChange={() => toggleSubcategory(item)}
                  className="h-4 w-4 rounded border-[#bdd3b8] accent-[#285a31]"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="border-b border-[#dcebd8] pb-7">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#315c38]">Price</h4>
          <span className="text-xs font-semibold text-[#5c9957]">
            ₹{maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={actualMaxPrice || 5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#285a31]"
        />

        <div className="mt-3 flex justify-between text-xs text-[#89958c]">
          <span>₹0</span>
          <span>₹{actualMaxPrice}</span>
        </div>
      </div>

      <div className="border-b border-[#dcebd8] pb-7">
        <h4 className="mb-4 text-sm font-semibold text-[#315c38]">
          Customer Rating
        </h4>

        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => toggleRating(rating)}
                className="h-4 w-4 rounded border-[#bdd3b8] accent-[#285a31]"
              />

              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    fill={star <= rating ? "currentColor" : "none"}
                    className={
                      star <= rating ? "text-[#e2aa39]" : "text-[#cbd5cc]"
                    }
                  />
                ))}
              </div>

              <span className="text-xs text-[#65766a]">& above</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold text-[#315c38]">
          Availability
        </h4>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#65766a]">
            <input
              type="radio"
              name="availability"
              checked={availability === "all"}
              onChange={() => setAvailability("all")}
              className="accent-[#285a31]"
            />
            All Products
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#65766a]">
            <input
              type="radio"
              name="availability"
              checked={availability === "in-stock"}
              onChange={() => setAvailability("in-stock")}
              className="accent-[#285a31]"
            />
            In Stock
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#65766a]">
            <input
              type="radio"
              name="availability"
              checked={availability === "out-of-stock"}
              onChange={() => setAvailability("out-of-stock")}
              className="accent-[#285a31]"
            />
            Out of Stock
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#f7fbf3] pt-20 pb-8 text-[#244d2b] sm:pt-24 sm:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex items-center gap-2 text-xs text-[#7a897d]">
          <Link to="/" className="hover:text-[#285a31]">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize text-[#315c38]">{category.title}</span>
        </div>

        <div className="mb-10 rounded-[30px] border border-[#dcebd8] bg-white/70 px-6 py-8 shadow-[0_20px_60px_rgba(52,100,57,0.06)] sm:px-10">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5c9957]">
              Shop PFC
            </p>

            <h1 className="mt-3 text-4xl font-bold capitalize tracking-[-0.05em] text-[#244d2b] sm:text-5xl">
              {category.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#708174] sm:text-base">
              {category.description}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829084]"
            />

            <input
              type="text"
              placeholder={`Search in ${category.title}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-full border border-[#d5e5d1] bg-white pl-11 pr-5 text-sm text-[#315c38] outline-none transition focus:border-[#7ead76] focus:ring-4 focus:ring-[#dff0d8]"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setMobileFilters(true)}
              className="flex h-12 items-center gap-2 rounded-full border border-[#d5e5d1] bg-white px-5 text-sm font-semibold text-[#315c38] lg:hidden"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="relative">
              <ArrowUpDown
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6f8173]"
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-12 appearance-none rounded-full border border-[#d5e5d1] bg-white pl-10 pr-10 text-sm font-medium text-[#315c38] outline-none"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="name">Name</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6f8173]"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-[26px] border border-[#dcebd8] bg-white/80 p-6 lg:block">
            <Filters />
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-[#708174]">
                <span className="font-semibold text-[#315c38]">
                  {filteredProducts.length}
                </span>{" "}
                products found
              </p>

              {(search ||
                selectedSubcategories.length ||
                selectedRatings.length ||
                availability !== "all" ||
                maxPrice !== actualMaxPrice) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#5c9957] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-[360px] animate-pulse rounded-[24px] bg-[#e9f2e5]"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-[28px] border border-[#dcebd8] bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf6e9]">
                  <ShoppingBag size={25} className="text-[#5c9957]" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#244d2b]">
                  No products found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-[#7a897d]">
                  Try changing your search or filters to find more products.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-[#285a31] px-6 py-3 text-sm font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilters(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[30px] bg-[#f7fbf3] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#244d2b]">
                Filter Products
              </h3>

              <button
                onClick={() => setMobileFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#315c38]"
              >
                <X size={18} />
              </button>
            </div>

            <Filters />

            <button
              onClick={() => setMobileFilters(false)}
              className="mt-8 w-full rounded-full bg-[#285a31] py-3.5 text-sm font-semibold text-white"
            >
              Show {filteredProducts.length} Products
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Category;
