import React from "react";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import VeganBanner from "./VeganBanner";

const products = [
  {
    id: 1,
    name: "Fresh Tofu",
    category: "Tofu",
    description: "Soft, fresh and naturally plant-based.",
    price: "₹95",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Soy Milk",
    category: "Beverage",
    description: "Smooth and creamy everyday goodness.",
    price: "₹120",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Soy Beans",
    category: "Soy Products",
    description: "A simple source of plant-based goodness.",
    price: "₹80",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Plant-Based Bowl",
    category: "Ready to Eat",
    description: "Fresh, wholesome and ready for your table.",
    price: "₹149",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop",
  },
];

const VeganProducts = () => {
  return (
    <>
      <VeganBanner />

      <section className="bg-[#f7fbf3] px-6 py-20 text-[#244d2b] sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5c9957]">
                Vegan
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Shop plant-based.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#708174]">
              Everyday products made with plant-based ingredients.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-[30px] border border-[#d7e8d1] bg-white/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(52,100,57,0.12)]"
              >
                <div className="relative aspect-[0.9] overflow-hidden bg-[#edf6e9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#3f7545] backdrop-blur-md">
                    {product.category}
                  </div>

                  <button className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7fbf3]/90 text-[#244d2b] opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={16} strokeWidth={1.7} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em]">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-[#708174]">
                        {product.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-base font-semibold text-[#3f7545]">
                      {product.price}
                    </span>
                  </div>

                  <button className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#244d2b] text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#315c38]">
                    <ShoppingBag size={15} strokeWidth={1.8} />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VeganProducts;
