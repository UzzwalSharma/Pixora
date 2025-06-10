import {React , useState , useEffect} from "react";
import {motion , AnimatePresence} from "framer-motion";
import { Link } from "react-router-dom";

function Contactus() {

   const titles = ["{ Design Smarter }", "{ Code Faster }", " { Innovate Better }", "{ Build Effortlessly }"];
      const [index, setIndex] = useState(0);
  
      useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 2000); // Change title every 2 seconds
    
        return () => clearInterval(interval);
      }, []);

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center" id="contact-us">
      

<div className="div pt-16">
 {/* Title */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={titles[index]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-6xl font-extrabold text-center z-10 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent"
        >
          {titles[index]}
        </motion.h1>
      </AnimatePresence>
</div>
     
      <div className="container flex flex-col items-center justify-center text-center py-16 px-4">
        <div
          className="intro  relative flex flex-col items-center justify-center text-center py-16 px-4 rounded-[32px] overflow-hidden w-full max-w-4xl"
          style={{
            height: "60vh",
            background: `radial-gradient(ellipse 100% 120% at 50% 100%, #1b4d36 40%, #0f804c 50%, #07301d 0%, #000 100%)`,
            backgroundColor: "#0a2e1c",
            boxShadow: "0 0 80px #1aff8d20 inset",
          }}
        >
          <div className="text mt-10">
 <h3 className="text-5xl font-medium">
            More than just <br /> a coding Platform
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto mt-12">
           It’s not just a coding platform — it’s a rebellion against the slow, complex <br /> traditional dev stack. Pixora removes the layers, the barriers, <br /> the learning curves — leaving you with pure creative power. Think it, prompt it, ship it. That’s the Pixora way.
          </p>
          </div>
         
<Link to="/contact">
          <div
            className="rounded-full px-6 py-2 bg-lime-300 text-black font-bold hover:bg-green-300 transition"
            style={{ cursor: "pointer" }}
          >

            Contact Us
          </div>
          </Link>
        </div>
 <div className="contact">
  <div
    className="content rounded-[25px] relative w-full overflow-hidden mt-10 flex items-end justify-center"
    style={{
      height: "55vh",
      
      backgroundColor: "#0a2e1c",
      boxShadow: "0 0 80px #1aff8d20 inset",
    }}
  >
    {/* Orbit Ring Container */}
    <div className="relative top-80 w-[700px] h-[700px] md:w-[640px] md:h-[640px] rounded-full">

      {/* RING 1 */}
      <motion.div
        animate={{ rotate: "-1turn" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border border-white/10 rounded-full shadow-[0_0_40px_#ffffff11]"
      >
        {/* Top center */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 backdrop-blur-[6px] bg-white/10 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_12px_#1aff8d50] animate-pulse">
          <img src="/Logos/whatsapp.png" alt="icon" className="w-6 h-6" />
        </div>
        {/* Bottom center (opposite) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 backdrop-blur-[6px] bg-white/10 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_12px_#1aff8d50] animate-pulse">
          <img src="/Logos/icons8-telegram-48.png" alt="icon" className="w-8 h-8" />
        </div>
      </motion.div>

      {/* RING 2 */}
      <motion.div
        animate={{ rotate: "-1turn" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border border-white/10 rounded-full shadow-[0_0_30px_#ffffff0a]"
      >
        {/* Right center */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 backdrop-blur-[6px] bg-white/10 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_12px_#ff554480] animate-pulse">
          <img src="/Logos/gmail svg.svg" alt="icon" className="w-6 h-6" />
        </div>
        {/* Left center (opposite) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 backdrop-blur-[6px] bg-white/10 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_12px_#ff554480] animate-pulse">
          <img src="/Logos/icons8-twitter-50.png" alt="icon" className="w-8 h-8" />
        </div>
      </motion.div>

      {/* RING 3 */}
      <motion.div
        animate={{ rotate: "-1turn" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] top-[20%] left-[20%] border border-white/10 rounded-full shadow-[0_0_30px_#ffffff0a]"
      >
        {/* Bottom right */}
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 backdrop-blur-[6px] bg-white/10 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_12px_#d946ef80] animate-pulse">
          <img src="/Logos/Instagram_logo_2022.svg.webp" alt="icon" className="w-6 h-6" />
        </div>
        {/* Top left (opposite) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 backdrop-blur-[6px] bg-white/10 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_12px_#d946ef80] animate-pulse">
          <img src="/Logos/Snapchat-Logo.wine.svg" alt="icon" className="w-10 h-10" />
        </div>
      </motion.div>
    </div>

    {/* Mockup Aura Glow */}
    <div className="absolute z-40 w-[320px] h-[320px] rounded-full bg-green-500 blur-3xl top-[75%] -translate-y-1/2 opacity-65"></div>

    {/* Phone Mockup */}
    <motion.img 
      drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}

   whileHover={{ scale: 1.05 , cursor:"grab"}}
   
      src="/Gemini_Generated_Image_m2hmlem2hmlem2hm-Photoroom.png"
      alt="Phone UI"
      className="  absolute z-50 w-[260px] md:w-[400px] top-[70%] -translate-y-1/2 right-25"
    />
  </div>
</div>




      </div>
    </div>
  );
}

export default Contactus;
