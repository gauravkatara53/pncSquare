"use client";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { examCards } from "@/Data/cutoffTrends";

// ✅ Lazy-load lucide icons (saves ~40–50KB)
const TrendingUp = dynamic(() =>
  import("lucide-react").then((mod) => mod.TrendingUp)
);
const TrendingDown = dynamic(() =>
  import("lucide-react").then((mod) => mod.TrendingDown)
);

function CutoffTrends() {
  // ✅ Memoize static data for faster re-render
  const memoizedCards = useMemo(() => examCards, []);

  return (
    <section
      className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50"
      aria-labelledby="cutoff-heading"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="cutoff-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Cutoff Trends
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Track admission cutoff trends across major entrance examinations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {memoizedCards.map((exam, idx) => (
            <MemoizedExamCard key={idx} {...exam} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(CutoffTrends);

/* --- Optimized & Memoized Exam Card --- */
const ExamCard = ({
  name,
  currentCutoff,
  previousCutoff,
  change,
  trending,
  color,
  bgColor,
  desc,
}: {
  name: string;
  currentCutoff: string;
  previousCutoff: string;
  change: string;
  trending: "up" | "down";
  color: string;
  bgColor: string;
  desc: string;
}) => {
  const isUp = trending === "up";
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <Card
      className={`p-6 ${bgColor} border-0 shadow-md hover:shadow-lg transition-all duration-300 transform-gpu`}
      role="region"
      aria-label={`${name} cutoff card`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <h3 className={`font-semibold ${color} text-lg truncate`}>{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
        </div>
        <div
          className={`flex items-center gap-1 text-sm ${
            isUp ? "text-green-600" : "text-red-600"
          }`}
          aria-label={`Trend ${isUp ? "rising" : "falling"} by ${change}`}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span>{change}</span>
        </div>
      </div>

      {/* Cutoff Data */}
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${color}`}>{currentCutoff}</span>
        <span className="text-sm text-gray-500 truncate">
          from {previousCutoff}
        </span>
      </div>
    </Card>
  );
};

// ✅ Memoized to prevent re-renders
const MemoizedExamCard = memo(ExamCard);
