import React from "react";

const Text = () => {
  return (
    <section className="w-[90%] max-w-6xl mx-auto py-24 bg-[#f7fbf3]">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1f3d2b]">
          About Us
        </h1>

        <p className="text-green-700 font-medium mt-3">
          Quality • Freshness • Trust
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 text-gray-600 text-lg leading-9">
        <p>
          <span className="font-semibold text-[#1f3d2b]">
            Pachauri Food Corporation (PFC) Soya Paneer Producer Organization
          </span>{" "}
          was incorporated on <strong>20 May 2026</strong>, with its
          headquarters located in <strong>Dholpur, Rajasthan</strong>. The
          organization was established with the vision of providing high-quality
          food products and everyday essentials to consumers.
        </p>

        <p>
          The primary objective of{" "}
          <span className="font-semibold text-[#1f3d2b]">
            Pachauri Food Corporation (PFC)
          </span>{" "}
          is to manufacture and supply quality soya-based products while
          maintaining high standards of hygiene, freshness, and nutrition.
          Alongside our own products, we aim to make a wide range of food,
          grocery, beverage, dairy, and household products easily accessible to
          our customers.
        </p>

        <p>
          Our plant-based soya products are made to provide a nutritious source
          of protein and can be a valuable part of a balanced diet. We are
          committed to offering products that combine quality, freshness, and
          convenience for everyday consumption.
        </p>

        <p>
          Currently, our own product portfolio includes{" "}
          <span className="font-semibold text-[#1f3d2b]">
            Soya Paneer, Flavored Soya Milk, and Soya Curd.
          </span>{" "}
          As we continue to grow, we remain focused on quality, innovation,
          customer satisfaction, and making reliable food and everyday
          essentials available to our customers.
        </p>
      </div>
    </section>
  );
};

export default Text;
