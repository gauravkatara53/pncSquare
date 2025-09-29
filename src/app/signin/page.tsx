"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded shadow-md w-[400px]">
        <SignIn path="/signin" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
}
