import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    
generatedcodes: defineTable({
 imageUrl:  v.optional(v.string()),
    userName: v.string(),
    description: v.string(),
    modelName: v.string(),
    code: v.string(),
    createdAt: v.number(),

      uid: v.string(),

})
,
workspace: defineTable({

    message:v.any(),
    filedata:v.optional(v.any())
})
})

