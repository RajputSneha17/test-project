import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
} from "lucide-react";

const groceryCategories = [
  {
    name: "Atta & Flour",
    slug: "atta-flour",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rice & Grains",
    slug: "rice-grains",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dal & Pulses",
    slug: "dal-pulses",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Oil & Ghee",
    slug: "oil-ghee",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Masala & Spices",
    slug: "masala-spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Salt, Sugar & Jaggery",
    slug: "salt-sugar-jaggery",
    image:
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dry Fruits & Nuts",
    slug: "dry-fruits-nuts",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac7e1e8c1c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Tea & Coffee",
    slug: "tea-coffee",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Biscuits & Cookies",
    slug: "biscuits-cookies",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Snacks & Namkeen",
    slug: "snacks-namkeen",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2aa39f00?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Instant Food",
    slug: "instant-food",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sauces & Spreads",
    slug: "sauces-spreads",
    image:
      "https://images.unsplash.com/photo-1528751014936-863e6f2a40c5?auto=format&fit=crop&w=600&q=80",
  },
];

const fallbackProducts = [
  {
    _id: "grocery-1",
    name: "Premium Basmati Rice",
    price: 249,
    oldPrice: 299,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "grocery-2",
    name: "Whole Wheat Atta",
    price: 225,
    oldPrice: 260,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "grocery-3",
    name: "Toor Dal",
    price: 169,
    oldPrice: 199,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "grocery-4",
    name: "Premium Cooking Oil",
    price: 159,
    oldPrice: 185,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
  },
];

function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-[22px] border border-[#dcebd8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-[210px] items-center justify-center overflow-hidden bg-[#f4f9f1]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#315c38] shadow-sm transition hover:bg-[#315c38] hover:text-white">
          <Heart size={17} />
        </button>

        {product.oldPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-[#315c38] px-3 py-1 text-xs font-semibold text-white">
            SALE
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-1 text-sm">
          <Star size={14} fill="currentColor" className="text-[#e0a52b]" />
          <span className="font-medium text-[#315c38]">{product.rating}</span>
        </div>

        <h3 className="line-clamp-1 text-[16px] font-semibold text-[#244d2b]">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#244d2b]">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#315c38] text-white transition hover:bg-[#244d2b]">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Grocery({ url }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!url) return;

    fetch(`${url}/products/show`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];

        setProducts(list);
      })
      .catch(() => {
        setProducts([]);
      });
  }, [url]);

  const groceryProducts = useMemo(() => {
    const source = products.length ? products : fallbackProducts;

    const filtered = source.filter((product) => {
      const category = String(
        product.category || product.categoryName || "",
      ).toLowerCase();

      return (
        category.includes("grocery") ||
        category.includes("atta") ||
        category.includes("rice") ||
        category.includes("dal") ||
        category.includes("pulse") ||
        category.includes("oil") ||
        category.includes("ghee") ||
        category.includes("masala") ||
        category.includes("spice")
      );
    });

    return filtered.length ? filtered : fallbackProducts;
  }, [products]);

  const filteredProducts = groceryProducts.filter((product) => {
    const name = String(
      product.name || product.productName || "",
    ).toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const forYouProducts = groceryProducts.slice(0, 4);
  const bestSellerProducts = groceryProducts.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f7fbf3] pt-[90px] text-[#244d2b]">
      <section className="px-4 pb-10 pt-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="relative overflow-hidden rounded-[30px] bg-[#315c38]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#244d2b] via-[#315c38]/90 to-transparent" />

            <div className="relative grid min-h-[340px] items-center lg:grid-cols-2">
              <div className="px-6 py-12 sm:px-10 lg:px-16">
                <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
                  Fresh • Quality • Everyday Essentials
                </span>

                <h1 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Everything Your Kitchen Needs
                </h1>

                <p className="mt-4 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
                  Shop everyday grocery essentials, pantry staples, snacks and
                  cooking ingredients at PFC.
                </p>

                <Link
                  to="#all-products"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#315c38] transition hover:bg-[#eef6ea]"
                >
                  Shop Grocery
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="hidden h-full min-h-[340px] lg:block">
                <img
                  src="https://trivenisupermarket.com/blog/images/groceryitem/indian-grocery-store-in-waxhaw-nc-banner.jpg"
                  alt="Grocery essentials"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#5c9957]">
                Explore Grocery
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Shop by Category
              </h2>
            </div>

            <span className="hidden text-sm text-[#5c9957] sm:block">
              12 categories
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
            {groceryCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/grocery/${category.slug}`}
                className="group overflow-hidden rounded-[22px] border border-[#dcebd8] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b9d5b3] hover:shadow-md"
              >
                <div className="h-[130px] overflow-hidden rounded-[17px] bg-[#f2f8ef]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-3">
                  <span className="text-sm font-semibold text-[#315c38]">
                    {category.name}
                  </span>
                  <ChevronRight
                    size={16}
                    className="shrink-0 text-[#5c9957] transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-[28px] border border-[#dcebd8] bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#5c9957]">
                Picked for you
              </p>
              <h2 className="mt-1 text-2xl font-bold">For You</h2>
            </div>

            <button className="hidden items-center gap-1 text-sm font-semibold text-[#315c38] sm:flex">
              View all <ChevronRight size={17} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {forYouProducts.map((product, index) => (
              <ProductCard
                key={product._id || product.id || index}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#5c9957]">
              Most loved
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Best Sellers
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {bestSellerProducts.map((product, index) => (
              <ProductCard
                key={product._id || product.id || index}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="overflow-hidden rounded-[28px] bg-[#e8f3e3]">
            <div className="grid items-center lg:grid-cols-2">
              <div className="px-6 py-10 sm:px-10">
                <span className="rounded-full bg-[#315c38] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  PFC Special
                </span>

                <h2 className="mt-5 text-3xl font-bold text-[#244d2b]">
                  Made by PFC, Loved by You
                </h2>

                <p className="mt-3 max-w-lg leading-7 text-[#55725a]">
                  Discover products specially made by PFC with care and
                  attention to quality.
                </p>

                <Link
                  to="/category/pfc-special"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#315c38] px-6 py-3 font-semibold text-white transition hover:bg-[#244d2b]"
                >
                  Explore PFC Special
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="h-[260px] lg:h-[300px]">
                <img
                  src="https://d2haat.com/images/1767073443.png"
                  alt="PFC Special grocery"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-[28px] bg-[#315c38] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Grocery deals
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Save More on Your Everyday Essentials
              </h2>
              <p className="mt-2 text-sm text-white/75">
                Check out our latest grocery offers and discounts.
              </p>
            </div>

            <button className="flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#315c38] transition hover:bg-[#eef6ea]">
              View Deals
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section id="all-products" className="px-4 pb-14 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#5c9957]">
                Complete collection
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                All Grocery Products
              </h2>
            </div>

            <div className="flex w-full gap-2 md:w-auto">
              <div className="relative flex-1 md:w-[320px]">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6c8b70]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search grocery products..."
                  className="h-11 w-full rounded-xl border border-[#dcebd8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#5c9957]"
                />
              </div>

              <button className="flex h-11 items-center gap-2 rounded-xl border border-[#dcebd8] bg-white px-4 text-sm font-semibold text-[#315c38]">
                <SlidersHorizontal size={17} />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id || product.id || index}
                  product={{
                    ...product,
                    name:
                      product.name || product.productName || "Grocery Product",
                    price: product.price || product.sellingPrice || 0,
                    image:
                      product.image ||
                      product.imageUrl ||
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
                    rating: product.rating || 4.5,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-[#dcebd8] bg-white py-16 text-center">
              <p className="text-lg font-semibold text-[#315c38]">
                No grocery products found
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try searching with another product name.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
