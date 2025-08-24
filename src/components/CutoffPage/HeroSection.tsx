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
  onExamChange: (exam: string) => void;
  onYearChange: (year: string) => void;
  onCategoryChange: (category: string) => void;
  onApplyFilters: () => void;
}

export function HeroSection({
  selectedExam,
  selectedYear,
  selectedCategory,
  onExamChange,
  onYearChange,
  onCategoryChange,
  onApplyFilters,
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

        {/* Exam Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {Object.entries(examData).map(([key, exam]) => {
            const ExamIcon = exam.icon;
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  selectedExam === key
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
                onClick={() => onExamChange(key)}
              >
                <div className="p-4 sm:p-6 text-center">
                  {" "}
                  {/* smaller padding on mobile */}
                  <ExamIcon
                    className={`h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 ${
                      selectedExam === key ? "text-blue-600" : "text-slate-600"
                    }`}
                  />
                  <h3
                    className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
                      selectedExam === key ? "text-blue-900" : "text-slate-900"
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

        {/* Quick Filters */}
        <div className="max-w-3xl mx-auto">
          <Card className="border border-slate-200 shadow-sm p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Academic Year
                </label>
                <Select value={selectedYear} onValueChange={onYearChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={onCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC-NCL</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Round
                </label>
                <Select defaultValue="final">
                  <SelectTrigger>
                    <SelectValue placeholder="Round" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="final">Final Round</SelectItem>
                    <SelectItem value="round6">Round 6</SelectItem>
                    <SelectItem value="round5">Round 5</SelectItem>
                    <SelectItem value="round4">Round 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  className="w-full bg-slate-900 hover:bg-slate-800"
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
