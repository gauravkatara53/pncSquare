"use client";

import Hero from "@/components/common/Hero";
import { TopColleges } from "@/components/common/TopColleges";
import KeyFeatures from "@/components/common/KeyFeatures";
import CutoffTrends from "@/components/common/CutoffTrends";
import { Footer } from "@/components/common/footer";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (isLoaded && user) {
      console.log("👤 User loaded:", user);
      if (!user.unsafeMetadata?.mobileNumber) {
        setShowModal(true);
      }
    }
  }, [isLoaded, user]);

  const handleSaveMobile = async () => {
    if (!user) return;
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          mobileNumber: mobile,
        },
      });
      console.log("✅ Mobile number saved:", mobile);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error saving mobile:", err);
    }
  };

  return (
    <div>
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://ik.imagekit.io/ak2ol9uti/Pncsquare/nit-jsr.webp?tr=w-1600,h-900,fo-auto,q-50,f-auto"
        />
      </Head>
      {/* Home Content */}
      <Hero />
      <KeyFeatures />
      <CutoffTrends />
      <TopColleges />
      <Footer />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              Complete your profile
            </h2>

            {/* Input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile number
            </label>
            <input
              type="tel"
              value={mobile}
              maxLength={10}
              onChange={(e) => {
                // allow only digits
                const value = e.target.value.replace(/\D/g, "");
                setMobile(value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 
                   focus:outline-none focus:ring-2 focus:ring-gray-800 
                   focus:border-gray-800 text-sm tracking-widest text-center"
              placeholder="Enter 10-digit mobile"
            />

            {/* Validation Message */}
            {mobile && mobile.length !== 10 && (
              <p className="text-xs text-red-500 mb-4">
                Mobile number must be 10 digits
              </p>
            )}

            {/* Primary Button */}
            <button
              onClick={handleSaveMobile}
              disabled={mobile.length !== 10}
              className={`w-full py-2.5 rounded-md font-medium text-sm shadow-sm transition
          ${
            mobile.length === 10
              ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
