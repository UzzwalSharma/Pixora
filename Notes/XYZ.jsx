import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useMessages } from "./MessagesContext"; 
import { generateCodeResponse } from "/Ai models/Chat_Open_router";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from "@codesandbox/sandpack-react";
import {
  Moon,
  Sun,
  RotateCcw,
  Github,
  Rocket,
  Phone,
  Type,
  Plus,
  Minus,
  Download,
  Copy,
  Check,
  FileText,
  Archive,
  Sparkles,
  Zap,
  Code2,
  Loader2
} from "lucide-react";

// Constants
const THEME_COLORS = {
  dark: {
    surface1: "#0f1419",
    surface2: "#1a1f29",
    surface3: "#242b38",
    disabled: "#4a5568",
    base: "#e2e8f0",
    clickable: "#10b981",
    hover: "#059669",
    accent: "#34d399",
    error: "#ef4444",
    errorSurface: "#3f1f1f",
    warning: "#f59e0b",
    warningSurface: "#3f2f1f"
  },
  light: {
    surface1: "#fefefe",
    surface2: "#f8fafc",
    surface3: "#f1f5f9",
    disabled: "#64748b",
    base: "#1e293b",
    clickable: "#10b981",
    hover: "#059669",
    accent: "#34d399",
    error: "#ef4444",
    errorSurface: "#fef2f2",
    warning: "#f59e0b",
    warningSurface: "#fffbeb"
  }
};

const SYNTAX_COLORS = {
  plain: (isDark) => isDark ? "#e2e8f0" : "#1e293b",
  comment: {
    color: (isDark) => isDark ? "#8892b0" : "#64748b",
    fontStyle: "italic"
  },
  keyword: "#10b981",
  tag: "#34d399",
  punctuation: (isDark) => isDark ? "#cbd5e1" : "#475569",
  definition: "#f59e0b",
  property: "#06b6d4",
  static: "#a855f7",
  string: "#22d3ee"
};

// Generating Overlay Component

function GeneratingOverlay({ isVisible, progress = 0 }) {
  const [dots, setDots] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing requirements...",
    "Setting up project structure...",
    "Generating components...",
    "Optimizing code...",
    "Finalizing output..."
  ];

  useEffect(() => {
    if (!isVisible) return;

    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stepInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-md rounded-b-2xl border-t border-white/10">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center max-w-md bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          {/* Main icon */}
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-2xl animate-pulse shadow-lg" />
            <div className="absolute inset-1 bg-slate-800 rounded-xl flex items-center justify-center shadow-inner">
              <Code2 className="w-8 h-8 text-emerald-300" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-2">
            Generating your code...
          </h3>

          {/* Current step */}
          <p className="text-sm text-slate-300 mb-5 min-h-[1.5rem] font-mono tracking-wide">
            {steps[currentStep]}{dots}
          </p>

          {/* Progress info */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6 shadow-inner overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Animated dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Pro tip */}
          <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-left">
            <div className="flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-200 leading-snug">
                <span className="font-medium text-white">Pro tip:</span> Pixora AI is generating clean, production-ready code tailored to your prompt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// Export Actions Component
function EditorActions() {
  const { sandpack } = useSandpack();
  const [copied, setCopied] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const copyToClipboard = useCallback(async (text, successMessage = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Failed to copy to clipboard');
      return false;
    }
  }, []);

  const handleCopyCode = useCallback(async () => {
    const activeFile = sandpack.activeFile;
    const fileContent = sandpack.files[activeFile]?.code || '';
    await copyToClipboard(fileContent);
  }, [sandpack.activeFile, sandpack.files, copyToClipboard]);

  const handleCopyAllFiles = useCallback(async () => {
    const allContent = Object.entries(sandpack.files)
      .filter(([, file]) => file.code)
      .map(([filename, file]) => `// ${filename}\n${'='.repeat(50)}\n${file.code}`)
      .join('\n\n');
    
    if (await copyToClipboard(allContent)) {
      setShowExportMenu(false);
    }
  }, [sandpack.files, copyToClipboard]);

  const downloadFile = useCallback((filename, content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleExportCurrentFile = useCallback(() => {
    const activeFile = sandpack.activeFile;
    const fileContent = sandpack.files[activeFile]?.code || '';
    const fileName = activeFile.split('/').pop() || 'code.txt';
    downloadFile(fileName, fileContent);
    setShowExportMenu(false);
  }, [sandpack.activeFile, sandpack.files, downloadFile]);

  const handleExportAllFiles = useCallback(() => {
    Object.entries(sandpack.files).forEach(([filename, file]) => {
      if (!file.code) return;
      const fileName = filename.split('/').pop() || 'file.txt';
      downloadFile(fileName, file.code);
    });
    setShowExportMenu(false);
  }, [sandpack.files, downloadFile]);

  const handleExportAsZip = useCallback(async () => {
    try {
      const JSZip = (await import('https://cdn.skypack.dev/jszip')).default;
      const zip = new JSZip();
        
      Object.entries(sandpack.files).forEach(([filename, file]) => {
        if (file.code !== undefined) {
          const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
          zip.file(cleanFilename, file.code);
        }
      });
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pixora-project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowExportMenu(false);
    } catch (err) {
      console.error('ZIP export failed:', err);
      alert('Failed to export as ZIP file');
    }
  }, [sandpack.files]);

  const exportMenuItems = [
    {
      section: "Copy to Clipboard",
      items: [
        { label: "Copy Current File", icon: Copy, action: handleCopyCode },
        { label: "Copy All Files", icon: FileText, action: handleCopyAllFiles }
      ]
    },
    {
      section: "Download Files",
      items: [
        { label: "Download Current File", icon: Download, action: handleExportCurrentFile },
        { label: "Download All Files", icon: Archive, action: handleExportAllFiles },
        { label: "Download as ZIP", icon: Archive, action: handleExportAsZip }
      ]
    }
  ];

  return (
    <>
      <button
        onClick={handleCopyCode}
        className="p-2 rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl"
        title="Copy Current File"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

      <div className="relative">
        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="p-2 rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl"
          title="Export Files"
        >
          <Download size={18} />
        </button>
        
        {showExportMenu && (
          <>
            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border-slate-700 border rounded-xl shadow-xl z-50">
              <div className="py-2">
                {exportMenuItems.map((section, sectionIndex) => (
                  <div key={section.section}>
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      {section.section}
                    </div>
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={item.action}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-2"
                      >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                    {sectionIndex < exportMenuItems.length - 1 && (
                      <div className="border-t border-slate-700 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowExportMenu(false)}
            />
          </>
        )}
      </div>
    </>
  );
}

// Main Pixora Editor Component
function Pixora_Editor() {
  const [activeTab, setActiveTab] = useState("code");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fontSize, setFontSize] = useState(14);
  const [showDeployMenu, setShowDeployMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [files, setFiles] = useState({
    "/src/index.css": {
      code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`
    },
    "/tailwind.config.js": {
      code: `module.exports = {\n  content: [\n    "./src/**/*.{js,jsx,ts,tsx}",\n    "./public/index.html",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`
    },
    "/postcss.config.js": {
      code: `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}`
    },
    "/App.js": {
      active: true,
      code: `export default function App() {\n  return (\n    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">\n      <div className="max-w-4xl mx-auto">\n        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">\n          Welcome to Pixora\n        </h1>\n        <div className="bg-white rounded-xl shadow-lg p-8">\n          <p className="text-gray-600 text-lg leading-relaxed">\n            Start building your amazing project here! This editor comes with \n            TailwindCSS, modern React features, and all the tools you need.\n          </p>\n          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg">\n            <p className="text-white font-medium">\n              ✨ Ready to code? Edit this file to see live changes!\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}`
    }
  });


  const { messages, addMessage, isTyping, setIsTyping } = useMessages();
  const progressIntervalRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle new messages
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "user") {
      console.log("🛠️ New user message:", lastMessage.content);
      generateCode(lastMessage.content);
    }
  }, [messages.length]);

  // Simulate progress during generation
  const simulateProgress = useCallback(() => {
    setGenerationProgress(0);
    let progress = 0;
    
    progressIntervalRef.current = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 95) {
        progress = 95;
        clearInterval(progressIntervalRef.current);
      }
      setGenerationProgress(progress);
    }, 200);
  }, []);

 const generateCode = useCallback(async (userPrompt) => {
  setIsGenerating(true);
  setIsTyping(true);
  simulateProgress();

  try {
    const aiModelId = "microsoft/mai-ds-r1:free";
    const response = await generateCodeResponse(userPrompt, aiModelId);
    
    console.log("🧠 AI Response:", response);
    
    // Parse and inject the generated code
    if (response?.generatedCode) {
      let parsed;
      try {
        parsed = JSON.parse(response.generatedCode);
        console.log(parsed);
      } catch (err) {
        console.error("Failed to parse generatedCode:", err);
        return;
      }

      const responseFiles = parsed.files;
      if (responseFiles && typeof responseFiles === "object") {
        // Merge existing files with generated files
        setFiles(prevFiles => {
          const mergedFiles = { ...prevFiles };
          
          // Reset all active states first
          Object.keys(mergedFiles).forEach(path => {
            mergedFiles[path] = {
              ...mergedFiles[path],
              active: false
            };
          });
          
          // Add or update with generated files
          Object.entries(responseFiles).forEach(([path, fileData]) => {
            mergedFiles[path] = {
              code: fileData.code,
              active: path === "/App.js", // Set App.js as active
            };
          });
          
          return mergedFiles;
        });
      }
    }
    
    // Complete progress
    setGenerationProgress(100);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationProgress(0);
    }, 1000);
    
  } catch (err) {
    console.error("❌ Code generation failed:", err);
    setIsGenerating(false);
    setGenerationProgress(0);
  } finally {
    setIsTyping(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }
}, [files, simulateProgress]);
  // Create stable theme object
  const pixoraTheme = useMemo(() => {
    const colors = THEME_COLORS[isDarkMode ? 'dark' : 'light'];
    return {
      colors,
      syntax: {
        plain: SYNTAX_COLORS.plain(isDarkMode),
        comment: {
          color: SYNTAX_COLORS.comment.color(isDarkMode),
          fontStyle: SYNTAX_COLORS.comment.fontStyle
        },
        keyword: SYNTAX_COLORS.keyword,
        tag: SYNTAX_COLORS.tag,
        punctuation: SYNTAX_COLORS.punctuation(isDarkMode),
        definition: SYNTAX_COLORS.definition,
        property: SYNTAX_COLORS.property,
        static: SYNTAX_COLORS.static,
        string: SYNTAX_COLORS.string
      },
      font: {
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
        mono: "'JetBrains Mono', 'Fira Code', 'Monaco', 'SF Mono', 'Roboto Mono', monospace",
        size: `${fontSize}px`,
        lineHeight: "1.7"
      }
    };
  }, [isDarkMode, fontSize]);

  const sandpackOptions = useMemo(() => ({
    showTabs: true,
    showNavigator: true,
    showLineNumbers: true,
    wrapContent: true,
    showRefreshButton: true,
    closableTabs: false,
    resizablePanels: true,
    externalResources: [
      "https://cdn.tailwindcss.com",
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
    ],
  }), []);

  const customSetup = useMemo(() => ({
    dependencies: {
      postcss: "^8",
      tailwindcss: "^3.4.1",
      autoprefixer: "^10.0.0",
      uuid4: "^2.0.3",
      "tailwind-merge": "^2.4.0",
      "tailwindcss-animate": "^1.0.7",
      "lucide-react": "latest",
      "react-router-dom": "^7.1.1",
      firebase: "^11.1.0",
      "@google/generative-ai": "^0.21.0",
      "date-fns": "^4.1.0",
      "react-chartjs-2": "^5.3.0",
      "chart.js": "^4.4.7",
      "framer-motion": "^11.0.0",
      "react-spring": "^9.7.0",
      "react-intersection-observer": "^9.5.0"
    },
  }), []);

  // Event handlers
  const handlePushToGithub = useCallback(() => {
    alert("GitHub integration would connect here. This would typically open a dialog to authenticate and push your code to a repository.");
  }, []);

  const handleDeploy = useCallback((platform) => {
    alert(`Deploying to ${platform}... This would typically start the deployment process.`);
    setShowDeployMenu(false);
  }, []);

  const handleExpertCall = useCallback(() => {
    alert("Expert consultation feature would connect you with a coding expert via video call or chat.");
  }, []);

  const adjustFontSize = useCallback((delta) => {
    setFontSize(prev => Math.max(10, Math.min(24, prev + delta)));
  }, []);

  const deployOptions = [
    { name: 'Vercel', action: () => handleDeploy('Vercel') },
    { name: 'Netlify', action: () => handleDeploy('Netlify') },
    { name: 'GitHub Pages', action: () => handleDeploy('GitHub Pages') }
  ];

  return (
    <>
    
      
      <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'} shadow-2xl rounded-2xl relative bottom-8`}>
        <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b rounded-md`}>
          {/* Left - Logo and Traffic Lights */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {['red', 'yellow', 'green'].map((color) => (
                <div 
                  key={color}
                  className={`w-3 h-3 bg-${color}-500 rounded-full hover:bg-${color}-400 transition-all duration-200 cursor-pointer`}
                />
              ))}
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Pixora
            </div>
          </div>

          {/* Middle - Code/Preview Tabs */}
          <div className="flex space-x-1 bg-slate-500/10 rounded-xl p-1">
            {[
              { id: 'code', label: 'Code', icon: Code2 },
              { id: 'preview', label: 'Preview', icon: Type }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : isDarkMode
                    ? "text-slate-300 hover:bg-slate-700/50"
                    : "text-slate-700 hover:bg-white/50"
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-2 rounded-xl ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'} font-mono text-sm`}>
              {currentTime.toLocaleTimeString()}
            </div>
            
            {/* Font Size Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => adjustFontSize(-1)}
                className={`cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}
                title="Decrease Font Size"
              >
                <Minus size={16} />
              </button>
              <span className={`text-xs px-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {fontSize}
              </span>
              <button
                onClick={() => adjustFontSize(1)}
                className={`cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}
                title="Increase Font Size"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Action Buttons */}
            {[
              { icon: Github, action: handlePushToGithub, title: "Push to GitHub", gradient: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" },
              { icon: Phone, action: handleExpertCall, title: "Expert Call", gradient: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" }
            ].map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                className={`cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r ${btn.gradient} text-white shadow-lg hover:shadow-xl`}
                title={btn.title}
              >
                <btn.icon size={18} />
              </button>
            ))}

            {/* Deploy Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDeployMenu(!showDeployMenu)}
                className="cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                title="Deploy"
              >
                <Rocket size={18} />
              </button>
              
              {showDeployMenu && (
                <>
                  <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl shadow-xl z-50`}>
                    <div className="py-2">
                      {deployOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={option.action}
                          className={`cursor-pointer w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'} transition-colors`}
                        >
                          Deploy to {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDeployMenu(false)}
                  />
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'hover:bg-slate-700 text-yellow-400' : 'hover:bg-slate-200 text-slate-800'}`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Sandpack Editor */}
      <SandpackProvider
  template="react"
  theme={pixoraTheme}
  options={sandpackOptions}
  customSetup={customSetup}
 files={files}
>
  <div className="relative">
    <GeneratingOverlay isVisible={isGenerating} progress={generationProgress} />

    {/* Export/Copy Actions Bar */}
    <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
      <EditorActions />
    </div>

    <SandpackLayout>
      <SandpackFileExplorer style={{ height: "80vh" }} />
      <div className="flex flex-col flex-1 h-[80vh]">
        <div
          className="flex-1 overflow-hidden"
          style={{ backgroundColor: isDarkMode ? "#0f1419" : "#fefefe" }}
        >
          <div className={activeTab === "code" ? "block h-full" : "hidden"}>
            <SandpackCodeEditor
              style={{ height: "100%" }}
              showTabs={true}
              showLineNumbers={true}
            />
          </div>
          <div className={activeTab === "preview" ? "block h-full" : "hidden"}>
            <SandpackPreview style={{ height: "100%" }} showNavigator={true} />
          </div>
        </div>
      </div>
    </SandpackLayout>
  </div>
</SandpackProvider>

      </div>
    </>
  );
}

export default Pixora_Editor;