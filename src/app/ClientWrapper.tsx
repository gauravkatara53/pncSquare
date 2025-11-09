"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs"; // ✅ load ClerkProvider immediately
import { Header as Navbar } from "@/components/common/Navbar";

// ✅ Lazy load AuthPopup only (ClerkProvider must not be lazy)
const AuthPopup = dynamic(() => import("@/components/common/AuthPopup"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  // Use this if you need to defer heavy browser-only logic
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <ClerkProvider>
      <Navbar />
      {children}
      {/* Lazy features can wait until after hydration */}
      {isReady && (
        <AuthPopup
          open={false}
          setOpen={() => {}}
          mode="signIn"
          setMode={() => {}}
        />
      )}
    </ClerkProvider>
  );
}
