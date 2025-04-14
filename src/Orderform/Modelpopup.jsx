import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const NeonSubscriptionModal = ({ showModal, selectedPlan, onClose, onVerify }) => {
  const [subscriptionCode, setSubscriptionCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const handleSubmit = () => {
    setLoading(true);
    setCodeError("");
  
    setTimeout(() => {
      if (subscriptionCode === "PIXORA123") {
        setCodeError("");
        onClose();
        const userEmail = "uzzwal7505@gmail.com";  // Replace with dynamic email
        const userName = "Setu";  // Replace with dynamic name
        onVerify(userEmail, userName);  // Pass email and name to onVerify
        navigate("/OrderSuccess");
      } else {
        setCodeError("❌ Invalid code. Please try again.");
      }
      setLoading(false);
    }, 3000);
  };

  if (!showModal) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-4xl bg-transparent text-white rounded-xl shadow-2xl overflow-hidden flex"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Left Section: Background/Graphic */}
        <div className="w-1/2 h-full bg-cover bg-center rounded-l-xl" >
        <img src="/safe.gif" alt="" srcset="" />
          {/* You can replace the URL above with an image or use an icon */}
        </div>

        {/* Right Section: Modal Content */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-opacity-70 backdrop-blur-lg rounded-r-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-[#00ffbf] text-center drop-shadow">
            🚀 You’ve chosen the <span className="text-yellow-300">{selectedPlan}</span> Plan
          </h2>

          <p className="text-center mb-4 text-gray-300">
            Please enter your subscription code to continue:
          </p>

          <input
            type="text"
            value={subscriptionCode}
            onChange={(e) => setSubscriptionCode(e.target.value)}
            placeholder="Enter code"
            className="w-full p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf] text-white placeholder-white/60 mb-3"
          />

          {codeError && <p className="text-red-500 text-sm mb-3">{codeError}</p>}

          <div className="flex justify-end gap-4 mt-4">
            <motion.button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-[#00ffbf] text-white font-semibold rounded-lg hover:bg-[#00ffbf]/80 transition"
              whileHover={{ scale: 1.05 }}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify & Submit"
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NeonSubscriptionModal;
