import { Metadata } from "next";
import dynamic from "next/dynamic";

// Import the client component with dynamic import to handle client-side navigation
const CollegePredictorClientPage = dynamic(
  () => import("./college-predictorclient"),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    ),
  }
);

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://pncsquare.in/college-predictor";

  return {
    title:
      "College Predictor 2025 - IIT, NIT, IIIT Branch Prediction | Pncsquare",
    description:
      "Use our College Predictor 2025 to find out which IIT, NIT, IIIT, and other top engineering colleges you can get based on your JEE Main, JEE Advanced, or other entrance exam ranks.",
    keywords: [
      "college predictor",
      "IIT branch predictor",
      "NIT college predictor",
      "JEE Main college predictor",
      "JEE Advanced college predictor",
      "engineering college predictor",
      "branch predictor",
      "college admission chances",
      "IIT admission predictor",
      "NIT admission predictor",
      "engineering branch prediction",
      "college cutoff predictor",
      "Pncsquare",
      "JEE counselling",
      "engineering admissions 2025",
    ],
    openGraph: {
      title: "College Predictor 2025 - IIT, NIT, IIIT Branch Prediction",
      description:
        "Predict your chances of admission in top engineering colleges based on your rank. Get detailed insights about cutoffs, placement statistics, and more.",
      images: [
        {
          url: "/public/images/college-predictor-og.jpg",
          width: 800,
          height: 600,
          alt: "College Predictor Tool",
        },
      ],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

export default function CollegePredictor() {
  return <CollegePredictorClientPage />;
}
