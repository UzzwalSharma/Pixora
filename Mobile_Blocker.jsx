import React from "react";

const MobileBlocker = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center px-6 text-center">
<img src="https://media.makeameme.org/created/dude-seriously-43a85402df.jpg" alt="" srcset="" className="rounded-md"/>
      <h1 className="text-2xl font-extrabold mb-2">Bro... seriously? Coding on a phone? 🙃</h1>
      <p className="text-gray-300 max-w-xs text-sm">
        Pixora's vibe-coded experience is best enjoyed on a bigger screen.
        <br />
        <span className="text-pink-400 font-semibold">Take a laptop, at least. 🙃</span>
      </p>
    </div>
  );
};

export default MobileBlocker;
