"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { examData } from "./data";
import { Loader2, XCircle } from "lucide-react";

interface HeroSectionProps {
  selectedExam: string;
  selectedYear: string;
  selectedCategory: string;
  selectedQuota: string;
  selectedRound: string;
  selectedSubCategory: string;
  onExamChange: (exam: string) => void;
  onYearChange: (year: string) => void;
  onCategoryChange: (category: string) => void;
  onQuotaChange: (quota: string) => void;
  onRoundChange: (round: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  isAnyFilterSelected: boolean;
  loading: boolean;
  isNEET?: boolean;
}

export function HeroSection({
  selectedExam,
  selectedYear,
  selectedCategory,
  selectedQuota,
  selectedRound,
  selectedSubCategory,
  onExamChange,
  onYearChange,
  onCategoryChange,
  onQuotaChange,
  onRoundChange,
  onSubCategoryChange,
  clearFilters,
  applyFilters,
  isAnyFilterSelected,
  loading,
  isNEET = false,
}: HeroSectionProps) {
  // Base rounds for all exams except 2024 year (which hides Round 6)
  const baseRounds = [
    { value: "Round-1", label: "Round 1" },
    { value: "Round-2", label: "Round 2" },
    { value: "Round-3", label: "Round 3" },
    { value: "Round-4", label: "Round 4" },
    { value: "Round-5", label: "Round 5" },
  ];

  // When year is not 2024, Round 6 is shown
  const roundsWithRound6 = [
    ...baseRounds,
    { value: "Round-6", label: "Round 6" },
  ];

  // Additional CSAB rounds for JEE Main
  const csabRounds = [
    { value: "CSAB-1", label: "CSAB 1" },
    { value: "CSAB-2", label: "CSAB 2" },
    { value: "CSAB-3", label: "CSAB 3" },
  ];

  // Determine rounds to display based on selectedYear and selectedExam
  let roundsToDisplay: { value: string; label: string }[] = [];
  if (selectedYear === "2024") {
    // For 2024, never show Round 6
    roundsToDisplay = [...baseRounds];
  } else {
    roundsToDisplay = [...roundsWithRound6];
  }

  // If exam is JEE Main, add CSAB rounds additionally
  if (selectedExam === "JEE-Main") {
    roundsToDisplay = [...roundsToDisplay, ...csabRounds];
  }

  // For JEE Advanced, force quota to 'AI' (All India) and disable quota selector
  const isJeeAdvanced = selectedExam === "JEE-Advanced";

  // Handle quota change internally for JEE Advanced to enforce AI
  React.useEffect(() => {
    if (isJeeAdvanced && selectedQuota !== "AI") {
      onQuotaChange("AI");
    }
  }, [isJeeAdvanced, selectedQuota, onQuotaChange]);

  return (
    <section className="bg-gradient-to-br from-slate-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-4">
            Entrance Exam Cutoff Analysis
          </h1>
          <p className="text-xl hidden sm:block text-slate-600 max-w-3xl mx-auto">
            Comprehensive cutoff trends and analysis for major entrance
            examinations across India
          </p>
        </div>

        {/* Exam Selection Cards with no default selection */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {Object.entries(examData).map(([key, exam]) => {
            const ExamIcon = exam.icon;
            const isSelected = selectedExam === key;
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
                onClick={() => onExamChange(key)}
              >
                <div className="p-4 sm:p-6 text-center">
                  <ExamIcon
                    className={`h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 ${
                      isSelected ? "text-blue-600" : "text-slate-600"
                    }`}
                  />
                  <h3
                    className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
                      isSelected ? "text-blue-900" : "text-slate-900"
                    }`}
                  >
                    {exam.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {exam.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Dropdown Filters with placeholders "Select ..." */}
        <div className="max-w-5xl mx-auto">
          <Card className="border border-slate-200 shadow-sm p-6">
            <div className="flex flex-wrap items-end gap-4">
              {/* Dropdowns each with fixed width for desktop, full width on mobile */}
              <div className="w-full sm:w-auto flex-grow min-w-[120px]">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Academic Year
                </label>
                <Select value={selectedYear} onValueChange={onYearChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quota - hidden for NEET-UG */}
              {!isNEET && (
                <div className="w-full sm:w-auto flex-grow min-w-[120px]">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Quota
                  </label>
                  <Select
                    value={selectedQuota}
                    onValueChange={onQuotaChange}
                    disabled={isJeeAdvanced}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Quota" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="AI">All India</SelectItem>
                      <SelectItem value="HS">Home State</SelectItem>
                      <SelectItem value="OS">Other State</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Subcategory - hidden for NEET-UG */}
              {!isNEET && (
                <div className="w-full sm:w-auto flex-grow min-w-[150px]">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Subcategory
                  </label>
                  <Select
                    value={selectedSubCategory}
                    onValueChange={onSubCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Gender-Neutral">
                        Gender-Neutral
                      </SelectItem>
                      <SelectItem value="Female-only (including Supernumerary)">
                        Female-only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="w-full sm:w-auto flex-grow min-w-[150px]">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Seat Type
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={onCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Seat Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {isNEET ? (
                      // NEET-UG specific seat types
                      <>
                        <SelectItem value="EWS">EWS</SelectItem>
                        <SelectItem value="EWS PwD">EWS PwD</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="General PwD">General PwD</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="OBC PwD">OBC PwD</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="SC PwD">SC PwD</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="ST PwD">ST PwD</SelectItem>
                      </>
                    ) : (
                      // Default seat types for other exams
                      <>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="SC (PwD)">SC (PwD)</SelectItem>
                        <SelectItem value="ST (PwD)">ST (PwD)</SelectItem>
                        <SelectItem value="OBC-NCL (PwD)">
                          OBC-NCL (PwD)
                        </SelectItem>
                        <SelectItem value="EWS (PwD)">EWS (PwD)</SelectItem>
                        <SelectItem value="OPEN (PwD)">OPEN (PwD)</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="EWS">EWS</SelectItem>
                        <SelectItem value="OBC-NCL">OBC-NCL</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Round - different options for NEET-UG vs other exams */}
              <div className="w-full sm:w-auto flex-grow min-w-[120px]">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Round
                </label>
                <Select value={selectedRound} onValueChange={onRoundChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Round" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {isNEET ? (
                      // NEET-UG specific rounds (1, 2, 3)
                      <>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </>
                    ) : (
                      // Other exams rounds
                      roundsToDisplay.map((round) => (
                        <SelectItem key={round.value} value={round.value}>
                          {round.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons container for desktop inline, mobile stacked */}
              <div className="flex space-x-4 mt-4 sm:mt-0 sm:ml-auto">
                <Button
                  onClick={applyFilters}
                  className="w-20 bg-slate-900 hover:bg-slate-700 flex items-center justify-center"
                  disabled={!isAnyFilterSelected || loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>

                <Button
                  onClick={clearFilters}
                  className="w-20 bg-gray-400 hover:bg-gray-700 flex items-center justify-center"
                  disabled={loading}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
