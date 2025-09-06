"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { examData } from "./data";

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
  onApplyFilters: () => void;
  allFiltersSelected: boolean;
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
  onApplyFilters,
  allFiltersSelected,
}: HeroSectionProps) {
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
            <div className="grid md:grid-cols-6 gap-4">
              <div>
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
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Quota
                </label>
                <Select value={selectedQuota} onValueChange={onQuotaChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Quota" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="AI">All India</SelectItem>
                    <SelectItem value="HS">Home State </SelectItem>
                    <SelectItem value="OS">Other State </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  category
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
              <div>
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
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="SC (PwD)">SC (PwD)</SelectItem>
                    <SelectItem value="ST (PwD)">ST (PwD)</SelectItem>

                    <SelectItem value="OBC-NCL (PwD)">OBC-NCL (PwD)</SelectItem>
                    <SelectItem value="EWS (PwD)">EWS (PwD)</SelectItem>
                    <SelectItem value="OPEN (PwD)">OPEN (PwD)</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="EWS">EWS</SelectItem>
                    <SelectItem value="OBC-NCL">OBC-NCL</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Round
                </label>
                <Select value={selectedRound} onValueChange={onRoundChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Round" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Round-1">Round 1</SelectItem>
                    <SelectItem value="Round-2">Round 2</SelectItem>
                    <SelectItem value="Round-3">Round 3</SelectItem>
                    <SelectItem value="Round-4">Round 4</SelectItem>
                    <SelectItem value="Round-5">Round 5</SelectItem>
                    <SelectItem value="Round-6">Round 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  disabled={!allFiltersSelected}
                  className={`w-full ${
                    allFiltersSelected
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={onApplyFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
