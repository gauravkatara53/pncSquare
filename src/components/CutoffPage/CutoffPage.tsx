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

  // Metadata states updated only on appliedFilters change
  const [pageTitle, setPageTitle] = useState(
    `Entrance Exam Cutoff Analysis - ${appliedFilters.exam}`
  );
  const [pageDescription, setPageDescription] = useState(
    `Explore cutoff information for ${appliedFilters.exam}`
  );

  // Result container ref for scroll
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  // Update URL and metadata only on appliedFilters change
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

    // Build page title and description based on applied filters
    const parts: string[] = [appliedFilters.exam];
    if (appliedFilters.year) parts.push(`Year: ${appliedFilters.year}`);
    if (appliedFilters.category)
      parts.push(`Seat Type: ${appliedFilters.category}`);
    if (appliedFilters.quota) parts.push(`Quota: ${appliedFilters.quota}`);
    if (appliedFilters.round) parts.push(`Round: ${appliedFilters.round}`);
    if (appliedFilters.subCategory)
      parts.push(`Subcategory: ${appliedFilters.subCategory}`);

    const newTitle =
      parts.length > 0
        ? `Cutoff Analysis - ${parts.join(", ")}`
        : `Entrance Exam Cutoff Analysis - ${appliedFilters.exam}`;

    let newDescription = `Explore cutoff information for ${appliedFilters.exam}`;
    if (appliedFilters.year) newDescription += ` in ${appliedFilters.year}`;
    if (appliedFilters.category)
      newDescription += `, category ${appliedFilters.category}`;
    if (appliedFilters.quota)
      newDescription += `, quota ${appliedFilters.quota}`;
    if (appliedFilters.round)
      newDescription += `, round ${appliedFilters.round}`;
    if (appliedFilters.subCategory)
      newDescription += `, subcategory ${appliedFilters.subCategory}`;
    newDescription += ". See trends, college-wise cutoffs, and more.";

    setPageTitle(newTitle);
    setPageDescription(newDescription);
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
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <div className="min-h-screen bg-white">
        <HeroSection
          selectedExam={stagedExam}
          selectedYear={stagedYear}
          selectedCategory={stagedCategory}
          selectedQuota={stagedQuota}
          selectedRound={stagedRound}
          selectedSubCategory={stagedSubCategory}
          onExamChange={setStagedExam}
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
    </>
  );
}
