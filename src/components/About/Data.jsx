import { Link } from "react-router-dom";
import React from "react";

const Data = () => {
  return (
    <>
      {/* CTA */}
      <section className="border-b border-gray-200 bg-[#f7fbf3] py-20">
        <div className="w-[90%] mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f3d2b]">
            Everything you need, all in one place
          </h1>

          <p className="text-gray-600 text-base mt-4 max-w-2xl mx-auto leading-7">
            Shop groceries, food, beverages, dairy products, household
            essentials and more — conveniently from PFC.
          </p>

          <button
            className="
              mt-8
              bg-green-700
              hover:bg-green-800
              transition
              text-white
              px-7
              py-3
              rounded-lg
              font-medium
              shadow-sm
            "
          >
            <Link to="/">Shop Now</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Data;
