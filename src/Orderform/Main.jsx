import React from "react";
import Hero from "/src/Orderform/Hero.jsx";
import WhyChooseUs from "./Whychooseus";
import FullstackForm from "./Form";
import Footer from "/src/Orderform/Footer.jsx"
import Doubt from "/src/Orderform/Doubt.jsx"
function Main() {
  return (
    <div>
      <Hero />

      <WhyChooseUs />

      <FullstackForm />
    <Doubt/>
      <Footer/>
    </div>
  );
}

export default Main;
