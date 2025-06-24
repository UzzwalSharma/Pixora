import { useEffect, useState } from "react";
import { AlertCircle, Home, UserPlus, RefreshCw } from "lucide-react";

export default function AccountNotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignUp = () => {
    // Replace with your actual navigation logic
    window.location.href = "/signup";
  };

  const handleHome = () => {
    // Replace with your actual navigation logic
    window.location.href = "/";
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className={`max-w-4xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Error message */}
          <div className="text-center md:text-left space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <span className="text-6xl font-bold text-gray-800">404</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Account Not Found
              </h1>
              
              <div className="space-y-3 text-gray-600">
                <p className="text-lg">
                  Oops! Your account doesn't exist in our system.
                </p>
                <p className="text-base">
                  It looks like you may have tried to sign in instead of signing up. 
                  Don't worry, it happens to the best of us!
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleSignUp}
                className="cursor-pointer flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200  hover:transform hover:scale-[1.05]"
              >
                <UserPlus className="w-5 h-5" />
                <span>Sign Up Instead</span>
              </button>
              
             
              
              <button
                onClick={handleHome}
                className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 transform hover:scale-[1.05] hover:bg-gray-200" 
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>

          {/* Right side - Meme card */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Floating animation */}
              <div >
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Meme image placeholder */}
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl h-48 flex items-center justify-center mb-4 relative overflow-contain">
                  <img src="/error.png" alt="" srcset="" />
                    
                    
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full opacity-30"></div>
                    <div className="absolute bottom-3 left-3 w-2 h-2 bg-white rounded-full opacity-50"></div>
                  </div>
                  
                  {/* Meme text */}
                  <div className="text-center space-y-2 relative top-8">
                    <p className="font-bold text-gray-800 text-lg">
                      "I tried to sign in..."
                    </p>
                    <p className="text-gray-600 text-sm">
                      "But I never signed up"
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mt-3">
                      <span>😅</span>
                      <span>Classic mistake</span>
                      <span>😅</span>
                    </div>
                  </div>
                  
                  {/* Card footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Error 404</span>
                    
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around the card */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-pulse delay-700"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-yellow-400 rounded-full opacity-25 animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom message */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Don't worry, creating an account is quick and easy! 🚀</p>
        </div>
      </div>
    </div>
  );
}