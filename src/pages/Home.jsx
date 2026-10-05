import React from "react";
import Banner from "../components/Home/Banner";
import ProductsSection from "../components/Home/ProductsSection";
import SEO from "../components/SEO";
import PfcSpecial from "../components/Home/PfcSpecial";

const Home = ({ url }) => {
  return (
    <>
      <SEO
        title="PFC Foods | Fresh Paneer, Tofu & Vegan Products"
        description="Buy fresh paneer, tofu, soy milk, vegan ghee and healthy products online from PFC Foods."
        keywords="paneer, tofu, soy milk, vegan ghee, fresh paneer, PFC Foods"
        url="https://pfcpaneer.in/"
        image="https://pfcpaneer.in/logo.png"
      />
      <PfcSpecial />
      <Banner />
      <ProductsSection url={url} />
    </>
  );
};

export default Home;
