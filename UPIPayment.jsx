import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "/convex/_generated/api.js";
import { toast } from "sonner";

const UPIPayment = () => {
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const selectedPlan = location.state?.plan || "Pro";
  const addTokens = useMutation(api.workspace.addTokens);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoaded || !user) {
    return <div className="text-white text-center mt-10">Loading user...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xyzjnoaq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const tokenAmount = selectedPlan === "Premium" ? 10 : 20;
        await addTokens({ clerkId: user.id, amount: tokenAmount });
        toast.success("Submission received! Tokens will be added shortly.");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 relative">
      <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 z-0" />

      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-gray-700 w-full max-w-md z-10 shadow-lg">
        <h2 className="text-3xl font-bold mb-3 text-center text-white drop-shadow">
          UPI Payment for <span className="text-green-400">{selectedPlan}</span> Plan
        </h2>

        <img
          src="/upi.jpg"
          alt="UPI QR Code"
          className="w-64 h-64 rounded-xl border-4 border-emerald-500 shadow mx-auto my-6"
        />

        <p className="text-center text-gray-300 mb-6">
          Scan the QR code and pay exactly:
          <br />
          <span className="text-lg font-semibold text-green-400">
            ₹{selectedPlan === "Premium" ? "299" : "50"}
          </span>
        </p>

        <p className="text-sm text-yellow-300 bg-yellow-900/20 border border-yellow-500 rounded-md p-3 mb-4">
          <strong>Note:</strong> Please pay before submitting. We’ll verify manually within a few hours.
          <br />
          If your payment doesn’t reflect, your tokens will not be credited.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="Plan" value={selectedPlan} />
          <input type="hidden" name="Clerk ID" value={user.id} />
          <input
            type="hidden"
            name="Email"
            value={user.primaryEmailAddress?.emailAddress || "N/A"}
          />

          <label className="text-sm font-medium text-gray-300">
            Full Name
            <input
              type="text"
              name="Full Name"
              required
              className="mt-1 block w-full text-white bg-black border border-emerald-500 rounded-md p-2"
            />
          </label>

          <label className="text-sm font-medium text-gray-300">
            UPI ID
            <input
              type="text"
              name="UPI ID"
              required
              placeholder="example@upi"
              className="mt-1 block w-full text-white bg-black border border-emerald-500 rounded-md p-2"
            />
          </label>

          <label className="text-sm font-medium text-gray-300">
            Phone Number
            <input
              type="tel"
              name="Phone Number"
              required
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              className="mt-1 block w-full text-white bg-black border border-emerald-500 rounded-md p-2"
            />
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 rounded-md font-semibold shadow-lg transition-all ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            } text-white flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin w-5 h-5" /> Submitting...
              </>
            ) : (
              "Submit for Verification"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default UPIPayment;
