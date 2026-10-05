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

const categories = [
  {
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80",
    items: ["Dresses", "Kurtis", "Tops", "Sarees", "Jeans"],
  },
  {
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=700&q=80",
    items: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Ethnic Wear"],
  },
  {
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=700&q=80",
    items: ["Boys", "Girls", "Baby Clothing", "Party Wear"],
  },
];

const subCategories = [
  {
    name: "Dresses",
    slug: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kurtis",
    slug: "kurtis",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Shirts",
    slug: "shirts",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jeans",
    slug: "jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sarees",
    slug: "sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kids Wear",
    slug: "kids-wear",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ethnic Wear",
    slug: "ethnic-wear",
    image:
      "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&w=600&q=80",
  },
];

const fallbackProducts = [
  {
    _id: "clothes-1",
    name: "Women's Casual Dress",
    price: 699,
    oldPrice: 999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "clothes-2",
    name: "Men's Premium T-Shirt",
    price: 499,
    oldPrice: 699,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "clothes-3",
    name: "Women's Printed Kurti",
    price: 599,
    oldPrice: 799,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "clothes-4",
    name: "Kids Casual Outfit",
    price: 549,
    oldPrice: 749,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80",
  },
];

function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-[22px] border border-[#dcebd8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#f4f9f1]">
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
          <span className="font-medium text-[#315c38]">
            {product.rating || 4.5}
          </span>
        </div>

        <h3 className="line-clamp-1 text-[16px] font-semibold text-[#244d2b]">
          {product.name || "Clothing Product"}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#244d2b]">
              ₹{product.price || 0}
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

export default function Clothes({ url }) {
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

  const clothingProducts = useMemo(() => {
    const source = products.length ? products : fallbackProducts;

    const filtered = source.filter((product) => {
      const category = String(
        product.category || product.categoryName || "",
      ).toLowerCase();

      return (
        category.includes("cloth") ||
        category.includes("fashion") ||
        category.includes("wear") ||
        category.includes("women") ||
        category.includes("men") ||
        category.includes("kids") ||
        category.includes("dress") ||
        category.includes("shirt") ||
        category.includes("t-shirt") ||
        category.includes("kurti") ||
        category.includes("jeans") ||
        category.includes("saree")
      );
    });

    return filtered.length ? filtered : fallbackProducts;
  }, [products]);

  const filteredProducts = clothingProducts.filter((product) => {
    const name = String(
      product.name || product.productName || "",
    ).toLowerCase();

    return name.includes(search.toLowerCase());
  });

  const forYouProducts = clothingProducts.slice(0, 4);
  const bestSellerProducts = clothingProducts.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f7fbf3] pt-[90px] text-[#244d2b]">
      <section className="px-4 pb-10 pt-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="relative overflow-hidden rounded-[30px] bg-[#315c38]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#244d2b] via-[#315c38]/90 to-transparent" />

            <div className="relative grid min-h-[370px] items-center lg:grid-cols-2">
              <div className="px-6 py-12 sm:px-10 lg:px-16">
                <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
                  Women • Men • Kids
                </span>

                <h1 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Style for Everyone
                </h1>

                <p className="mt-4 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
                  Discover everyday fashion for women, men and kids — from
                  casual essentials to ethnic and occasion wear.
                </p>

                <Link
                  to="#all-products"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#315c38] transition hover:bg-[#eef6ea]"
                >
                  Shop Clothes
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="hidden h-full min-h-[370px] lg:block">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
                  alt="Fashion collection"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#5c9957]">
              Shop your style
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Women, Men & Kids
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/clothes/${category.slug}`}
                className="group relative h-[380px] overflow-hidden rounded-[26px] border border-[#dcebd8] bg-white shadow-sm"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold">{category.name}</h3>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#315c38]">
                      <ChevronRight size={20} />
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#5c9957]">
                Trending categories
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Shop by Category
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {subCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/clothes/${category.slug}`}
                className="group overflow-hidden rounded-[22px] border border-[#dcebd8] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-[145px] overflow-hidden rounded-[17px] bg-[#f2f8ef]">
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
              View all
              <ChevronRight size={17} />
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
              Popular picks
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
        <div className="mx-auto max-w-[1450px] overflow-hidden rounded-[28px] bg-[#e8f3e3]">
          <div className="grid items-center lg:grid-cols-2">
            <div className="px-6 py-10 sm:px-10">
              <span className="rounded-full bg-[#315c38] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                Fashion Deals
              </span>

              <h2 className="mt-5 text-3xl font-bold text-[#244d2b]">
                Your Style, Your Choice
              </h2>

              <p className="mt-3 max-w-lg leading-7 text-[#55725a]">
                Refresh your wardrobe with everyday styles, comfortable
                essentials and fashionable picks for the whole family.
              </p>

              <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#315c38] px-6 py-3 font-semibold text-white transition hover:bg-[#244d2b]">
                View Fashion Deals
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="h-[280px] lg:h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85"
                alt="Fashion collection"
                className="h-full w-full object-cover"
              />
            </div>
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
                All Clothes
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
                  placeholder="Search clothes..."
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
                      product.name || product.productName || "Clothing Product",
                    price: product.price || product.sellingPrice || 0,
                    image:
                      product.image ||
                      product.imageUrl ||
                      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
                    rating: product.rating || 4.5,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-[#dcebd8] bg-white py-16 text-center">
              <p className="text-lg font-semibold text-[#315c38]">
                No clothing products found
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
