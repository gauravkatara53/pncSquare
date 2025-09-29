"use client";

import { SignIn } from "@clerk/nextjs";
// imp
export default function TestSignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <h1>main heading </h1>
      <p>this is the para section </p>
      <div className="p-8 bg-white rounded shadow-md w-[400px]">
        <SignIn />
      </div>
    </div>
  );
}
