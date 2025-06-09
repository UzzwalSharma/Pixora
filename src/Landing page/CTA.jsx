import React from 'react'
import { motion } from 'framer-motion'

function CTA() {
  // Repeat enough items for seamless loop
  const items = Array.from({ length: 10 }).map((_, idx) => (
    <div key={idx} className="h-10 flex items-center gap-4">
     <a
      key={idx}
      href="https://pixora-s-frontend.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 flex items-center gap-4 cursor-pointer "
      style={{ cursor: 'pointer' , linkstyle: 'none' }}
    >
      <span className='text-lime-400'>&#10038;</span>
      <span>Try it for free</span>
    </a>
     
    </div>
  ))

  return (
    <div className='bg-black text-white'>
      <div className='overflow-x-clip p-4 flex'>
        <motion.div
          className="py-24 text-7xl flex gap-16 font-medium flex-none min-w-max"
          style={{ whiteSpace: 'nowrap' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear'
          }}
        >
        
          {items}
          {items}
        </motion.div>
      </div>
    </div>
  )
}

export default CTA
