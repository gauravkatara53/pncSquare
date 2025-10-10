"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Trophy } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { apiService } from "@/ApiService/apiService";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCollegeTagFromSlug,
  getCompleteFilterOptions,
  isIITCollege,
  getDefaultQuota,
} from "@/config/cutoffFilters";

type CutoffDataRow = {
  branch: string;
  openingRank: number;
  closingRank: number;
  round: string;
  seatType: string;
  course: string;
  quota?: string;
};

const skeletonRowsCount = 5;

export function Cutoffs({
  college,
  examTypes = [],
}: {
  college: string;
  examTypes?: string[];
}) {
  const [selectedExamType, setSelectedExamType] = useState("");
  const [year, setYear] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [quota, setQuota] = useState("");
  const [seatType, setSeatType] = useState("");
  const [round, setRound] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const [rows, setRows] = useState<CutoffDataRow[]>([]);
  const [rounds, setRounds] = useState<string[]>([]);

  // Get college tag and filter options
  const collegeTag = useMemo(() => getCollegeTagFromSlug(college), [college]);
  const filterOptions = useMemo(() => {
    return selectedExamType
      ? getCompleteFilterOptions(college, selectedExamType)
      : null;
  }, [college, selectedExamType]);

  // Determine if college is IIT
  const isIIT = useMemo(() => isIITCollege(college), [college]);

  // Determine if exam type is NEET-UG
  const isNEET = selectedExamType === "NEET-UG";

  // Initialize selectedExamType with first exam type if available
  useEffect(() => {
    if (examTypes.length > 0 && !selectedExamType) {
      setSelectedExamType(examTypes[0]);
    }
  }, [examTypes, selectedExamType]);

  // Set default quota for IIT colleges
  useEffect(() => {
    if (isIIT && selectedExamType) {
      const defaultQuota = getDefaultQuota(collegeTag);
      if (defaultQuota) {
        setQuota(defaultQuota);
      }
    } else if (!isIIT) {
      setQuota("");
    }
  }, [isIIT, selectedExamType, collegeTag]);

  // Responsive detection
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically set quota to "AI" for IITs and reset quotas for others whenever college, year, or selectedExamType changes
  useEffect(() => {
    if (isIIT) {
      setQuota("AI");
    } else {
      setQuota("");
    }
    // Reset other filters and data on college, year, or examType change
    if (!isNEET) {
      setSubCategory("");
    } else {
      // For NEET, we don't need subCategory, so keep it empty
      setSubCategory("");
    }
    setSeatType("");
    setRows([]);
    setRounds([]);
    setRound("");
  }, [college, year, selectedExamType, isIIT, isNEET]);

  // Fetch cutoff data when filters change
  useEffect(() => {
    // Don't fetch if no exam type is selected or no filter options available
    if (!selectedExamType || !filterOptions) {
      setRows([]);
      setRounds([]);
      setRound("");
      return;
    }

    // Check required fields based on filter configuration
    if (!college || !year || !seatType) {
      setRows([]);
      setRounds([]);
      setRound("");
      return;
    }

    // Check if sub category is required and not selected
    if (filterOptions.requiresSubCategory && !subCategory) {
      setRows([]);
      setRounds([]);
      setRound("");
      return;
    }

    // Check if quota is required and not selected
    if (filterOptions.requiresQuota && !quota) {
      setRows([]);
      setRounds([]);
      setRound("");
      return;
    }

    setLoading(true);

    // Prepare API parameters based on filter configuration
    const apiParams: Record<string, string> = {
      slug: college,
      year,
      seatType,
      examType: selectedExamType,
    };

    // Add optional parameters based on filter requirements
    if (filterOptions.requiresSubCategory && subCategory) {
      apiParams.subCategory = subCategory;
    }

    if (filterOptions.requiresQuota && quota) {
      apiParams.quota = quota;
    } else if (isIIT && filterOptions.quotaOptions.length > 0) {
      // For IITs, use the first available quota option (usually "AI")
      apiParams.quota = filterOptions.quotaOptions[0];
    }

    apiService
      .get<{ data: CutoffDataRow[] }>("/cutoff/all", apiParams)
      .then((res) => {
        const dataRows = res.data as CutoffDataRow[];
        setRows(dataRows);
        const uniqueRounds = [...new Set(dataRows.map((row) => row.round))];
        setRounds(uniqueRounds);
        setRound(uniqueRounds.length ? uniqueRounds[0] : ""); // reset round safely here
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setRows([]);
        setRounds([]);
        setRound("");
      });
  }, [
    college,
    year,
    subCategory,
    quota,
    seatType,
    selectedExamType,
    filterOptions,
    isIIT,
  ]);

  // Show skeleton animation on round switch only if data is loaded
  useEffect(() => {
    if (!round || loading) return;
    setTableLoading(true);
    const timeout = setTimeout(() => {
      setTableLoading(false);
    }, 500); // Duration for table loading animation
    return () => clearTimeout(timeout);
  }, [round, loading]);

  // Rows filtered by round
  const filteredRows = rows.filter((row) => row.round === round);

  // Group filtered rows by course for display grouping
  const groupedByCourse = useMemo(() => {
    const groups: { [course: string]: CutoffDataRow[] } = {};
    filteredRows.forEach((row) => {
      const courseKey = row.course || "Other Courses";
      if (!groups[courseKey]) groups[courseKey] = [];
      groups[courseKey].push(row);
    });
    return groups;
  }, [filteredRows]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-start items-center gap-2 mb-4 text-slate-800">
        <Trophy className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Cutoff Trends</h2>
      </div>
      <p className="text-slate-600 mb-10 text-left">
        Historical admission cutoff ranks
      </p>

      {/* No exam types available message */}
      {examTypes.length === 0 && (
        <div className="w-full flex justify-center mb-8">
          <div className="bg-slate-100 rounded-lg px-6 py-8 text-center">
            <p className="text-slate-600 font-medium">
              No exam type information available for this college.
            </p>
          </div>
        </div>
      )}

      {/* Show the rest only if exam types are available */}
      {examTypes.length > 0 && (
        <>
          {/* Selection Box */}
          <div className="w-full flex justify-center">
            <div className="w-full md:max-w-8xl flex flex-col md:flex-row gap-6 bg-white rounded-lg px-6 py-8 shadow-md border border-slate-200 mb-8">
              {/* Exam Type - only show if multiple exam types available */}
              {examTypes.length > 1 && (
                <div className="flex-1">
                  <label className="block mb-2 font-semibold text-slate-700 text-left">
                    Exam Type
                  </label>
                  <select
                    className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedExamType}
                    onChange={(e) => {
                      setSelectedExamType(e.target.value);
                      setYear("");
                      setSubCategory("");
                      setSeatType("");
                      setQuota("");
                      setRows([]);
                      setRounds([]);
                      setRound("");
                    }}
                  >
                    <option value="">Select Exam</option>
                    {examTypes.map((exam) => (
                      <option key={exam} value={exam}>
                        {exam}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Year */}
              <div className="flex-1">
                <label className="block mb-2 font-semibold text-slate-700 text-left">
                  Year
                </label>
                <select
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setSubCategory("");
                    setSeatType("");
                    setRows([]);
                    setRounds([]);
                    setRound("");
                  }}
                  disabled={!selectedExamType}
                >
                  <option value="">Select Year</option>
                  {filterOptions?.years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category - show only if required */}
              {filterOptions?.requiresSubCategory && (
                <div className="flex-1">
                  <label className="block mb-2 font-semibold text-slate-700 text-left">
                    Sub Category
                  </label>
                  <select
                    className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={subCategory}
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                      setRows([]);
                      setRounds([]);
                      setRound("");
                    }}
                    disabled={!year}
                  >
                    <option value="">Select</option>
                    {filterOptions?.subCategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quota — show only if required */}
              {filterOptions?.requiresQuota && (
                <div className="flex-1">
                  <label className="block mb-2 font-semibold text-slate-700 text-left">
                    Quota
                  </label>
                  <select
                    className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={quota}
                    onChange={(e) => {
                      setQuota(e.target.value);
                      setRows([]);
                      setRounds([]);
                      setRound("");
                    }}
                    disabled={!year}
                  >
                    <option value="">Select Quota</option>
                    {filterOptions?.quotaOptions.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Seat Type */}
              <div className="flex-1">
                <label className="block mb-2 font-semibold text-slate-700 text-left">
                  Seat Type
                </label>
                <select
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={seatType}
                  onChange={(e) => {
                    setSeatType(e.target.value);
                    setRows([]);
                    setRounds([]);
                    setRound("");
                  }}
                  disabled={!year}
                >
                  <option value="">Select Seat Type</option>
                  {filterOptions?.seatTypeOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Rounds Navigation */}
          {selectedExamType &&
            year &&
            seatType &&
            rounds.length > 0 &&
            filterOptions &&
            (!filterOptions.requiresSubCategory || subCategory) &&
            (!filterOptions.requiresQuota || quota) && (
              <div className="w-full md:max-w-8xl ">
                {isMobile ? (
                  <div className="bg-white rounded-lg p-4 shadow border border-slate-200 mb-4">
                    <label className="mb-2 block font-semibold text-slate-700 text-center">
                      Data Round
                    </label>
                    <select
                      className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={round}
                      onChange={(e) => setRound(e.target.value)}
                    >
                      {rounds.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex bg-slate-100 rounded-lg mb-4 border border-slate-200">
                    {rounds.map((r) => (
                      <button
                        key={r}
                        className={[
                          "flex-1 py-4 px-4 text-md font-medium transition",
                          round === r
                            ? "bg-white text-slate-900 border-blue-500 border-b-4"
                            : "hover:bg-blue-50 text-slate-700",
                        ].join(" ")}
                        style={{
                          borderRight: "1px solid #e5e7eb",
                          minWidth: 0,
                        }}
                        onClick={() => setRound(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          {/* Data Table with animation on round change */}
          {selectedExamType &&
            year &&
            seatType &&
            filterOptions &&
            (!filterOptions.requiresSubCategory || subCategory) &&
            (!filterOptions.requiresQuota || quota) && (
              <div className="overflow-x-hidden mt-4 bg-white rounded-lg shadow-md border border-slate-200 px-0 py-6 w-full">
                {loading || tableLoading ? (
                  // Skeleton table with wave animation
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border-b px-6 py-3 text-left font-semibold text-slate-700">
                          <Skeleton width={100} />
                        </th>
                        {isNEET && (
                          <th className="border-b px-6 py-3 font-semibold text-slate-700 text-center">
                            <Skeleton width={80} />
                          </th>
                        )}
                        <th className="border-b px-6 py-3 font-semibold text-slate-700 text-center">
                          <Skeleton width={150} />
                        </th>
                        <th className="border-b px-6 py-3 font-semibold text-slate-700 text-center">
                          <Skeleton width={60} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(skeletonRowsCount)].map((_, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <td className="border-b px-6 py-3">
                            <Skeleton />
                          </td>
                          {isNEET && (
                            <td className="border-b px-6 py-3">
                              <Skeleton />
                            </td>
                          )}
                          <td className="border-b px-6 py-3">
                            <Skeleton />
                          </td>
                          <td className="border-b px-6 py-3 text-center">
                            <Skeleton />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : rounds.length === 0 ? (
                  <div className="py-8 text-center text-slate-600 font-semibold">
                    No data found for the selected filters and round.
                  </div>
                ) : round && filteredRows.length === 0 ? (
                  <div className="py-8 text-center text-slate-600 font-semibold">
                    No data found for the selected filters and round.
                  </div>
                ) : (
                  Object.entries(groupedByCourse).map(
                    ([course, courseRows]) => (
                      <div key={course} className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-slate-700 px-4">
                          {course}
                        </h3>
                        <table className="min-w-full text-sm border-collapse mb-6">
                          <thead>
                            <tr className="bg-slate-100">
                              <th className="border-b px-6 py-3 text-left font-semibold text-slate-700">
                                Branch Name
                              </th>
                              {isNEET && (
                                <th className="border-b px-6 py-3 font-semibold text-slate-700 text-center">
                                  Quota
                                </th>
                              )}
                              <th className="border-b px-6 py-3 font-semibold text-slate-700 text-center">
                                Opening
                              </th>
                              <th className="border-b px-6 py-3 font-semibold text-slate-700 text-center">
                                Closing
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <AnimatePresence>
                              {courseRows.map((row, idx) => (
                                <motion.tr
                                  key={
                                    row.branch +
                                    row.openingRank +
                                    row.closingRank
                                  }
                                  initial={{ opacity: 0, x: -50 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 40 }}
                                  transition={{
                                    duration: 0.15,
                                    delay: idx * 0.07,
                                  }}
                                  className={
                                    idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                                  }
                                >
                                  <td className="border-b px-6 py-3">
                                    {row.branch}
                                  </td>
                                  {isNEET && (
                                    <td className="border-b px-6 py-3 text-center">
                                      {row.quota || "N/A"}
                                    </td>
                                  )}
                                  <td className="border-b px-6 py-3 text-center">
                                    {row.openingRank}
                                  </td>
                                  <td className="border-b px-6 py-3 text-center">
                                    {row.closingRank}
                                  </td>
                                </motion.tr>
                              ))}
                            </AnimatePresence>
                          </tbody>
                        </table>
                      </div>
                    )
                  )
                )}
              </div>
            )}
        </>
      )}
    </div>
  );
}
