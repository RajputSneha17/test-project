import React from "react";

const Text = () => {
  return (
    <section className="w-[90%] max-w-6xl mx-auto py-24">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-orange-600 font-medium mt-3">
          Pure • Healthy • Trusted
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 text-gray-600 text-lg leading-9">
        <p>
          <span className="font-semibold text-black">
            Pachauri Food Corporation (PFC) Soya Paneer Producer Organization
          </span>{" "}
          was incorporated on <strong>20 May 2026</strong>, with its
          headquarters located in <strong>Dholpur, Rajasthan</strong>. The
          organization was established with the vision of providing healthy,
          nutritious, and high-quality plant-based food products to consumers.
        </p>

        <p>
          The primary objective of{" "}
          <span className="font-semibold text-black">
            Pachauri Food Corporation (PFC)
          </span>{" "}
          is to manufacture and supply pure, chemical-free soya products that
          meet the highest standards of quality, hygiene, and nutrition. We are
          committed to promoting a healthier lifestyle through safe and
          sustainable food choices.
        </p>

        <p>
          Our vegan products are naturally rich in protein, calcium, and
          essential amino acids. They support weight management, help reduce
          cholesterol levels, strengthen bones, and provide a wholesome source
          of daily nutrition for people of all age groups.
        </p>

        <p>
          Currently, our product portfolio includes{" "}
          <span className="font-semibold text-black">
            Soya Paneer, Flavored Soya Milk, and Curd.
          </span>{" "}
          As we continue to grow, we remain dedicated to innovation, customer
          satisfaction, and delivering fresh, nutritious, and premium-quality
          products.
        </p>
      </div>
    </section>
  );
};

export default Text;
