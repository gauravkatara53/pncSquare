"use client";

import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CurrentYearStatsProps {
  currentExam: {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    currentYear: {
      general: number;
      obc: number;
      sc: number;
      st: number;
      change: {
        general: number;
        obc: number;
        sc: number;
        st: number;
      };
    };
    formatValue: (value: number) => string;
  };
  selectedYear: string;
}

export function CurrentYearStats({
  currentExam,
  selectedYear,
}: CurrentYearStatsProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <currentExam.icon className="h-6 w-6 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">
            {currentExam.name} Cutoff {selectedYear}
          </h2>
        </div>
        <p className="text-slate-600">Latest cutoff data and trends</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="border border-slate-200 shadow-sm p-6 text-center bg-blue-50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">General</span>
            <div className="flex items-center">
              {currentExam.currentYear.change.general > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {currentExam.formatValue(currentExam.currentYear.general)}
          </div>
          <div
            className={`text-xs ${
              currentExam.currentYear.change.general > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {currentExam.currentYear.change.general > 0 ? "↑" : "↓"}{" "}
            {Math.abs(currentExam.currentYear.change.general)}%
          </div>
        </Card>

        <Card className="border border-slate-200 shadow-sm p-6 text-center bg-green-50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">OBC-NCL</span>
            <div className="flex items-center">
              {currentExam.currentYear.change.obc > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {currentExam.formatValue(currentExam.currentYear.obc)}
          </div>
          <div
            className={`text-xs ${
              currentExam.currentYear.change.obc > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {currentExam.currentYear.change.obc > 0 ? "↑" : "↓"}{" "}
            {Math.abs(currentExam.currentYear.change.obc)}%
          </div>
        </Card>

        <Card className="border border-slate-200 shadow-sm p-6 text-center bg-amber-50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">SC</span>
            <div className="flex items-center">
              {currentExam.currentYear.change.sc > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {currentExam.formatValue(currentExam.currentYear.sc)}
          </div>
          <div
            className={`text-xs ${
              currentExam.currentYear.change.sc > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {currentExam.currentYear.change.sc > 0 ? "↑" : "↓"}{" "}
            {Math.abs(currentExam.currentYear.change.sc)}%
          </div>
        </Card>

        <Card className="border border-slate-200 shadow-sm p-6 text-center bg-purple-50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">ST</span>
            <div className="flex items-center">
              {currentExam.currentYear.change.st > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {currentExam.formatValue(currentExam.currentYear.st)}
          </div>
          <div
            className={`text-xs ${
              currentExam.currentYear.change.st > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {currentExam.currentYear.change.st > 0 ? "↑" : "↓"}{" "}
            {Math.abs(currentExam.currentYear.change.st)}%
          </div>
        </Card>
      </div>
    </section>
  );
}
