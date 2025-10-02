import CoursesClient from "./CoursesClient";

export const metadata = {
  title: "Courses | Pncsquare",
  description:
    "Explore a wide range of courses on PNC Square. Filter by category, duration, and degree. Find the perfect course tailored to your career goals.",
  keywords: [
    "courses",
    "online courses",
    "college courses",
    "Pncsquare courses",
    "education",
  ],
  openGraph: {
    title: "Courses | Pncsquare",
    description:
      "Explore a wide range of courses on Pncsquare. Filter by category, duration, and degree. Find the perfect course tailored to your career goals.",
    url: "https://pncsquare.in/courses",
    siteName: "Pncsquare",
    images: [
      {
        url: "https://pncsquare.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "PNC Square Courses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses | Pncsquare",
    description:
      "Explore a wide range of courses on Pncsquare. Filter by category, duration, and degree. Find the perfect course tailored to your career goals.",
    images: ["https://pncsquare.in/og-image.png"],
  },
  alternates: {
    canonical: "https://pncsquare.in/courses",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
