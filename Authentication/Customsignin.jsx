"use client";
import {
  SignIn,
  SignInStep,
  SignInStart,
  SignInFactorOne,
  useSignIn,
} from "@clerk/elements/sign-in";
import { Clerk } from "@clerk/elements/common";

export default function CustomSignIn() {
  return (
    <SignIn>
      <SignInStep name="start">
        <Clerk.Field name="identifier">
          <Clerk.Label className="text-sm text-white mb-1">Email</Clerk.Label>
          <Clerk.Input className="w-full p-3 rounded-xl bg-zinc-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-[#46dd4e]" />
          <Clerk.FieldError className="text-red-400 text-xs mt-1" />
        </Clerk.Field>

        <SignInStart>
          <Clerk.Button className="w-full mt-4 bg-[#46dd4e] hover:bg-[#3ac942] text-black font-semibold py-2 rounded-full shadow-lg">
            Continue
          </Clerk.Button>
        </SignInStart>
      </SignInStep>

      <SignInStep name="factorOne">
        <SignInFactorOne />
      </SignInStep>
    </SignIn>
  );
}
