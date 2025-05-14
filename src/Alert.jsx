import { useState } from "react";


export default function PixoraAlertBanner() {
 

 

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-300 shadow-md px-4 py-3">
      <div className="max-w-5xl mx-auto flex justify-center items-center relative cursor-pointer">
        <p className="text-sm text-gray-800 font-medium text-center">
          <span className="font-semibold">Pixora is currently under maintenance.</span> <span></span>
           We apologize for the inconvenience and appreciate your patience.
        </p>
       
      </div>
    </div>
  );
}
