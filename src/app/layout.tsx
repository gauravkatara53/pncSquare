import "./globals.css";
import { Header as Navbar } from "@/components/common/Navbar";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "P&C square - College & Exam Finder",
  description: "Find your dream IIT, NIT, or other colleges easily.",
  icons: {
    icon: "/favicon.ico", // Default favicon
    shortcut: "/favicon.ico",
    apple: "/favicon.ico", // Optional for Apple devices
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
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="mx-auto">{children}</main>
      </body>
    </html>
  );
}
