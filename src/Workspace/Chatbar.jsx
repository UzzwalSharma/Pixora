import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Bot, ArrowDown, Code } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import "../index.css"
import { useMutation, useQuery } from "convex/react";
import { api } from "/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { generateResponse } from "/Ai models/Chat_Open_router";

import { useMessages } from "./MessagesContext"; // custom MessagesContext


// Utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Custom Button component
const Button = ({ children, className = "", variant = "default", size = "default", disabled = false, onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";
  
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-emerald-500/30 bg-emerald-900/20 text-emerald-300 hover:bg-emerald-800/30 hover:text-emerald-100",
    ghost: "text-emerald-300 hover:bg-emerald-800/20 hover:text-emerald-100",
    code: "bg-purple-600 text-white hover:bg-purple-700"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10",
    sm: "h-8 px-3 py-1 text-xs"
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Auto scroll hook (keeping your existing implementation)
function useAutoScroll(options = {}) {
  const { offset = 20, smooth = false, content } = options;
  const scrollRef = useRef(null);
  const lastContentHeight = useRef(0);
  const userHasScrolled = useRef(false);
  const [scrollState, setScrollState] = useState({
    isAtBottom: true,
    autoScrollEnabled: true,
  });
  
  const checkIsAtBottom = useCallback(
    (element) => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const distanceToBottom = Math.abs(
        scrollHeight - scrollTop - clientHeight
      );
      return distanceToBottom <= offset;
    },
    [offset]
  );
  
  const scrollToBottom = useCallback(
    (instant) => {
      if (!scrollRef.current) return;
      const targetScrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      if (instant) {
        scrollRef.current.scrollTop = targetScrollTop;
      } else {
        scrollRef.current.scrollTo({
          top: targetScrollTop,
          behavior: smooth ? "smooth" : "auto",
        });
      }
      setScrollState({
        isAtBottom: true,
        autoScrollEnabled: true,
      });
      userHasScrolled.current = false;
    },
    [smooth]
  );
  
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const atBottom = checkIsAtBottom(scrollRef.current);
    setScrollState((prev) => ({
      isAtBottom: atBottom,
      autoScrollEnabled: atBottom ? true : prev.autoScrollEnabled,
    }));
  }, [checkIsAtBottom]);
  
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.addEventListener("scroll", handleScroll, { passive: true });
    return () => element.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    const currentHeight = scrollElement.scrollHeight;
    const hasNewContent = currentHeight !== lastContentHeight.current;
    if (hasNewContent) {
      if (scrollState.autoScrollEnabled) {
        requestAnimationFrame(() => {
          scrollToBottom(lastContentHeight.current === 0);
        });
      }
      lastContentHeight.current = currentHeight;
    }
  }, [content, scrollState.autoScrollEnabled, scrollToBottom]);
  
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver(() => {
      if (scrollState.autoScrollEnabled) {
        scrollToBottom(true);
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [scrollState.autoScrollEnabled, scrollToBottom]);
  
  const disableAutoScroll = useCallback(() => {
    const atBottom = scrollRef.current
      ? checkIsAtBottom(scrollRef.current)
      : false;
    if (!atBottom) {
      userHasScrolled.current = true;
      setScrollState((prev) => ({
        ...prev,
        autoScrollEnabled: false,
      }));
    }
  }, [checkIsAtBottom]);
  
  return {
    scrollRef,
    isAtBottom: scrollState.isAtBottom,
    autoScrollEnabled: scrollState.autoScrollEnabled,
    scrollToBottom: () => scrollToBottom(false),
    disableAutoScroll,
  };
}

const ChatMessageList = React.forwardRef(
  ({ className, children, smooth = false, ...props }, _ref) => {
    const {
      scrollRef,
      isAtBottom,
      scrollToBottom,
      disableAutoScroll,
    } = useAutoScroll({
      smooth,
      content: children,
    });
    return (
      <div className="relative w-full h-full">
        <div
          className={`flex flex-col w-full h-full p-4 overflow-y-auto ${className}`}
          ref={scrollRef}
          onWheel={disableAutoScroll}
          onTouchMove={disableAutoScroll}
          {...props}
        >
          <div className="flex flex-col gap-6">{children}</div>
        </div>
        {!isAtBottom && (
          <Button
            onClick={() => {
              scrollToBottom();
            }}
            size="icon"
            variant="outline"
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="h-6 w-6 text-white" />
          </Button>
        )}
      </div>
    );
  }
);

ChatMessageList.displayName = "ChatMessageList";

const Glass = React.forwardRef(
  ({ className, width = "w-full", height = "h-full", ...props }, ref) => {
    return (
      <div 
        className={cn("relative overflow-hidden", width, height, className)}
        ref={ref} 
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-800/10 to-emerald-950/30 backdrop-blur-xl border border-emerald-500/20 rounded-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/5 to-transparent" />
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="fractal-noise-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.12 0.12"
                numOctaves="1"
                result="warp"
              />
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
        <div className="relative z-10 w-full h-full">
          {props.children}
        </div>
      </div>
    )
  }
);

Glass.displayName = "Glass";

function DarkGreenChatBox({ className }) {
  const { user } = useUser();
  const { workspaceId } = useParams();
  const [input, setInput] = useState("");
  
  // Use context instead of local state
  const { messages, setMessages, addMessage, isTyping, setIsTyping } = useMessages();
  
 
  // Fetch messages from Convex database
  const workspaceData = useQuery(api.workspace.getById, {
    id: workspaceId,
  });

  // Mutation to send new message
  const addMessageToWorkspace = useMutation(api.workspace.addMessageToWorkspace);

  // Initialize with workspace initial message (updated to use context)
  useEffect(() => {
    if (workspaceData && messages.length === 0) {
      console.log("🔍 Initializing workspace with data:", workspaceData);
      
      const messageData = workspaceData.message;
      let initialMessages = [];
      
      if (Array.isArray(messageData) && messageData.length > 0) {
        initialMessages = messageData.map((msg, index) => {
          return {
            id: `initial-${index}`,
            content: msg.content || "No content",
            role: msg.role || "user",
            timestamp: new Date(workspaceData._creationTime || Date.now()),
            userName: msg.userName || workspaceData.userName || user?.firstName || "Anonymous",
            imageUrl: msg.imageUrl || workspaceData.imageUrl || undefined,
          };
        });
      }
      
      console.log("📝 Processed initial messages:", initialMessages);
      
      if (initialMessages.length > 0) {
        setMessages(initialMessages);
      }
    }
  }, [workspaceData, user?.firstName, messages.length, setMessages]);

  // Main effect to handle AI responses when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.role === "user") {
        console.log("🔄 New user message detected, generating AI response with full context...");
        console.log("📝 Current conversation length:", messages.length);
        handleAIResponse();
      }
    }
  }, [messages.length]);

  // Updated handleAIResponse to use context
  const handleAIResponse = async () => {
    setIsTyping(true);
    
    try {
      const aiModelId = workspaceData?.aiModelId || "sarvamai/sarvam-m:free";
      const imageUrl = workspaceData?.imageUrl || undefined;
      const lastUserMessage = messages[messages.length - 1];
      
      const conversationHistory = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }));

      console.log("🚀 Sending FULL conversation context to AI:", {
        currentMessage: lastUserMessage.content,
        aiModelId,
        imageUrl,
        fullConversationHistory: conversationHistory,
        historyLength: conversationHistory.length
      });

      const aiResponse = await generateResponse(lastUserMessage.content, {
        model: aiModelId,
        imageUrl: imageUrl,
        conversationHistory: conversationHistory
      });
      
      console.log("🚀 AI Response received:", aiResponse);
      
      let responseContent = "";
      if (typeof aiResponse === "string") {
        responseContent = aiResponse;
      } else if (aiResponse && typeof aiResponse === "object") {
        responseContent = aiResponse.message || 
                        aiResponse.content || 
                        aiResponse.text || 
                        aiResponse.response || 
                        aiResponse.data?.message ||
                        aiResponse.data?.content ||
                        "I'm sorry, I couldn't generate a response.";
      } else {
        responseContent = "I'm sorry, I couldn't generate a response.";
      }
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
        modelUsed: aiModelId
      };

      // Use context to add message
      addMessage(aiMessage);

      try {
        const cleanUserMessage = {
          content: lastUserMessage.content,
          role: "user"
        };
        
        const cleanAiMessage = {
          content: responseContent,
          role: "assistant"
        };

        await addMessageToWorkspace({
          workspaceId: workspaceData._id,
          userMessage: cleanUserMessage,
          aiMessage: cleanAiMessage
        });

        console.log("✅ Clean messages saved to Convex database");
        
      } catch (dbError) {
        console.error("❌ Database save error:", dbError);
      }

    } catch (error) {
      console.error("Error in handleAIResponse:", error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  

  // Function to generate new user message (updated to use context)
  const onGenerate = (input) => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
      userName: user?.firstName || "Anonymous",
    };

    addMessage(userMessage);
  };

  const handleSend = useCallback(() => {
    onGenerate(input);
    setInput("");
  }, [input, user]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle loading state
  if (workspaceData === undefined) {
    return (
      <div className={`w-full max-w-2xl mx-auto h-[600px] relative ${className || ''}`}>
        <Glass className="w-full h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-emerald-300">Loading messages...</div>
          </div>
        </Glass>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl mx-auto h-[600px] relative ${className || ''}`}>
      <Glass className="w-full h-full">
        <div className="flex flex-col h-full p-6">
          
          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ChatMessageList className="space-y-4 overflow-y-auto px-4 py-6 max-h-[calc(100vh-200px)] hide-scrollbar">
              {messages
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-4 ${
                      message.role === "user" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.role === "user" && (
                      <Avatar className="w-9 h-9 flex-shrink-0 shadow-md">
                        <AvatarImage
                          src={user?.imageUrl}
                          alt={message.userName || "U"}
                          className="object-cover rounded-[50%]"
                        />
                        <AvatarFallback>
                          {message.userName?.charAt(0) || user?.firstName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col max-w-[80%]">
                      {message.role === "user" && message.imageUrl && (
                        <div className="mb-2">
                          <img
                            src={message.imageUrl}
                            alt="Uploaded content"
                            className="max-w-xs rounded-lg shadow-md"
                          />
                        </div>
                      )}
                      
                      <div
                        className={`rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm backdrop-blur-sm ${
                          message.role === "user"
                            ? "bg-emerald-600/90 text-white"
                            : "bg-white text-gray-900 border border-emerald-100"
                        }`}
                      >
                        <p dangerouslySetInnerHTML={{
                          __html: (message.content || '').toString().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }} />

                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          {message.role === "assistant" && message.modelUsed && (
                            <div className="text-xs text-gray-500">
                              {message.modelUsed.split('/').pop()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {message.role === "assistant" && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 p-0.5 shadow ring-2 ring-emerald-300/40">
                        <img
                          src="/pixoranewlogo.jpg"
                          alt="Pixora"
                          className="rounded-full w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}

              {/* Updated typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 p-0.5 shadow ring-2 ring-emerald-300/40">
                    <img
                      src="/pixoranewlogo.jpg"
                      alt="Pixora"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white border-emerald-100 text-gray-800 px-4 py-2 rounded-xl shadow backdrop-blur-sm">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150" />
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </motion.div>
              )}
            </ChatMessageList>
          </div>

          {/* Updated Input Area */}
          <div>
            <div className="flex items-end w-full gap-3 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/20 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-emerald-400">
              
              <TextareaAutosize
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                minRows={1}
                maxRows={6}
                placeholder="want any tweaks..."
                className="flex-1 text-sm leading-relaxed px-3 py-2 rounded-xl bg-transparent text-emerald-100 placeholder:text-emerald-300/70 focus-visible:outline-none focus:ring-0 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
              
           
              
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-tr from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl p-2 shadow-lg transition-all"
              >
                <Glass className="w-9 h-9 rounded-lg">
                  <div className="w-full h-full flex items-center justify-center">
                    <ArrowUp className="w-4 h-4" />
                  </div>
                </Glass>
              </Button>
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
}


export default function DarkGreenChatBoxDemo() {
  return (

    <div className="flex items-center justify-center">
      <DarkGreenChatBox />
    </div>

  );
}