"use client";

import { useState } from "react";
import { HeroSection } from "@/components/CutoffPage/HeroSection";
import { CurrentYearStats } from "@/components/CutoffPage/CurrentYearStats";
import { TrendsChart } from "@/components/CutoffPage/TrendsChart";
import { FilteredCollegeSearchResults } from "@/components/CutoffPage/FilteredCollegeSearchResults";
import { CollegeWiseCutoffs } from "@/components/CutoffPage/CollegeWiseCutoffs";
import { ExamInfoCards } from "@/components/CutoffPage/ExamInfoCards";
import { examData } from "@/components/CutoffPage/data";

import { apiService } from "@/ApiService/apiService";

export default function CutoffPage() {
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuota, setSelectedQuota] = useState("");
  const [selectedRound, setSelectedRound] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedColleges, setExpandedColleges] = useState<
    Record<string, boolean>
  >({});

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

  const [cutoffData, setCutoffData] = useState<CutoffItem[]>([]);

  const areAllFiltersSelected = (): boolean => {
    const allSelected =
      selectedExam.trim() !== "" &&
      selectedYear.trim() !== "" &&
      selectedCategory.trim() !== "" &&
      selectedQuota.trim() !== "" &&
      selectedRound.trim() !== "" &&
      selectedSubCategory.trim() !== "";
    console.log("Are all filters selected? ", allSelected);
    return allSelected;
  };

  const fetchCutoffData = async () => {
    if (!areAllFiltersSelected()) {
      setCutoffData([]);
      setShowFilteredResults(false);
      return;
    }

    // Build query string manually to log URL
    const params = new URLSearchParams({
      examType: selectedExam,
      year: String(selectedYear),
      seatType: selectedCategory,
      quota: selectedQuota,
      round: selectedRound,
      subCategory: selectedSubCategory,
    }).toString();

    const fullUrl = `/cutoff/all?${params}`;
    console.log("Calling API URL:", fullUrl);

    try {
      const response = await apiService.get<{
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
      });

      console.log("API response:", response);

      if (response.success) {
        setCutoffData(response.data);
        setShowFilteredResults(true);
      } else {
        setCutoffData([]);
        setShowFilteredResults(true);
      }
    } catch (error) {
      console.error("API call failed", error);
      setCutoffData([]);
      setShowFilteredResults(true);
    }
  };

  const handleApplyFilters = () => {
    console.log("Apply Filters clicked");
    fetchCutoffData();
  };

  const toggleCollegeExpansion = (collegeSlug: string) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [collegeSlug]: !prev[collegeSlug],
    }));
  };

  interface FilteredCollegeBranch {
    id: string;
    name: string;
    general: number;
    obc: number | null;
    sc: number | null;
    st: number | null;
    seats: number;
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
    branches: FilteredCollegeBranch[];
  }

  const filteredColleges = cutoffData
    .filter(
      (item) =>
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .reduce((acc: FilteredCollege[], curr) => {
      const existing = acc.find((c) => c.slug === curr.slug);

      if (existing) {
        existing.branches.push({
          id: curr._id,
          name: curr.branch,
          general: curr.openingRank,
          obc: null,
          sc: null,
          st: null,
          seats: 0,
          closing: curr.closingRank,
          course: curr.course,
          seatType: curr.seatType,
          subCategory: curr.subCategory,
          quota: curr.quota,
          round: curr.round,
        });
      } else {
        acc.push({
          id: curr._id,
          slug: curr.slug,
          name: curr.slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          location: "",
          ranking: "N/A",
          branches: [
            {
              id: curr._id,
              name: curr.branch,
              general: curr.openingRank,
              obc: null,
              sc: null,
              st: null,
              seats: 0,
              closing: curr.closingRank,
              course: curr.course,
              seatType: curr.seatType,
              subCategory: curr.subCategory,
              quota: curr.quota,
              round: curr.round,
            },
          ],
        });
      }
      return acc;
    }, []);

  console.log(
    "Filtered colleges after reduce:",
    filteredColleges.map((c) => ({
      slug: c.slug,
      id: c.id,
      branchCount: c.branches.length,
    }))
  );

  // Use exact keys matching backend:
  const allowedExams = Object.keys(examData) as Array<keyof typeof examData>;
  const currentExam =
    selectedExam && allowedExams.includes(selectedExam as keyof typeof examData)
      ? examData[selectedExam as keyof typeof examData]
      : null;

  console.log("Current exam resolved:", selectedExam, currentExam);

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
        onApplyFilters={handleApplyFilters}
        allFiltersSelected={areAllFiltersSelected()}
      />

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        {/* Only render FilteredCollegeSearchResults if currentExam is not null */}
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
