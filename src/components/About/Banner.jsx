import React from "react";

const Banner = () => {
  return (
    <section className="relative min-h-[650px] bg-[#f7fbf3] overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto min-h-[650px] flex items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 py-16 lg:py-0 z-10">
          {/* Small Heading */}
          <p className="uppercase tracking-[4px] text-sm md:text-base font-semibold text-green-700">
            PFC SPECIAL
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mt-4 text-[#1f3d2b]">
            Freshness you can
            <br />
            <span className="text-green-700">trust.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg leading-8 text-gray-600 max-w-xl">
            Discover quality groceries, delicious food, beverages, dairy
            products, soya products, household essentials and much more — all in
            one place.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              className="
                px-7 py-3.5
                bg-green-700
                hover:bg-green-800
                text-white
                font-semibold
                rounded-md
                transition-all duration-300
                shadow-md
              "
            >
              Shop Now
            </button>

            <button
              className="
                px-7 py-3.5
                border-2 border-green-700
                text-green-700
                font-semibold
                rounded-md
                hover:bg-green-700
                hover:text-white
                transition-all duration-300
              "
            >
              Explore PFC Special
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block absolute right-0 top-0 w-[52%] h-full">
          <div className="relative w-full h-full">
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1701691565656-32f0366cf6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjEzOTV8MHwxfHNlYXJjaHwyOHx8dmVnYW4lMjAlMjBmb29kJTIwdG9mdSUyMHNveWElMjBtaWxrJTIwY3VyZHxlbnwwfHx8fDE3ODQ3ODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1600"
              alt="Fresh food products"
              className="w-full h-full object-cover"
            />

            {/* Soft Green Blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7fbf3] via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden absolute bottom-0 left-0 w-full h-[280px]">
          <img
            src="https://images.unsplash.com/photo-1701691565656-32f0366cf6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjEzOTV8MHwxfHNlYXJjaHwyOHx8dmVnYW4lMjBmb29kJTIwdG9mdSUyMHNveWElMjBtaWxrJTIwY3VyZHxlbnwwfHx8fDE3ODQ3ODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1600"
            alt="Fresh food products"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#f7fbf3] via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
