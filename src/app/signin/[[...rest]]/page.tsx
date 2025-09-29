"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  console.log("Rendering Clerk SignIn page...");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <h1>Main heading</h1>
      <p>This is the para section</p>
      <div className="p-8 bg-white rounded shadow-md w-[400px]">
        <SignIn path="/signin" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
}
