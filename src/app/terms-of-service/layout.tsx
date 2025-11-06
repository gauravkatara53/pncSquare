import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Pncsquare",
  description:
    "Read our Terms of Use to understand the rules and guidelines for using Pncsquare's educational services platform. Learn about content ownership, payment terms, and user responsibilities.",
  openGraph: {
    title: "Terms of Use | Pncsquare",
    description:
      "Read our Terms of Use to understand the rules and guidelines for using Pncsquare's educational services platform. Learn about content ownership, payment terms, and user responsibilities.",
    url: "https://pncsquare.in/terms-of-service",
    siteName: "Pncsquare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Pncsquare",
    description:
      "Read our Terms of Use to understand the rules and guidelines for using Pncsquare's educational services platform. Learn about content ownership, payment terms, and user responsibilities.",
  },
  alternates: {
    canonical: "https://pncsquare.in/terms-of-service",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
