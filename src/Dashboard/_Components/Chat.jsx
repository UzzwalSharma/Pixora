import { useEffect, useRef, useCallback, useTransition, useState } from "react";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    SendIcon,
    XIcon,
    LoaderIcon,
    Sparkles,
    ChevronDownIcon,
    BotIcon,
    ZapIcon,
    BrainIcon,
    RocketIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { toast } from "sonner";

function cn(...args) {
  return args.filter(Boolean).join(' ');
}

// Available AI Models
const AI_MODELS = [
  {
    id: "sarvamai/sarvam-m:free",
    name: "Pixora Sarvam",
    description: "A versatile model inspired by all-encompassing intelligence. Ideal for multipurpose code generation.",
    icon: <BotIcon className="w-4 h-4" />,
    category: "Free"
  },
  {
    id: "deepseek/deepseek-chat:free",   //test it later on microsoft/mai-ds-r1:free   
    name: "Pixora Tejas",
    description: "Our fastest and sharpest model. Built for performance, speed, and precision — the true powerhouse of Pixora.",
    icon: <ZapIcon className="w-4 h-4 text-yellow-400" />,
    category: "Premium"
  },
  {
    id: "meta-llama/llama-3.1-8b-instruct",
    name: "Pixora Srinivasa",
    description: "Inspired by the legendary mind of Ramanujan. Best for logic-intensive tasks and structured code generation.",
    icon: <RocketIcon className="w-4 h-4 text-purple-400" />,
    category: "Free"
  }
];

// --- Model Selector Component ---
const ModelSelector = ({ selectedModel, onModelChange, isDisabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedModelData = AI_MODELS.find(model => model.id === selectedModel) || AI_MODELS[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                type="button"
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                disabled={isDisabled}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                    "border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05]",
                    "text-white/80 hover:text-white/90",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    isOpen && "bg-white/[0.05]"
                )}
                whileHover={!isDisabled ? { scale: 1.02 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
                {selectedModelData.icon}
                <span className="truncate max-w-32">{selectedModelData.name}</span>
                <ChevronDownIcon 
                    className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180"
                    )} 
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bottom-full left-0 mb-2 w-80 rounded-xl border border-white/10 shadow-2xl z-50 backdrop-blur-xl bg-white/10"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-4">
                            <div className="text-sm font-semibold text-white mb-3 px-1 tracking-wide">
                                Choose Your AI Model
                            </div>
                            <div className="space-y-2">
                                {AI_MODELS.map((model) => (
                                    <motion.button
                                        key={model.id}
                                        onClick={() => {
                                            onModelChange(model.id);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200",
                                            "hover:bg-white/15",
                                            selectedModel === model.id
                                                ? "bg-white/20 border border-white/20"
                                                : "border border-transparent"
                                        )}
                                        whileHover={{ scale: 1.015 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex-shrink-0 mt-0.5 text-white">
                                            {model.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-base font-semibold text-white truncate">
                                                    {model.name}
                                                </span>
                                                <span
                                                    className={cn(
                                                        "text-xs px-2 py-0.5 rounded-full font-medium",
                                                        model.category === "Free"
                                                            ? "bg-green-500/20 text-green-300"
                                                            : "bg-yellow-500/20 text-yellow-300"
                                                    )}
                                                >
                                                    {model.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-white/80 mt-0.5 leading-snug">
                                                {model.description}
                                            </p>
                                        </div>
                                        {selectedModel === model.id && (
                                            <motion.div
                                                className="flex-shrink-0 w-2.5 h-2.5 bg-green-400 rounded-full mt-2"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Auto Resize Textarea Hook ---
function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}) {
    const textareaRef = useRef(null);

    const adjustHeight = useCallback(
        (reset) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

// --- Textarea Component ---
const Textarea = React.forwardRef(function Textarea(
    { className, containerClassName, showRing = true, ...props },
    ref
) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={cn("relative", containerClassName)}>
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "transition-all duration-200 ease-in-out",
                    "placeholder:text-muted-foreground",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
                    className
                )}
                ref={ref}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />

            {showRing && isFocused && (
                <motion.span
                    className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}

            {props.onChange && (
                <div
                    className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-violet-500 rounded-full"
                    style={{
                        animation: 'none',
                    }}
                    id="textarea-ripple"
                />
            )}
        </div>
    );
});

// --- Main Chat Component ---
export function AnimatedAIChat() {
    const [value, setValue] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [selectedModel, setSelectedModel] = useState(AI_MODELS[1].id);    //   will change it later on
    const fileInputRef = useRef(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Convex mutation and user hooks
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const sendMessage = useMutation(api.workspace.sendMessage);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    // Image upload functionality with Cloudinary
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        console.log("📂 Image Selected:", file);
        setIsUploading(true);

        // Create FormData for Cloudinary upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "kb9n4w2j");
        formData.append("folder", "pixora_uploads"); 

        try {
            // Upload to Cloudinary
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dvmqxb8kd/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Set the uploaded image with Cloudinary URL
            setUploadedImage({
                url: data.secure_url,
                name: file.name,
                size: file.size,
                cloudinaryId: data.public_id
            });
            
            console.log("✅ Image Uploaded to Cloudinary:", data.secure_url);
            
        } catch (error) {
            console.error("❌ Upload Failed:", error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }

        // Clear the input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Remove image function
    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    const handleAttachFile = () => {
        fileInputRef.current?.click();
    };

    // Updated handleSendMessage with Model Information
 
// Updated handleSendMessage function
const handleSendMessage = async () => {
    // Check if user is signed in
    if (!user) {
        toast.error("You must be signed in to send a message.");
        return;
    }

    // Check if model is selected
    if (!selectedModel) {
        toast.error("Please select an AI model before sending your message.");
        return;
    }

    if (value.trim() || uploadedImage) {
        startTransition(() => {
            setIsTyping(true);

            setTimeout(async () => {
                try {
                    // Prepare the message array in the desired format
                    const message = [
                        {
                            content: value.trim(),
                            role: "user",
                        },
                    ];

                    // If an image is uploaded, add it to the message array
                    if (uploadedImage) {
                        message.push({
                            content: uploadedImage.url,
                            role: "user",
                            type: "image", // Optional: specify type for image
                        });
                    }

                    console.log("📤 Sending messages:", {
                        message,
                        aiModelId: selectedModel,
                        userName: user.firstName || user.username || user.emailAddress || "Anonymous",
                    });

                    // Send messages using Convex mutation
                    const workspaceId = await sendMessage({
                        message, // Pass the array of messages
                        aiModelId: selectedModel, // Pass the model ID
                        userName: user.firstName || user.username || user.emailAddress || "Anonymous",
                    });

                    console.log("🚀 Workspace created with ID:", workspaceId);

                    // Clear the input and image after successful send
                    setValue("");
                    setUploadedImage(null);
                    adjustHeight(true);

                    // Navigate to the workspace page using the returned ID
                    navigate(`/workspace/${workspaceId}`);
                } catch (error) {
                    console.error("❌ Error sending messages:", error);
                    toast.error("Failed to send messages: " + error.message);
                } finally {
                    setIsTyping(false);
                }
            }, 1000);
        });
    }
};
    // Loading state for user authentication
    if (!isLoaded) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-transparent text-white">
                <div className="flex items-center gap-3">
                    <LoaderIcon className="w-6 h-6 animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-transparent text-white p-6 relative overflow-hidden">
            
            {/* Background blobs */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-800/50 rounded-full filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-700/40 rounded-full filter blur-[128px] animate-pulse delay-700" />
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-yellow-400/10 rounded-full filter blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Centered chatbox */}
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center">
                <motion.div
                    className="space-y-12 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="text-center space-y-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block"
                        >
                            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
                               What would you like to create today?
                            </h1>
                            <motion.div
                                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "100%", opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </motion.div>
                         <motion.p
                            className="text-sm text-white/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {user
                                ? `Let's design something amazing together, ${user.firstName || user.username || user.emailAddress || "Pixora User"}!`
                                : "Let's design something amazing together!"}
                        </motion.p>
                    </div>

                    <motion.div
                        className="relative mx-auto backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl w-full"
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="p-4">
                            <Textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                placeholder="Ask Pixora a question..."
                                containerClassName="w-full"
                                className={cn(
                                    "w-full px-4 py-3",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none",
                                    "text-white/90 text-sm",
                                    "focus:outline-none",
                                    "placeholder:text-white/20",
                                    "min-h-[60px]"
                                )}
                                style={{
                                    overflow: "hidden",
                                }}
                                showRing={false}
                            />
                        </div>

                        {/* Image Preview Section */}
                        <AnimatePresence>
                            {uploadedImage && (
                                <motion.div
                                    className="px-4 pb-3"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative inline-block">
                                        <div className="relative bg-white/[0.03] rounded-lg p-2 border border-white/[0.1]">
                                            <img
                                                src={uploadedImage.url}
                                                alt={uploadedImage.name}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <motion.button
                                                onClick={handleRemoveImage}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </motion.button>
                                        </div>
                                        <div className="mt-2 text-xs text-white/60 max-w-20 truncate">
                                            {uploadedImage.name}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Upload Loading State */}
                        <AnimatePresence>
                            {isUploading && (
                                <motion.div
                                    className="px-4 pb-3"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="flex items-center gap-3 bg-white/[0.03] rounded-lg p-3 border border-white/[0.1]">
                                        <LoaderIcon className="w-4 h-4 animate-spin text-white/60" />
                                        <span className="text-sm text-white/70">Uploading image...</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-4">
                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />

                            {/* Left side - Upload button and Model Selector */}
                            <div className="flex items-center gap-3">
                                <motion.button
                                    type="button"
                                    onClick={handleAttachFile}
                                    disabled={isUploading}
                                    whileTap={{ scale: 0.94 }}
                                    className="p-2 text-white/40 hover:text-white/90 rounded-lg transition-colors relative group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ImageIcon className="w-4 h-4" />
                                    <motion.span
                                        className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        layoutId="button-highlight"
                                    />
                                </motion.button>
                                
                                {/* Model Selector */}
                                <ModelSelector
                                    selectedModel={selectedModel}
                                    onModelChange={setSelectedModel}
                                    isDisabled={isTyping}
                                />
                            </div>

                            {/* Send message button */}
                            <motion.button
                                type="button"
                                onClick={handleSendMessage}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isTyping || (!value.trim() && !uploadedImage)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    "flex items-center gap-2",
                                    (value.trim() || uploadedImage)
                                        ? "bg-white text-[#0A0A0B] shadow-lg shadow-white/10"
                                        : "bg-white/[0.05] text-white/40"
                                )}
                            >
                                {isTyping ? (
                                    <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                                ) : (
                                    <SendIcon className="w-4 h-4" />
                                )}
                                <span>Send</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-2xl bg-white/[0.02] rounded-full px-4 py-2 shadow-lg border border-white/[0.05]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-center">
                                <span className="text-xs font-medium text-white/90 mb-0.5">Pixora</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                <span>Thinking</span>
                                <TypingDots />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Typing Dots Animation ---
function TypingDots() {
    return (
        <div className="flex items-center ml-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-white/90 rounded-full mx-0.5"
                    initial={{ opacity: 0.3 }}
                    animate={{
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)"
                    }}
                />
            ))}
        </div>
    );
}

// --- Ripple Keyframes Component ---
const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

export function RippleKeyframes() {
    useEffect(() => {
        // Only add once
        if (!document.getElementById("ripple-keyframes-style")) {
            const style = document.createElement("style");
            style.id = "ripple-keyframes-style";
            style.innerHTML = rippleKeyframes;
            document.head.appendChild(style);
        }
    }, []);

    return null;
}

export default AnimatedAIChat;