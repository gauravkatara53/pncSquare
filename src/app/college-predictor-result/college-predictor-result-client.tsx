"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useTransition,
  useRef,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  RotateCcw,
  Search,
  MapPin,
  Filter,
  Award,
  Building2,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { apiService } from "@/ApiService/apiService";

const cities = [
  "Delhi/NCR",
  "Mumbai",
  "Pune",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Lucknow",
  "Indore",
  "Bhopal",
  "Kota",
  "Guwahati",
];

const collegeTags = [
  { id: "iit", name: "IIT" },
  { id: "nit", name: "NIT" },
  { id: "iiit", name: "IIIT" },
];

const examOptions = [
  {
    id: "JEE-Main",
    name: "JEE Main",
    description: "Joint Entrance Examination - Main",
  },
  {
    id: "JEE-Advanced",
    name: "JEE Advanced",
    description: "For IIT admissions",
  },
  { id: "NEET-UG", name: "NEET UG", description: "Medical entrance exam" },
  { id: "BITSAT", name: "BITSAT", description: "BITS Pilani entrance" },
  { id: "viteee", name: "VITEEE", description: "VIT Engineering entrance" },
  {
    id: "comedk",
    name: "COMEDK",
    description: "Karnataka engineering entrance",
  },
];

type CutoffsByYear = {
  [year: string]: {
    [round: string]: number;
  };
};

type PredictionResult = {
  College: string;
  Slug: string;
  State: string;
  Fees: number;
  AvgSalary: number;
  NIRF: string;
  NIRFNumber: number;
  Course: string;
  Branch: string;
  SeatType: string;
  SubCategory: string;
  Quota: string;
  ExamType: string;
  ClosestRound: string;
  BranchWeight: number;
  CollegeWeight: number;
  RankScore: number;
  FinalScore: number;
  CutoffsByYear: CutoffsByYear;
};

interface PredictorAPIResponse {
  statusCode: number;
  data: {
    totalResults: number;
    page: number;
    pageSize: number;
    colleges: PredictionResult[];
  };
}

// ✅ OPTIMIZATION 1: Memoized College Card Component
const CollegeCard = React.memo(
  ({
    college,
    isDarkMode,
    onViewDetails,
  }: {
    college: {
      id: number;
      name: string;
      slug: string;
      location: string;
      branch: string;
      course: string;
      type: string;
      SeatType: string;
      SubCategory: string;
      quota: string;
      fees: string;
      avgFees: number;
      avgPackage: string;
      avgSalaryNum: number;
      nirf: string | number;
      nirfText: string;
      cutoffs: Record<string, Record<string, number>>;
      closestRound: string;
      branchWeight: number;
      collegeWeight: number;
      rankScore: number;
      finalScore: number;
      tags: string[];
    };
    isDarkMode: boolean;
    onViewDetails: (slug: string) => void;
  }) => {
    return (
      <Card
        className={`border transition-colors duration-200 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-slate-800/80 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-4 md:p-6">
          {/* College Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
            <div className="flex-1 w-full">
              <div className="flex items-start gap-3 mb-2">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-amber-950/30 to-slate-800/50 border border-amber-600/20"
                      : "bg-gradient-to-br from-[#2a53e2]/10 to-[#7C5EFF]/10"
                  }`}
                >
                  <GraduationCap
                    className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-200 ${
                      isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`mb-1 text-base md:text-lg font-semibold transition-colors duration-200 ${
                      isDarkMode ? "text-gray-100" : "text-slate-900"
                    }`}
                  >
                    {college.name}
                  </h3>
                  <div
                    className={`flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm mb-2 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{college.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full sm:w-auto text-xs transition-colors duration-200 ${
                isDarkMode
                  ? "text-white hover:text-amber-400 hover:bg-amber-950/30 border border-amber-600/30"
                  : "text-[#2a53e2] hover:text-[#2a53e2]/80 border border-gray-600"
              }`}
              onClick={() => onViewDetails(college.slug)}
            >
              View Details
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          {/* College Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className={`text-xs transition-colors duration-200 ${
                isDarkMode
                  ? "border-amber-600/50 text-white bg-gray-200"
                  : "border-[#2a53e2] text-[#2a53e2]"
              }`}
            >
              NIRF #{college.nirfText !== "-" ? college.nirfText : "N/A"}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-xs transition-colors duration-200 ${
                isDarkMode
                  ? "bg-gray-200 text-gray-400 border border-slate-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {college.quota === "OS"
                ? "Other State"
                : college.quota === "HS"
                ? "Home State"
                : college.quota === "AI"
                ? "All India"
                : college.quota}
            </Badge>
            {college.tags.map((tag: string) => (
              <a
                key={tag}
                href={
                  tag.toLowerCase() === "cutoff"
                    ? `/college/${college.slug}#cutoff`
                    : `/college/${college.slug}#placements`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  variant="secondary"
                  className={`text-xs cursor-pointer transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-200 text-gray-400 border border-slate-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </Badge>
              </a>
            ))}
          </div>

          {/* Branch Info */}
          <div
            className={`rounded-lg p-3 md:p-4 mb-4 transition-colors duration-200 ${
              isDarkMode
                ? "bg-gradient-to-r from-amber-950/20 to-slate-800/30 border border-amber-600/10"
                : "bg-gradient-to-r from-[#2a53e2]/5 to-[#7C5EFF]/5"
            }`}
          >
            <p
              className={`text-xs mb-1 transition-colors duration-200 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {college.course}
            </p>
            <p
              className={`font-medium text-sm transition-colors duration-200 ${
                isDarkMode ? "text-gray-200" : "text-slate-900"
              }`}
            >
              {college.branch}
            </p>
          </div>

          {/* Fees & Package */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-xs md:text-sm">
              <span
                className={`block mb-1 transition-colors duration-200 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Avg Package
              </span>
              <span
                className={`font-semibold transition-colors duration-200 ${
                  isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                }`}
              >
                {college.avgPackage}
              </span>
            </div>
            <div className="text-xs md:text-sm">
              <span
                className={`block mb-1 transition-colors duration-200 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Annual Fees
              </span>
              <span
                className={`font-semibold transition-colors duration-200 ${
                  isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                }`}
              >
                {college.fees.replace("/year", "")}
              </span>
            </div>
          </div>

          {/* Cutoff Table */}
          <div>
            <h4
              className={`mb-2 md:mb-3 text-xs md:text-base font-semibold transition-colors duration-200 ${
                isDarkMode ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Closing Ranks ({college.SeatType} : {college.SubCategory})
            </h4>
            <div
              className={`overflow-x-auto border rounded-lg transition-colors duration-200 ${
                isDarkMode ? "border-slate-800" : "border-gray-200"
              }`}
            >
              <table className="w-full text-xs md:text-sm">
                <thead
                  className={`transition-colors duration-200 ${
                    isDarkMode ? "bg-slate-800/50" : "bg-gray-50"
                  }`}
                >
                  <tr>
                    <th
                      className={`text-left py-2 md:py-3 px-2 md:px-4 whitespace-nowrap font-semibold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Round
                    </th>
                    {Object.keys(college.cutoffs)
                      .sort()
                      .reverse()
                      .map((year: string) => (
                        <th
                          key={year}
                          className={`text-center py-2 md:py-3 px-2 md:px-4 whitespace-nowrap font-semibold transition-colors duration-200 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {year}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody
                  className={`divide-y transition-colors duration-200 ${
                    isDarkMode ? "divide-slate-800" : "divide-gray-200"
                  }`}
                >
                  {(() => {
                    const allRoundsSet = new Set<string>();
                    (
                      Object.values(college.cutoffs) as Record<string, number>[]
                    ).forEach((rounds) => {
                      Object.keys(rounds).forEach((roundKey) => {
                        allRoundsSet.add(roundKey);
                      });
                    });

                    const roundPriority = [
                      ...Array.from({ length: 6 }, (_, i) => `Round-${i + 1}`),
                      ...Array.from({ length: 2 }, (_, i) => `CSAB-${i + 1}`),
                      "Upgradation-Round",
                      "Upgradation-Round-2",
                      "Spot-Round",
                      "Special-Spot-Round",
                    ];

                    const allRounds = Array.from(allRoundsSet);
                    allRounds.sort((a, b) => {
                      const aIndex = roundPriority.indexOf(a);
                      const bIndex = roundPriority.indexOf(b);
                      if (aIndex !== -1 && bIndex !== -1)
                        return aIndex - bIndex;
                      if (aIndex !== -1) return -1;
                      if (bIndex !== -1) return 1;
                      return a.localeCompare(b);
                    });

                    return allRounds.map((roundKey) => {
                      return (
                        <tr
                          key={roundKey}
                          className={`transition-colors duration-200 ${
                            isDarkMode
                              ? "hover:bg-gray-800"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td
                            className={`py-2 md:py-3 px-2 md:px-4 whitespace-nowrap font-medium transition-colors duration-200 ${
                              isDarkMode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            {roundKey}
                          </td>
                          {Object.keys(college.cutoffs)
                            .sort()
                            .reverse()
                            .map((year) => {
                              const cutoffValue =
                                college.cutoffs[year]?.[roundKey];
                              return (
                                <td
                                  key={year}
                                  className={`text-center py-2 md:py-3 px-2 md:px-4 whitespace-nowrap transition-colors duration-200 ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {cutoffValue
                                    ? cutoffValue.toLocaleString()
                                    : "-"}
                                </td>
                              );
                            })}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

CollegeCard.displayName = "CollegeCard";

export default function CollegePredictorResultPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // ✅ OPTIMIZATION 2: Prevent unnecessary refetches with ref
  const lastFetchParamsRef = useRef<string>("");

  // Initial form state from URL
  const [selectedExam, setSelectedExam] = useState("");
  const [inputRank, setInputRank] = useState("");
  const [seatType, setSeatType] = useState("OPEN");
  const [subCategory, setSubCategory] = useState("Gender-Neutral");
  const [userState, setUserState] = useState("");

  const [predictedColleges, setPredictedColleges] = useState<
    PredictionResult[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedQuota, setSelectedQuota] = useState("All");
  const [maxFees, setMaxFees] = useState<number>(5000000);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [viewMode, setViewMode] = useState<"safe" | "risk">("safe");

  // ✅ OPTIMIZATION 3: Debounced URL update
  const updateURL = useCallback(
    (updates: Record<string, string | number | null>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === "" || value === undefined) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  // ✅ OPTIMIZATION 4: Initialize state from URL once
  useEffect(() => {
    const exam = searchParams.get("exam") || "";
    const rank = searchParams.get("rank") || "";
    const state = searchParams.get("state") || "";
    const seat = searchParams.get("seatType") || "OPEN";
    const sub = searchParams.get("subCategory") || "Gender-Neutral";
    const modeParam = searchParams.get("mode");
    const mode: "safe" | "risk" = modeParam === "risk" ? "risk" : "safe";
    const page = parseInt(searchParams.get("page") || "1");
    const tags = searchParams.get("tag")?.split(",").filter(Boolean) || [];
    const fees = parseInt(searchParams.get("maxFees") || "5000000");

    setSelectedExam(exam);
    setInputRank(rank);
    setUserState(state);
    setSeatType(seat);
    setSubCategory(sub);
    setViewMode(mode);
    setCurrentPage(page);
    setSelectedTags(tags);
    setMaxFees(fees);
  }, []); // Only run once on mount

  // ✅ OPTIMIZATION 5: Optimized fetch with deduplication
  useEffect(() => {
    const exam = searchParams.get("exam");
    const rank = searchParams.get("rank");
    const state = searchParams.get("state");
    const seat = searchParams.get("seatType");
    const sub = searchParams.get("subCategory");
    const mode = searchParams.get("mode") || "safe";
    const page = searchParams.get("page") || "1";
    const tags = searchParams.get("tag") || "";
    const fees = searchParams.get("maxFees") || "";

    // Create a unique key for these params
    const fetchKey = `${exam}-${rank}-${state}-${seat}-${sub}-${mode}-${page}-${tags}-${fees}`;

    // ✅ Prevent duplicate fetches
    if (fetchKey === lastFetchParamsRef.current) {
      return;
    }

    lastFetchParamsRef.current = fetchKey;

    async function fetchPredictions() {
      if (!exam || !rank || !state || !seat || !sub) {
        setError("Missing required parameters");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const examTypeMap: Record<string, string> = {
          "JEE-Main": "JEE-Main",
          "JEE-Advanced": "JEE-Advanced",
          "NEET-UG": "NEET-UG",
          bitsat: "BITSAT",
          viteee: "VITEEE",
          comedk: "COMEDK",
        };

        const examType = examTypeMap[exam] || "JEE-Main";
        const tagsList = tags.split(",").filter(Boolean);

        const queryParams: Record<string, string | number> = {
          rank: rank,
          examType: examType,
          seatType: seat,
          subCategory: sub,
          homeState: state,
          mode: mode,
          page: parseInt(page),
          pageSize: 50,
        };

        if (tagsList.length > 0) {
          queryParams.tag = tagsList.join(",");
        }

        if (fees && parseInt(fees) < 5000000) {
          queryParams.maxFees = parseInt(fees);
        }

        const response = await apiService.get<PredictorAPIResponse>(
          "/predictor/predict",
          queryParams
        );

        if (
          response.statusCode === 200 &&
          response.data &&
          response.data.colleges
        ) {
          const collegeData = Array.isArray(response.data.colleges)
            ? response.data.colleges
            : [];

          setPredictedColleges(collegeData);
          setTotalResults(response.data.totalResults || collegeData.length);
          setPageSize(response.data.pageSize || 20);
          setTotalPages(
            Math.ceil(
              (response.data.totalResults || collegeData.length) /
                (response.data.pageSize || 20)
            )
          );
        } else {
          setError("Failed to fetch predictions");
          setPredictedColleges([]);
        }
      } catch (error: unknown) {
        console.error("Error predicting colleges:", error);
        let errorMessage = "Failed to fetch college predictions";
        if (typeof error === "object" && error !== null) {
          type ErrorResponse = {
            response?: {
              data?: {
                message?: string;
              };
            };
            message?: string;
          };
          const err = error as ErrorResponse;
          if (
            err.response &&
            typeof err.response === "object" &&
            err.response !== null &&
            err.response.data &&
            typeof err.response.data === "object" &&
            err.response.data !== null &&
            "message" in err.response.data
          ) {
            errorMessage = err.response.data.message ?? errorMessage;
          } else if ("message" in err && err.message) {
            errorMessage = err.message;
          }
        }
        setError(errorMessage);
        setPredictedColleges([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPredictions();
  }, [searchParams]);

  const toggleCity = useCallback((city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  }, []);

  const toggleTag = useCallback(
    (tagId: string) => {
      setSelectedTags((prev) => {
        const newTags = prev.includes(tagId)
          ? prev.filter((t) => t !== tagId)
          : [...prev, tagId];

        // Update URL with new tags and reset to page 1
        startTransition(() => {
          const params = new URLSearchParams(window.location.search);
          if (newTags.length > 0) {
            params.set("tag", newTags.join(","));
          } else {
            params.delete("tag");
          }
          params.set("page", "1");
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });

        return newTags;
      });
    },
    [pathname, router]
  );

  // ✅ OPTIMIZATION 6: Debounced slider change
  const handleMaxFeesChange = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (value: number[]) => {
      const newMaxFees = value[0];
      setMaxFees(newMaxFees);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateURL({
          maxFees: newMaxFees < 5000000 ? newMaxFees.toString() : null,
          page: "1",
        });
      }, 300);
    };
  }, [updateURL]);

  const handleReset = useCallback(() => {
    router.push("/college-predictor");
  }, [router]);

  // ✅ OPTIMIZATION 7: Instant mode change without refetch
  const handleViewModeChange = useCallback(
    (mode: "safe" | "risk") => {
      setViewMode(mode);
      updateURL({
        mode: mode,
        page: "1",
      });
    },
    [updateURL]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        updateURL({
          page: page.toString(),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages, updateURL]
  );

  // ✅ OPTIMIZATION 8: Memoized filtered colleges
  const filteredColleges = useMemo(() => {
    if (!Array.isArray(predictedColleges) || predictedColleges.length === 0) {
      return [];
    }

    const collegesToDisplay = predictedColleges.map((college, index) => {
      return {
        id: index + 1,
        name: college.College || "-",
        slug: college.Slug || "",
        location: `${college.State || "-"}, India`,
        branch: college.Branch || "-",
        course: college.Course || "-",
        type: "Government",
        SeatType: college.SeatType || "-",
        SubCategory: college.SubCategory || "-",
        quota: college.Quota || "All India",
        fees: college.Fees
          ? `₹${(college.Fees / 100000).toFixed(1)}L/year`
          : "-",
        avgFees: college.Fees || 0,
        avgPackage: college.AvgSalary
          ? `₹${(college.AvgSalary / 100000).toFixed(1)}L`
          : "N/A",
        avgSalaryNum: college.AvgSalary || 0,
        nirf: college.NIRFNumber || "-",
        nirfText: college.NIRF || "-",
        cutoffs: college.CutoffsByYear || {},
        closestRound: college.ClosestRound || "-",
        branchWeight: college.BranchWeight || 0,
        collegeWeight: college.CollegeWeight || 0,
        rankScore: college.RankScore || 0,
        finalScore: college.FinalScore || 0,
        tags: ["Cutoff", "Placement"],
      };
    });

    const filtered = collegesToDisplay.filter((college) => {
      if (selectedCities.length > 0) {
        const matchesCity = selectedCities.some((city) =>
          college.location
            .toLowerCase()
            .includes(city.toLowerCase().split("/")[0])
        );
        if (!matchesCity) return false;
      }

      if (
        selectedSpecializations.length > 0 &&
        !selectedSpecializations.some((spec) =>
          college.branch.toLowerCase().includes(spec.toLowerCase())
        )
      ) {
        return false;
      }

      if (selectedQuota !== "All" && college.quota !== selectedQuota) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [
    predictedColleges,
    selectedCities,
    selectedSpecializations,
    selectedQuota,
  ]);

  // ✅ OPTIMIZATION 9: Memoized filtered cities
  const filteredCities = useMemo(
    () =>
      cities.filter((city) =>
        city.toLowerCase().includes(searchLocation.toLowerCase())
      ),
    [searchLocation]
  );

  const isDarkMode = viewMode === "risk";

  // ✅ OPTIMIZATION 10: Memoized view details handler
  const handleViewDetails = useCallback(
    (slug: string) => {
      router.push(`/college/${slug}`);
    },
    [router]
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900"
          : "bg-[#F2F4F7]"
      }`}
    >
      {/* Header Section */}
      <div
        className={`relative border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-amber-900/20"
            : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border-gray-200"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"></div>
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <h1
                className={`mb-1 md:mb-2 text-xl md:text-2xl transition-colors duration-300 ${
                  isDarkMode ? "text-amber-500" : "text-white"
                }`}
              >
                {examOptions.find((e) => e.id === selectedExam)?.name}{" "}
                <span
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-yellow-400"
                  }`}
                >
                  College Predictor
                </span>
              </h1>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-white"
                }`}
              >
                Get personalized college predictions driven by advanced AI
                analytics.
              </p>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className={`w-full sm:w-auto transition-colors duration-300 ${
                isDarkMode
                  ? "border-amber-600/50 text-white hover:bg-amber-950/30 hover:text-amber-400"
                  : "border-gray-300 text-white hover:bg-gray-50 hover:text-slate-900"
              }`}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div
        className={`border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-slate-900/50 border-slate-800 backdrop-blur-sm"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <p
                className={`text-sm md:text-base flex items-center gap-2 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="animate-[bounce_1s_ease-in-out_infinite] inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span
                        className="animate-[bounce_1s_ease-in-out_infinite] inline-block w-2 h-2 bg-blue-500 rounded-full"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="animate-[bounce_1s_ease-in-out_infinite] inline-block w-2 h-2 bg-blue-500 rounded-full"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </span>
                    <span className="text-sm text-slate-500">
                      Loading results for Rank{" "}
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode
                            ? "text-amber-500 font-semibold"
                            : "text-[#2a53e2]"
                        }`}
                      >
                        {inputRank}
                      </span>{" "}
                      AIR ({seatType} Category)
                    </span>
                  </span>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start flex-wrap gap-1 sm:gap-2 text-center sm:text-left text-sm sm:text-base">
                    <span className="block sm:hidden text-slate-600">
                      <span className="font-semibold text-[#2a53e2]">
                        {totalResults}
                      </span>{" "}
                      results found for you ({seatType} Category)
                    </span>

                    <span className="hidden sm:flex flex-wrap items-center gap-2">
                      <span className="text-[#2a53e2] font-semibold">
                        {totalResults} Results
                      </span>
                      <span className="text-slate-500">found for Rank</span>
                      <span
                        className={`${
                          isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                        } font-semibold`}
                      >
                        {inputRank}
                      </span>
                      <span className="text-slate-500">
                        AIR ({seatType} Category)
                      </span>
                    </span>
                  </div>
                )}
              </p>
            </div>
            <Tabs
              value={viewMode}
              onValueChange={(v) => handleViewModeChange(v as "safe" | "risk")}
              className="w-full md:w-auto"
            >
              <TabsList
                className={`w-full md:w-auto grid grid-cols-2 transition-colors duration-300 ${
                  isDarkMode ? "bg-slate-800/50" : "bg-gray-100"
                }`}
              >
                <TabsTrigger
                  value="safe"
                  className={`text-xs md:text-sm transition-colors duration-300 ${
                    viewMode === "safe" && isDarkMode
                      ? "bg-slate-700 text-white"
                      : viewMode === "safe"
                      ? "bg-white text-[#2a53e2]"
                      : isDarkMode
                      ? "text-gray-400"
                      : ""
                  }`}
                >
                  <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Safe
                </TabsTrigger>
                <TabsTrigger
                  value="risk"
                  className={`text-xs md:text-sm transition-colors duration-300 ${
                    viewMode === "risk"
                      ? isDarkMode
                        ? "bg-amber-600/20 text-amber-400 font-semibold shadow-lg shadow-amber-900/30 border border-amber-600/30"
                        : "bg-white text-[#2a53e2]"
                      : isDarkMode
                      ? "text-gray-400"
                      : ""
                  }`}
                >
                  <GraduationCap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Risk
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-2 md:px-6 py-4 md:py-8">
        {/* Mobile Filter Button */}
        <div className="mb-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className={`w-full transition-colors duration-300 ${
                  isDarkMode
                    ? "border-amber-600/50 text-amber-500 bg-slate-900/50 hover:bg-amber-950/30"
                    : "border-[#2a53e2] text-[#2a53e2]"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters (
                {selectedCities.length +
                  selectedSpecializations.length +
                  selectedTags.length}
                )
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`w-[85vw] sm:w-[350px] overflow-y-auto transition-colors duration-300 ${
                isDarkMode ? "bg-slate-900 border-slate-800" : ""
              }`}
            >
              <SheetHeader>
                <SheetTitle
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isDarkMode ? "text-amber-500" : ""
                  }`}
                >
                  <Filter
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                    }`}
                  />
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* College Tags Filter */}
                <div>
                  <h3
                    className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : ""
                    }`}
                  >
                    College Type
                  </h3>
                  <div className="space-y-2">
                    {collegeTags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-tag-${tag.id}`}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => toggleTag(tag.id)}
                          className={
                            isDarkMode ? "border-amber-600/50 text-white" : ""
                          }
                        />
                        <label
                          htmlFor={`mobile-tag-${tag.id}`}
                          className={`text-sm cursor-pointer flex-1 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : ""
                          }`}
                        >
                          <div>
                            <span className="font-medium">{tag.name}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Max Fees Filter */}
                <div>
                  <h3
                    className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : ""
                    }`}
                  >
                    Maximum Fees
                  </h3>
                  <Slider
                    value={[maxFees]}
                    onValueChange={handleMaxFeesChange}
                    max={5000000}
                    step={50000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className={isDarkMode ? "text-gray-400" : ""}>
                      ₹0L
                    </span>
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                      }`}
                    >
                      ₹{(maxFees / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h3
                    className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : ""
                    }`}
                  >
                    Location
                  </h3>
                  <div className="relative mb-3">
                    <Search
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <Input
                      placeholder="Search cities..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className={`pl-10 transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-800 border-slate-700 text-gray-200"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <div key={city} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-${city}`}
                          checked={selectedCities.includes(city)}
                          onCheckedChange={() => toggleCity(city)}
                          className={
                            isDarkMode ? "border-amber-600/50 text-white" : ""
                          }
                        />
                        <label
                          htmlFor={`mobile-${city}`}
                          className={`text-sm cursor-pointer transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : ""
                          }`}
                        >
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card
              className={`border sticky top-4 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-slate-900/50 border-slate-800 backdrop-blur-sm"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className={`text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : ""
                    }`}
                  >
                    <Filter
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                      }`}
                    />
                    Filters
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCities([]);
                      setMaxFees(5000000);
                      setSelectedSpecializations([]);
                      setSelectedTags([]);
                      setSelectedQuota("All");

                      updateURL({
                        tag: null,
                        maxFees: null,
                        page: "1",
                      });
                    }}
                    className={`transition-colors duration-300 ${
                      isDarkMode
                        ? "text-white hover:text-amber-400 hover:bg-amber-950/30 border border-amber-600/30"
                        : "text-[#2a53e2] hover:text-[#2a53e2]/80"
                    }`}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* College Tags Filter */}
                  <div>
                    <h3
                      className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : ""
                      }`}
                    >
                      College Type
                    </h3>
                    <div className="space-y-3">
                      {collegeTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-start space-x-2"
                        >
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={() => toggleTag(tag.id)}
                            className={`mt-1 ${
                              isDarkMode ? "border-amber-600/50 text-white" : ""
                            }`}
                          />
                          <label
                            htmlFor={`tag-${tag.id}`}
                            className={`text-sm cursor-pointer flex-1 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-300" : ""
                            }`}
                          >
                            <div>
                              <span className="font-medium">{tag.name}</span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Max Fees Filter */}
                  <div>
                    <h3
                      className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : ""
                      }`}
                    >
                      Maximum Fees
                    </h3>
                    <Slider
                      value={[maxFees]}
                      onValueChange={handleMaxFeesChange}
                      max={5000000}
                      step={50000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span className={isDarkMode ? "text-gray-400" : ""}>
                        ₹0L
                      </span>
                      <span
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-amber-500" : "text-[#2a53e2]"
                        }`}
                      >
                        ₹{(maxFees / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <h3
                      className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : ""
                      }`}
                    >
                      Location
                    </h3>
                    <div className="relative mb-3">
                      <Search
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <Input
                        placeholder="Search cities..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className={`pl-10 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-slate-800 border-slate-700 text-gray-200 placeholder:text-gray-500"
                            : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`space-y-2 max-h-48 overflow-y-auto transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-900 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-900"
                          : ""
                      }`}
                      style={
                        isDarkMode
                          ? {
                              scrollbarColor: "#1e293b #0f172a",
                              scrollbarWidth: "thin",
                            }
                          : undefined
                      }
                    >
                      {filteredCities.map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={city}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => toggleCity(city)}
                            className={
                              isDarkMode ? "border-amber-600/50 text-white" : ""
                            }
                          />
                          <label
                            htmlFor={city}
                            className={`text-sm cursor-pointer transition-colors duration-300 ${
                              isDarkMode ? "text-gray-300" : ""
                            }`}
                          >
                            {city}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isLoading ? (
                <Card
                  className={`p-12 text-center col-span-1 lg:col-span-2 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-slate-900/50 border-slate-800 backdrop-blur-sm"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div
                    className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 transition-colors duration-300 ${
                      isDarkMode ? "border-amber-500" : "border-[#2a53e2]"
                    }`}
                  ></div>
                  <p
                    className={`text-sm font-mono rounded px-3 py-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "text-gray-300 bg-slate-800/50"
                        : "text-gray-600 bg-gray-50"
                    }`}
                  >
                    Please wait while our AI analyzes your data...
                  </p>
                </Card>
              ) : error ? (
                <Card
                  className={`p-12 text-center col-span-1 lg:col-span-2 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-slate-900/50 border-slate-800 backdrop-blur-sm"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Award
                    className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-amber-900/50" : "text-red-300"
                    }`}
                  />
                  <h3
                    className={`mb-2 font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : "text-slate-900"
                    }`}
                  >
                    Error Loading Data
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {error}
                  </p>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className={`transition-colors duration-300 ${
                      isDarkMode
                        ? "border-amber-600/50 text-amber-500 hover:bg-amber-950/30"
                        : "border-[#2a53e2] text-[#2a53e2]"
                    }`}
                  >
                    Try Again
                  </Button>
                </Card>
              ) : filteredColleges.length > 0 ? (
                <>
                  {filteredColleges.map((college) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      isDarkMode={isDarkMode}
                      onViewDetails={handleViewDetails}
                    />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="col-span-1 lg:col-span-2 flex flex-col items-center gap-4 mt-6">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1 || isLoading}
                          className={`min-w-[44px] h-[44px] sm:min-w-0 sm:h-auto transition-colors duration-300 ${
                            isDarkMode
                              ? "border-slate-700 text-gray-300 hover:bg-slate-800/50 disabled:opacity-50"
                              : "border-gray-300"
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline ml-1">
                            Previous
                          </span>
                        </Button>

                        <div className="flex items-center gap-1 sm:gap-2">
                          {Array.from(
                            {
                              length: Math.min(
                                totalPages <= 5 ? totalPages : 3,
                                totalPages
                              ),
                            },
                            (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 2) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 1) {
                                pageNum = totalPages - 2 + i;
                              } else {
                                pageNum = currentPage - 1 + i;
                              }

                              return (
                                <Button
                                  key={pageNum}
                                  variant={
                                    currentPage === pageNum
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  onClick={() => handlePageChange(pageNum)}
                                  disabled={isLoading}
                                  className={`min-w-[44px] h-[44px] sm:min-w-[36px] sm:h-auto transition-colors duration-300 ${
                                    currentPage === pageNum
                                      ? isDarkMode
                                        ? "bg-amber-600/30 text-amber-400 hover:bg-amber-600/40 border-amber-600/50"
                                        : "bg-[#2a53e2] text-white hover:bg-[#2a53e2]/90"
                                      : isDarkMode
                                      ? "border-slate-700 text-gray-300 hover:bg-slate-800/50"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {pageNum}
                                </Button>
                              );
                            }
                          )}

                          {totalPages > 5 && currentPage < totalPages - 2 && (
                            <>
                              <span
                                className={`hidden md:inline px-2 transition-colors duration-300 ${
                                  isDarkMode ? "text-gray-500" : "text-gray-500"
                                }`}
                              >
                                ...
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={isLoading}
                                className={`hidden md:inline-flex transition-colors duration-300 ${
                                  isDarkMode
                                    ? "border-slate-700 text-gray-300 hover:bg-slate-800/50"
                                    : "border-gray-300"
                                }`}
                              >
                                {totalPages}
                              </Button>
                            </>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages || isLoading}
                          className={`min-w-[44px] h-[44px] sm:min-w-0 sm:h-auto transition-colors duration-300 ${
                            isDarkMode
                              ? "border-slate-700 text-gray-300 hover:bg-slate-800/50 disabled:opacity-50"
                              : "border-gray-300"
                          }`}
                        >
                          <span className="hidden sm:inline mr-1">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>

                      <p
                        className={`text-xs sm:text-sm text-center px-4 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Page {currentPage} of {totalPages} • Showing{" "}
                        {filteredColleges.length} of {totalResults} results
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <Card
                  className={`p-6 md:p-12 text-center col-span-1 lg:col-span-2 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-slate-900/50 border-slate-800 backdrop-blur-sm"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Award
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-amber-900/50" : "text-gray-300"
                    }`}
                  />
                  <h3
                    className={`mb-2 text-base md:text-lg font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : "text-slate-900"
                    }`}
                  >
                    No Colleges Found
                  </h3>
                  <p
                    className={`mb-4 text-sm md:text-base transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCities([]);
                      setMaxFees(5000000);
                      setSelectedSpecializations([]);
                      setSelectedTags([]);
                      setSelectedQuota("All");

                      updateURL({
                        tag: null,
                        maxFees: null,
                        page: "1",
                      });
                    }}
                    variant="outline"
                    className={`w-full sm:w-auto transition-colors duration-300 ${
                      isDarkMode
                        ? "border-amber-600/50 text-amber-500 hover:bg-amber-950/30"
                        : "border-[#2a53e2] text-[#2a53e2]"
                    }`}
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
