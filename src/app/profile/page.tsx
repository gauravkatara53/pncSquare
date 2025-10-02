"use client";

import {
  UserProfile,
  useUser,
  RedirectToSignIn,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // optional if you use shadcn/ui, else just use a normal <button>

export default function ProfilePage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="sm:py-10 py-4 flex flex-col items-center justify-center gap-6">
      {/* User Profile */}
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full max-w-7xl relative",
            card: "w-full h-full shadow-lg",
          },
        }}
      />
      {/* Logout Button */}
      <SignOutButton>
        <Button variant="default" className="px-6 py-2 ">
          Log Out
        </Button>
      </SignOutButton>
    </div>
  );
}
