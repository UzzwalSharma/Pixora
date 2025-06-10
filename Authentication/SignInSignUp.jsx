import React, { useEffect } from "react";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { Toaster, toast } from "sonner";
import CustomSignInSignUp from "./CustomSignInSignUp";
const SignInSignUp = ({ isSignUp = false }) => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Successfully signed in!", {
        description: "Welcome back to Pixora 🚀",
        duration: 3000,
      });
    }
  }, [isSignedIn]);

  return (
    <div className="h-screen bg-gray-100">
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />

      {/* Left Side with Image */}
      {/* <div
        className="hidden sm:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/view-3d-woman-using-laptop.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div> */}

      {/* Right Side with Sign In/Sign Up Form */}
      {/* <div className="w-full sm:w-1/2 flex items-center justify-center py-6 sm:py-0"> */}
       

          {/* <div className="rounded-lg p-6 space-y-4 transform transition-all duration-500 ease-in-out hover:scale-105"> */}
            <CustomSignInSignUp />
          {/* </div> */}
       
      {/* </div> */}
    </div>
  );
};

export default SignInSignUp;
