import React from "react";

const Banner = () => {
  const image =
    "https://images.unsplash.com/photo-1701691565656-32f0366cf6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjEzOTV8MHwxfHNlYXJjaHwyOHx8dmVnYW4lMjAlMjBmb29kJTIwdG9mdSUyMHNveWElMjBtaWxrJTIwY3VyZHxlbnwwfHx8fDE3ODQ3ODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1600";

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] lg:min-h-[650px]">
      <img
        src={image}
        alt="Fresh food products"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#f7fbf3]/95
          via-[#f7fbf3]/65
          to-[#f7fbf3]/10
        "
      />

      <div
        className="
          absolute
          inset-0
          lg:hidden
          bg-gradient-to-t
          from-[#1f3d2b]/70
          via-[#1f3d2b]/20
          to-transparent
        "
      />

      <div className="relative z-10 w-[92%] max-w-7xl mx-auto min-h-[calc(100vh-80px)] lg:min-h-[650px] flex items-center">
        <div className="w-full lg:w-[62%] py-12 sm:py-16 lg:py-0">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm font-semibold text-[#285a31]">
              PFC SPECIAL
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mt-3 sm:mt-4 text-[#1f3d2b]">
              Freshness you can
              <br />
              <span className="text-[#3f8f46]">trust.</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-[#3f5144] max-w-xl">
              Discover quality groceries, delicious food, beverages, dairy
              products, soya products, household essentials and much more — all
              in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-8">
              <button
                className="
                  w-full sm:w-auto
                  px-7 py-3.5
                  bg-[#3f8f46]/95
                  hover:bg-[#32783a]
                  text-white
                  font-semibold
                  rounded-lg
                  shadow-lg
                  shadow-green-900/10
                  transition-all
                  duration-300
                "
              >
                Shop Now
              </button>

              <button
                className="
                  w-full sm:w-auto
                  px-7 py-3.5
                  bg-[#f7fbf3]/70
                  backdrop-blur-sm
                  border
                  border-[#3f8f46]/60
                  text-[#285a31]
                  font-semibold
                  rounded-lg
                  hover:bg-[#f7fbf3]
                  transition-all
                  duration-300
                "
              >
                Explore PFC Special
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
