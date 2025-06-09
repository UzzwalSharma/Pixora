import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: "Do I need coding experience to use Pixora?",
    answer: "No coding experience is required. Pixora is designed for both beginners and professionals, allowing anyone to turn designs into code effortlessly."
  },
 
  {
    question: "How it is different from other AI code generators?",
    answer: "Pixora stands out with its ability to handle complex designs with 98% accuracy, and support for multiple frameworks like React and Tailwind CSS, Next.js, and more."
  },
  {
    question: "What if i get stucked somewhere?",
    answer: "Don't worry we have a team of experts ready to assist you . you can reach out to us directly via video call or chat for immediate support."
  },
 
  {
    question: "Can I export the code to my own GitHub repository?",
    answer: "Yes, Pixora allows you to export your code directly to GitHub or download it as a ZIP file."
  },
  {
    question: "Does Pixora support responsive design?",
    answer: "Absolutely! Pixora generates responsive code so your website looks great on all devices."
  },
//   {
//     question: "Is there a free trial available?",
//     answer: "Yes, you can try Pixora for free with limited features before choosing a subscription plan."
//   },
  
];

function Questions() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = idx => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div>
      <div className="container bg-black text-white">
        <div className="text-2xl font-bold flex items-center justify-center gap-2">
          <div className="inline-block border-2 mt-12 border-lime-400 rounded-full px-3 py-1 bg-green-100 text-lime-600 items-center uppercase ">
            <span className="text-sm relative bottom-1 right-1">★</span>
            <span>FAQs</span>
          </div>
        </div>

        <h2 className='text-6xl font-medium mt-6 mb-4 text-center'>
          Question's? We have got <span className="text-[#00ff99]">Answers</span>
        </h2>

        <div className='flex flex-col gap-6 p-6 md:p-8'>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              layout
              transition={{ layout: { duration: 0.4, type: "spring" } }}
              className={`
                group relative overflow-hidden
                rounded-2xl border border-green-700/20
                bg-gradient-to-br from-black/80 to-green-900/30
                shadow-lg hover:shadow-2xl transition-all
                cursor-pointer
                ${openIdx === idx ? "ring-2 ring-[#00ff99]/40" : ""}
              `}
              onClick={() => toggle(idx)}
            >
              <div className="flex items-center justify-between gap-2 px-4 py-4">
                <h3 className="font-semibold text-xl text-white group-hover:text-[#00ff99] transition-colors">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center rounded-full border border-green-400 bg-black/60 w-8 h-8"
                >
                  <svg
                    className="w-5 h-5 text-[#00ff99]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-lg text-white/80">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Questions
