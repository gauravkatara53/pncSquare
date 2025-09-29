"use client";

import { useEffect, useRef } from "react";
import { SignIn } from "@clerk/nextjs";

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
      <div ref={popupRef} className="p-6 rounded-xl w-[400px] relative">
        <div>
          <SignIn routing="hash" afterSignInUrl="/" />
        </div>
      </div>
    </div>
  );
}
