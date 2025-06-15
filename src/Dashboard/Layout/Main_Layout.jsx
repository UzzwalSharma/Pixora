import React, { useState } from 'react';
import Sidebar from '/src/Dashboard/_Components/Sidebar.jsx';
// import Chat from '/src/Dashboard/_Components/Chat.jsx';
import { Outlet } from 'react-router-dom';
import Nav from '../_Helpingcomponets/Nav';
import { SidebarOpenIcon, SidebarCloseIcon } from 'lucide-react';

function Main_Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-zinc-200 shadow-sm overflow-hidden transition-all duration-300 ${
          sidebarOpen ? 'w-[260px]' : 'w-0'
        }`}
      >
        {sidebarOpen && <Sidebar />}
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 min-h-screen overflow-hidden bg-black text-white">
        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 z-30 ">
          <Nav />
        </div>

        {/* Sidebar Toggle Button (placed BELOW navbar height) */}
      <div
  className="absolute top-24 left-4 z-40"
  onMouseEnter={() => setShowTooltip(true)}
  onMouseLeave={() => setShowTooltip(false)}
>
  <button
    onClick={() => setSidebarOpen((prev) => !prev)}
    className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full shadow-lg px-3 py-1 text-white hover:bg-white/20 transition"
  >
    {sidebarOpen ? <SidebarOpenIcon size={18} /> : <SidebarCloseIcon size={18} />}
  </button>

  {showTooltip && (
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-zinc-900/80 backdrop-blur-sm text-white text-xs rounded shadow-lg whitespace-nowrap">
      {sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
    </div>
  )}
</div>


        {/* Centered Chat with Padding from Navbar */}
        <div className="flex justify-center items-center h-full px-4 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Main_Layout;
