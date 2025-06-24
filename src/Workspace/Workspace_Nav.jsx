import { UserButton } from '@clerk/clerk-react'
import { MessageSquare, X } from 'lucide-react'
import React, { useState } from 'react'

function Nav() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')

  const getEmoji = (level) => {
    const emojis = ['😞', '😕', '😐', '😊', '😄', '🤩', '💫', '✨', '🌟', '🚀']
    return emojis[level - 1] || '😊'
  }

  return (
    <>
      <nav className="w-full flex items-center justify-between px-8 py-4 pr-7 sticky top-0 z-30">
        <div
          className="flex items-center gap-3 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
          onClick={() => window.location.href = '/'}
        >
          <img
            src="/pixoranewlogo.jpg"
            alt="Pixora"
            className="h-16 w-16 rounded-full border-2 border-emerald-400 shadow"
          />
          <h2 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
            Pixora
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-semibold shadow hover:from-emerald-500 hover:to-cyan-500 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span className='cursor-pointer'>Give Feedback</span>
          </button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "ring-2 ring-emerald-400",
              },
            }}
          />
        </div>
      </nav>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
            <div className="flex h-[600px]">
              {/* Left Side - Image */}
              <div className="w-1/2 bg-gradient-to-br from-emerald-50 to-cyan-50 flex flex-col items-center justify-center p-12">
                <img
                  src="/pixoranewlogo.jpg"
                  alt="Pixora"
                  className="h-24 w-24 rounded-full mb-6 shadow-lg"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Thoughts</h2>
                <p className="text-gray-600 text-center leading-relaxed">
                  Your feedback helps us create better experiences. We'd love to hear from you.
                </p>
                <div className="mt-8 text-6xl animate-pulse">
                  {getEmoji(rating)}
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-1/2 p-12 relative">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                <form
                  action="https://formspree.io/f/xanqdaok" // Replace with your actual Formspree ID
                  method="POST"
                  className="space-y-8 mt-8"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      How much do you like the Generated outputs?
                    </h3>

                    {/* Slider Section */}
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">{getEmoji(rating)}</div>
                      <input type="hidden" name="rating" value={rating} />
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                            (rating - 1) * 11.11
                          }%, #e5e7eb ${(rating - 1) * 11.11}%, #e5e7eb 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Not great</span>
                        <span className="font-medium text-emerald-600">{rating}/10</span>
                        <span>Amazing!</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tell us more (optional)
                    </label>
                    <textarea
                      name="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border text-black rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none transition-all"
                      placeholder="What's on your mind? Any suggestions or thoughts you'd like to share..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-500 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl "
                  >
                    Send Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </>
  )
}

export default Nav
