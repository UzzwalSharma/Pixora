import React from "react";
import Hero from "/src/Orderform/Hero.jsx";
import WhyChooseUs from "./Whychooseus";
import FullstackForm from "./Form";
import Footer from "/src/Orderform/Footer.jsx"
function Main() {
  return (
    <div>
      <Hero />

      <WhyChooseUs />

      <FullstackForm />
      <Footer/>
    </div>
  );
}

export default Main;
