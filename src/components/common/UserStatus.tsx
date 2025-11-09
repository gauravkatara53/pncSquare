"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface UserStatusProps {
  onAuthChange: (isSignedIn: boolean) => void;
}

export default function UserStatus({ onAuthChange }: UserStatusProps) {
  const { isSignedIn } = useUser();

  useEffect(() => {
    onAuthChange(!!isSignedIn);
  }, [isSignedIn, onAuthChange]);

  return null;
}
