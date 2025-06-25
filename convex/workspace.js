import { mutation, query } from "convex/_generated/server";
import { v } from "convex/values";

// Keep your existing sendMessage for creating new workspaces
export const sendMessage = mutation({
  args: {
    userName: v.string(),
    message: v.any(),
    aiModelId: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const { name } = identity;

    const id = await ctx.db.insert("workspace", {
      userName: args.userName,
      message: args.message,
      aiModelId: args.aiModelId,
      imageUrl: args.imageUrl,
    });
    return id;
  },
});

// UPDATED: Clean message storage - only content and role
export const addMessageToWorkspace = mutation({
  args: {
    workspaceId: v.id("workspace"),
    userMessage: v.object({
      content: v.string(),
      role: v.string(),
      // Removed optional fields to keep storage clean
    }),
    aiMessage: v.object({
      content: v.string(),
      role: v.string(),
      // Removed optional fields to keep storage clean
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const { workspaceId, userMessage, aiMessage } = args;
    
    // Get the current workspace
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    
    // Get current messages array (should be in format [{content: "...", role: "..."}])
    const currentMessages = workspace.message || [];
    
    // Store only clean message data (no timestamps, IDs, or metadata)
    const cleanUserMessage = {
      content: userMessage.content,
      role: userMessage.role,
    };
    
    const cleanAiMessage = {
      content: aiMessage.content,
      role: aiMessage.role,
    };
    
    // Update the workspace with clean messages added to the array
    await ctx.db.patch(workspaceId, {
      message: [...currentMessages, cleanUserMessage, cleanAiMessage],
    });
    


    
    // Return the clean messages (frontend will add UI metadata as needed)
    return { userMessage: cleanUserMessage, aiMessage: cleanAiMessage };
  },
});

// Alternative: If you still need the version with metadata for other use cases
export const addMessageToWorkspaceWithMeta = mutation({
  args: {
    workspaceId: v.id("workspace"),
    userMessage: v.object({
      content: v.string(),
      role: v.string(),
      userName: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    }),
    aiMessage: v.object({
      content: v.string(),
      role: v.string(),
      modelUsed: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const { workspaceId, userMessage, aiMessage } = args;
    
    // Get the current workspace
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    
    // Get current messages array
    const currentMessages = workspace.message || [];
    
    // Create new messages with timestamps and IDs (for cases where you need metadata)
    const timestamp = Date.now();
    const userMessageWithMeta = {
      ...userMessage,
      timestamp: timestamp,
      id: `msg_${timestamp}_user`,
    };
    
    const aiMessageWithMeta = {
      ...aiMessage,
      timestamp: timestamp + 1,
      id: `msg_${timestamp}_ai`,
    };
    
    // Update the workspace with new messages added to the array
    await ctx.db.patch(workspaceId, {
      message: [...currentMessages, userMessageWithMeta, aiMessageWithMeta],
    });
    
    return { userMessage: userMessageWithMeta, aiMessage: aiMessageWithMeta };
  },
});

// UPDATED: Clean single message storage
export const addSingleMessage = mutation({
  args: {
    workspaceId: v.id("workspace"),
    content: v.string(),
    role: v.string(), // "user" or "assistant"
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const { workspaceId, content, role } = args;
    
    // Get the current workspace
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    
    // Get current messages array
    const currentMessages = workspace.message || [];
    
    // Create clean message (only content and role)
    const newMessage = {
      content,
      role,
    };
    
    // Update the workspace with new message added to the array
    await ctx.db.patch(workspaceId, {
      message: [...currentMessages, newMessage],
    });
    
    return newMessage;
  },
});

// Keep your existing getById query
export const getById = query({
  args: { id: v.id("workspace") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});


// User signup mutation for token initialization
export const onUserSignup = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", clerkId))
      .first();

    if (!existing) {
      await ctx.db.insert("users", {
        clerkId,
        tokens: 30, // Initial tokens
        plan: "free",
        lastTokenRefill: Date.now(),
      });
    }
  },
});

//Token deduction mutation
export const useToken = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", clerkId))
      .first();

    if (!user) throw new Error("User not found");
    if (user.tokens <= 0) throw new Error("You are out of tokens!");

    await ctx.db.patch(user._id, {
      tokens: user.tokens - 1,
    });

    return { remaining: user.tokens - 1 };
  },
});


//Getting user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();
  },
});


// Token refill mutation
export const addTokens = mutation({
  args: {
    clerkId: v.string(),
    amount: v.number(), // number of tokens to add
  },
  handler: async (ctx, { clerkId, amount }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const newTotal = user.tokens + amount;

    await ctx.db.patch(user._id, {
      tokens: newTotal,
    });

    return { tokens: newTotal };
  },
});