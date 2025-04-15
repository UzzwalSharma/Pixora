import { CheckCircle, Clock, Sparkles, User, LayoutDashboard } from "lucide-react"
import { motion } from "framer-motion"

export default function PixoraTrackingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafffd] to-[#e0fff7] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-4"
          >
            <CheckCircle className="text-[#00c896] w-16 h-16" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Received 🎉</h1>
          <p className="text-gray-600 mb-6">
            Hey <strong>Ujjwal</strong>, thanks for choosing the <strong>Pixora</strong> Pro.
          </p>

          <img
            src="/boxing_15309679.gif"
            alt="Pixora Delivery"
            className="rounded-xl w-full max-w-sm mb-6 shadow-md"
          />

          <div className="text-left w-full max-w-md space-y-4">
            <div className="flex items-center">
              <User className="text-[#6366f1] mr-2" />
              <p className="text-sm text-gray-700">
                Assigned Designer: <strong>Setu from Team Pixora</strong>
              </p>
            </div>

            <div className="flex items-center">
              <Clock className="text-[#facc15] mr-2" />
              <p className="text-sm text-gray-700">
                Expected Delivery: <strong>within 48 hours</strong>
              </p>
            </div>

            <div className="flex items-center">
              <LayoutDashboard className="text-[#fb923c] mr-2" />
              <p className="text-sm text-gray-700">
                Deliverable: <strong>Pixora-generated UI + Tweaks</strong>
              </p>
            </div>

            <div className="flex items-center">
              <Sparkles className="text-[#38bdf8] mr-2" />
              <p className="text-sm text-gray-700">
                Status: <strong>In Progress</strong>
              </p>
            </div>

            <p className="text-sm text-gray-500 pt-4">
              Need help or changes? Message us on
              <a
                href="https://wa.me/7505696519"
                target="_blank"
                className="ml-1 text-[#25D366] font-medium"
              >
                WhatsApp
              </a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
