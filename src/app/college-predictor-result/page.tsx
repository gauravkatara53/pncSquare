import { Metadata } from "next";
import { Suspense } from "react";
import CollegePredictorResultPage from "./college-predictor-result-client";
import CollegePredictorResultSkeleton from "./CollegePredictorResultSkeleton";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://pncsquare.in/college-predictor-result";

  return {
    title:
      "College Predictor Result 2026 - IIT, NIT, IIIT Branch Prediction | Pncsquare",
    description:
      "Use our College Predictor 2026 to find out which IIT, NIT, IIIT, and other top engineering colleges you can get based on your JEE Main, JEE Advanced, or other entrance exam ranks.",
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
      "engineering admissions 2026",
    ],
    openGraph: {
      title: "College Predictor Result 2026 - IIT, NIT, IIIT Branch Prediction",
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
  return (
    <Suspense fallback={<CollegePredictorResultSkeleton />}>
      <CollegePredictorResultPage />
    </Suspense>
  );
}
