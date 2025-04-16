import React from "react";
import { FaCheck, FaCrown, FaStar, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from "clsx";

const plans = [
  {
    name: "Free",
    price: "$0/mo",
    icon: <FaCheck className="text-green-400 text-4xl drop-shadow-glow" />,
    features: ["Basic Wireframe Conversion", "Limited Exports", "Community Access"],
    buttonText: "Get Started",
    buttonStyle: "bg-green-500 hover:bg-green-600",
    badge: null,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    icon: <FaStar className="text-blue-400 text-4xl drop-shadow-glow" />,
    features: [
      "Unlimited Wireframe Conversion",
      "Full stack delivery in 4-5 days",
      "2 Full stack websites",
      "Priority Support",
      "GitHub Code Push",
    ],
    buttonText: "Upgrade to Pro",
    buttonStyle: "bg-blue-500 hover:bg-blue-600",
    badge: "Popular",
  },
  {
    name: "Premium",
    price: "$19.99/mo",
    icon: <FaCrown className="text-yellow-400 text-4xl drop-shadow-glow" />,
    features: [
      "AI-Enhanced Designs",
      "Full stack delivery in 24-48 hours",
      "2-4 Full stack websites",
      "Dedicated Support",
      "Chat with Experts",
      "Call with Experts",
      "GitHub Code Push",
    ],
    buttonText: "Go Premium",
    buttonStyle: "bg-yellow-500 hover:bg-yellow-600",
    badge: "Best Value",
  },
];

const PixoraPlus = () => {
  return (
    <div className="relative p-10 max-w-6xl mx-auto text-center">
      {/* Background blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-[#0f0f0f] opacity-40 blur-2xl z-0" />

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-white mb-4 tracking-wide drop-shadow-lg z-10 relative"
      >
        Pixora <span className="text-green-400">Plus</span>
      </motion.h2>
      <p className="text-gray-400 mb-12 text-lg z-10 relative">
        Unlock powerful features for seamless UI development.
      </p>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 z-10 relative">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={clsx(
              "relative bg-white/5 border border-gray-700 p-8 rounded-2xl backdrop-blur-xl overflow-hidden shadow-xl transition-all duration-300 group hover:shadow-green-500/20",
              plan.name === "Premium" && "hover:border-yellow-500",
              plan.name === "Pro" && "hover:border-blue-500"
            )}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-cyan-500 text-xs text-black font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
                {plan.badge}
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-4">{plan.icon}</div>

            {/* Plan Name */}
            <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>

            {/* Price */}
            <p className="text-lg font-semibold bg-gradient-to-r from-green-300 to-cyan-400 bg-clip-text text-transparent mb-6">
              {plan.price}
            </p>

            {/* Features */}
            <ul className="text-gray-300 text-sm space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 justify-center">
                  <FaCheck className="text-green-400" /> {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`shimmer-button w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${plan.buttonStyle} shadow-lg`}
            >
              {plan.buttonText}
            </motion.button>

            {/* Shimmer border hover effect (Premium only) */}
            {plan.name === "Premium" && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:animate-border-glow border border-yellow-500/30" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PixoraPlus;
