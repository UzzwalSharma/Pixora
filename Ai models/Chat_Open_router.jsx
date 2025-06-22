import axios from 'axios';
import dedent from 'dedent';


const CHAT_PROMPT = dedent`
  You are Pixora an AI Website builder which is experienced in react development.

  Guidelines:
  - Tell users what you are building.
  - Response less than 15 lines.
  - Skip giving code examples and commentary
`;


const PROMPT=dedent`
Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, 
without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
also you can use date-fns for date format and react-chartjs-2 chart, graph library

Return a JSON object like:
{
  "projectTitle": "string",
  "explanation": "string",
  "files": {
    "/App.js": { "code": "..." },
    "/components/Button.js": { "code": "..." }
  },
  "generatedFiles": ["/App.js", "/components/Button.js"]
}

 **Rules**:

- Validate that all files referenced in generatedFiles exist in files
- Do not include incomplete code or reference missing imports. Every import must resolve.
-Do not import any component that you haven’t defined in the files object. Missing files will cause runtime errors.
- Ensure all components are functional and can be rendered without errors.
-When using react-chartjs-2, always import and register necessary chart types and components (e.g., CategoryScale, LinearScale, PointElement, BarElement, LineElement, etc.) using ChartJS.register(...) at the top. Otherwise, the chart will break in Chart.js v3+.
-Make sure if using react-chartjs-2, you import and register necessary chart types and components (e.g., CategoryScale, LinearScale, PointElement, BarElement, LineElement, etc.) using ChartJS.register(...) at the top. Otherwise, the chart will break in Chart.js v3+.
Explanation:
- Keep it 1 or two liner just .


Here’s the reformatted and improved version of your prompt:

Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return a JSON object like:
{
  "projectTitle": "string",
  "explanation": "string",
  "files": {
    "/App.js": { "code": "..." },
    "/components/Button.js": { "code": "..." }
  },
  "generatedFiles": ["/App.js", "/components/Button.js"]
}
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.js": {
    "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='p-4 bg-gray-100 text-center'>\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
  }
}
  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required
  
  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
  -Add Emoji icons whenever needed to give good user experinence
  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
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
