import NewsMainPage from "@/components/News/newsPage";

export const metadata = {
  title: "Latest News | Pncsquare",
  description:
    "Stay updated with the latest news and updates on education, courses, entrance exams, and more on Pncsquare.",
  keywords: [
    "news",
    "education news",
    "course updates",
    "entrance exam news",
    "Pncsquare",
  ],
  openGraph: {
    title: "Latest News | Pncsquare",
    description:
      "Stay updated with the latest news and updates on education, courses, entrance exams, and more on Pncsquare.",
    url: "https://pncsquare.in/news",
    siteName: "Pncsquare",
    images: [
      {
        url: "https://pncsquare.in/og-image-news.png",
        width: 1200,
        height: 630,
        alt: "Pncsquare News",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest News | Pncsquare",
    description:
      "Stay updated with the latest news and updates on education, courses, entrance exams, and more on Pncsquare.",
    images: ["https://pncsquare.in/og-image-news.png"],
  },
  alternates: {
    canonical: "https://pncsquare.in/news",
  },
};

export default function NewsPage() {
  return (
    <div>
      <NewsMainPage />
    </div>
  );
}
