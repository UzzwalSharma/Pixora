import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    
// generatedcodes: defineTable({
//  imageUrl:  v.optional(v.string()),
//     userName: v.string(),
//     description: v.string(),
//     modelName: v.string(),
//     code: v.string(),
//     createdAt: v.number(),

//       uid: v.string(),

// })
// ,


  workspace: defineTable({
    userName: v.string(),
    message: v.any(), // Changed from v.any() to v.string() for better type safety
    aiModelId: v.string(), // Added: The selected AI model ID
    imageUrl: v.optional(v.string()), // Added: Optional image URL
   code: v.optional(v.any()),  // for storing generated code
  }),

})