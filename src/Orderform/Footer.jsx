import React from 'react'
import { FaEnvelope, FaPhoneAlt, FaInstagram } from "react-icons/fa"
function Footer() {
  return (
    <div>
<footer className="bg-black border-t border-[#00ffbf]/20 text-gray-300 py-10 px-6 md:px-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* Brand with Logo */}
    <div>
      <div className="flex items-center gap-3">
        <img 
          src="/pixora pro logo.jpg" 
          alt="Pixora Logo" 
          className="w-12 h-12 rounded-full object-contain border border-[#00ffbf] shadow-[0_0_10px_#00ffbf]"
        />
        <h2 className="text-2xl font-bold text-[#00ffbf]">Pixora Pro</h2>
      </div>
      <p className="mt-3 text-sm text-gray-400">
        Turning your designs into fast, scalable, and modern full-stack websites.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-white">Quick Links</h3>
      <ul className="mt-2 space-y-2 text-sm">
        <li><a href="/#how-it-works" className="hover:text-[#00ffbf] transition">How It Works</a></li>
        <li><a href="/websiteorder" className="hover:text-[#00ffbf] transition">Order Form</a></li>
        <li><a href="/pricing" className="hover:text-[#00ffbf] transition">Pricing</a></li>
        <li><a href="/faq" className="hover:text-[#00ffbf] transition">FAQ</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
  <h3 className="text-lg font-semibold text-white">Contact Us</h3>
  <ul className="mt-4 space-y-3 text-sm">
    <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition-all">
      <FaEnvelope className="text-[#00ffbf]" />
      <a href="mailto:team@pixora.tech" className="hover:text-[#00ffbf]">
        team@pixora.tech
      </a>
    </li>
   
    <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition-all">
      <FaPhoneAlt className="text-[#00ffbf]" />
      <a href="tel:+919000000000" className="hover:text-[#00ffbf]">
        +91 90000 00000
      </a>
    </li>
    <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition-all">
      <FaInstagram className="text-[#00ffbf]" />
      <a
        href="https://instagram.com/pixora"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#00ffbf]"
      >
        @pixora
      </a>
    </li>
  </ul>
</div>

    {/* Newsletter or Feedback */}
    <div>
      <h3 className="text-lg font-semibold text-white">Stay in the Loop</h3>
      <p className="text-sm text-gray-400 mb-2">Get updates on new features and plans.</p>
      <form className="flex flex-col gap-2">
        <input 
          type="email" 
          placeholder="you@example.com"
          className="px-3 py-2 bg-gray-800 border border-[#00ffbf]/30 rounded-md text-white focus:outline-none"
        />
        <button 
          type="submit"
          className="shimmer-button  bg-[#00ffbf] text-red font-bolder py-2 rounded-md hover:bg-[#00ffc3]/80 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Pixora. All rights reserved.
    <br />
  Owned by <br />  <h3 className="text-lg font-semibold text-white">Ujjwal and Simran</h3>
  </div>
 
</footer>

    </div>
  )
}

export default Footer




