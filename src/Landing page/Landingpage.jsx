import React from "react";
import Hero from "./Hero";
import ComparisonSection from "./Comparisonsec.jsx";
import Pricing from "./Charges";
// import HeroSection from "./Herosec2";
import Showcase from "./Showcase";
import Contactus from "./Contactus";
import Footer from "./Footer";
import Text from "./Text/Text.jsx";
// import Newhero from "./Newhero.jsx"
import Steps from "./Steps";
import Integrationsec from "./Integrationsec";
import CTA from "./CTA";
import Questions from "./Questions";

function Landingpage() {
  return (
    <div>
      <Hero />
      <Text />
  
      <ComparisonSection />
      <Integrationsec />
      <hr className="text-gray-900" />

      {/* <Newhero/> */}

      <Showcase />

      {/* <Timeline/> */}

      <Steps />

      <Pricing />

      <Contactus />

      <Questions />

      <CTA />
      {/* <Newhero/> */}
      {/* <Timeline/> */}
      {/* <Questions/> */}

      <Footer />
    </div>
  );
}

export default Landingpage;
