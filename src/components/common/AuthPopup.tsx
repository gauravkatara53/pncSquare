"use client";

import { useEffect, useRef } from "react";
import { SignIn, useUser } from "@clerk/nextjs";

interface AuthPopupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "signIn" | "signUp";
  setMode: React.Dispatch<React.SetStateAction<"signIn" | "signUp">>;
}

export default function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const { isSignedIn } = useUser(); // Clerk hook to check login status
  const popupRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
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

  // Auto-open every 30s if user not logged in
  useEffect(() => {
    if (!isSignedIn) {
      const interval = setInterval(() => {
        setOpen(true);
      }, 60000); // 60 sec

      return () => clearInterval(interval);
    }
  }, [isSignedIn, setOpen]);

  if (!open || isSignedIn) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={popupRef} className="p-6 rounded-xl w-[400px] relative">
        <div>
          <SignIn routing="hash" afterSignInUrl="/" />
        </div>
      </div>
    </div>
  );
}
