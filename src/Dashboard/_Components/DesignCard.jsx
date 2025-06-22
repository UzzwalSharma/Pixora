import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const DesignCard = ({ design }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 relative group bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-green-500/30 shadow-2xl overflow-hidden transition-all duration-500 hover:border-green-400/60 hover:shadow-green-500/25 hover:shadow-2xl hover:-translate-y-2">
      
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gray-800/50 border-b border-green-500/20">
          <img
            src={design.imageUrl}
            alt="Design Preview"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-6 space-y-4">
        
        {/* Description */}
        <div className="space-y-2">
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
            {design.description}
          </p>
        </div>

        {/* Model Information */}
        {/* <div className="flex items-center justify-center py-2">
          <div className="text-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Model</span>
            <h4 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mt-1">
              {design.modelName}
            </h4>
          </div>
        </div> */}

        {/* Creator Information */}
        <div className="border-t border-green-500/20 pt-4">
          <div className="text-center space-y-1">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Created by</p>
            <p className="text-green-400 font-semibold text-sm hover:text-green-300 transition-colors duration-200">
              {design.userName}
            </p>
            {/* Uncomment if you want to show the date */}
            {/* <p className="text-gray-500 text-xs">
              {format(new Date(design.timestamp), "MMM dd, yyyy")}
            </p> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          
          {/* View Design Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Navigating to:", `/generated-code/${design._id}`);
              navigate(`/generated-code/${design._id}`);
            }}
            className="cursor-pointer w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Design
            </span>
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Chat Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Starting chat with:", design.userName);
              // navigate(`/chat/${design.userName || design.userId}`);
              navigate(`/chat`);
            }}
            className="cursor-pointer w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Chat with Creator</span>
              <span className="text-lg">💬</span>
            </span>
          </button>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-green-400/0 group-hover:border-green-400/40 transition-all duration-500 pointer-events-none"></div>
      
      {/* Corner accent */}
      <div className="pointer-events-none absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default DesignCard;