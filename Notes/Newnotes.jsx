import React from 'react'
import { useQuery } from "convex/react";
import { api } from "/convex/_generated/api";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
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
    <div>
            <img
          src={user.imageUrl || "/default-avatar.png"}
          alt="user"
          className="w-10 h-10 rounded-full border"
        />
      <h2 className="text-xl font-semibold mb-4">
        Workspace: {workspaceData.userName}
      </h2>
      <p className="text-gray-700">Message: {workspaceData.message}</p>
      {workspaceData.userImage && (
        <img
          src={workspaceData.userImage}
          alt="User"
          className="w-12 h-12 rounded-full mt-4"
        />
      )}
    </div>
  );
}