import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { getProducts } from "../../services/productApi";
import ProductCard from "../../components/ProductCard";

const Products = ({ url }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [rating, setRating] = useState("all");
  const [price, setPrice] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [tag, setTag] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(url);

        if (data?.success) {
          setProducts(data.products || []);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts(data?.products || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) =>
        `${product.name || ""} ${product.shortDescription || ""} ${product.description || ""}`
          .toLowerCase()
          .includes(query),
      );
    }

    if (rating !== "all") {
      const minRating = Number(rating);

      result = result.filter((product) => {
        const productRating = Number(product.rating || 0);
        return productRating >= minRating;
      });
    }

    if (price !== "all") {
      result = result.filter((product) => {
        const productPrice = Number(
          product.discountPrice ?? product.price ?? 0,
        );

        if (price === "under500") return productPrice < 500;
        if (price === "500to1000")
          return productPrice >= 500 && productPrice <= 1000;
        if (price === "1000to2000")
          return productPrice > 1000 && productPrice <= 2000;
        if (price === "above2000") return productPrice > 2000;

        return true;
      });
    }

    if (availability === "inStock") {
      result = result.filter((product) => Number(product.stock) > 0);
    }

    if (availability === "outOfStock") {
      result = result.filter((product) => Number(product.stock) <= 0);
    }

    if (tag === "featured") {
      result = result.filter((product) => product.isFeatured);
    }

    if (tag === "bestSeller") {
      result = result.filter((product) => product.isBestSeller);
    }

    if (tag === "newArrival") {
      result = result.filter((product) => product.isNewArrival);
    }

    if (sort === "priceLow") {
      result.sort(
        (a, b) =>
          Number(a.discountPrice ?? a.price ?? 0) -
          Number(b.discountPrice ?? b.price ?? 0),
      );
    }

    if (sort === "priceHigh") {
      result.sort(
        (a, b) =>
          Number(b.discountPrice ?? b.price ?? 0) -
          Number(a.discountPrice ?? a.price ?? 0),
      );
    }

    if (sort === "ratingHigh") {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    if (sort === "ratingLow") {
      result.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0));
    }

    if (sort === "newest") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return result;
  }, [products, search, sort, rating, price, availability, tag]);

  const clearFilters = () => {
    setSearch("");
    setSort("default");
    setRating("all");
    setPrice("all");
    setAvailability("all");
    setTag("all");
  };

  const activeFilters =
    Number(sort !== "default") +
    Number(rating !== "all") +
    Number(price !== "all") +
    Number(availability !== "all") +
    Number(tag !== "all");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f3f9ee] text-green-950 px-3 sm:px-5 md:px-8 lg:px-12 py-5 md:py-10">
      <div className="max-w-[1450px] mx-auto">
        <div className="mb-5 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            All Products
          </h1>
          <p className="text-sm md:text-base text-green-800/60 mt-1">
            {filteredProducts.length} products available
          </p>
        </div>

        <div className="sticky top-20 z-30 bg-[#f3f9ee]/95 backdrop-blur-md pb-3 md:static md:bg-transparent md:backdrop-blur-0">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700/50"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 md:h-12 pl-10 pr-4 rounded-xl bg-[#e8f4df] border border-green-200 outline-none focus:border-green-600 text-sm md:text-base"
              />
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden h-11 px-4 rounded-xl bg-green-700 text-white flex items-center gap-2"
            >
              <SlidersHorizontal size={18} />
              {activeFilters > 0 && (
                <span className="bg-white text-green-700 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] xl:grid-cols-[270px_1fr] gap-6 mt-5 md:mt-7">
          <aside className="hidden md:block bg-[#e8f4df] rounded-2xl p-5 h-fit sticky top-28">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">Filters</h2>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-green-700 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <FilterContent
              sort={sort}
              setSort={setSort}
              rating={rating}
              setRating={setRating}
              price={price}
              setPrice={setPrice}
              availability={availability}
              setAvailability={setAvailability}
              tag={tag}
              setTag={setTag}
            />
          </aside>

          <div>
            <div className="hidden md:flex justify-between items-center mb-5">
              <span className="text-sm text-green-800/60">
                Showing {filteredProducts.length} products
              </span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#e8f4df] border border-green-200 rounded-xl px-4 py-2.5 outline-none text-sm"
              >
                <option value="default">Sort by</option>
                <option value="newest">Newest</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="ratingHigh">Rating: High to Low</option>
                <option value="ratingLow">Rating: Low to High</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#e8f4df] rounded-2xl text-center py-20 px-5">
                <p className="text-lg font-semibold">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-green-700 text-white px-5 py-2.5 rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.publicId} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-[#f3f9ee] rounded-t-3xl max-h-[85vh] overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Filters & Sort</h2>
                <p className="text-sm text-green-800/60 mt-1">
                  Refine your products
                </p>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-10 h-10 rounded-full bg-[#e8f4df] flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <FilterContent
              sort={sort}
              setSort={setSort}
              rating={rating}
              setRating={setRating}
              price={price}
              setPrice={setPrice}
              availability={availability}
              setAvailability={setAvailability}
              tag={tag}
              setTag={setTag}
            />

            <div className="flex gap-3 mt-7">
              <button
                onClick={clearFilters}
                className="flex-1 border border-green-300 rounded-xl py-3 font-semibold"
              >
                Clear
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-green-700 text-white rounded-xl py-3 font-semibold"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const FilterContent = ({
  sort,
  setSort,
  rating,
  setRating,
  price,
  setPrice,
  availability,
  setAvailability,
  tag,
  setTag,
}) => {
  return (
    <div className="space-y-5">
      <FilterGroup title="Sort By">
        <FilterSelect value={sort} onChange={setSort}>
          <option value="default">Recommended</option>
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating: High to Low</option>
          <option value="ratingLow">Rating: Low to High</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title="Rating">
        <FilterSelect value={rating} onChange={setRating}>
          <option value="all">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
          <option value="2">2★ & above</option>
          <option value="1">1★ & above</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title="Price">
        <FilterSelect value={price} onChange={setPrice}>
          <option value="all">All Prices</option>
          <option value="under500">Under ₹500</option>
          <option value="500to1000">₹500 – ₹1,000</option>
          <option value="1000to2000">₹1,000 – ₹2,000</option>
          <option value="above2000">Above ₹2,000</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title="Availability">
        <FilterSelect value={availability} onChange={setAvailability}>
          <option value="all">All Products</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title="Product Type">
        <FilterSelect value={tag} onChange={setTag}>
          <option value="all">All Products</option>
          <option value="featured">Featured</option>
          <option value="bestSeller">Best Sellers</option>
          <option value="newArrival">New Arrivals</option>
        </FilterSelect>
      </FilterGroup>
    </div>
  );
};

const FilterGroup = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-sm mb-2">{title}</h3>
    {children}
  </div>
);

const FilterSelect = ({ value, onChange, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none bg-[#f3f9ee] border border-green-200 rounded-xl px-3 py-2.5 pr-9 outline-none text-sm"
    >
      {children}
    </select>
    <ChevronDown
      size={16}
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-700"
    />
  </div>
);

export default Products;
