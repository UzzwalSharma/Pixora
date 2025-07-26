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

✅ Rules:
- Use only lucide-react icons
- No broken JSX, undefined variables, or missing components
-All string values must use double quotes ("") to avoid breaking on apostrophes.
- Do NOT use React.useContext, createContext, or any context API
- Do NOT invent variables like React2, React3, etc. — always use \`React\` properly
- Do NOT use \`useOutletContext\`, \`useNavigationContext\`, or other internal router hooks
- Always wrap routes inside \`<BrowserRouter>\` and \`<Routes>\` if react-router-dom is used
- Use <Link> from react-router-dom only when needed, and make sure it’s wrapped correctly
- No destructuring from undefined/null — avoid errors like \`const { something } = null\`

📷 Image Usage:
- Use real Unsplash image links (e.g., https://images.unsplash.com/...)
- You may also use https://archive.org/download/placeholder-image/placeholder-image.jpg as a fallback

🎨 UI Expectations:
- Layout must be responsive
- Use Tailwind transitions, hover/focus effects, rounded corners
- Components must be beautiful, production-ready, and polished
- Use emojis 🎯📊✅ to enhance the UI

📦 Output JSON format (strict):
{
  "projectTitle": "string",
  "explanation": "string",
  "files": {
    "/App.js": { "code": "..." },
    "/components/ChartCard.js": { "code": "..." }
  },
  "generatedFiles": ["/App.js", "/components/ChartCard.js"]
}

Return valid JSON only. Do NOT include any extra commentary or markdown.
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

    const response = await axios.post("https://pixora-s-backend.onrender.com/openroutertest", requestBody, {
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
    const response = await axios.post("https://pixora-s-backend.onrender.com/openroutermain", requestBody, {
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