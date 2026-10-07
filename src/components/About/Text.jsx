import React from "react";

const Text = () => {
  return (
    <div className="bg-[#f7fbf3]">
      {/* =========================
          SECTION 1 - PFC SOYA PRODUCTS
      ========================= */}
      <section className="w-[90%] max-w-6xl mx-auto py-24">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1f3d2b]">
            About PFC
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
            headquarters in{" "}
            <strong className="text-[#1f3d2b]">Dholpur, Rajasthan</strong>. Born
            in the historic city of Dholpur, PFC is building its journey with
            the vision of delivering quality food products and everyday
            essentials to customers while creating a strong identity for Dholpur
            on the growing food and e-commerce landscape.
          </p>

          <p>
            The primary objective of{" "}
            <span className="font-semibold text-[#1f3d2b]">
              Pachauri Food Corporation (PFC)
            </span>{" "}
            is to manufacture and supply quality soya-based products while
            maintaining high standards of hygiene, freshness, and nutrition.
            From <strong className="text-[#1f3d2b]">Dholpur, Rajasthan</strong>,
            we aim to take our products beyond our local community and make them
            accessible to customers across different regions.
          </p>

          <p>
            Our plant-based soya products are made to provide a nutritious
            source of protein and can be a valuable part of a balanced diet. We
            are committed to offering products that combine quality, freshness,
            and convenience for everyday consumption.
          </p>

          <p>
            Currently, our own product portfolio includes{" "}
            <span className="font-semibold text-[#1f3d2b]">
              Soya Paneer, Flavored Soya Milk, and Soya Curd.
            </span>{" "}
            As we continue to grow, our focus remains on quality, innovation,
            customer satisfaction, and building a trusted food brand from{" "}
            <strong className="text-[#1f3d2b]">Dholpur, Rajasthan</strong>.
          </p>
        </div>
      </section>

      {/* =========================
          SECTION 2 - E-COMMERCE
      ========================= */}
      <section className="w-full bg-[#f7fbf3]">
        <div className="w-[90%] max-w-6xl mx-auto py-24 border-t border-green-100">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1f3d2b]">
              Our E-Commerce Platform
            </h2>

            <p className="text-green-700 font-medium mt-3">
              From Dholpur to Your Doorstep
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8 text-gray-600 text-lg leading-9">
            <p>
              Alongside our own products,{" "}
              <span className="font-semibold text-[#1f3d2b]">
                Pachauri Food Corporation
              </span>{" "}
              is developing an e-commerce platform from{" "}
              <strong className="text-[#1f3d2b]">Dholpur, Rajasthan</strong>,
              designed to bring a wide range of products together in one
              convenient online shopping destination.
            </p>

            <p>
              Our platform is not limited to our own soya products. Customers
              will be able to explore products across categories such as{" "}
              <span className="font-semibold text-[#1f3d2b]">
                groceries, food products, beverages, dairy products, household
                essentials, personal care products, and more.
              </span>
            </p>

            <p>
              Our goal is to make everyday shopping simple and convenient for
              customers by providing organized categories, detailed product
              information, easy ordering, and reliable delivery. We aim to
              continuously expand our product range while maintaining quality
              and customer satisfaction.
            </p>

            <p>
              Starting from <strong className="text-[#1f3d2b]">Dholpur</strong>,
              our vision is to build a trusted e-commerce platform that can
              connect local businesses, quality products, and customers across
              Rajasthan and beyond.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Text;
