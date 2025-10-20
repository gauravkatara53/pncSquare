import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Pncsquare | Engineering Education Platform",
  description:
    "Learn about how Pncsquare handles and protects your personal information. Our privacy policy explains data collection, usage, and your rights.",
  keywords:
    "Pncsquare privacy policy, data protection, user privacy, cookie policy, GDPR compliance",
  openGraph: {
    title: "Privacy Policy - Pncsquare",
    description:
      "Understanding how we protect your privacy and handle your data at Pncsquare",
    url: "https://pncsquare.in/privacy-policy",
    siteName: "Pncsquare",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://pncsquare.in/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
