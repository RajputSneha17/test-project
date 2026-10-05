import { Link } from "react-router-dom";
import React from "react";

const Data = () => {
  return (
    <>
      {/* CTA */}
      <section className="border-b border-gray-200 bg-[#fdf9f5] py-20">
        <div className="w-[90%] mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Ready to start your healthy journey?
          </h1>

          <p className="text-gray-500 text-base mt-4 max-w-2xl mx-auto leading-7"></p>

          <button className="mt-8 bg-amber-700 hover:bg-amber-800 transition text-white px-7 py-3 rounded-lg font-medium">
            <Link to="/">Shop Now</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Data;
