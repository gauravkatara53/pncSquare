import ReviewsMainPage from "@/components/Review/reviewPage";

export const metadata = {
  title: "Reviews | Pncsquare",
  description:
    "Read detailed reviews and user feedback on courses, colleges, and entrance exams on Pncsquare.",
  keywords: [
    "reviews",
    "user feedback",
    "course reviews",
    "college reviews",
    "Pncsquare reviews",
  ],
  openGraph: {
    title: "Reviews | Pncsquare",
    description:
      "Read detailed reviews and user feedback on courses, colleges, and entrance exams on Pncsquare.",
    url: "https://pncsquare.in/reviews",
    siteName: "Pncsquare",
    images: [
      {
        url: "https://pncsquare.in/og-image-reviews.png",
        width: 1200,
        height: 630,
        alt: "Pncsquare Reviews",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews | Pncsquare",
    description:
      "Read detailed reviews and user feedback on courses, colleges, and entrance exams on Pncsquare.",
    images: ["https://pncsquare.in/og-image-reviews.png"],
  },
  alternates: {
    canonical: "https://pncsquare.in/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <div>
      <ReviewsMainPage />
    </div>
  );
}
