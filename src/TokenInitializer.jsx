import { useMutation } from "convex/react";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { api } from "../convex/_generated/api";

export default function TokenInitializer() {
  const { user } = useUser();
  const onUserSignup = useMutation(api.workspace.onUserSignup);

  useEffect(() => {
    if (user?.id) {
      onUserSignup({ clerkId: user.id }).catch((err) =>
        console.error("Signup token init failed:", err)
      );
    }
  }, [user?.id]);

  return null;
}
