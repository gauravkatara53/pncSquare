"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { Header as Navbar } from "@/components/common/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { GA_TRACKING_ID } from "@/lib/gtag";

// ✅ Lazy-load heavy components only after hydration
const AuthPopup = dynamic(() => import("@/components/common/AuthPopup"), {
  ssr: false,
  loading: () => null,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect ensures all browser-only features load post-hydration
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <ClerkProvider>
      <Navbar />
      <main suppressHydrationWarning>{children}</main>

      {/* ✅ Lazy feature after hydration */}
      {isHydrated && (
        <AuthPopup
          open={false}
          setOpen={() => {}}
          mode="signIn"
          setMode={() => {}}
        />
      )}

      {/* ✅ Safe Analytics (Suspense ensures async loading) */}
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>

      {/* ✅ Google Analytics — only if ID exists */}
      {GA_TRACKING_ID && (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined') {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                }
              `,
            }}
          />
        </>
      )}
    </ClerkProvider>
  );
}
