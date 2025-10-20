import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | PNC Square - Connect With Our Team",
  description:
    "Get in touch with PNC Square's team for business inquiries, support, partnerships, or general assistance. We're here to help you with your educational journey.",
  openGraph: {
    title: "Contact Us | PNC Square - Connect With Our Team",
    description:
      "Get in touch with PNC Square's team for business inquiries, support, partnerships, or general assistance. We're here to help you with your educational journey.",
    url: "https://pncsquare.in/contact",
    siteName: "PNC Square",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | PNC Square - Connect With Our Team",
    description:
      "Get in touch with PNC Square's team for business inquiries, support, partnerships, or general assistance. We're here to help you with your educational journey.",
  },
  alternates: {
    canonical: "https://pncsquare.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
