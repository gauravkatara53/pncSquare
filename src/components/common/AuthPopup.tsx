"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SignIn = dynamic(() => import("@clerk/nextjs").then((m) => m.SignIn), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DynamicUserStatus = dynamic(() => import("./UserStatus"), {
  ssr: false,
});

interface AuthPopupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "signIn" | "signUp";
  setMode: React.Dispatch<React.SetStateAction<"signIn" | "signUp">>;
}

export default function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  const handleAuthChange = (signedIn: boolean) => setIsSignedIn(signedIn);

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

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  // Auto open after 30s for unsigned users
  useEffect(() => {
    if (isSignedIn === false) {
      const hasShown = sessionStorage.getItem("authPopupShown");
      if (!hasShown) {
        const timeout = setTimeout(() => {
          setOpen(true);
          sessionStorage.setItem("authPopupShown", "true");
        }, 30000);
        return () => clearTimeout(timeout);
      }
    }
  }, [isSignedIn, setOpen]);

  if (!open || isSignedIn) return null;

  return (
    <>
      <DynamicUserStatus onAuthChange={handleAuthChange} />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div
          ref={popupRef}
          className="p-6 rounded-xl w-[400px] relative bg-white"
        >
          <SignIn routing="hash" afterSignInUrl="/" />
        </div>
      </div>
    </>
  );
}
