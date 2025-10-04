import "./globals.css";
import { Header as Navbar } from "@/components/common/Navbar";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag";
import Analytics from "@/components/common/Analytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home | Pncsquare - College & Exam Finder",
  description: "Find your dream IIT, NIT, or other colleges easily.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "https://pncsquare.in/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 text-gray-900">
          <Navbar />
          <main className="mx-auto">{children}</main>

          {/* ✅ Wrap Analytics in Suspense */}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>

          {/* ✅ GA Scripts */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
