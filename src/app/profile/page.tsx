"use client";

import { UserProfile, useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function ProfilePage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="sm:py-10 py-4 flex items-center justify-center ">
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full h-2 max-w-7xl relative ",
            card: "w-full h-full",
          },
        }}
      />
    </div>
  );
}
