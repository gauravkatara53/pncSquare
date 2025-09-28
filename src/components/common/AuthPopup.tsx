"use client";

import { SignIn, SignUp } from "@clerk/nextjs";

interface AuthPopupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "signIn" | "signUp";
  setMode: React.Dispatch<React.SetStateAction<"signIn" | "signUp">>;
}

export default function AuthPopup({
  open,
  setOpen,
  mode,
  setMode,
}: AuthPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] relative">
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={() => setOpen(false)}
          aria-label="Close authentication popup"
        >
          ✖
        </button>

        {mode === "signIn" ? (
          <SignIn routing="hash" signUpUrl="/sign-up" afterSignInUrl="/" />
        ) : (
          <SignUp routing="hash" signInUrl="/sign-in" afterSignUpUrl="/" />
        )}

        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
          aria-label="Toggle sign in / sign up"
        >
          {mode === "signIn" ? "Create an account" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
}
