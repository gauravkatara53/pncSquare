"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

export default function CustomSignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoaded) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId }); // Clerk handles session
        window.location.href = "/"; // redirect
      } else {
        console.log(result); // handle 2FA, etc.
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow-lg w-[350px] space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Sign In</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  );
}
