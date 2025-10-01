"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Page() {
  const { user, isLoaded } = useUser();
  const [mobile, setMobile] = useState("");

  const handleSaveMobile = async () => {
    if (!user) {
      console.log("❌ No user found");
      return;
    }

    try {
      console.log("📌 Saving mobile number:", mobile);
      const updatedUser = await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata, // keep existing metadata
          mobileNumber: mobile,
        },
      });

      console.log("✅ Mobile number saved:", updatedUser.unsafeMetadata);
      alert("Mobile number saved!");
    } catch (err) {
      console.error("❌ Error updating user:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />

      {isLoaded && user && (
        <div className="flex flex-col space-y-3 p-4 border rounded-lg w-[300px]">
          <label className="text-sm font-medium">Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border rounded-md p-2"
            placeholder="Enter mobile number"
          />
          <button
            onClick={handleSaveMobile}
            className="bg-blue-600 text-white py-2 rounded-md"
          >
            Save Mobile Number
          </button>
        </div>
      )}
    </div>
  );
}
