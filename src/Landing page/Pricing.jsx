import React from "react";
import { FaCheck, FaCrown, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0/mo",
    icon: <FaCheck className="text-green-400 text-5xl drop-shadow-glow" />, // Neon glow
    features: [
        "5 AI-generated websites/day",
        "Community templates access",
        "Mobile responsive design",
        "Deploy to Pixora hosting",
      ],
    buttonText: "Get Started",
    buttonStyle: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    icon: <FaStar className="text-blue-400 text-5xl drop-shadow-glow" />, // Neon glow
     features: [
        "10 AI-generated websites/day",
"Access to Community templates",
        "Advanced AI customization",
        "Priority support",
       "Dedicated hosting",
        "Git hub integration",
       "Video call support",
        "Responsive design for all devices",
       
      ],
    buttonText: "Upgrade to Pro",
    buttonStyle: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Premium",
    price: "$19.99/mo",
    icon: <FaCrown className="text-yellow-400 text-5xl drop-shadow-glow" />, // Neon glow
    features:[
        "Everything in Professional",
        "Unlimited AI-generated websites",
        "Access to all templates",
        "White-label solution",
        "Dedicated support team",
        "Domain hosting",
        "Custom integrations",
        "Team collaboration",
        "24/7 phone support"
      ],
    buttonText: "Go Premium",
    buttonStyle: "bg-yellow-500 hover:bg-yellow-600",
  },
];

const PixoraPlus = () => {
  return (
    <div className="p-10 max-w-5xl mx-auto text-center relative">
      {/* Background Glow */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-40 blur-3xl"></div>
      
      <h2 className="text-5xl font-extrabold text-black mb-6 tracking-wide drop-shadow-xl">
        Pixora <span className="text-green-400">Plus</span>
      </h2>
      <p className="text-gray-400 mb-10 text-lg">Choose the plan that fits your workflow.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(0,255,153,0.7)" }}
            className="bg-black/50 border border-gray-700 p-8 rounded-xl shadow-xl backdrop-blur-xl overflow-hidden relative"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4 animate-pulse">{plan.icon}</div>
            
            {/* Plan Name */}
            <h3 className="text-3xl font-semibold text-white drop-shadow-md mb-2">{plan.name}</h3>
            
            {/* Price */}
            <p className="text-lg font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent my-3">
              {plan.price}
            </p>
            
            {/* Features */}
            <ul className="text-sm text-gray-300 mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-400" /> {feature}
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 text-white font-bold rounded-lg ${plan.buttonStyle} transition-all duration-300 shadow-md`}
            >
              {plan.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PixoraPlus;
