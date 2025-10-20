import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Pncsquare | Engineering College Information Platform",
  description:
    "Learn about Pncsquare - India's leading platform for engineering college information, entrance exam updates, and placement guidance. Get detailed insights about colleges, exams, and placements.",
  keywords:
    "Pncsquare about us, engineering colleges india, entrance exam information, college placement data, engineering admission guidance",
  openGraph: {
    title: "About Pncsquare - Your Guide to Engineering Education",
    description:
      "Discover how Pncsquare helps engineering aspirants make informed decisions about colleges, entrance exams, and placements across India.",
    url: "https://pncsquare.in/aboutus",
    siteName: "Pncsquare",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pncsquare - Engineering Education Guide",
    description:
      "Your trusted source for engineering college information, entrance exam updates, and placement guidance in India.",
    creator: "@pncsquare",
    site: "@pncsquare",
  },
  alternates: {
    canonical: "https://pncsquare.in/aboutus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
