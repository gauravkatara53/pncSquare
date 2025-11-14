import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientWrapper"; // ✅ Client-side logic (Clerk, Analytics, etc.)

export const metadata: Metadata = {
  title: "Home | Pncsquare - College Reviews, Cutoffs & Placement Insights",
  description:
    "Discover top colleges in India with Pncsquare. Explore placement records, cutoffs, fees, rankings, courses, and student reviews to find your ideal college.",
  keywords: [
    "college reviews",
    "college finder",
    "exam finder",
    "engineering colleges in India",
    "NIT placements",
    "IIT placements",
    "college cutoffs",
    "college comparison",
    "top colleges in India",
    "college rankings",
    "admission 2025",
    "placement insights",
    "Pncsquare",
  ],
  openGraph: {
    title: "Pncsquare - College Reviews, Cutoffs & Placement Insights",
    description:
      "Find authentic college reviews, cutoffs, and placement stats for top Indian institutes. Plan your admission journey with data-driven insights.",
    url: "https://pncsquare.in",
    siteName: "Pncsquare",
    images: [
      {
        url: "https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pncsquare - College Finder",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pncsquare - College Reviews & Placement Insights",
    description:
      "Explore detailed placement records, fees, and student reviews for top Indian colleges.",
    creator: "@pncsquare_in",
    images: ["https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/og-image.jpg"],
  },
  metadataBase: new URL("https://pncsquare.in"),
  alternates: {
    canonical: "https://pncsquare.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Preconnect for performance */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="" />
        <link
          rel="icon"
          href="https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/favicon.png"
        />
      </head>
      <body suppressHydrationWarning>
        {/* ✅ Client-only layout handles analytics & Clerk */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
