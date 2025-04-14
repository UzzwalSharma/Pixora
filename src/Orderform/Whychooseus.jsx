import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const features = [
  {
    title: "Full Customization",
    pixora: true,
    others: false,
  },
  {
    title: "Production-Ready Code",
    pixora: true,
    others: false,
  },
  {
    title: "Expert Call Support",
    pixora: true,
    others: false,
  },
  {
    title: "GitHub Code Push",
    pixora: true,
    others: false,
  },
  {
    title: "Affordable Pricing",
    pixora: true,
    others: false,
  },
  {
    title: "Delivery within 48hrs",
    pixora: true,
    others: false,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="relative w-full min-h-[90vh] text-white py-20 px-6 md:px-20 overflow-hidden bg-black"
    >
      {/* Futuristic Particles Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/supernovaspacebg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#00ffbf] mb-12 drop-shadow-[0_0_20px_#00ffbf]">
          Why Choose Pixora Pro?
        </h2>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
  <table className="w-full text-left border-collapse rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/40">
    <thead>
      <tr className="text-[#00ffbf] text-xl border-b border-white/20">
        <th className="p-4">Feature</th>
        <th className="p-4">Pixora</th>
        <th className="p-4">Others</th>
      </tr>
    </thead>
    <tbody>
      {features.map((feat, index) => (
        <tr
          key={index}
          className="border-b border-white/10 hover:bg-white/10 transition-colors bg-white/5"
        >
          <td className="p-4 font-medium drop-shadow-md text-white">
            {feat.title}
          </td>
          <td className="p-4 text-green-400 drop-shadow-md">
            {feat.pixora ? (
              <FaCheckCircle className="text-xl" />
            ) : (
              <FaTimesCircle className="text-red-500 text-xl" />
            )}
          </td>
          <td className="p-4 text-red-400 drop-shadow-md">
            {feat.others ? (
              <FaCheckCircle className="text-xl" />
            ) : (
              <FaTimesCircle className="text-red-500 text-xl" />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
