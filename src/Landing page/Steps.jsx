import React from 'react'
import { Rocket} from 'lucide-react';
import HorizontalTimeline from './Horizontaltimeline';
function Steps() {
  return (
    <div>
    <div className=" workflow relative bg-black text-white py-[72px] px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-tl from-[#00FF7F] via-[#111] to-black opacity-80" />

 <div className="relative z-10">
  <h1 className="text-5xl font-bold text-white mb-4">
            Your Future Website Starts{' '}
            <span className="inline-flex items-center">
              <Rocket className="w-8 h-8 mx-2" />
            </span>
            Here:
          </h1>
          <p className="text-2xl text-white/90 font-light">
            Strategic, Sleek, and Effective
          </p>
          <div>
            <HorizontalTimeline />
          </div>
          </div>
      </div>
    </div>
  )
}

export default Steps
