import { useMutation } from "convex/react";
import { api } from "/convex/_generated/api"; // adjust path if needed
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkspaceTest() {
  const { user, isLoaded } = useUser();
  const sendMessage = useMutation(api.workspace.sendMessage);
  const [message, setMessage] = useState("");
  const [filedata, setFiledata] = useState(null);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!user) {
      alert("You must be signed in to send a message.");
      return;
    }

    try {
      const workspaceId = await sendMessage({
        message,
        filedata,
      });

      setMessage("");
      // ✅ Navigate to dynamic route using returned ID
      navigate(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message: " + error.message);
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-6 max-w-md mx-auto border shadow rounded">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto border shadow rounded">
        <p>Please sign in to send messages.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto border shadow rounded">
      <div className="flex items-center gap-3">
        <img
          src={user.imageUrl || "/default-avatar.png"}
          alt="user"
          className="w-10 h-10 rounded-full border"
        />
        <div>
          <p className="text-sm font-semibold">{user.firstName || "Anonymous"}</p>
        </div>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send to Convex
      </button>
    </div>
  );
}




// Object
// explanation
// : 
// "A feature-rich todo application with real-time statistics, filtering, and beautiful UI. Includes task management with completion tracking, priority editing, activity timeline, and visual progress charts. Built with React hooks for state management, Tailwind CSS for modern styling, lucide-react icons for visual clarity, and react-chartjs-2 for progress visualization."
// files
// : 
// /src/App.js
// : 
// {code: "import { useState, useEffect } from 'react';\nimpor…length}\n        />\n      </div>\n    </div>\n  );\n}"}
// /src/components/AddTodo/AddTodo.js
// : 
// {code: "import { useState } from 'react';\nimport { Plus } …      Add Task\n      </button>\n    </form>\n  );\n}"}
// /src/components/Stats/Stats.js
// : 
// {code: "import { Bar } from 'react-chartjs-2';\nimport { Cl…Completed Tasks\n      </button>\n    </div>\n  );\n}"}
// /src/components/TodoFilter/TodoFilter.js
// : 
// {code: "import { Users, Check } from 'lucide-react';\n\nexpo…el}\n        </button>\n      ))}\n    </div>\n  );\n}"}
// /src/components/TodoItem/TodoItem.js
// : 
// {code: "import { useState } from 'react';\nimport { Check, …\n        </button>\n      </div>\n    </div>\n  );\n}"}
// /src/components/TodoList/TodoList.js
// : 
// {code: "import TodoItem from '../TodoItem/TodoItem';\n\nexpo…         />\n        ))\n      )}\n    </div>\n  );\n}"}
// [[Prototype]]
// : 
// Object
// generatedFiles
// : 
// Array(6)
// 0
// : 
// "/src/App.js"
// 1
// : 
// "/src/components/AddTodo/AddTodo.js"
// 2
// : 
// "/src/components/TodoList/TodoList.js"
// 3
// : 
// "/src/components/TodoItem/TodoItem.js"
// 4
// : 
// "/src/components/TodoFilter/TodoFilter.js"
// 5
// : 
// "/src/components/Stats/Stats.js"
// length
// : 
// 6
// [[Prototype]]
// : 
// Array(0)
// projectTitle
// : 
// "Modern Todo App"
// [[Prototype]]
// : 
// Object