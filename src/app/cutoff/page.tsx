"use client";

import { useState } from "react";
import { HeroSection } from "@/components/CutoffPage/HeroSection";
import { CurrentYearStats } from "@/components/CutoffPage/CurrentYearStats";
import { TrendsChart } from "@/components/CutoffPage/TrendsChart";
import { FilteredCollegeSearchResults } from "@/components/CutoffPage/FilteredCollegeSearchResults";
import { CollegeWiseCutoffs } from "@/components/CutoffPage/CollegeWiseCutoffs";
import { ExamInfoCards } from "@/components/CutoffPage/ExamInfoCards";
import { examData, extendedCollegeData } from "@/components/CutoffPage/data";

export default function CutoffPage() {
  const [selectedExam, setSelectedExam] = useState("jee-advanced");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedColleges, setExpandedColleges] = useState<
    Record<number, boolean>
  >({});

  const currentExam = examData[selectedExam as keyof typeof examData];

  const handleApplyFilters = () => {
    setShowFilteredResults(true);
  };

  const toggleCollegeExpansion = (collegeId: number) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [collegeId]: !prev[collegeId],
    }));
  };

  const filteredColleges =
    extendedCollegeData[
      selectedExam as keyof typeof extendedCollegeData
    ]?.filter(
      (college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        selectedExam={selectedExam}
        selectedYear={selectedYear}
        selectedCategory={selectedCategory}
        onExamChange={setSelectedExam}
        onYearChange={setSelectedYear}
        onCategoryChange={setSelectedCategory}
        onApplyFilters={handleApplyFilters}
      />
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        <FilteredCollegeSearchResults
          showFilteredResults={showFilteredResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredColleges={filteredColleges}
          currentExam={currentExam}
          selectedYear={selectedYear}
          selectedCategory={selectedCategory}
          expandedColleges={expandedColleges}
          toggleCollegeExpansion={toggleCollegeExpansion}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CurrentYearStats
          currentExam={currentExam}
          selectedYear={selectedYear}
        />

        <TrendsChart currentExam={currentExam} />

        <CollegeWiseCutoffs selectedExam={selectedExam} />

        <ExamInfoCards selectedExam={selectedExam} />
      </div>
    </div>
  );
}
