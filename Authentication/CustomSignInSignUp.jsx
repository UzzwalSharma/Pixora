import React, { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// --- Figma-style background and floating particles ---
function GradientBackground({ children }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      {/* Main Pixora greenish & dark gradient with white radial highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            // Darker Pixora gradient + white radial highlight + emerald radial at bottom left
            "linear-gradient(120deg, #0a3320 0%, #0d3a32 40%, #02130a 80%, #010a05 100%), " +
            "radial-gradient(ellipse at 60% 30%, rgba(255,255,255,0.15) 0%, rgba(16,185,129,0.11) 40%, transparent 80%), " +
            "radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.06) 60%, transparent 100%)",
          backgroundBlendMode: "overlay, lighten, normal",
        }}
      />
      {/* Premium floating geometric particles */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="absolute left-[8%] top-[18%] z-0"
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 20 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <rect x="10" y="10" width="100" height="100" rx="28" fill="#059669" fillOpacity="0.13" />
        <circle cx="60" cy="60" r="32" fill="#22d3ee" fillOpacity="0.10" />
      </motion.svg>
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        className="absolute right-[10%] top-[35%] z-0"
        initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
        animate={{ opacity: 0.6, scale: 1, rotate: -15 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <polygon points="40,10 70,70 10,70" fill="#a7f3d0" fillOpacity="0.10" />
        <circle cx="40" cy="50" r="18" fill="#059669" fillOpacity="0.08" />
      </motion.svg>
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        className="absolute left-[20%] bottom-[10%] z-0"
        initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
        animate={{ opacity: 0.5, scale: 1, rotate: 10 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <rect x="20" y="20" width="60" height="60" rx="18" fill="#22d3ee" fillOpacity="0.09" />
        <ellipse cx="50" cy="50" rx="28" ry="18" fill="#059669" fillOpacity="0.07" />
      </motion.svg>
      {/* Subtle premium sparkle */}
      <motion.svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        className="absolute right-[18%] bottom-[18%] z-0"
        initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
        animate={{ opacity: 0.3, scale: 1, rotate: 30 }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <circle cx="30" cy="30" r="12" fill="#fff" fillOpacity="0.08" />
        <rect x="15" y="15" width="30" height="30" rx="10" fill="#bef264" fillOpacity="0.06" />
      </motion.svg>
      {children}
    </div>
  );
}

// Add this helper component above your main export:
function NoiseBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 mix-blend-soft-light">
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="5"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#noiseFilter)"
          opacity="0.22" // Increased opacity for stronger effect
        />
      </svg>
    </div>
  );
}

export default function CustomSignInSignUp({ isSignUp = false }) {
  const signInObj = useSignIn();
  const signUpObj = useSignUp();
  const navigate = useNavigate();
  const [mode, setMode] = useState(isSignUp ? "signup" : "signin");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // "email" or "magiclink"

  // Social Auth Handler
  const handleSocialAuth = async (provider) => {
    setErrors([]);
    setLoading(true);
    try {
      const params = {
        strategy: provider,
        redirectUrl: "/",
        redirectUrlComplete: window.location.origin + "/"
      };
      if (mode === "signin") {
        await signInObj.signIn.authenticateWithRedirect(params);
      } else {
        await signUpObj.signUp.authenticateWithRedirect(params);
      }
    } catch (err) {
      setErrors([{ longMessage: "Social authentication failed." }]);
    } finally {
      setLoading(false);
    }
  };

  // Email magic link flow
  const handleEmail = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      if (mode === "signin") {
        if (!signInObj.isLoaded) return;
        const signInAttempt = await signInObj.signIn.create({ identifier: email });
        const emailId = signInAttempt.supportedFirstFactors.find(
          (f) => f.strategy === "email_link"
        )?.emailAddressId;
        await signInObj.signIn.prepareFirstFactor({
          strategy: "email_link",
          emailAddressId: emailId,
          redirectUrl: window.location.origin + "/",
        });
        setStep("magiclink");
        toast.info("Magic link sent to your email.");
      } else {
        if (!signUpObj.isLoaded) return;
        const signUpAttempt = await signUpObj.signUp.create({ emailAddress: email });
        const emailId = signUpAttempt.emailAddressId;
        await signUpObj.signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          emailAddressId: emailId,
          redirectUrl: window.location.origin + "/",
        });
        setStep("magiclink");
        toast.info("Magic link sent to your email.");
      }
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      else setErrors([{ longMessage: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-stretch relative overflow-hidden">
      <GradientBackground />
      <NoiseBackground />
      {/* Left Side: Hero */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 px-16 relative z-10">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-bold text-white leading-tight drop-shadow">
          Be the Part of India's First Ever Vibe coded Platform- <span className="text-emerald-400">Pixora</span> 
          </h1>
      <p className="text-xl text-white/80 max-w-lg">
  AI-powered design, real-time teamwork, and a community that grows with you.<br />
  <span className="text-emerald-300 font-semibold">Let your ideas shine.</span>
</p>

          {/* Follow Us section with multiple social icons */}
          <div className="mt-6 flex items-center gap-3 bg-white/10 border border-emerald-700 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">

           <div className="text-white font-semibold text-base">
      Follow us on <span className="text-emerald-300">socials</span>
    </div>
  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/ujjwal-sharma-3a1395279/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
    title="LinkedIn"
  >
    <img
      src="/Logos/icons8-linkedin-48.png"
      alt="LinkedIn"
      className="w-7 h-7"
    />
  </a>
  {/* Instagram */}
  <a
    href="https://www.instagram.com/ujjwalsharma.jsx/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
    title="Instagram"
  >
    <img
      src="/Logos/Instagram_logo_2022.svg.webp"
      alt="Instagram"
      className="w-7 h-7"
    />
  </a>
  {/* X (Twitter) */}
  <a
    href="https://x.com/SharmaUjjw10149"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
    title="X"
  >
    <img
      src="/Logos/icons8-twitter-50.png"
      alt="X"
      className="w-7 h-7"
    />
  </a>
  {/* YouTube */}
  <a
    href="https://www.youtube.com/@UjjwalSharma.861"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
    title="YouTube"
  >
    <img
      src="/Logos/icons8-youtube-48.png"
      alt="YouTube"
      className="w-7 h-7"
    />
  </a>
  
   
 
  
</div>
        </motion.div>
      </div>
      {/* Right Side: Auth Card */}
      <div className="flex flex-1 items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-md shadow-2xl"
        >
          {/* Toggle Sign In / Sign Up */}
          <div className="flex bg-white/10 rounded-2xl p-1 mb-8">
            <button
              onClick={() => {
                setMode("signin");
                setErrors([]);
                setEmail("");
                setStep("email");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                mode === "signin"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setErrors([]);
                setEmail("");
                setStep("email");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                mode === "signup"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#059669" />
                <path
                  d="M8 13l2.5 2.5L16 10"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-white/70">
              {mode === "signin"
                ? "Sign in to continue to Pixora"
                : "Join us and start your adventure"}
            </p>
          </div>
          <div className="mb-8">
            {/* Social Auth Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => handleSocialAuth("oauth_google")}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/80 text-[#3c4043] font-semibold shadow hover:bg-emerald-100 transition border border-gray-200 min-w-[140px]"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/Logos/icons8-google-48.png"
                  alt="Google"
                  className="w-5 h-5"
                  style={{ display: "inline-block" }}
                />
                <span className="ml-1">Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth("oauth_github")}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#24292f] text-white font-semibold shadow hover:bg-[#1b1f23] transition border border-[#24292f] min-w-[140px]"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/Logos/github-logo.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                  style={{ display: "inline-block" }}
                />
                <span className="ml-1">GitHub</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-emerald-900/60" />
            <span className="text-emerald-300 text-xs">or continue with email</span>
            <div className="flex-grow h-px bg-emerald-900/60" />
          </div>

          {/* Email/Magic Link Auth */}
          {step === "email" ? (
            <form onSubmit={handleEmail} className="space-y-6">
              <div>
                <label className="block text-emerald-300 mb-1 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                />
              </div>
              {errors && errors.length > 0 && (
                <div className="text-red-400 text-sm text-center">
                  {errors.map((el, idx) => (
                    <div key={idx}>{el.longMessage}</div>
                  ))}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold shadow-lg hover:from-emerald-500 hover:to-cyan-500 transition-all flex items-center justify-center"
                style={{ cursor: "pointer" }}
              >
                {loading ? (
                  <>
                    <ClipLoader size={22} color="#059669" className="mr-2" />
                    Please wait...
                  </>
                ) : mode === "signin" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="text-emerald-200 text-lg font-semibold">
                Check your email
              </div>
              <div className="text-white/80">
                Use the verification link sent to{" "}
                <span className="font-bold">{email}</span>
              </div>
              <button
                type="button"
                className="text-emerald-300 hover:text-cyan-400 font-semibold text-sm mt-2"
                onClick={() => {
                  setStep("email");
                  setEmail("");
                  setErrors([]);
                }}
              >
                Use another method
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}