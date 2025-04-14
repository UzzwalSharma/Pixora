import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as party from "party-js";
import { CheckCircle, ArrowLeft, Headphones } from "lucide-react";

const OrderSuccessModal = ({ onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fire burst effect once using party.js
    party.confetti(document.body, {
      count: 100,
      spread: 80,
      shapes: ["star", "square", "circle"],
    });

    // Stop the falling confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const goback = () => {
    navigate("/websiteorder");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {/* 🎊 Show falling confetti for 8 seconds */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          recycle={true}
          gravity={0.1}
        />
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative"
      >
        <img src="/Tick.gif" alt="Success" className="h-28 mx-auto mb-4" />

        <div className="flex items-center justify-center gap-2 text-[#00cc99]">
          <CheckCircle className="w-7 h-7" />
          <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-[0_0_10px_#00ffbf]">
            Order Confirmed!
          </h2>
        </div>

        <p className="text-gray-700 mt-4 text-base sm:text-lg leading-relaxed">
          Thank you for choosing <span className="font-semibold">Pixora</span>!
          <br />
          Your order has been successfully placed and a confirmation email has been sent to you.
        </p>

        <button
          className="mt-6 px-6 py-2 flex items-center justify-center gap-2 bg-[#00ffbf] text-white rounded-full font-semibold hover:bg-[#00d6a0] transition-all duration-300 shadow-md"
          onClick={goback}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <p className="text-sm mt-5 text-gray-500">
          Need help with your order?
          <br />
          <span
            onClick={() => navigate("/contact")}
            className="text-[#00cc99] font-medium underline cursor-pointer inline-flex items-center gap-1 mt-1"
          >
            <Headphones className="w-4 h-4" />
            Contact Support
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default OrderSuccessModal;
