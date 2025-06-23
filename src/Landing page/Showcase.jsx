import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"

function Showcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Rotate from 14deg to 0deg as user scrolls through the section
  const rotateX = useTransform(scrollYProgress, [0, 0.75], [15, 0])
  // Opacity from 0.5 to 1
  const opacity = useTransform(scrollYProgress, [0, 0.85], [0.5, 1])

  return (
    <div>
      <div className="w-full bg-black text-white bg-gradient-to-b from-black to-green-900 py-[72px] px-4 md:px-8 lg:px-16 xl:px-24 overflow-x-hidden" ref={containerRef}>
        <h2 className='text-center text-5xl font-bold tracking-tighter'>See Pixora in Action</h2>
        <div className='max-w-2xl mx-auto mt-8'>
          <p className='text-center text-white/70 text-xl mt-5'>
            Discover how Pixora transforms your ideas into fully functional websites in just a few clicks. Our intuitive platform streamlines every step, from design to deployment, so you can focus on what matters most—your vision.
          </p>
        </div>
        <motion.div
          style={{
            opacity:"1",
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
          className="mx-auto shadow-2xl"
        >
          <img
            src="/showcase.png"
            alt="pixora showcase"
            className="mt-14 rounded-2xl"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Showcase
