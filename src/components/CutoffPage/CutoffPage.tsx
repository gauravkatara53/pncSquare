"use client";

import React, { useState, useEffect, useCallback } from "react";
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

// Interfaces
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

  // Initial filter states
  const [stagedExam, setStagedExam] = useState(
    typeof urlParams.examType === "string" ? urlParams.examType : "JEE-Advanced"
  );
  const [stagedYear, setStagedYear] = useState(
    typeof urlParams.year === "string" ? urlParams.year : ""
  );
  const [stagedCategory, setStagedCategory] = useState(
    typeof urlParams.seatType === "string" ? urlParams.seatType : ""
  );
  const [stagedQuota, setStagedQuota] = useState(
    typeof urlParams.quota === "string" ? urlParams.quota : ""
  );
  const [stagedRound, setStagedRound] = useState(
    typeof urlParams.round === "string" ? urlParams.round : ""
  );
  const [stagedSubCategory, setStagedSubCategory] = useState(
    typeof urlParams.subCategory === "string" ? urlParams.subCategory : ""
  );

  // Applied filters
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
  const [showResultsByHash, setShowResultsByHash] = useState(false);

  const isNEET = stagedExam === "NEET-UG";

  // Update page title and meta
  useEffect(() => {
    const currentExam = examData[stagedExam as keyof typeof examData];
    const examName = currentExam ? currentExam.name : stagedExam;
    document.title = `Cutoff Analysis - ${examName}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        `Explore cutoff information for ${examName}. See trends, college-wise cutoffs, and more.`
      );
  }, [stagedExam]);

  // ✅ Keep query params updated BUT preserve #result if it's already in URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedFilters.exam) params.set("examType", appliedFilters.exam);
    if (appliedFilters.year) params.set("year", appliedFilters.year);
    if (appliedFilters.category)
      params.set("seatType", appliedFilters.category);
    if (appliedFilters.quota) params.set("quota", appliedFilters.quota);
    if (appliedFilters.round) params.set("round", appliedFilters.round);
    if (appliedFilters.subCategory)
      params.set("subCategory", appliedFilters.subCategory);

    const hashPart = window.location.hash; // 👈 preserve existing hash
    router.replace(`/cutoff?${params.toString()}${hashPart}`);
  }, [appliedFilters, router]);

  // Detect if #result present
  useEffect(() => {
    const checkHash = () =>
      setShowResultsByHash(window.location.hash === "#result");
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // ✅ Apply button click → fetch data + add #result manually
  const applyFilters = () => {
    const isAnyFilterSelected = () =>
      isNEET
        ? stagedYear || stagedCategory || stagedRound
        : stagedYear ||
          stagedCategory ||
          stagedQuota ||
          stagedRound ||
          stagedSubCategory;

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

    const apiParams: Record<string, string | number | undefined> = {
      examType: newAppliedFilters.exam,
      year: newAppliedFilters.year ? Number(newAppliedFilters.year) : undefined,
      seatType: newAppliedFilters.category || undefined,
    };
    if (isNEET) apiParams.round = newAppliedFilters.round || undefined;
    else {
      apiParams.quota = newAppliedFilters.quota || undefined;
      apiParams.round = newAppliedFilters.round || undefined;
      apiParams.subCategory = newAppliedFilters.subCategory || undefined;
    }

    apiService
      .get<{
        statusCode: number;
        data: CutoffItem[];
        message: string;
        success: boolean;
      }>("/cutoff/all", apiParams)
      .then((response) => {
        setCutoffData(response.success ? response.data : []);
        setShowFilteredResults(true);
        setFiltersApplied(true);
        setAppliedFilters(newAppliedFilters);
        setLoading(false);

        // ✅ Manually update hash only when user clicks Apply
        const params = new URLSearchParams();
        if (newAppliedFilters.exam)
          params.set("examType", newAppliedFilters.exam);
        if (newAppliedFilters.year) params.set("year", newAppliedFilters.year);
        if (newAppliedFilters.category)
          params.set("seatType", newAppliedFilters.category);
        if (newAppliedFilters.quota)
          params.set("quota", newAppliedFilters.quota);
        if (newAppliedFilters.round)
          params.set("round", newAppliedFilters.round);
        if (newAppliedFilters.subCategory)
          params.set("subCategory", newAppliedFilters.subCategory);

        router.replace(`/cutoff?${params.toString()}#result`);
        window.location.hash = "result"; // ensures immediate hash detection
        setShowResultsByHash(true);

        // Smooth scroll to results
        const el = document.getElementById("result");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      })
      .catch(() => {
        setCutoffData([]);
        setShowFilteredResults(true);
        setFiltersApplied(true);
        setLoading(false);
      });
  };

  // ✅ On refresh or shared link — keep #result and load data
  useEffect(() => {
    if (window.location.hash === "#result") {
      const params = new URLSearchParams(window.location.search);
      const examType = params.get("examType") || stagedExam;
      const year = params.get("year") || stagedYear;
      const seatType = params.get("seatType") || stagedCategory;
      const quota = params.get("quota") || stagedQuota;
      const round = params.get("round") || stagedRound;
      const subCategory = params.get("subCategory") || stagedSubCategory;

      const apiParams: Record<string, string | number | undefined> = {
        examType,
        year: year ? Number(year) : undefined,
        seatType: seatType || undefined,
      };
      if (examType === "NEET-UG") apiParams.round = round || undefined;
      else {
        apiParams.quota = quota || undefined;
        apiParams.round = round || undefined;
        apiParams.subCategory = subCategory || undefined;
      }

      setLoading(true);
      apiService
        .get<{
          statusCode: number;
          data: CutoffItem[];
          message: string;
          success: boolean;
        }>("/cutoff/all", apiParams)
        .then((response) => {
          setCutoffData(response.success ? response.data : []);
          setShowFilteredResults(true);
          setFiltersApplied(true);
          setShowResultsByHash(true);
          setAppliedFilters({
            exam: examType,
            year,
            category: seatType,
            quota,
            round,
            subCategory,
          });
          setLoading(false);
        })
        .catch(() => {
          setCutoffData([]);
          setShowFilteredResults(true);
          setFiltersApplied(true);
          setShowResultsByHash(true);
          setLoading(false);
        });
    }
  }, []);

  const clearFiltersExceptExam = () => {
    router.replace("/cutoff");
  };

  const handleExamChange = (exam: string) => {
    setStagedExam(exam);
    setStagedYear("");
    setStagedCategory("");
    setStagedQuota("");
    setStagedRound("");
    setStagedSubCategory("");
    setAppliedFilters({
      exam,
      year: "",
      category: "",
      quota: "",
      round: "",
      subCategory: "",
    });
    setCutoffData([]);
    setShowFilteredResults(false);
    setFiltersApplied(false);
  };

  const filteredColleges = cutoffData
    .filter((item) => {
      const q = searchQuery.toLowerCase().replace(/[-\s]/g, "");
      return (
        item.slug.toLowerCase().replace(/[-\s]/g, "").includes(q) ||
        item.branch.toLowerCase().replace(/[-\s]/g, "").includes(q)
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
      if (existing) existing.branches.push(branchItem);
      else
        acc.push({
          id: curr._id,
          slug: curr.slug,
          name: curr.slug.replace(/-/g, " ").toUpperCase(),
          location: "",
          ranking: "N/A",
          course: curr.course,
          branches: [branchItem],
        });
      return acc;
    }, []);

  const currentExam =
    examData[appliedFilters.exam as keyof typeof examData] || null;

  const toggleCollegeExpansion = (slug: string) =>
    setExpandedColleges((prev) => ({ ...prev, [slug]: !prev[slug] }));

  return (
    <>
      <Head>
        <title>
          Cutoff Analysis -{" "}
          {examData[stagedExam as keyof typeof examData]?.name || stagedExam}
        </title>
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
          isAnyFilterSelected={Boolean(
            stagedYear ||
              stagedCategory ||
              stagedQuota ||
              stagedRound ||
              stagedSubCategory
          )}
          loading={loading}
          isNEET={isNEET}
        />

        <div
          id="result"
          className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12"
        >
          {showResultsByHash && currentExam && filtersApplied && (
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
              allFiltersSelected={true}
              isNEET={isNEET}
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
