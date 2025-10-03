"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { HeroSection } from "@/components/CutoffPage/HeroSection";
import { CurrentYearStats } from "@/components/CutoffPage/CurrentYearStats";
import { TrendsChart } from "@/components/CutoffPage/TrendsChart";
import { FilteredCollegeSearchResults } from "@/components/CutoffPage/FilteredCollegeSearchResults";
import { CollegeWiseCutoffs } from "@/components/CutoffPage/CollegeWiseCutoffs";
import { ExamInfoCards } from "@/components/CutoffPage/ExamInfoCards";
import { examData } from "@/components/CutoffPage/data";
import { apiService } from "@/ApiService/apiService";
import { Footer } from "../common/footer";

// Interfaces skipped for brevity ...

// Define CutoffItem interface (adjust fields as per your API response)
interface CutoffItem {
  _id: string;
  slug: string;
  branch: string;
  openingRank: number;
  closingRank: number;
  course: string;
  seatType: string;
  subCategory?: string;
  quota: string;
  round: string;
}

// Define FilteredCollege interface for use in reduce
interface FilteredCollege {
  id: string;
  slug: string;
  name: string;
  location: string;
  ranking: string;
  course: string;
  branches: Array<{
    id: string;
    name: string;
    opening: number;
    closing: number;
    course: string;
    seatType: string;
    subCategory?: string;
    quota: string;
    round: string;
  }>;
}

interface CutoffPageProps {
  urlParams: Record<string, string | string[] | undefined>;
}

export default function CutoffPage({ urlParams }: CutoffPageProps) {
  const router = useRouter();

  // Staged filter states (controlled by dropdowns, not applied yet)
  const [stagedExam, setStagedExam] = useState(() =>
    typeof urlParams.examType === "string" ? urlParams.examType : "JEE-Advanced"
  );
  const [stagedYear, setStagedYear] = useState(() =>
    typeof urlParams.year === "string" ? urlParams.year : ""
  );
  const [stagedCategory, setStagedCategory] = useState(() =>
    typeof urlParams.seatType === "string" ? urlParams.seatType : ""
  );
  const [stagedQuota, setStagedQuota] = useState(() =>
    typeof urlParams.quota === "string" ? urlParams.quota : ""
  );
  const [stagedRound, setStagedRound] = useState(() =>
    typeof urlParams.round === "string" ? urlParams.round : ""
  );
  const [stagedSubCategory, setStagedSubCategory] = useState(() =>
    typeof urlParams.subCategory === "string" ? urlParams.subCategory : ""
  );

  // Applied filters state: updated only on Apply click
  const [appliedFilters, setAppliedFilters] = useState({
    exam: stagedExam,
    year: stagedYear,
    category: stagedCategory,
    quota: stagedQuota,
    round: stagedRound,
    subCategory: stagedSubCategory,
  });

  // Other states
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedColleges, setExpandedColleges] = useState<
    Record<string, boolean>
  >({});
  const [cutoffData, setCutoffData] = useState<CutoffItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Effect to update document title and metadata on stagedExam change
  useEffect(() => {
    const currentExam = examData[stagedExam as keyof typeof examData];
    const examName = currentExam ? currentExam.name : stagedExam;

    // Update document title
    document.title = `Cutoff Analysis - ${examName}`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Explore cutoff information for ${examName}. See trends, college-wise cutoffs, and more.`
      );
    }
  }, [stagedExam]);

  // Effect to update URL and metadata only on appliedFilters change
  useEffect(() => {
    // Update URL query params
    const params = new URLSearchParams();
    if (appliedFilters.exam) params.set("examType", appliedFilters.exam);
    if (appliedFilters.year) params.set("year", appliedFilters.year);
    if (appliedFilters.category)
      params.set("seatType", appliedFilters.category);
    if (appliedFilters.quota) params.set("quota", appliedFilters.quota);
    if (appliedFilters.round) params.set("round", appliedFilters.round);
    if (appliedFilters.subCategory)
      params.set("subCategory", appliedFilters.subCategory);

    router.replace(`/cutoff?${params.toString()}`);
  }, [appliedFilters, router]);

  // Check if all filters are selected (use staged filters to enable/disable Apply button)
  const areAllFiltersSelected = useCallback(
    (): boolean =>
      stagedExam.trim() !== "" &&
      stagedYear.trim() !== "" &&
      stagedCategory.trim() !== "" &&
      stagedQuota.trim() !== "" &&
      stagedRound.trim() !== "" &&
      stagedSubCategory.trim() !== "",
    [
      stagedExam,
      stagedYear,
      stagedCategory,
      stagedQuota,
      stagedRound,
      stagedSubCategory,
    ]
  );

  // Check if any filter other than exam is selected (staged filters)
  const isAnyFilterSelected = useCallback((): boolean => {
    return (
      stagedYear.trim() !== "" ||
      stagedCategory.trim() !== "" ||
      stagedQuota.trim() !== "" ||
      stagedRound.trim() !== "" ||
      stagedSubCategory.trim() !== ""
    );
  }, [stagedYear, stagedCategory, stagedQuota, stagedRound, stagedSubCategory]);

  // Fetch cutoff data on Apply clicked, with appliedFilters update
  const applyFilters = () => {
    if (!isAnyFilterSelected()) return;

    setLoading(true);

    const newAppliedFilters = {
      exam: stagedExam,
      year: stagedYear,
      category: stagedCategory,
      quota: stagedQuota,
      round: stagedRound,
      subCategory: stagedSubCategory,
    };

    apiService
      .get<{
        statusCode: number;
        data: CutoffItem[];
        message: string;
        success: boolean;
      }>("/cutoff/all", {
        examType: newAppliedFilters.exam,
        year: newAppliedFilters.year
          ? Number(newAppliedFilters.year)
          : undefined,
        seatType: newAppliedFilters.category || undefined,
        quota: newAppliedFilters.quota || undefined,
        round: newAppliedFilters.round || undefined,
        subCategory: newAppliedFilters.subCategory || undefined,
      })
      .then((response) => {
        if (response.success) {
          setCutoffData(response.data);
        } else {
          setCutoffData([]);
        }
        setShowFilteredResults(true);
        setFiltersApplied(true);

        setAppliedFilters(newAppliedFilters);

        setLoading(false);
      })
      .catch(() => {
        setCutoffData([]);
        setShowFilteredResults(true);
        setFiltersApplied(true);
        setLoading(false);
      });
  };

  // Clear filters - reset staged and applied filters, cutoff data, metadata, and URL
  const clearFiltersExceptExam = () => {
    // Reset staged filters except exam to empty
    setStagedYear("");
    setStagedCategory("");
    setStagedQuota("");
    setStagedRound("");
    setStagedSubCategory("");

    // Reset applied filters except exam to empty
    setAppliedFilters((prev) => ({
      ...prev,
      year: "",
      category: "",
      quota: "",
      round: "",
      subCategory: "",
    }));

    setSearchQuery("");
    setCutoffData([]);
    setShowFilteredResults(false);
    setFiltersApplied(false);
  };

  // Handle exam change: update staged exam and reset other filters
  const handleExamChange = (exam: string) => {
    setStagedExam(exam);
    // Reset other filters when exam changes
    setStagedYear("");
    setStagedCategory("");
    setStagedQuota("");
    setStagedRound("");
    setStagedSubCategory("");
    // Also reset applied filters for non-exam fields
    setAppliedFilters((prev) => ({
      ...prev,
      exam,
      year: "",
      category: "",
      quota: "",
      round: "",
      subCategory: "",
    }));
    // Reset data and UI state
    setCutoffData([]);
    setShowFilteredResults(false);
    setFiltersApplied(false);
  };

  // Ref for scrolling to results section
  const resultsSectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll to results on load
  useEffect(() => {
    if (!loading && showFilteredResults && filtersApplied) {
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [loading, showFilteredResults, filtersApplied]);

  // Filter data based on search query
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

  // Current exam details for display components from appliedFilters.exam
  const allowedExams = Object.keys(examData) as Array<keyof typeof examData>;
  const currentExam = allowedExams.includes(
    appliedFilters.exam as keyof typeof examData
  )
    ? examData[appliedFilters.exam as keyof typeof examData]
    : null;

  // Expand toggle
  const toggleCollegeExpansion = (collegeSlug: string) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [collegeSlug]: !prev[collegeSlug],
    }));
  };

  return (
    <>
      <Head>
        <title>
          Cutoff Analysis -{" "}
          {examData[stagedExam as keyof typeof examData]?.name || stagedExam}
        </title>
        <meta
          name="description"
          content={`Explore cutoff information for ${
            examData[stagedExam as keyof typeof examData]?.name || stagedExam
          }. See trends, college-wise cutoffs, and more.`}
        />
      </Head>
      <div className="min-h-screen bg-white">
        <HeroSection
          selectedExam={stagedExam}
          selectedYear={stagedYear}
          selectedCategory={stagedCategory}
          selectedQuota={stagedQuota}
          selectedRound={stagedRound}
          selectedSubCategory={stagedSubCategory}
          onExamChange={handleExamChange}
          onYearChange={setStagedYear}
          onCategoryChange={setStagedCategory}
          onQuotaChange={setStagedQuota}
          onRoundChange={setStagedRound}
          onSubCategoryChange={setStagedSubCategory}
          clearFilters={clearFiltersExceptExam}
          applyFilters={applyFilters}
          isAnyFilterSelected={isAnyFilterSelected()}
          loading={loading}
        />
        <div
          ref={resultsSectionRef}
          className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12"
        >
          {currentExam && filtersApplied && (
            <FilteredCollegeSearchResults
              showFilteredResults={showFilteredResults}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredColleges={filteredColleges}
              currentExam={currentExam}
              selectedYear={appliedFilters.year}
              selectedCategory={appliedFilters.category}
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
                selectedYear={appliedFilters.year}
              />
              <TrendsChart currentExam={currentExam} />
              <CollegeWiseCutoffs selectedExam={appliedFilters.exam} />
              <ExamInfoCards selectedExam={appliedFilters.exam} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
