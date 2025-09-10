import "./globals.css";
import { Header as Navbar } from "@/components/common/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P&C square - College & Exam Finder",
  description: "Find your dream IIT, NIT, or other colleges easily.",
  icons: {
    icon: "/favicon.png", // Default favicon
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", // Optional for Apple devices
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
