import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    
  
  workspace: defineTable({
    userName: v.string(),
    message: v.any(), // Changed from v.any() to v.string() for better type safety
    aiModelId: v.string(), // Added: The selected AI model ID
    imageUrl: v.optional(v.string()), // Added: Optional image URL
   code: v.optional(v.any()),  // for storing generated code
  }),

  users: defineTable({
  clerkId: v.string(),
  tokens: v.number(),
  plan: v.string(),
  lastTokenRefill: v.number(),
}).index("by_clerkId", ["clerkId"]),





})