import React from "react";

const Banner = () => {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1701691565656-32f0366cf6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjEzOTV8MHwxfHNlYXJjaHwyOHx8dmVnYW4lMjAlMjBmb29kJTIwdG9mdSUyMHNveWElMjBtaWxrJTIwY3VyZHxlbnwwfHx8fDE3ODQ3ODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=400')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-[90%] mx-auto h-full flex items-center">
        <div className="max-w-2xl text-white">
          <p className="uppercase tracking-[4px] text-sm font-semibold">
            OUR STORY
          </p>

          <h1 className="text-6xl font-bold leading-tight mt-4">
            Healthy food for
            <br />
            the way you live
          </h1>

          <p className="mt-6 text-lg leading-8">
            Plant Fresh Choice was created with one mission — making healthy,
            plant-based food delicious, nutritious and accessible for everyone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
