// src/components/CutoffPage/CutoffPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { HeroSection } from "@/components/CutoffPage/HeroSection";
import { CurrentYearStats } from "@/components/CutoffPage/CurrentYearStats";
import { TrendsChart } from "@/components/CutoffPage/TrendsChart";
import { FilteredCollegeSearchResults } from "@/components/CutoffPage/FilteredCollegeSearchResults";
import { CollegeWiseCutoffs } from "@/components/CutoffPage/CollegeWiseCutoffs";
import { ExamInfoCards } from "@/components/CutoffPage/ExamInfoCards";
import { examData } from "@/components/CutoffPage/data";
import { apiService } from "@/ApiService/apiService";

// --- Interfaces ---
interface CutoffItem {
  _id: string;
  slug: string;
  examType: string;
  year: number;
  branch: string;
  openingRank: number;
  closingRank: number;
  course: string;
  seatType: string;
  subCategory: string;
  quota: string;
  round: string;
}

interface FilteredCollegeBranch {
  id: string;
  name: string;
  opening: number;
  closing: number;
  course: string;
  seatType: string;
  subCategory: string;
  quota: string;
  round: string;
}

interface FilteredCollege {
  id: string;
  slug: string;
  name: string;
  location: string;
  ranking: string;
  course: string;
  branches: FilteredCollegeBranch[];
}

interface CutoffPageProps {
  urlParams: Record<string, string | string[] | undefined>;
}

export default function CutoffPage({ urlParams }: CutoffPageProps) {
  const router = useRouter();

  // Initialize states from urlParams props instead of useSearchParams
  const [selectedExam, setSelectedExam] = useState(() =>
    typeof urlParams.examType === "string" ? urlParams.examType : "JEE-Advanced"
  );
  const [selectedYear, setSelectedYear] = useState(() =>
    typeof urlParams.year === "string" ? urlParams.year : ""
  );
  const [selectedCategory, setSelectedCategory] = useState(() =>
    typeof urlParams.seatType === "string" ? urlParams.seatType : ""
  );
  const [selectedQuota, setSelectedQuota] = useState(() =>
    typeof urlParams.quota === "string" ? urlParams.quota : ""
  );
  const [selectedRound, setSelectedRound] = useState(() =>
    typeof urlParams.round === "string" ? urlParams.round : ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(() =>
    typeof urlParams.subCategory === "string" ? urlParams.subCategory : ""
  );

  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedColleges, setExpandedColleges] = useState<
    Record<string, boolean>
  >({});
  const [cutoffData, setCutoffData] = useState<CutoffItem[]>([]);

  // When changing filters, update URL query params (client side navigation)
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedExam) params.set("examType", selectedExam);
    if (selectedYear) params.set("year", selectedYear);
    if (selectedCategory) params.set("seatType", selectedCategory);
    if (selectedQuota) params.set("quota", selectedQuota);
    if (selectedRound) params.set("round", selectedRound);
    if (selectedSubCategory) params.set("subCategory", selectedSubCategory);
    // Update URL without page reload
    router.replace(`/cutoff?${params.toString()}`);
  }, [
    selectedExam,
    selectedYear,
    selectedCategory,
    selectedQuota,
    selectedRound,
    selectedSubCategory,
    router,
  ]);

  // Helper to check if all filters are selected
  const areAllFiltersSelected = React.useCallback(
    (): boolean =>
      selectedExam.trim() !== "" &&
      selectedYear.trim() !== "" &&
      selectedCategory.trim() !== "" &&
      selectedQuota.trim() !== "" &&
      selectedRound.trim() !== "" &&
      selectedSubCategory.trim() !== "",
    [
      selectedExam,
      selectedYear,
      selectedCategory,
      selectedQuota,
      selectedRound,
      selectedSubCategory,
    ]
  );

  // Fetch cutoff data when all filters selected
  useEffect(() => {
    if (!areAllFiltersSelected()) {
      setCutoffData([]);
      setShowFilteredResults(false);
      return;
    }
    apiService
      .get<{
        statusCode: number;
        data: CutoffItem[];
        message: string;
        success: boolean;
      }>("/cutoff/all", {
        examType: selectedExam,
        year: Number(selectedYear),
        seatType: selectedCategory,
        quota: selectedQuota,
        round: selectedRound,
        subCategory: selectedSubCategory,
      })
      .then((response) => {
        setCutoffData(response.success ? response.data : []);
        setShowFilteredResults(true);
      })
      .catch(() => {
        setCutoffData([]);
        setShowFilteredResults(true);
      });
  }, [
    selectedExam,
    selectedYear,
    selectedCategory,
    selectedQuota,
    selectedRound,
    selectedSubCategory,
    areAllFiltersSelected,
  ]);

  // Group cutoff data by college slug
  const filteredColleges = cutoffData
    .filter((item) => {
      const normalizedQuery = searchQuery.toLowerCase().replace(/[-\s]/g, "");
      return (
        item.slug
          .toLowerCase()
          .replace(/[-\s]/g, "")
          .includes(normalizedQuery) ||
        item.branch
          .toLowerCase()
          .replace(/[-\s]/g, "")
          .includes(normalizedQuery)
      );
    })
    .reduce((acc: FilteredCollege[], curr) => {
      const existing = acc.find((c) => c.slug === curr.slug);
      const branchItem = {
        id: curr._id,
        name: curr.branch,
        opening: curr.openingRank,
        closing: curr.closingRank,
        course: curr.course,
        seatType: curr.seatType,
        subCategory: curr.subCategory,
        quota: curr.quota,
        round: curr.round,
      };
      if (existing) {
        existing.branches.push(branchItem);
      } else {
        acc.push({
          id: curr._id,
          slug: curr.slug,
          name: curr.slug.replace(/-/g, " ").toUpperCase(),
          location: "",
          ranking: "N/A",
          course: curr.course,
          branches: [branchItem],
        });
      }
      return acc;
    }, []);

  // Get exam data for dropdown
  const allowedExams = Object.keys(examData) as Array<keyof typeof examData>;
  const currentExam = allowedExams.includes(
    selectedExam as keyof typeof examData
  )
    ? examData[selectedExam as keyof typeof examData]
    : null;

  // Toggle college expansion state
  const toggleCollegeExpansion = (collegeSlug: string) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [collegeSlug]: !prev[collegeSlug],
    }));
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        selectedExam={selectedExam}
        selectedYear={selectedYear}
        selectedCategory={selectedCategory}
        selectedQuota={selectedQuota}
        selectedRound={selectedRound}
        selectedSubCategory={selectedSubCategory}
        onExamChange={setSelectedExam}
        onYearChange={setSelectedYear}
        onCategoryChange={setSelectedCategory}
        onQuotaChange={setSelectedQuota}
        onRoundChange={setSelectedRound}
        onSubCategoryChange={setSelectedSubCategory}
        onApplyFilters={() => {}}
        allFiltersSelected={areAllFiltersSelected()}
      />
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        {currentExam && (
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
            allFiltersSelected={areAllFiltersSelected()}
          />
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentExam && (
          <>
            <CurrentYearStats
              currentExam={currentExam}
              selectedYear={selectedYear}
            />
            <TrendsChart currentExam={currentExam} />
            <CollegeWiseCutoffs selectedExam={selectedExam} />
            <ExamInfoCards selectedExam={selectedExam} />
          </>
        )}
      </div>
    </div>
  );
}
