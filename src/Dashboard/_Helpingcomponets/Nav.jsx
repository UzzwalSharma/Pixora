import { UserButton } from "@clerk/clerk-react";
import { Sparkle } from "lucide-react";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "/convex/_generated/api.js";
import { Link } from "react-router-dom";
function Nav() {
  const { user } = useUser();
  const userData = useQuery(api.workspace.getUserByClerkId, {
    clerkId: user?.id,
  });

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 pr-7 sticky top-0 z-30   shadow-lg border-b border-gray-800">
      {/* Logo/Brand */}
      <Link to="/">
       <div className="flex items-center gap-3">
        <img
          src="/pixoranewlogo.jpg"
          alt="Pixora"
          className="h-16 w-16 rounded-full border-2 border-emerald-400 shadow"
        />
        <h2 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
          Pixora
        </h2>
      </div>
      </Link>
     

      {/* Actions */}
      <div className="flex items-center gap-6">
        {userData && (
          <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-400 text-emerald-300 rounded-full text-sm font-medium shadow-inner">
            💎 {userData.tokens} tokens left
          </div>
        )}

        <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-semibold shadow hover:from-emerald-500 hover:to-cyan-500 transition-all">
          <Sparkle className="w-5 h-5" />
          <Link to="/dashboard/subscription" className="flex items-center gap-2">
           <span>Upgrade</span>
          </Link>
         
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
  );
}

export default Nav;
