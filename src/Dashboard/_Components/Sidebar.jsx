import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserAlt, FaCrown, FaInfoCircle, FaLayerGroup, FaPalette } from "react-icons/fa";
import { DollarSignIcon, Heart } from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/dashboard", icon: <FaLayerGroup />, label: "Workspace" },
    { path: "/dashboard/designs", icon: <FaPalette />, label: "Pixora Designs" },
    { path: "/dashboard/profile", icon: <FaUserAlt />, label: "My Profile" },
    { path: "/dashboard/subscription", icon: <DollarSignIcon />, label: "Buy Tokens" },
    { path: "/dashboard/about", icon: <FaInfoCircle />, label: "About Pixora" },
  ];

  return (
    <div className="fixed h-full md:w-[20vw] bg-gradient-to-b from-slate-900 via-gray-900 to-black 
                    border-r border-emerald-500/20 backdrop-blur-2xl
                    shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col px-1">
      
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 animate-pulse"></div>
      
      {/* Header Section */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-6 px-6">
        {/* Logo with enhanced styling */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
          <img
            src="/pixoranewlogo.jpg"
            alt="Pixora"
            className="relative h-16 w-16 object-contain border-2 border-emerald-400/50 rounded-full 
                       shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]
                       transition-all duration-300 hover:scale-110"
          />
        </div>
        
        {/* Brand name with glow effect */}
        <h1 className="text-3xl font-black text-transparent bg-clip-text 
                       bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-300
                       drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] mb-2
                       hover:drop-shadow-[0_0_25px_rgba(16,185,129,1)] transition-all duration-300">
          PIXORA
        </h1>
        
        {/* Tagline */}
        <p className="text-xs font-medium text-emerald-200/80 tracking-[0.2em] uppercase mb-6 text-center">
          Dream • Build • Ship
        </p>
        
        {/* Divider with glow */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent 
                        shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
      </div>

      {/* Navigation Section */}
      <div className="relative z-10 flex-1 px-2 pb-8">
        <nav className="space-y-2">
          {navItems.map(({ path, icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`group relative flex items-center space-x-4 py-3 px-4 rounded-xl
                           transition-all duration-300 ease-out overflow-hidden
                           ${isActive 
                             ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                             : 'hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-green-500/10 hover:border hover:border-emerald-400/20'
                           }`}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-green-500 
                                  shadow-[0_0_10px_rgba(16,185,129,0.6)] rounded-r-full"></div>
                )}
                
                {/* Icon container */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300
                                ${isActive 
                                  ? 'text-emerald-300 bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                                  : 'text-emerald-400/70 group-hover:text-emerald-300 group-hover:bg-emerald-500/10'
                                }`}>
                  <span className="text-sm">{icon}</span>
                </div>
                
                {/* Label */}
                <span className={`font-semibold tracking-wide transition-all duration-300
                                ${isActive 
                                  ? 'text-white' 
                                  : 'text-emerald-100/80 group-hover:text-white'
                                }`}>
                  {label}
                </span>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom accent */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-emerald-500/10 rounded-full 
                           border border-emerald-500/20 backdrop-blur-sm">
              {/* <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div> */}
              <span className="flex gap-2 animate-pulse text-xs font-medium text-emerald-300/80 tracking-wide">Built with <Heart className='text-red-500 fill-red-400'/>By Ujjwal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 
                      bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-4 w-20 h-20 
                      bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </div>
  );
}

export default Sidebar;