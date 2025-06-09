import React from "react";
import { motion } from "framer-motion";

const integrations = [
  { image: "/Logos/vs-code@logotyp.us.svg", alt: "VS Code", name: "VS Code", description: "Powerful code editor for development." },
  { image: "/Logos/vite.svg", alt: "VITE", name: "VITE", description: "Vite is a next-generation JavaScript build tool," },
  { image: "/Logos/github-logo.svg", alt: "GitHub", name: "GitHub", description: "Host and review code, manage projects." },
  { image: "/Logos/figma-logo.svg", alt: "Figma", name: "Figma", description: "Collaborative interface design tool." },
  { image: "/Logos/react logo.webp", alt: "React", name: "React", description: "A JavaScript library for building UIs." },
  { image: "/Logos/294678_html5_icon.png", alt: "HTML", name: "HTML", description: "Standard markup language for web pages." },
  { image: "/css.png", alt: "CSS", name: "CSS", description: "Style sheet language for web design." },
  { image: "/tailwind.png", alt: "Tailwind", name: "Tailwind", description: "DevOps platform for code collaboration." },
  { image: "/bootstrap.png", alt: "BootStrap", name: "BootStrap", description: "Popular CSS framework for responsive design." },
];

const scrollMotion = (direction = "up") => ({
  animate: {
    y: direction === "up" ? ["0%", "-100%"] : ["-100%", "0%"],
  },
  transition: {
    duration: 30,
    repeat: Infinity,
    ease: "linear",
  },
});

function Integrationsec() {
  return (
    <div className="bg-black py-24 overflow-hidden integrations">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div>
          <div className="inline-block border-2 border-lime-400 rounded-full px-3 py-1 bg-green-100 text-lime-600 uppercase text-sm font-bold mb-4">
            <span className="relative bottom-1 right-1">★</span> Pixora Integrations
          </div>

          <h2 className="text-white text-5xl lg:text-6xl font-medium leading-tight">
            Plug & Play with Your{" "}
            <span className="text-[#00ff99] font-black">Favorite Tools</span>
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-lg">
            Pixora seamlessly connects with your favorite tools without
            friction. Effortlessly plug Pixora into your workflow and
            experience true productivity, collaboration, and creativity.
          </p>
        </div>

        {/* Right Cards Section */}
        <div
          className="relative h-[400px] overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Left Motion Column (Scroll Up) */}
            <motion.div className="flex flex-col gap-4" {...scrollMotion("up")}>
              {[...integrations, ...integrations].map((integration, idx) => (
                <div
                  key={`up-${idx}`}
                  className="bg-neutral-900 border border-white/10 rounded-3xl p-6"
                >
                  <div className="flex justify-center">
                    <img
                      src={integration.image}
                      alt={integration.alt}
                      className="w-20 h-20 object-contain rounded-xl bg-white"
                    />
                  </div>
                  <h3 className="text-white text-lg font-semibold text-center mt-4">
                    {integration.name}
                  </h3>
                  <p className="text-white/70 text-sm text-center mt-2">
                    {integration.description}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Right Motion Column (Scroll Down) */}
            <motion.div
              className="flex flex-col gap-4"
              {...scrollMotion("down")}
            >
              {[...integrations, ...integrations].map((integration, idx) => (
                <div
                  key={`down-${idx}`}
                  className="bg-neutral-900 border border-white/10 rounded-3xl p-6"
                >
                  <div className="flex justify-center">
                    <img
                      src={integration.image}
                      alt={integration.alt}
                      className="w-20 h-20 object-contain rounded-xl bg-white"
                    />
                  </div>
                  <h3 className="text-white text-lg font-semibold text-center mt-4">
                    {integration.name}
                  </h3>
                  <p className="text-white/70 text-sm text-center mt-2">
                    {integration.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Integrationsec;
