import React from "react";
import DoubtSpline from "./Doubtspline";
const StillHaveDoubts = () => {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-black text-white px-6 md:px-24 py-20">
      {/* Left Side: Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 mb-10 md:mb-0">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Still have <span className="text-white">doubts?</span>
        </h2>
        <h3 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#00ffbf]">
          Let’s connect.
        </h3>
        <p className="text-lg text-gray-300 max-w-lg mt-4">
          Whether it’s a quick question or a custom request, we’re just a click away.
          Don’t hesitate to reach out — we love building cool things together!
        </p>
        <a
          href="mailto:pixora.connect@gmail.com" // replace with your support email
          className="inline-block bg-white text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Send us an email
        </a>
      </div>

      {/* Right Side: Image or Graphic */}
      <div className="w-full md:w-1/2 flex justify-center">
       <DoubtSpline/>
      </div>
    </section>
  );
};

export default StillHaveDoubts;
