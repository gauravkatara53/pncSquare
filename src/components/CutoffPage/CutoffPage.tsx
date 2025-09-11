"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";

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

export default function CutoffPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // On first mount, read state from query params (for copy/paste/refresh/SEO/links)
  const [selectedExam, setSelectedExam] = useState(
    () => searchParams?.get("examType") ?? "JEE-Advanced"
  );
  const [selectedYear, setSelectedYear] = useState(
    () => searchParams?.get("year") ?? ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams?.get("seatType") ?? ""
  );
  const [selectedQuota, setSelectedQuota] = useState(
    () => searchParams?.get("quota") ?? ""
  );
  const [selectedRound, setSelectedRound] = useState(
    () => searchParams?.get("round") ?? ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    () => searchParams?.get("subCategory") ?? ""
  );

  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedColleges, setExpandedColleges] = useState<
    Record<string, boolean>
  >({});
  const [cutoffData, setCutoffData] = useState<CutoffItem[]>([]);

  // When changing filters, update URL and SEO via <Head>
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedExam) params.set("examType", selectedExam);
    if (selectedYear) params.set("year", selectedYear);
    if (selectedCategory) params.set("seatType", selectedCategory);
    if (selectedQuota) params.set("quota", selectedQuota);
    if (selectedRound) params.set("round", selectedRound);
    if (selectedSubCategory) params.set("subCategory", selectedSubCategory);
    // Replace only query string, does not reload, preserves filters
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

  // SEO helpers (computed every render for <Head>)
  const makeTitle = () => {
    if (!selectedExam) return "College Exam Cutoffs";
    let t = `${selectedExam}`;
    if (selectedYear) t += ` ${selectedYear}`;
    if (selectedCategory) t += ` ${selectedCategory}`;
    if (selectedQuota) t += ` ${selectedQuota}`;
    if (selectedRound) t += ` Round ${selectedRound}`;
    if (selectedSubCategory) t += ` ${selectedSubCategory}`;
    t += " Cutoff Details";
    return t.trim();
  };

  const makeDescription = () => {
    let d = `Explore cutoff information for ${selectedExam || "top exams"}`;
    if (selectedYear) d += ` in ${selectedYear}`;
    if (selectedCategory) d += `, category ${selectedCategory}`;
    if (selectedQuota) d += `, quota ${selectedQuota}`;
    if (selectedRound) d += `, round ${selectedRound}`;
    if (selectedSubCategory) d += `, subcategory ${selectedSubCategory}`;
    d += ". See trends, college-wise cutoffs, and more.";
    return d;
  };

  // True if all selected
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

  // Data fetch (auto-fetch on filter change)
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

  // Data grouping for colleges
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

  // Valid exams for dropdowns
  const allowedExams = Object.keys(examData) as Array<keyof typeof examData>;
  const currentExam = allowedExams.includes(
    selectedExam as keyof typeof examData
  )
    ? examData[selectedExam as keyof typeof examData]
    : null;

  // Expand/collapse college card logic
  const toggleCollegeExpansion = (collegeSlug: string) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [collegeSlug]: !prev[collegeSlug],
    }));
  };

  // --- Render ---
  return (
    <>
      <Head>
        <title>{makeTitle()}</title>
        <meta name="description" content={makeDescription()} />
      </Head>
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
    </>
  );
}
