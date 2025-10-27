"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
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
  {
    id: "iiit",
    name: "IIIT",
  },
];

const examOptions = [
  {
    id: "jee-main",
    name: "JEE Main",
    description: "Joint Entrance Examination - Main",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    description: "For IIT admissions",
  },
  { id: "neet", name: "NEET UG", description: "Medical entrance exam" },
  { id: "bitsat", name: "BITSAT", description: "BITS Pilani entrance" },
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

export default function CollegePredictorResultPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial form state from URL
  const [selectedExam, setSelectedExam] = useState("");
  const [inputRank, setInputRank] = useState("");
  const [seatType, setSeatType] = useState("OPEN");
  const [subCategory, setSubCategory] = useState("Gender-Neutral");
  const [userState, setUserState] = useState("");

  // Initialize as empty array to prevent map errors
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

  // Function to update URL with current filters
  const updateURL = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Initialize state from URL on mount
  useEffect(() => {
    const exam = searchParams.get("exam") || "";
    const rank = searchParams.get("rank") || "";
    const state = searchParams.get("state") || "";
    const seat = searchParams.get("seatType") || "OPEN";
    const sub = searchParams.get("subCategory") || "Gender-Neutral";
    const mode = (searchParams.get("mode") as "safe" | "risk") || "safe";
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
  }, [searchParams]);

  // Fetch predictions when URL params change
  useEffect(() => {
    const exam = searchParams.get("exam");
    const rank = searchParams.get("rank");
    const state = searchParams.get("state");
    const seat = searchParams.get("seatType");
    const sub = searchParams.get("subCategory");

    async function fetchPredictions() {
      if (!exam || !rank || !state || !seat || !sub) {
        setError("Missing required parameters");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Map exam types to API format
        const examTypeMap: Record<string, string> = {
          "JEE-Main": "JEE-Main",
          "JEE-Advanced": "JEE-Advanced",
          "NEET-UG": "NEET-UG",
          bitsat: "BITSAT",
          viteee: "VITEEE",
          comedk: "COMEDK",
        };

        const examType = examTypeMap[exam] || "JEE-Main";
        const mode = searchParams.get("mode") || "safe";
        const page = parseInt(searchParams.get("page") || "1");
        const tags = searchParams.get("tag")?.split(",").filter(Boolean) || [];
        const fees = searchParams.get("maxFees");

        // Build query parameters for API
        const queryParams: Record<string, string | number> = {
          rank: rank,
          examType: examType,
          seatType: seat,
          subCategory: sub,
          homeState: state,
          mode: mode,
          page: page,
          pageSize: 50,
        };

        // Add optional filters if they exist
        if (tags.length > 0) {
          queryParams.tag = tags.join(",");
        }

        if (fees && parseInt(fees) < 5000000) {
          queryParams.maxFees = parseInt(fees);
        }

        console.log("API Request Params:", queryParams);

        // Call the API using apiService
        const response = await apiService.get<PredictorAPIResponse>(
          "/predictor/predict",
          queryParams
        );

        console.log("API Response:", response);

        if (
          response.statusCode === 200 &&
          response.data &&
          response.data.colleges
        ) {
          // Extract colleges array from nested structure
          const collegeData = Array.isArray(response.data.colleges)
            ? response.data.colleges
            : [];

          setPredictedColleges(collegeData);

          // Update pagination info from response
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

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const toggleTag = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter((t) => t !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(newTags);

    // Update URL with new tags and reset to page 1
    updateURL({
      tag: newTags.length > 0 ? newTags.join(",") : null,
      page: "1",
    });
  };

  const handleMaxFeesChange = (value: number[]) => {
    const newMaxFees = value[0];
    setMaxFees(newMaxFees);

    // Update URL with new max fees and reset to page 1
    updateURL({
      maxFees: newMaxFees < 5000000 ? newMaxFees.toString() : null,
      page: "1",
    });
  };

  const handleReset = () => {
    router.push("/college-predictor");
  };

  const handleViewModeChange = (mode: "safe" | "risk") => {
    setViewMode(mode);

    // Update URL with new mode and reset to page 1
    updateURL({
      mode: mode,
      page: "1",
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Update URL with new page
      updateURL({
        page: page.toString(),
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredColleges = useMemo(() => {
    // Always ensure we're working with an array
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

    // Apply client-side filters
    const filtered = collegesToDisplay.filter((college) => {
      // City filter
      if (selectedCities.length > 0) {
        const matchesCity = selectedCities.some((city) =>
          college.location
            .toLowerCase()
            .includes(city.toLowerCase().split("/")[0])
        );
        if (!matchesCity) return false;
      }

      // Specialization filter
      if (
        selectedSpecializations.length > 0 &&
        !selectedSpecializations.some((spec) =>
          college.branch.toLowerCase().includes(spec.toLowerCase())
        )
      ) {
        return false;
      }

      // Quota filter
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

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchLocation.toLowerCase())
  );

  // Get unique specializations from results

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">
                {examOptions.find((e) => e.id === selectedExam)?.name}{" "}
                <span className="text-yellow-400">College Predictor</span>
              </h1>
              <p className="text-white text-sm md:text-base">
                Find the best colleges based on your rank and preferences
                according to previous year trends.
              </p>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-300 text-white hover:bg-gray-50 hover:text-slate-900 w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <p className="text-gray-900 text-sm md:text-base">
                <span className="text-[#2a53e2]">{totalResults} Results</span>{" "}
                found for Rank{" "}
                <span className="text-[#2a53e2]">{inputRank}</span> AIR (
                {seatType} Category)
              </p>
            </div>
            <Tabs
              value={viewMode}
              onValueChange={(v) => handleViewModeChange(v as "safe" | "risk")}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-gray-100 w-full md:w-auto grid grid-cols-2">
                <TabsTrigger
                  value="safe"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#2a53e2] text-xs md:text-sm"
                >
                  <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Safe
                </TabsTrigger>
                <TabsTrigger
                  value="risk"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#2a53e2] text-xs md:text-sm"
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
                className="w-full border-[#2a53e2] text-[#2a53e2]"
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
              className="w-[85vw] sm:w-[350px] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#2a53e2]" />
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* College Tags Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">College Type</h3>
                  <div className="space-y-2">
                    {collegeTags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-tag-${tag.id}`}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => toggleTag(tag.id)}
                        />
                        <label
                          htmlFor={`mobile-tag-${tag.id}`}
                          className="text-sm cursor-pointer flex-1"
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
                  <h3 className="font-semibold mb-3 text-sm">
                    Maximum Annual Fees
                  </h3>
                  <Slider
                    value={[maxFees]}
                    onValueChange={handleMaxFeesChange}
                    max={5000000}
                    step={50000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹0L</span>
                    <span className="font-semibold text-[#2a53e2]">
                      ₹{(maxFees / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Location</h3>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search cities..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <div key={city} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-${city}`}
                          checked={selectedCities.includes(city)}
                          onCheckedChange={() => toggleCity(city)}
                        />
                        <label
                          htmlFor={`mobile-${city}`}
                          className="text-sm cursor-pointer"
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
            <Card className="bg-white border border-gray-200 sticky top-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#2a53e2]" />
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

                      // Clear filters from URL
                      updateURL({
                        tag: null,
                        maxFees: null,
                        page: "1",
                      });
                    }}
                    className="text-[#2a53e2] hover:text-[#2a53e2]/80"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* College Tags Filter */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm">College Type</h3>
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
                            className="mt-1"
                          />
                          <label
                            htmlFor={`tag-${tag.id}`}
                            className="text-sm cursor-pointer flex-1"
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
                    <h3 className="font-semibold mb-3 text-sm">
                      Maximum Annual Fees
                    </h3>
                    <Slider
                      value={[maxFees]}
                      onValueChange={handleMaxFeesChange}
                      max={5000000}
                      step={50000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>₹0L</span>
                      <span className="font-semibold text-[#2a53e2]">
                        ₹{(maxFees / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm">Location</h3>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search cities..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filteredCities.map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={city}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => toggleCity(city)}
                          />
                          <label
                            htmlFor={city}
                            className="text-sm cursor-pointer"
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
                <Card className="p-12 text-center bg-white border border-gray-200 col-span-1 lg:col-span-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a53e2] mx-auto mb-4"></div>
                  <h3 className="text-slate-900 mb-2 font-semibold">
                    Loading Predictions...
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Analyzing data and finding best colleges for you
                  </p>
                </Card>
              ) : error ? (
                <Card className="p-12 text-center bg-white border border-gray-200 col-span-1 lg:col-span-2">
                  <Award className="w-16 h-16 text-red-300 mx-auto mb-4" />
                  <h3 className="text-slate-900 mb-2 font-semibold">
                    Error Loading Data
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-[#2a53e2] text-[#2a53e2]"
                  >
                    Try Again
                  </Button>
                </Card>
              ) : filteredColleges.length > 0 ? (
                <>
                  {filteredColleges.map((college) => (
                    <Card
                      key={college.id}
                      className="bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="p-4 md:p-6">
                        {/* College Header */}
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                          <div className="flex-1 w-full">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#2a53e2]/10 to-[#7C5EFF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-[#2a53e2]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-slate-900 mb-1 text-base md:text-lg font-semibold">
                                  {college.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600 mb-2">
                                  <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {college.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#2a53e2] text-[#2a53e2] hover:bg-[#2a53e2]/5 w-full sm:w-auto text-xs"
                            onClick={() =>
                              router.push(`/college/${college.slug}`)
                            }
                          >
                            View Details
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                        {/* College Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="text-xs border-[#2a53e2] text-[#2a53e2]"
                          >
                            NIRF #{college.nirf !== "-" ? college.nirf : "N/A"}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 text-blue-700"
                          >
                            {college.quota === "OS"
                              ? "Other State"
                              : college.quota === "HS"
                              ? "Home State"
                              : college.quota === "AI"
                              ? "All India"
                              : college.quota}
                          </Badge>
                          {college.tags.map((tag) => (
                            <a
                              key={tag}
                              href={
                                tag.toLowerCase() === ""
                                  ? `/college/${college.slug}#cutoff`
                                  : `/college/${college.slug}#placements`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Badge
                                variant="secondary"
                                className="text-xs bg-gray-100 cursor-pointer hover:bg-gray-200"
                              >
                                {tag}
                              </Badge>
                            </a>
                          ))}
                        </div>

                        {/* Branch Info */}
                        <div className="bg-gradient-to-r from-[#2a53e2]/5 to-[#7C5EFF]/5 rounded-lg p-3 md:p-4 mb-4">
                          <p className="text-xs text-gray-600 mb-1">
                            {college.course}
                          </p>
                          <p className="text-slate-900 font-medium text-sm">
                            {college.branch}
                          </p>
                        </div>
                        {/* Fees & Package */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-xs md:text-sm">
                            <span className="text-gray-600 block mb-1">
                              Avg Package
                            </span>
                            <span className="text-[#2a53e2] font-semibold">
                              {college.avgPackage}
                            </span>
                          </div>
                          <div className="text-xs md:text-sm">
                            <span className="text-gray-600 block mb-1">
                              Annual Fees
                            </span>
                            <span className="text-[#2a53e2] font-semibold">
                              {college.fees.replace("/year", "")}
                            </span>
                          </div>
                        </div>
                        {/* Cutoff Table */}
                        <div>
                          <h4 className="text-slate-600 mb-2 md:mb-3 text-xs md:text-base font-semibold ">
                            Closing Ranks ({college.SeatType} :{" "}
                            {college.SubCategory})
                          </h4>
                          <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="w-full text-xs md:text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-700 whitespace-nowrap font-semibold">
                                    Round
                                  </th>
                                  {Object.keys(college.cutoffs)
                                    .sort()
                                    .reverse()
                                    .map((year) => (
                                      <th
                                        key={year}
                                        className="text-center py-2 md:py-3 px-2 md:px-4 text-gray-700 whitespace-nowrap font-semibold"
                                      >
                                        {year}
                                      </th>
                                    ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {(() => {
                                  // Collect all unique round keys from all years
                                  const allRoundsSet = new Set<string>();
                                  Object.values(college.cutoffs).forEach(
                                    (rounds) => {
                                      Object.keys(rounds).forEach(
                                        (roundKey) => {
                                          allRoundsSet.add(roundKey);
                                        }
                                      );
                                    }
                                  );

                                  // Priority order for rounds
                                  const roundPriority = [
                                    ...Array.from(
                                      { length: 6 },
                                      (_, i) => `Round-${i + 1}`
                                    ),
                                    ...Array.from(
                                      { length: 2 },
                                      (_, i) => `CSAB-${i + 1}`
                                    ),
                                    "Upgradation-Round",
                                    "Upgradation-Round-2",
                                    "Spot-Round",
                                    "Special-Spot-Round",
                                  ];

                                  // Sort rounds by priority, then alphabetically for any others
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
                                    const isClosest =
                                      college.closestRound === roundKey;
                                    return (
                                      <tr
                                        key={roundKey}
                                        className={
                                          isClosest
                                            ? "bg-gradient-to-r from-[#FACC15]/10 to-[#FDE047]/10"
                                            : "hover:bg-gray-50"
                                        }
                                      >
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-gray-900 whitespace-nowrap font-medium">
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
                                                className="text-center py-2 md:py-3 px-2 md:px-4 text-gray-600 whitespace-nowrap"
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
                          <p className="text-xs text-gray-500 mt-2">
                            Closest Round:{" "}
                            <span className="font-semibold">
                              {college.closestRound}
                            </span>{" "}
                            {/* • Match Score:{" "}
                            {(college.finalScore * 100).toFixed(1)}% */}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Pagination */}
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="col-span-1 lg:col-span-2 flex flex-col items-center gap-4 mt-6">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1 || isLoading}
                          className="border-gray-300 min-w-[44px] h-[44px] sm:min-w-0 sm:h-auto"
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
                                  className={`min-w-[44px] h-[44px] sm:min-w-[36px] sm:h-auto ${
                                    currentPage === pageNum
                                      ? "bg-[#2a53e2] text-white hover:bg-[#2a53e2]/90"
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
                              <span className="hidden md:inline px-2 text-gray-500">
                                ...
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={isLoading}
                                className="hidden md:inline-flex border-gray-300"
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
                          className="border-gray-300 min-w-[44px] h-[44px] sm:min-w-0 sm:h-auto"
                        >
                          <span className="hidden sm:inline mr-1">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 text-center px-4">
                        Page {currentPage} of {totalPages} • Showing{" "}
                        {filteredColleges.length} of {totalResults} results
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <Card className="p-6 md:p-12 text-center bg-white border border-gray-200 col-span-1 lg:col-span-2">
                  <Award className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-slate-900 mb-2 text-base md:text-lg font-semibold">
                    No Colleges Found
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
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
                    className="border-[#2a53e2] text-[#2a53e2] w-full sm:w-auto"
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
