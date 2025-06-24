import React from "react";
import { useUser } from "@clerk/clerk-react";



function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }

  const profileImageUrl =
    user.profileImageUrl || user.externalAccounts[0]?.imageUrl || "/default-profile.png";

  return (
   <div className="relative bg-gray-950 p-6 rounded-lg border-2 border-emerald-500 text-white shadow-xl 
                before:absolute before:-top-3 before:left-3 before:w-6 before:h-3 before:bg-gray-950 before:border-l-2 before:border-t-2 before:border-emerald-500
                after:absolute after:-top-3 after:right-3 after:w-6 after:h-3 after:bg-gray-950 after:border-r-2 after:border-t-2 after:border-emerald-500
                before:content-[''] after:content-['']
                ">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-sm font-medium text-emerald-400 tracking-wider uppercase mb-2">Your Pixora Profile</h1>
          <div className="w-12 h-px bg-emerald-500"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src={profileImageUrl}
                alt={user.firstName || "User"}
                className="w-48 h-48 rounded-sm object-cover border border-gray-800 shadow-lg"
              />
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-950"></div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Info */}
            <div className="space-y-3">
              <h2 className="text-3xl font-light text-white tracking-tight">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-400 font-mono text-sm">{user.email}</p>
              {user.username && (
                <p className="text-emerald-400 text-sm">@{user.username}</p>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-800"></div>

            {/* Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Account Created</h3>
                <p className="text-gray-300 font-mono text-sm">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Last Updated</h3>
                <p className="text-gray-300 font-mono text-sm">
                  {new Date(user.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;