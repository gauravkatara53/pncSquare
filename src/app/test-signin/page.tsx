"use client";

import { SignIn } from "@clerk/nextjs";

export default function TestSignInPage() {
  console.log("🔍 Rendering TestSignInPage...");

  // Check if Clerk SignIn is imported correctly
  console.log("Clerk SignIn component:", typeof SignIn);

  // Debug environment (local vs production)
  console.log("Environment:", process.env.NODE_ENV);
  console.log(
    "Clerk Publishable Key:",
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <h1>main heading</h1>
      <p>this is the para section</p>
      <div className="p-8 bg-white rounded shadow-md w-[400px]">
        <SignIn />
      </div>
    </div>
  );
}
