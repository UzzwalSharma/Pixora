import React, { useState } from 'react';
import { Copy, ExternalLink, X, Check, Rocket, Globe } from 'lucide-react';

const DeploySuccessPopup = ({ 
  isOpen, 
  onClose, 
  deployUrl = "https://your-app.vercel.app", 
  isDarkMode = true,
  onCopySuccess,
  onOpenSite 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(deployUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (onCopySuccess) {
        onCopySuccess(deployUrl);
      }
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleOpenUrl = () => {
    window.open(deployUrl, '_blank');
    
    if (onOpenSite) {
      onOpenSite(deployUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className={`
        ${isDarkMode 
          ? 'bg-gray-900/95 border-gray-800' 
          : 'bg-white/95 border-gray-200'
        } 
        border backdrop-blur-xl rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden
      `}>
        
        {/* Subtle gradient overlay */}
       <div className="absolute -inset-1 z-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 via-emerald-500/10 to-cyan-400/10 blur-lg"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`
            cursor-pointer absolute top-6 right-6 p-1.5 rounded-lg transition-all duration-200 z-10
            ${isDarkMode 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }
          `}
        >
          <X size={18} />
        </button>

        <div className="relative p-8">
          <div className="flex items-center space-x-8">
            
            {/* Left side - Icon and main message */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                
                {/* Success indicator */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Deployment successful
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your application is now live and accessible worldwide
                </p>
              </div>

              {/* URL Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Live URL
                  </span>
                </div>
                
                <div className={`
                  ${isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-gray-50 border-gray-200'
                  } 
                  border rounded-xl p-4 flex items-center justify-between
                `}>
                  <div className={`
                    font-mono text-sm truncate pr-4
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                  `}>
                    {deployUrl}
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={handleCopyUrl}
                      className={`
                       cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 
                        flex items-center space-x-1.5
                        ${copied 
                          ? 'bg-emerald-500 text-white' 
                          : isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }
                      `}
                    >
                      {copied ? (
                        <>
                          <Check size={12} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleOpenUrl}
                      className="
                       cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 
                        bg-emerald-500 text-white hover:bg-emerald-600
                        flex items-center space-x-1.5
                      "
                    >
                      <ExternalLink size={12} />
                      <span>Visit</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`
                text-xs flex items-center justify-between
                ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
              `}>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Deployed via Pixora's Inbuilt Deployment Engine</span>
                </div>
                <span>Ready to share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploySuccessPopup;