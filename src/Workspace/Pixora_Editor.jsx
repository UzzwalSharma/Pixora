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

import DEFAULT_FILE from "/src/Workspace/Lookup.jsx"

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
    }, 400);
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1600);
    
    return () => {
      clearInterval(dotsInterval);
      clearInterval(stepInterval);
    };
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className="absolute inset-0 z-50 bg-gradient-to-br from-violet-900/20 via-slate-900/40 to-indigo-900/20 backdrop-blur-2xl rounded-b-2xl border-t border-white/20 flex items-center justify-center">
      {/* Glassmorphic background effects */}
      <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-violet-400/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-3xl p-8 mx-4">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />
        
     
        
        {/* Icon Box */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-violet-600/30 animate-pulse backdrop-blur-xl" />
          <div className="absolute inset-1 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-inner border border-white/20">
            <Code2 className="w-8 h-8 text-cyan-300 animate-pulse" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className=" text-xl font-semibold text-center mb-2 bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
          Generating your code...
        </h3>
        
        {/* Step Text */}
        <p className="text-slate-200 text-sm font-mono text-center tracking-wide min-h-[1.5rem] mb-4">
          {steps[currentStep]}{dots}
        </p>
        
        {/* Progress Info */}
        <div className="flex justify-between text-xs text-slate-300 mb-2">
          <span>Progress</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        
        {/* Main Progress Bar */}
        <div className="w-full h-2 bg-white/10 backdrop-blur-xl rounded-full mb-6 overflow-hidden shadow-inner border border-white/20">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        
        {/* Bouncing Dots Animation */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        
        {/* Pro Tip */}
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-slate-100 leading-snug">
              <span className="font-medium text-white bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text ">Pro tip:</span>The better the prompt, the better the code. Be specific to get clean, production-ready results.
            </p>
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
  const [files, setFiles] = useState(DEFAULT_FILE);


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

      
  const mergedFiles = { ...DEFAULT_FILE, ...parsed.files };
setFiles(mergedFiles);

 

 

  

      
};

      
    
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
}, [ simulateProgress]);
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
       key={Object.keys(files).join(',')}
  template="react"
  theme={pixoraTheme}
  options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
  customSetup={customSetup}
  files={files}
  activeFile="/App.js" 
>
  <div className="relative">
    <GeneratingOverlay isVisible={isGenerating} progress={generationProgress} />

    {/* Export/Copy Actions Bar */}
    <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
      <EditorActions />
    </div>

 



<div className="h-[80vh] flex">
  {/* File Explorer - Fixed Left Side */}
  <div className="w-64 flex-shrink-0 border-r border-slate-700">
    <SandpackFileExplorer 
      className="h-full"
      style={{ height: "100%" }}
    />
  </div>
  
  {/* Editor/Preview - Right Side */}
  <div className="flex-1 h-full">
    {activeTab === "code" ? (
      <SandpackCodeEditor
        showTabs={true}
        showLineNumbers={true}
        wrapContent={true}
        className="h-full"
        style={{ height: "100%" }}
      />
    ) : (
      <SandpackPreview 
        showNavigator={true}
        showRefreshButton={true}
        className="h-full"
        style={{ height: "100%" }}
      />
    )}
  </div>
</div>
  </div>
</SandpackProvider>

      </div>
    </>
  );
}

export default Pixora_Editor;