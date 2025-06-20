import React from "react";
import { useQuery } from "convex/react";
import { api } from "/convex/_generated/api";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Nav from "/src/Workspace/Workspace_Nav.jsx";
import Chatbar from "/src/Workspace/Chatbar.jsx";
import { MessagesProvider } from "./MessagesContext";
import Pixora_Editor from "./Pixora_Editor";
export default function MainWorkspace() {
  const { user, isLoaded } = useUser();
  const { workspaceId } = useParams();
  const workspaceData = useQuery(api.workspace.getById, {
    id: workspaceId,
  });

  console.log("workspaceId:", workspaceId);
  console.log("workspaceData:", workspaceData);

  // Handle loading state
  if (workspaceData === undefined) {
    return <div>Loading...</div>;
  }

  // Handle case where workspace doesn't exist
  if (workspaceData === null) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="bg-black text-white h-screen">
      <div className="main relative flex-1 min-h-screen overflow-hidden">
        <Nav />
        <div className="content w-full  px-8 py-4 pr-8">
           <MessagesProvider>
          <div class="grid grid-cols-4 gap-4">
            {/* <!-- 25% width content --> */}
            <div class="col-span-1">
              <Chatbar />
            </div>
            {/* <!-- 75% width content --> */}
            <div class="col-span-3  h-75">
              <Pixora_Editor />
            </div>
          </div>
         </MessagesProvider>
        </div>
      </div>
    </div>
  );
}
