import { motion } from "framer-motion";
import { Phone, PhoneCall, PhoneCallIcon } from "lucide-react";
import { useState } from "react";

const SubscriptionPopup = ({ onClose, onVerify }) => {
  const [subscriptionCode, setSubscriptionCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const verifySubscription = () => {
    setLoading(true);
    setErrorMessage("");

    // Simulate a 3-second verification delay
    setTimeout(() => {
      if (subscriptionCode === "PIXORA123") {
        setErrorMessage("");
        onVerify();
      } else {
        setErrorMessage("❌ Invalid subscription code. Please verify and try again.");
      }
      setLoading(false);
    }, 3000);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(52, 211, 153, 0.1) 0%, transparent 50%), rgba(0, 0, 0, 0.7)'
      }}
    >
      <motion.div
        className="w-full max-w-4xl text-white rounded-3xl overflow-hidden flex relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse rounded-3xl"></div>
        
        {/* Glass reflection effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Left Side: Branding & Visual */}
        <div className="w-1/2 flex flex-col justify-center items-center p-16 relative">
          {/* Glass panel background */}
          <div className="absolute inset-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Pixora Logo/Brand */}
            <div className="mb-8 text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-2 drop-shadow-lg">
                PIXORA
              </div>
              <div className="text-green-400 text-sm font-medium tracking-wider drop-shadow-sm">
                EXPERT CONNECT
              </div>
            </div>

            {/* Expert Visual Element */}
            <div className="relative w-64 h-64 mb-6 flex">
              {/* Glass orb background */}
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"></div>
              
              <div className="absolute inset-0 rounded-full border-2 border-green-500/40 animate-spin-slow">
                <div className="absolute top-2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-green-400/50"></div>
              </div>
              <div className="absolute inset-4 rounded-full border border-green-400/30 animate-ping">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center ">
                <div className="text-green-400 drop-shadow-2xl">
                  <img src="/Expert.png" alt="" srcset="" className="rounded-[50%]" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-green-400 drop-shadow-sm">Connect with Experts</h3>
              <p className="text-gray-300 text-sm drop-shadow-sm">Get personalized guidance from web development professionals</p>
            </div>
          </div>
        </div>

        {/* Right Side: Code Input */}
        <div className="w-1/2 p-12 flex flex-col justify-center space-y-8 relative">
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.5 , color:"red"}}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Premium Required
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Connect with our expert developers for personalized guidance, code reviews, and custom solutions.
              </p>
            </div>

            {/* Code Input */}
            <div className="space-y-4">
              <div className="relative">
                  <input
                  type="text"
                  className="w-full px-6 py-4 bg-gray-900/50 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 text-lg font-mono tracking-wider transition-all duration-300"
                  placeholder="PREMIUM-ACCESS-CODE"
                  value={subscriptionCode}
                  onChange={(e) => setSubscriptionCode(e.target.value.toUpperCase())}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400">
                  🔐
                </div>
              </div>

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                >
                  <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={onClose}
                className="cursor-pointer flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors font-medium text-gray-300 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={verifySubscription}
                disabled={loading || !subscriptionCode.trim()}
                className="cursor-pointer flex-1 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-700 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/50 to-emerald-600/50 animate-pulse"></div>
                )}
                <div className="relative flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Connect</span>
                      <span className="text-lg">📞</span>
                    </>
                  )}
                </div>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                Premium subscribers get 24/7 expert support •{" "}
                <span className="text-green-400">Upgrade to Premium</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionPopup;