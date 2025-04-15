import React from 'react';
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black border-t border-[#00ffbf]/20 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Logo + Description */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/pixora pro logo.jpg"
              alt="Pixora Logo"
              className="w-12 h-12 rounded-full object-contain border border-[#00ffbf] shadow-[0_0_10px_#00ffbf]"
            />
            <h2 className="text-2xl font-bold text-[#00ffbf]">Pixora Pro</h2>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Turning your designs into fast, scalable, and modern full-stack websites.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#how-it-works" className="hover:text-[#00ffbf] transition">Privacy Policies</a></li>
            <li><a href="/websiteorder" className="hover:text-[#00ffbf] transition">Track your Order</a></li>
            <li><Link to="/pricing" className="hover:text-[#00ffbf] transition">Pricing</Link></li>
            <li><a href="/faq" className="hover:text-[#00ffbf] transition">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition">
              <FaEnvelope className="text-[#00ffbf]" />
              <a href="mailto:uzzwal7505@gmail.com" className="hover:text-[#00ffbf]">
                uzzwal7505@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition">
              <FaPhoneAlt className="text-[#00ffbf]" />
              <a href="tel:+917505696519" className="hover:text-[#00ffbf]">
                +91 7505696519
              </a>
            </li>
            <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition">
              <FaInstagram className="text-[#00ffbf]" />
              <a
                href="https://www.instagram.com/ujjwalsharma.jsx/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00ffbf]"
              >
                @pixoraInsta
              </a>
            </li>
            <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition">
              <FaYoutube className="text-[#00ffbf]" />
              <a
                href="https://www.youtube.com/@UjjwalSharma.861"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00ffbf]"
              >
                @pixoraYT
              </a>
            </li>
            <li className="flex items-center gap-3 border border-[#00ffbf]/30 px-3 py-2 rounded-md hover:border-[#00ffbf] transition">
              <FaTwitter className="text-[#00ffbf]" />
              <a
                href="https://x.com/SharmaUjjw10149"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00ffbf]"
              >
                @pixoraX
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter or Feedback */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Stay in the Loop</h3>
          <p className="text-sm text-gray-400 mb-4">Get updates on new features and plans.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-2 bg-gray-800 border border-[#00ffbf]/30 rounded-md text-white focus:outline-none focus:border-[#00ffbf]"
            />
            <button
              type="submit"

              className="text-3xl shimmer-button bg-[#00ffbf] text-white font-black py-2 rounded-md hover:bg-[#00ffc3]/90 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Pixora</span>. All rights reserved.
        <br />
       <br /> Made with heart and thoda sa Chatgpt
      </div>
    </footer>
  );
}

export default Footer;
