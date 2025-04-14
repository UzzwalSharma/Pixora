import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import SplineScene from '/src/Orderform/Spline.jsx';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden text-white flex items-center justify-center font-sans">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SplineScene />
      </div>

      {/* Pixora Pro Badge */}
      <div className="absolute top-6 right-8 z-30">
  <div className="flex flex-col items-center p-2 border-4 border-[#00ffbf] rounded-full shadow-[0_0_20px_#00ffbf] hover:scale-105 transition-transform duration-300">
    <img 
      src="/pixora pro logo.jpg" 
      alt="Pixora Pro Logo" 
      className="w-16 h-16 rounded-full object-contain" 
    />
   
  </div>
  <h2 className="mt-2 text-[#00ffbf] font-semibold text-sm tracking-wide drop-shadow-[0_0_5px_#00ffbf] relative">
      Pixora Pro
      <span className="block h-[2px] w-full bg-[#00ffbf] mt-1 animate-pulse rounded-full"></span>
    </h2>
</div>




      {/* Content */}
      <div className="relative z-20 w-full px-8 py-16 flex flex-col items-start justify-center space-y-6">
  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(0,255,191,0.7)]">
    Transform Designs into Reality with <br /><span className="text-[#00ffbf]">Pixora Pro</span>
  </h1>

  <p className="text-lg md:text-xl text-gray-200 drop-shadow-md max-w-3xl">
    Just upload your UI and let Pixora turn it into a powerful full-stack website — fast, modern, and fully tailored to your needs.
  </p>
</div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 w-full z-30 flex justify-center">
        <a href="#why-choose-us" className="text-green-300 hover:text-white transition-all duration-300 flex flex-col items-center">
          <FaChevronDown className="animate-bounce text-3xl drop-shadow-glow" />
          <p className="mt-1 text-sm uppercase tracking-widest font-semibold">Scroll Down</p>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
