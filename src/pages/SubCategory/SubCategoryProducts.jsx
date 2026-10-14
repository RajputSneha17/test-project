import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, Search, X, Star, Plus, Minus } from "lucide-react";
import { getProductsBySubCategory } from "../../services/productApi";
import ProductCard from "../../components/ProductCard";

const SubCategoryProducts = ({ url }) => {
  const { subCategoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProductsBySubCategory(url, subCategoryId);

        const productList = data?.success
          ? data.products || []
          : Array.isArray(data)
            ? data
            : data?.products || [];

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching subcategory products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url, subCategoryId]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchText = search.trim().toLowerCase();

      result = result.filter((product) =>
        product?.name?.toLowerCase().includes(searchText),
      );
    }

    if (priceFilter === "under500") {
      result = result.filter(
        (product) =>
          Number(product?.discountPrice ?? product?.price ?? 0) < 500,
      );
    }

    if (priceFilter === "500to1000") {
      result = result.filter((product) => {
        const price = Number(product?.discountPrice ?? product?.price ?? 0);

        return price >= 500 && price <= 1000;
      });
    }

    if (priceFilter === "above1000") {
      result = result.filter(
        (product) =>
          Number(product?.discountPrice ?? product?.price ?? 0) > 1000,
      );
    }

    if (ratingFilter !== "all") {
      const minimumRating = Number(ratingFilter);

      result = result.filter(
        (product) => Number(product?.rating ?? 0) >= minimumRating,
      );
    }

    if (sort === "priceLow") {
      result.sort(
        (a, b) =>
          Number(a?.discountPrice ?? a?.price ?? 0) -
          Number(b?.discountPrice ?? b?.price ?? 0),
      );
    }

    if (sort === "priceHigh") {
      result.sort(
        (a, b) =>
          Number(b?.discountPrice ?? b?.price ?? 0) -
          Number(a?.discountPrice ?? a?.price ?? 0),
      );
    }

    if (sort === "ratingHigh") {
      result.sort((a, b) => Number(b?.rating ?? 0) - Number(a?.rating ?? 0));
    }

    if (sort === "newest") {
      result.sort(
        (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0),
      );
    }

    return result;
  }, [products, search, sort, priceFilter, ratingFilter]);

  const clearFilters = () => {
    setSort("default");
    setPriceFilter("all");
    setRatingFilter("all");
  };

  const hasFilters =
    sort !== "default" || priceFilter !== "all" || ratingFilter !== "all";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f3f9ee] text-green-950 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Products</h1>

            <p className="text-sm text-green-800/60 mt-1">
              {filteredProducts.length} products
            </p>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="hidden md:block text-sm font-semibold text-green-700 hover:text-green-900"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-800/50"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-11 pl-10 pr-3 rounded-xl border border-green-200 bg-[#e8f4df] text-sm outline-none focus:border-green-600"
            />
          </div>

          <button
            onClick={() => setShowFilters(true)}
            className="md:hidden h-11 px-4 rounded-xl bg-green-700 text-white flex items-center gap-2 text-sm font-semibold"
          >
            <SlidersHorizontal size={17} />
            Filter
          </button>
        </div>

        <div className="flex gap-7">
          <aside className="hidden md:block w-56 shrink-0">
            <div className="bg-[#e8f4df] rounded-2xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold">Filters</h2>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-green-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Price</h3>

                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === "all"}
                      onChange={() => setPriceFilter("all")}
                      className="accent-green-700"
                    />
                    All
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === "under500"}
                      onChange={() => setPriceFilter("under500")}
                      className="accent-green-700"
                    />
                    Under ₹500
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === "500to1000"}
                      onChange={() => setPriceFilter("500to1000")}
                      className="accent-green-700"
                    />
                    ₹500–₹1000
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === "above1000"}
                      onChange={() => setPriceFilter("above1000")}
                      className="accent-green-700"
                    />
                    ₹1000+
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Rating</h3>

                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === "all"}
                      onChange={() => setRatingFilter("all")}
                      className="accent-green-700"
                    />
                    All
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === "4"}
                      onChange={() => setRatingFilter("4")}
                      className="accent-green-700"
                    />
                    4★ & above
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === "3"}
                      onChange={() => setRatingFilter("3")}
                      className="accent-green-700"
                    />
                    3★ & above
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === "2"}
                      onChange={() => setRatingFilter("2")}
                      className="accent-green-700"
                    />
                    2★ & above
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Sort</h3>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-green-200 bg-[#f3f9ee] text-sm outline-none"
                >
                  <option value="default">Recommended</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="ratingHigh">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="hidden md:flex justify-between items-center mb-4">
              <p className="text-sm text-green-800/60">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#e8f4df] rounded-2xl text-center py-20">
                <p className="text-green-800/60">No products found.</p>

                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.publicId}
                    product={{
                      ...product,
                      images:
                        product?.images?.length > 0
                          ? product.images
                          : product?.image
                            ? [product.image]
                            : [],
                    }}
                  />
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

          <div className="absolute bottom-0 left-0 right-0 bg-[#f3f9ee] rounded-t-3xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Filter & Sort</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="w-9 h-9 rounded-full bg-[#e8f4df] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-3">Sort</h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSort("default")}
                  className={`h-10 rounded-lg border text-sm ${
                    sort === "default"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  Recommended
                </button>

                <button
                  onClick={() => setSort("priceLow")}
                  className={`h-10 rounded-lg border text-sm ${
                    sort === "priceLow"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  Price ↑
                </button>

                <button
                  onClick={() => setSort("priceHigh")}
                  className={`h-10 rounded-lg border text-sm ${
                    sort === "priceHigh"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  Price ↓
                </button>

                <button
                  onClick={() => setSort("ratingHigh")}
                  className={`h-10 rounded-lg border text-sm ${
                    sort === "ratingHigh"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  Top Rated
                </button>

                <button
                  onClick={() => setSort("newest")}
                  className={`h-10 rounded-lg border text-sm ${
                    sort === "newest"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  Newest
                </button>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-3">Price</h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPriceFilter("all")}
                  className={`h-10 rounded-lg border text-sm ${
                    priceFilter === "all"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setPriceFilter("under500")}
                  className={`h-10 rounded-lg border text-sm ${
                    priceFilter === "under500"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  Under ₹500
                </button>

                <button
                  onClick={() => setPriceFilter("500to1000")}
                  className={`h-10 rounded-lg border text-sm ${
                    priceFilter === "500to1000"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  ₹500–₹1000
                </button>

                <button
                  onClick={() => setPriceFilter("above1000")}
                  className={`h-10 rounded-lg border text-sm ${
                    priceFilter === "above1000"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  ₹1000+
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Rating</h3>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setRatingFilter("all")}
                  className={`h-10 rounded-lg border text-sm ${
                    ratingFilter === "all"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setRatingFilter("4")}
                  className={`h-10 rounded-lg border text-sm ${
                    ratingFilter === "4"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  4★+
                </button>

                <button
                  onClick={() => setRatingFilter("3")}
                  className={`h-10 rounded-lg border text-sm ${
                    ratingFilter === "3"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  3★+
                </button>

                <button
                  onClick={() => setRatingFilter("2")}
                  className={`h-10 rounded-lg border text-sm ${
                    ratingFilter === "2"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-[#e8f4df] border-green-200"
                  }`}
                >
                  2★+
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="h-11 px-5 rounded-xl border border-green-300 font-semibold text-sm"
              >
                Clear
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 h-11 rounded-xl bg-green-700 text-white font-semibold text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubCategoryProducts;
