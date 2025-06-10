import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";

const maintext =
  "Introducing India's first full vibe-coded platform — Pixora. " +
  "Want a website to make your social presence but don't have enough money to hire a developer? " +
  "Or maybe you have a design but no idea how to turn it into a website? " +
  "Get frustrated exploring different tools? It's time to stop worrying about it. " +
  "Just tell your requirements and we will do the rest. " +
  "From creating a website to deploying it, Pixora is your one-stop solution for all your web development needs. ";

function Text() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = maintext.split(" ");
  const [revealedCount, setRevealedCount] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const scaled = Math.min(v / 0.65, 1);
      setRevealedCount(Math.floor(scaled * words.length));
    });
    return unsubscribe;
  }, [scrollYProgress, words.length]);

  return (
    <div>
      <div className="contanier bg-black  bg-[url('/stars.png')]" ref={containerRef}
     
      >
        <div className="sticky top-20 ">
          <div className="text-2xl font-bold flex items-center justify-center gap-2">
            <div className="inline-block border-2 mt-12 border-lime-400 rounded-full px-3 py-1 bg-green-100 text-lime-600 items-center uppercase ">
              <span className="text-sm relative bottom-1 right-1">★</span>
              <span>
                India's First Vibe-Coded Platform
              </span>
            </div>
          </div>
          <div className="text-4xl font-medium text-center mt-10 pb-6 flex flex-wrap gap-1 justify-center">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  idx < revealedCount
                    ? { opacity: 1, y: 0, transition: { duration: 0.3, delay: idx * 0.02 } }
                    : { opacity: 0.15, y: 20 }
                }
                className="text-white"
              >
                {word}&nbsp;
              </motion.span>
            ))}
            <span className="text-[#00ff99] w-full text-center block mt-4">
              It’s not magic — it’s Pixora.<br />
              <span className="text-white text-lg block mt-2">
                Experience the future of web creation, truely made in India for the world.
              </span>
            </span>
          </div>
        </div>
        <div className="h-[150vh]"></div>
      </div>
    </div>
  );
}

export default Text;
