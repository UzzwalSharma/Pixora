import axios from 'axios';
import dedent from 'dedent';


const CHAT_PROMPT = dedent`
  You are Pixora an AI Website builder which is experienced in react development.

  Guidelines:
  - Tell users what you are building.
  - Response less than 15 lines.
  - Skip giving code examples and commentary
`;


const PROMPT = dedent`
Generate a complete React project using Vite. Structure code in multiple components with .js extensions, organized into folders. Use Tailwind CSS for styling only. Icons must be from lucide-react (e.g., import { Heart } from "lucide-react" → <Heart className="" />).

✨ Allowed packages:
- date-fns (date formatting)
- react-chartjs-2 (charts) — register all required components via ChartJS.register(...)
- firebase and @google/generative-ai — only if asked

📦 Output JSON format(strictly follow):
{
  "projectTitle": "string",
  "explanation": "string",
  "files": {
    "/App.js": { "code": "..." },
    "/components/ChartCard.js": { "code": "..." }
  },
  "generatedFiles": ["/App.js", "/components/ChartCard.js"]
}

✅ Rules:
- All imports must resolve and match defined files
- No broken JSX, undefined variables, or missing components
- Use emojis 🎯📊✅ for a delightful UI
- Use Unsplash  or https://archive.org/download/placeholder-image/placeholder-image.jpg for images
-Use valid Unsplash image URLs with full links (e.g., https://images.unsplash.com/...) — do NOT use source.unsplash.com or tag-based URLs.
- Charts must be polished (tooltips, labels, gradients)
- Use date-fns for formatted output (e.g., format(new Date(), "PPP"))
- Layouts should be responsive with Tailwind transitions and hover states
- Components must be visually beautiful and ready for production — no boilerplate
- All components must be beautiful, production-ready, and polished
- Use <Link> from react-router-dom for navigation when needed
- All buttons must be interactive and have hover/focus states


✅ Dependencies allowed:
- tailwindcss, tailwindcss-animate, postcss, autoprefixer, tailwind-merge
- lucide-react (icons only — import { Icon } from "lucide-react")
- uuid4 (for IDs), react-router-dom (v7+), firebase (v11+)
- @google/generative-ai (if asked), date-fns (for formatting)
- chart.js and react-chartjs-2 (register via ChartJS.register(...))
- framer-motion, react-spring (for animation), react-intersection-observer

💡 Examples to include:
- AnalyticsDashboard with <LineChart /> & <BarChart />
- Data cards with icons and buttons
- UI should follow Tailwind best practices

Return JSON only. No extra commentary.
`;

// Updated API service to accept conversation history and maintain context
export async function generateResponse(userMessage, options = {}) {
  try {
    const { 
      model: aiModelId = "sarvamai/sarvam-m:free", 
      imageUrl = null, 
      conversationHistory = [] 
    } = options;

    // 🔒 Ensure userMessage is a string
    const messageText = typeof userMessage === "string"
      ? userMessage
      : Array.isArray(userMessage) && userMessage[0]?.content
        ? userMessage[0].content
        : JSON.stringify(userMessage); // fallback to avoid crash

    console.log("🟢 Generating response for:", { 
      userMessage: messageText,
      aiModelId, 
      imageUrl, 
      conversationHistoryLength: conversationHistory.length 
    });

    // Build messages array with conversation context
    const messages = [
      { role: "system", content: CHAT_PROMPT },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: String(msg.content) // ⛑️ Defensive: ensure string type
      }))
    ];

    // Add new user message if not already in conversation
    if (conversationHistory.length === 0) {
      let finalPrompt = `User Request: ${messageText}`;
      if (imageUrl) finalPrompt += `\n\nUser has also provided an image: ${imageUrl}`;
      messages.push({ role: "user", content: finalPrompt });
    }

    // Debug print
    if (conversationHistory.length > 0) {
      console.log("📚 Including conversation history:", {
        totalMessages: conversationHistory.length,
        summary: conversationHistory.map((msg, i) => 
          `${i + 1}. ${msg.role}: ${String(msg.content).substring(0, 30)}...`
        )
      });
    }

    const requestBody = {
      messages,
      modelName: aiModelId,
      ...(imageUrl && { imageUrl })
    };

    console.log("📤 Sending Request with full context:", {
      modelName: aiModelId,
      messagesCount: messages.length,
      hasImage: !!imageUrl,
      lastUserMessage: messageText
    });

    const response = await axios.post("http://localhost:5000/openroutertest", requestBody, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log("🚀 AI Response:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Error generating response:", error.message);
    throw error;
  }
}


// Alternative function signature for backward compatibility
export async function generateResponseLegacy(userMessage, aiModelId, imageUrl = null) {
  return generateResponse(userMessage, {
    model: aiModelId,
    imageUrl,
    conversationHistory: []
  });
}


// Main Code generator function

export async function generateCodeResponse(userMessage, aiModelId, imageUrl, conversationHistory = []) {
  try {
    console.log("🟢 Received Params:");
    console.log("User Description:", userMessage);
    console.log("Image URL:", imageUrl);
    console.log("Model:", aiModelId);
    console.log("Conversation History Length:", conversationHistory?.length || 0);

    // Merge the optimized prompt with the user's description
    const finalPrompt = `${PROMPT}\n\nUser Description: ${userMessage}`;

    // ✅ Send request with conversation history
    const requestBody = {
      imageUrl: imageUrl,
      description: userMessage,
      modelName: aiModelId,
      prompt: finalPrompt,
      conversationHistory: conversationHistory || [] // Add conversation history
    };

    console.log("📤 Sending Request with conversation history:", requestBody);

    // Send request to the backend
    const response = await axios.post("http://localhost:5000/openroutermain", requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("🚀 AI Response:", response.data);

    // ✅ Return the full response object
    return response.data;
  } catch (error) {
    console.error("❌ Error generating response:", error.message);
    return null;
  }
}
