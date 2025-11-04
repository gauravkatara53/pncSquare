"use client";

import { Card } from "@/components/ui/card";

import { TrendingUp, TrendingDown } from "lucide-react";
import { examCards } from "@/Data/cutoffTrends";

export default function CutoffTrends() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Cutoff Trends
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Track admission cutoff trends across major entrance examinations
        </p>
      </div>

      {/* Responsive grid of Exam Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center items-stretch">
        {examCards.map((exam, idx) => (
        <ExamCard key={idx} {...exam} />
        ))}
      </div>
      </div>
    </section>
  );
}

/* --- Reusable Exam Card --- */
function ExamCard({
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
}) {
  return (
    <Card className={`p-6 ${bgColor} border-0`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-semibold ${color} text-lg`}>{name}</h3>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
        <div
          className={`flex items-center gap-1 text-sm ${
            trending === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trending === "up" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${color}`}>{currentCutoff}</span>
        <span className="text-sm text-gray-500">from {previousCutoff}</span>
      </div>
    </Card>
  );
}
