"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CircleGraph from "/src/Landing page/CircleGraph.jsx";
import Counter from "./Counter";

// Stats with custom background colors
const statsData = [
  {
    number: "3x",
    title: "Code Generation Speed",
    description:
      "Outperforms Bolt.new, Loveable, and Replit in speed and output quality. Real-time transformation, no lag.",
    color: "#D1FAE5", // green-100
  },
  {
    number: "100s",
    title: "Framework Support",
    description: "Export designs to React, Tailwind, and HTML/CSS effortlessly.",
    color: "#FFE0B2", // blue-100
  },
  {
    number: "98%",
    title: "Design Precision",
    description:
      "Generates cleaner layouts with smoother animations and pixel-perfect accuracy powered by smarter AI models.",
    color: "#FCE7F3", // pink-100
  },
  {
    number: "+280",
    title: "Seamless Integrations",
    description: "Works with VS Code, GitHub, and Figma for a smooth workflow.",
    color: "	#FEF9C3", // yellow-100
  },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const springTransition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

const ComparisonSection = () => {
  const [stats, setStats] = useState(statsData);

  // Shuffle the cards smoothly every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => shuffle(prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-20 px-10 bg-gray-800 flex items-center justify-center"
      id="reviews"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Feature Cards */}
        <div className="w-full md:w-1/2 relative right-6">
          <h2 className="text-4xl font-extrabold mb-8">
          <span className="text-white"> Why</span>  <span className="text-green-400 font-black">Pixora</span>   <span className="text-white">stands out</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                layout
                transition={springTransition}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-4 border border-gray-200 flex flex-col items-start shadow-md"
                style={{
                  backgroundColor: stat.color,
                  transition: "background 0.3s ease",
                }}
              >
                <div className="text-4xl font-bold text-green-500">
                  <Counter target={stat.number} />
                </div>
                <h3 className="text-lg font-semibold mt-2">{stat.title}</h3>
                <p className="text-gray-600 mt-1">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Circular Graph */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0">
          <CircleGraph />
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
