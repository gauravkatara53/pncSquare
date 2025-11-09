import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientWrapper"; // ✅ Client boundary

export const metadata: Metadata = {
  title: "Home | Pncsquare - College & Exam Finder",
  description: "Find colleges, cutoffs, and placement insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Client logic stays separate */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
