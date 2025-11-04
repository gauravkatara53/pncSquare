"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";

// ✅ Lazy-load non-critical sections for faster LCP
const Hero = dynamic(() =>
  import("@/components/common/Hero").then((m) => m.default)
);
const KeyFeatures = dynamic(() =>
  import("@/components/common/KeyFeatures").then((m) => m.default)
);
const CutoffTrends = dynamic(() =>
  import("@/components/common/CutoffTrends").then((m) => m.default)
);
const TopColleges = dynamic(() =>
  import("@/components/common/TopColleges").then((m) => m.TopColleges)
);
const Footer = dynamic(
  () => import("@/components/common/footer").then((m) => m.Footer),
  { ssr: false }
);

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (isLoaded && user && !user.unsafeMetadata?.mobileNumber) {
      setShowModal(true);
    }
  }, [isLoaded, user]);

  const handleSaveMobile = useCallback(async () => {
    if (!user) return;
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          mobileNumber: mobile,
        },
      });
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error saving mobile:", err);
    }
  }, [user, mobile]);

  return (
    <div className="relative min-h-screen bg-white">
      <Head>
        {/* ✅ Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="https://ik.imagekit.io/your-id/first-hero.webp?tr=w-1200,q-80,f-webp"
        />
      </Head>

      {/* ✅ Page Sections */}
      <Hero />
      <KeyFeatures />
      <CutoffTrends />
      <TopColleges />
      <Footer />

      {/* ✅ Profile Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-sm animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
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
                const value = e.target.value.replace(/\D/g, ""); // digits only
                setMobile(value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 
                focus:outline-none focus:ring-2 focus:ring-gray-800 
                focus:border-gray-800 text-sm tracking-widest text-center"
              placeholder="Enter 10-digit mobile"
            />

            {/* Validation */}
            {mobile && mobile.length !== 10 && (
              <p className="text-xs text-red-500 mb-4 text-center">
                Mobile number must be 10 digits
              </p>
            )}

            {/* Primary Button */}
            <button
              onClick={handleSaveMobile}
              disabled={mobile.length !== 10}
              className={`w-full py-2.5 rounded-md font-medium text-sm shadow-sm transition-all duration-200
                ${
                  mobile.length === 10
                    ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
