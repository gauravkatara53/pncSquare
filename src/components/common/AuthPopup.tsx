"use client";

import { useEffect, useRef } from "react";
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
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="p-6 rounded-xl w-[400px] relative bg-white"
      >
        {mode === "signIn" ? (
          <div>
            <SignIn routing="hash" afterSignInUrl="/" />
            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signUp")}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <SignUp routing="hash" afterSignUpUrl="/" />
            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <button
                onClick={() => setMode("signIn")}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
