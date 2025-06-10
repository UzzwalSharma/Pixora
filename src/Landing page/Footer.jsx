import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black via-green-950 to-black text-white py-12 px-5 md:px-20 relative overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center space-x-3">
            <img src="pixoranewlogo.jpg" alt="Pixora Logo" className="h-16 w-16 rounded-2xl shadow-lg border-2 border-green-400" />
            <span className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Pixora
            </span>
          </div>
          <p className="text-green-300 mt-1 text-base font-medium tracking-wide">Sketch. Convert. Deploy.</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-green-200 text-base font-semibold">
          <li>
            <ScrollLink to="home" smooth={true} duration={500} className="hover:text-[#00ff99] transition-colors cursor-pointer">
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="reviews" smooth={true} duration={500} className="hover:text-[#00ff99] transition-colors cursor-pointer">
              Features
            </ScrollLink>
          </li>
          <li>
            <Link to="/Pricing" className="hover:text-[#00ff99] transition-colors cursor-pointer">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#00ff99] transition-colors cursor-pointer">
              Contact
            </Link>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <motion.a whileHover={{ scale: 1.2 }} href="https://x.com/SharmaUjjw10149" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-[#00ff99] transition-all text-2xl">
            <FaTwitter />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://www.linkedin.com/in/ujjwal-sharma-3a1395279" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-[#00ff99] transition-all text-2xl">
            <FaLinkedin />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://github.com/UzzwalSharma" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-[#00ff99] transition-all text-2xl">
            <FaGithub />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://www.instagram.com/ujjwalsharma.jsx/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-[#00ff99] transition-all text-2xl">
            <FaInstagram />
          </motion.a>
        </div>
      </div>

      {/* Futuristic Glowing Effect */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-green-400 via-[#00ff99] to-cyan-400 opacity-60 blur-sm"></div>

      {/* Copyright & Fun Shout-out */}
    
<div className="mt-10 flex flex-col items-center space-y-2">
  <p className="text-sm md:text-base font-semibold text-yellow-400">
   🇮🇳 Built for India with vision & innovation
  </p>
  <p className="text-green-300 text-xs">
    © {new Date().getFullYear()} Pixora. All rights reserved.
  </p>
  <p className="text-sm md:text-base text-center font-bold text-white">
    Built with <span className="text-[#00ff99]">❤️</span>, determination, and a lot of CTRL + Z by
    <span className="font-extrabold text-[#00ff99]"> Ujjwal Sharma</span>
  </p>
  <p className="text-xs text-green-400 text-center">
    If it works, it's magic. If it doesn't, blame Bhupendra Jogi!
  </p>
</div>

    </footer>
  );
};

export default Footer;
