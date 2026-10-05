import React from "react";
import Banner from "../components/About/Banner.jsx";
import Text from "../components/About/Text.jsx";
import Data from "../components/About/Data.jsx";
import OtherWeb from "../components/About/OtherWeb.jsx";
import SEO from "../components/SEO.jsx";

const About = () => {
  return (
    <>
      <SEO
        title="About PFC Foods | Fresh Paneer & Vegan Products"
        description="Learn about PFC Foods, our commitment to delivering fresh paneer, tofu, soy milk, vegan ghee, and high-quality healthy food products."
        keywords="About PFC Foods, Fresh Paneer, Tofu, Soy Milk, Vegan Ghee, Healthy Food"
        url="https://pfcpaneer.in/about"
        image="https://pfcpaneer.in/logo.png"
      />
      <Banner />
      <Text />
      <Data />
      <OtherWeb />
    </>
  );
};

export default About;
