import React from "react";
import { ArrowRight, Leaf, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const PfcSpecial = () => {
  const products = [
    {
      name: "Fresh Tofu",
      subtitle: "Plant-based goodness",
      price: "₹95",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop",
      position: "left",
    },
    {
      name: "Soy Milk",
      subtitle: "Smooth & creamy",
      price: "₹120",
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900&auto=format&fit=crop",
      position: "right",
    },
    {
      name: "Soy Beans",
      subtitle: "Natural plant protein",
      price: "₹80",
      image:
        "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=900&auto=format&fit=crop",
      position: "bottom-left",
    },
    {
      name: "Plant-Based Bowl",
      subtitle: "Fresh & wholesome",
      price: "₹149",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop",
      position: "bottom-right",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes pfcPowderFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(12px, -18px, 0) rotate(8deg) scale(1.08);
          }
        }

        @keyframes pfcPowderFloatReverse {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(-15px, 14px, 0) rotate(-10deg) scale(0.92);
          }
        }

        @keyframes pfcProductFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes pfcProductFloatReverse {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(9px) rotate(-1deg);
          }
        }

        @keyframes pfcDust {
          0% {
            transform: translate3d(0, 20px, 0) scale(0.4);
            opacity: 0;
          }

          20% {
            opacity: 0.8;
          }

          80% {
            opacity: 0.45;
          }

          100% {
            transform: translate3d(40px, -100px, 0) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes pfcShimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        @keyframes pfcBadge {
          0%, 100% {
            transform: rotate(-2deg) translateY(0);
          }

          50% {
            transform: rotate(2deg) translateY(-3px);
          }
        }

        .pfc-powder {
          animation: pfcPowderFloat 7s ease-in-out infinite;
        }

        .pfc-powder-reverse {
          animation: pfcPowderFloatReverse 8s ease-in-out infinite;
        }

        .pfc-product-float {
          animation: pfcProductFloat 5s ease-in-out infinite;
        }

        .pfc-product-float-reverse {
          animation: pfcProductFloatReverse 6s ease-in-out infinite;
        }

        .pfc-dust {
          animation: pfcDust 3.5s ease-out infinite;
        }

        .pfc-badge {
          animation: pfcBadge 4s ease-in-out infinite;
        }

        .pfc-shimmer {
          animation: pfcShimmer 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .pfc-powder,
          .pfc-powder-reverse,
          .pfc-product-float,
          .pfc-product-float-reverse,
          .pfc-dust,
          .pfc-badge,
          .pfc-shimmer {
            animation: none !important;
          }
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#f7fbf3] px-4 py-16 sm:px-6 lg:px-10">
        {/* ================= BACKGROUND ================= */}

        <div className="pointer-events-none absolute inset-0">
          {/* Main soft glow */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dff0d8]/60 blur-[100px]" />

          {/* Green powder */}
          <div className="pfc-powder absolute -left-16 top-16 h-44 w-44 rounded-full bg-[#83b878]/35 blur-2xl" />

          <div
            className="pfc-powder-reverse absolute right-[-60px] top-24 h-52 w-52 rounded-full bg-[#b6d98b]/40 blur-3xl"
            style={{ animationDelay: "1s" }}
          />

          {/* Yellow Holi powder */}
          <div
            className="pfc-powder absolute left-[15%] top-[35%] h-28 w-28 rounded-full bg-[#f2d76b]/30 blur-2xl"
            style={{ animationDelay: "2s" }}
          />

          {/* Pink accent */}
          <div
            className="pfc-powder-reverse absolute right-[15%] top-[40%] h-24 w-24 rounded-full bg-[#e8a5a5]/20 blur-2xl"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Tiny floating dust particles */}
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="pfc-dust absolute h-1.5 w-1.5 rounded-full bg-[#75a96d]/60"
              style={{
                left: `${8 + ((index * 17) % 85)}%`,
                top: `${20 + ((index * 13) % 60)}%`,
                animationDelay: `${(index % 6) * 0.4}s`,
                animationDuration: `${3 + (index % 3)}s`,
              }}
            />
          ))}

          {/* Decorative rings */}
          <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8bb67d]/10" />

          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8bb67d]/10" />
        </div>

        {/* ================= HEADER ================= */}

        <div className="relative z-10 mx-auto mb-8 max-w-7xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cfe3c9] bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-[#3f7545] shadow-sm backdrop-blur">
            <Sparkles size={14} />
            EXCLUSIVE COLLECTION
            <Sparkles size={14} />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-[#244d2b] sm:text-5xl lg:text-6xl">
            PFC <span className="text-[#5c9957]">Special</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#658067] sm:text-base">
            Discover our plant-powered favourites — fresh, wholesome and
            carefully picked for your everyday lifestyle.
          </p>
        </div>

        {/* ================= HERO ================= */}

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="relative min-h-[480px] overflow-hidden rounded-[36px] border border-[#d7e8d1] bg-white/70 shadow-[0_25px_80px_rgba(52,100,57,0.12)] backdrop-blur-xl">
            {/* Color burst behind product */}
            <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#e9f5e4] via-[#d1e9c8] to-[#f3e7a7] blur-2xl" />

            {/* Holi-style splashes */}
            <div className="pfc-powder absolute left-[18%] top-[25%] h-20 w-20 rounded-[45%_55%_60%_40%] bg-[#82b875]/35 blur-xl" />

            <div
              className="pfc-powder-reverse absolute right-[18%] top-[24%] h-24 w-24 rounded-[60%_40%_45%_55%] bg-[#e5b65c]/30 blur-xl"
              style={{ animationDelay: "1s" }}
            />

            <div
              className="pfc-powder absolute bottom-[22%] left-[28%] h-16 w-16 rounded-full bg-[#e2a0a0]/20 blur-lg"
              style={{ animationDelay: "2s" }}
            />

            {/* Left Product */}
            <div className="pfc-product-float absolute left-[4%] top-[24%] hidden w-40 rotate-[-8deg] sm:block lg:left-[10%] lg:w-48">
              <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-2 shadow-[0_20px_50px_rgba(50,100,50,0.16)]">
                <div className="relative h-36 overflow-hidden rounded-[22px] lg:h-44">
                  <img
                    src={products[0].image}
                    alt={products[0].name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2 pb-2 pt-3">
                  <p className="font-bold text-[#315c38]">{products[0].name}</p>
                  <p className="text-xs text-gray-500">
                    {products[0].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Product */}
            <div className="pfc-product-float-reverse absolute right-[4%] top-[20%] hidden w-40 rotate-[8deg] sm:block lg:right-[10%] lg:w-48">
              <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-2 shadow-[0_20px_50px_rgba(50,100,50,0.16)]">
                <div className="relative h-36 overflow-hidden rounded-[22px] lg:h-44">
                  <img
                    src={products[1].image}
                    alt={products[1].name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2 pb-2 pt-3">
                  <p className="font-bold text-[#315c38]">{products[1].name}</p>
                  <p className="text-xs text-gray-500">
                    {products[1].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Left */}
            <div className="pfc-product-float-reverse absolute bottom-[10%] left-[13%] hidden w-32 rotate-[7deg] md:block">
              <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-1.5 shadow-xl">
                <div className="h-24 overflow-hidden rounded-[18px]">
                  <img
                    src={products[2].image}
                    alt={products[2].name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="pfc-product-float absolute bottom-[10%] right-[13%] hidden w-32 rotate-[-7deg] md:block">
              <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-1.5 shadow-xl">
                <div className="h-24 overflow-hidden rounded-[18px]">
                  <img
                    src={products[3].image}
                    alt={products[3].name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ================= CENTER ================= */}

            <div className="relative z-20 flex min-h-[480px] flex-col items-center justify-center px-6 py-14 text-center">
              {/* Badge */}
              <div className="pfc-badge mb-5 inline-flex items-center gap-2 rounded-full bg-[#285a31] px-4 py-2 text-xs font-bold text-white shadow-lg">
                <Leaf size={14} />
                100% PLANT-BASED VIBES
              </div>

              <div className="relative">
                {/* Main product glow */}
                <div className="absolute inset-0 scale-125 rounded-full bg-[#a6ce9d]/30 blur-3xl" />

                <div className="pfc-product-float relative mx-auto h-52 w-52 overflow-hidden rounded-full border-[7px] border-white bg-white shadow-[0_30px_70px_rgba(40,90,49,0.2)] sm:h-60 sm:w-60">
                  <img
                    src={products[0].image}
                    alt="PFC Special Vegan"
                    className="h-full w-full object-cover"
                  />

                  {/* Shimmer */}
                  <div className="pfc-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
                </div>

                {/* Tiny floating sparkle */}
                <span className="absolute -right-5 top-2 text-2xl text-[#72a968]">
                  ✦
                </span>

                <span className="absolute -left-7 bottom-8 text-lg text-[#a2c88e]">
                  ✦
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-black text-[#285a31] sm:text-3xl">
                Plant Power, PFC Style.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#708174]">
                Tofu, soy goodness and plant-based favourites made for delicious
                everyday choices.
              </p>

              <Link
                to="/category/pfc-special"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#285a31] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(40,90,49,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-[#214d29]"
              >
                Explore PFC Special
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* ================= PRODUCT STRIP ================= */}

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {products.map((product, index) => (
              <Link
                key={index}
                to="/category/pfc-special"
                className="group flex items-center gap-3 rounded-2xl border border-[#dcebd8] bg-white/80 p-3 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#edf6e9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#315c38]">
                    {product.name}
                  </p>

                  <p className="text-xs text-gray-500">{product.subtitle}</p>

                  <p className="mt-1 text-sm font-black text-[#285a31]">
                    {product.price}
                  </p>
                </div>

                <ShoppingBag
                  size={16}
                  className="ml-auto shrink-0 text-[#6fa968] transition group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PfcSpecial;
