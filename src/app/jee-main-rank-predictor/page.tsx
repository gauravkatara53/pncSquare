import { Metadata } from "next";
import JEERankPredictor1 from "./jee-main-rank-predictor";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://pncsquare.in/jee-main-rank-predictor";

  return {
    title: "JEE Main Rank Predictor 2026 | Pncsquare",
    description:
      "Use our JEE Main Rank Predictor 2026 to find out your expected rank based on your percentile or marks.",
    keywords: [
      "JEE Main rank predictor",
      "JEE Main rank prediction",
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
      title: "College Predictor 2026 - IIT, NIT, IIIT Branch Prediction",
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

export default function JEERankPredictor() {
  return <JEERankPredictor1 />;
}
