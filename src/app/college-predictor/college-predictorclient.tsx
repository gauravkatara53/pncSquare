"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Footer } from "@/components/common/footer";
import {
  RotateCcw,
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  Filter,
  TrendingUp,
  Award,
  Building2,
  GraduationCap,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { predictCollegesTable } from "@/components/college-predictor/function/predictionClient";

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

const specializations = [
  "Computer Science Engineering",
  "Information Technology",
  "Electronics and Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
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

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

type PredictionResult = {
  College: string;
  College_Name: string;
  State: string;
  nirfRank: string;
  fees: string;
  avgSalary: string;
  Course: string;
  Branch: string;
  Quota: string;
  SeatType: string;
  SubCategory: string;
  PriorityScore?: number;
  Weight?: number;
  RankScore?: number;
  FinalScore?: number;
  AllRoundsCutoff: string;
};

export default function CollegePredictorClientPage() {
  // Initial form state
  const [showResults, setShowResults] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [inputRank, setInputRank] = useState("");
  const [seatType, setSeatType] = useState("OPEN");
  const [subCategory, setSubCategory] = useState("Gender-Neutral");
  const [userState, setUserState] = useState("");

  const [predictedColleges, setPredictedColleges] = useState<
    PredictionResult[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Main page state
  const [percentile, setPercentile] = useState("98.5");
  const [predictedRank, setPredictedRank] = useState("60001");
  const [category, setCategory] = useState("General");
  const [viewMode, setViewMode] = useState<"colleges" | "specialization">(
    "colleges"
  );

  // Filters
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedQuota, setSelectedQuota] = useState("All India");
  const [feesRange, setFeesRange] = useState([0, 5000000]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [selectedOwnership, setSelectedOwnership] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get params from URL
    const exam = searchParams.get("exam");
    const rank = searchParams.get("rank");
    const state = searchParams.get("state");
    const cat = searchParams.get("category");

    async function runPredictionFromUrl() {
      if (exam && rank && state && cat) {
        setIsLoading(true);
        setSelectedExam(exam);
        setInputRank(rank);
        setUserState(state);
        setSubCategory(cat);
        setPredictedRank(rank);
        setCategory(cat);
        const calculatedPercentile = (
          100 -
          (parseInt(rank) / 1000000) * 100
        ).toFixed(2);
        setPercentile(calculatedPercentile);
        setShowResults(true);

        try {
          const examTypeMap = {
            "jee-main": "JEE-Main",
            "jee-advanced": "JEE-Advanced",
            neet: "NEET",
            bitsat: "BITSAT",
            viteee: "VITEEE",
            comedk: "COMEDK",
          };
          const examType =
            examTypeMap[exam as keyof typeof examTypeMap] || "JEE-Main";
          const results = await predictCollegesTable(
            examType,
            parseInt(rank),
            seatType,
            cat,
            state
          );
          setPredictedColleges(
            results.map((item) => ({
              ...item,
              PriorityScore: item.PriorityScore ?? 0,
              Weight: item.Weight ?? 0,
              RankScore: item.RankScore ?? 0,
              FinalScore: item.FinalScore ?? 0,
            }))
          );
        } catch (error) {
          console.error("Error predicting colleges:", error);
          setPredictedColleges([]);
        } finally {
          setIsLoading(false);
        }
      }
    }
    runPredictionFromUrl();
  }, [searchParams]);

  const handleStartPrediction = async () => {
    if (selectedExam && inputRank && userState) {
      setIsLoading(true);

      try {
        // Map exam selection to exam type format
        const examTypeMap: Record<string, string> = {
          "jee-main": "JEE-Main",
          "jee-advanced": "JEE-Advanced",
          neet: "NEET",
          bitsat: "BITSAT",
          viteee: "VITEEE",
          comedk: "COMEDK",
        };
        const examType =
          examTypeMap[selectedExam as keyof typeof examTypeMap] || "JEE-Main";
        // Call client-side prediction function
        const results = await predictCollegesTable(
          examType,
          parseInt(inputRank),
          seatType,
          subCategory,
          userState
        );

        setPredictedColleges(
          results.map((item) => ({
            ...item,
            PriorityScore: item.PriorityScore ?? 0,
            Weight: item.Weight ?? 0,
            RankScore: item.RankScore ?? 0,
            FinalScore: item.FinalScore ?? 0,
          }))
        );

        // ✅ ADD THESE LINES:
        console.log("✅ SET PREDICTED COLLEGES:", results.length);
        console.log("📋 First result structure:", results[0]);
        console.log("🔍 showResults state:", showResults);

        // Update URL
        const params = new URLSearchParams();
        params.set("exam", selectedExam);
        params.set("rank", inputRank);
        params.set("state", userState);
        params.set("category", subCategory);
        router.push(`/college-predictor?${params.toString()}`);

        setPredictedRank(inputRank);
        setCategory(subCategory);
        // Calculate percentile based on rank (simplified)
        const calculatedPercentile = (
          100 -
          (parseInt(inputRank) / 1000000) * 100
        ).toFixed(2);
        setPercentile(calculatedPercentile);
        setShowResults(true);
      } catch (error) {
        console.error("Error predicting colleges:", error);
        alert("Failed to predict colleges. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    // Reset URL
    router.push("/college-predictor");

    // Reset all state
    setShowResults(false);
    setSelectedExam("");
    setInputRank("");
    setSeatType("OPEN");
    setSubCategory("Gender-Neutral");
    setUserState("");
    setPercentile("98.5");
    setPredictedRank("60001");
    setCategory("General");
    setSelectedCities([]);
    setSelectedQuota("All India");
    setFeesRange([0, 500000]);
    setSelectedSpecializations([]);
    setSelectedOwnership([]);
    setPredictedColleges([]);
    setIsLoading(false);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleOwnership = (type: string) => {
    setSelectedOwnership((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredColleges = useMemo(() => {
    if (predictedColleges.length === 0) {
      console.log("⚠️ No predicted colleges to display");
      return [];
    }

    console.log("🎨 MAPPING PREDICTED COLLEGES TO UI FORMAT");
    console.log("📊 Raw predicted colleges count:", predictedColleges.length);
    console.log("📋 First predicted college:", predictedColleges[0]);

    // Map predicted colleges to UI format
    const collegesToDisplay = predictedColleges.map((college, index) => {
      // Parse fees to number
      const feesNum = parseFloat(college.fees || "0");
      const avgSalaryNum = parseFloat(college.avgSalary || "0");

      console.log(
        `\n🏫 Processing college ${index + 1}:`,
        college.College_Name
      );
      console.log(`   Fees: ${college.fees} → ${feesNum}`);
      console.log(`   Avg Salary: ${college.avgSalary} → ${avgSalaryNum}`);
      console.log(`   Raw AllRoundsCutoff:`, college.AllRoundsCutoff);

      // ✅ NEW: Parse AllRoundsCutoff with " | " separator for years
      const cutoffsTable: Record<string, Record<string, number | string>> = {};

      // Split by " | " to separate years (2025 | 2024)
      const yearParts = (college.AllRoundsCutoff || "").split(" | ");

      console.log(`   📅 Split into ${yearParts.length} year parts`);

      // Expected years in descending order
      const years = ["2025", "2024"];

      yearParts.forEach((yearPart, yearIndex) => {
        const year = years[yearIndex];
        if (!year) {
          console.log(`   ⚠️ Skipping extra year part at index ${yearIndex}`);
          return;
        }

        console.log(`\n   📊 Processing ${year}:`);
        console.log(`      Raw data: "${yearPart.substring(0, 80)}..."`);

        // Initialize year object
        if (!cutoffsTable[year]) {
          cutoffsTable[year] = {};
        }

        // Split by comma to get individual round:rank pairs
        const cutoffPairs = yearPart.split(",").map((s) => s.trim());

        console.log(`      Found ${cutoffPairs.length} pairs for ${year}`);

        cutoffPairs.forEach((pair: string) => {
          if (!pair) return;

          const colonIndex = pair.indexOf(":");
          if (colonIndex === -1) {
            console.log(`      ⚠️ Invalid pair format: "${pair}"`);
            return;
          }

          const roundPart = pair.substring(0, colonIndex).trim();
          const rankPart = pair.substring(colonIndex + 1).trim();

          // Extract round number from "Round-1" -> 1
          const roundNum = parseInt(
            roundPart
              .replace("Round-", "")
              .replace("CSAB-", "")
              .replace(/\D/g, "")
          );

          const rankNum = parseInt(rankPart);

          if (isNaN(roundNum)) {
            console.log(`      ⚠️ Invalid round: "${roundPart}"`);
            return;
          }

          if (isNaN(rankNum)) {
            console.log(`      ⚠️ Invalid rank: "${rankPart}"`);
            cutoffsTable[year][`Round-${roundNum}`] = "-";
          } else {
            cutoffsTable[year][`Round-${roundNum}`] = rankNum;
            console.log(`      ✅ ${year} Round-${roundNum} = ${rankNum}`);
          }
        });

        console.log(
          `      ${year} final rounds:`,
          Object.keys(cutoffsTable[year]).sort()
        );
      });

      console.log(`   📊 Complete cutoffs structure:`, cutoffsTable);

      const mappedCollege = {
        id: index + 1,
        name: college.College_Name || college.College || "-",
        location: `${college.State || "-"}, India`,
        branch: `${college.Course || "-"} - ${college.Branch || "-"}`,
        type: "Government",
        quota: college.Quota || "All India",
        fees: feesNum ? `₹${(feesNum / 100000).toFixed(1)}L/year` : "-",
        avgFees: feesNum,
        avgPackage: avgSalaryNum
          ? `₹${(avgSalaryNum / 100000).toFixed(1)}L`
          : college.avgSalary || "N/A",
        nirf: college.nirfRank ? parseInt(college.nirfRank) : "-",
        cutoffs: cutoffsTable,
        allRoundsCutoff: college.AllRoundsCutoff,
        tags: ["Placement", "Cutoff"],
      };

      console.log(`   ✅ Mapped successfully:`, {
        name: mappedCollege.name,
        location: mappedCollege.location,
        fees: mappedCollege.fees,
        avgFees: mappedCollege.avgFees,
        cutoffs2025Rounds: Object.keys(cutoffsTable["2025"] || {}),
        cutoffs2024Rounds: Object.keys(cutoffsTable["2024"] || {}),
      });

      return mappedCollege;
    });

    console.log("\n📊 TOTAL MAPPED COLLEGES:", collegesToDisplay.length);

    // Apply filters
    console.log("\n🔍 APPLYING FILTERS:");
    console.log(`   Selected Cities: [${selectedCities.join(", ")}]`);
    console.log(`   Fees Range: ₹${feesRange[0]} - ₹${feesRange[1]}`);
    console.log(
      `   Selected Specializations: [${selectedSpecializations.join(", ")}]`
    );
    console.log(`   Selected Ownership: [${selectedOwnership.join(", ")}]`);

    const filtered = collegesToDisplay.filter((college) => {
      // City filter
      if (selectedCities.length > 0) {
        const matchesCity = selectedCities.some((city) =>
          college.location
            .toLowerCase()
            .includes(city.toLowerCase().split("/")[0])
        );
        if (!matchesCity) {
          return false;
        }
      }

      // Fees filter
      if (college.avgFees < feesRange[0] || college.avgFees > feesRange[1]) {
        return false;
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

      // Ownership filter
      if (
        selectedOwnership.length > 0 &&
        !selectedOwnership.includes(college.type)
      ) {
        return false;
      }

      return true;
    });

    console.log("\n✅ FINAL FILTERED COLLEGES:", filtered.length);
    console.log("🎉 Filter summary:");
    console.log(`   Started with: ${collegesToDisplay.length}`);
    console.log(`   After filters: ${filtered.length}`);
    console.log(`   Removed: ${collegesToDisplay.length - filtered.length}`);

    return filtered;
  }, [
    predictedColleges,
    selectedCities,
    feesRange,
    selectedSpecializations,
    selectedOwnership,
  ]);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchLocation.toLowerCase())
  );

  // Initial Form View
  if (!showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="mb-4 text-3xl font-bold">
                <span className="text-white">College </span>
                <span className="text-yellow-400">Predictor</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Find the best colleges based on your exam rank and preferences
              </p>
            </div>

            {/* Main Form Card */}
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl p-8">
              <div className="space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white rounded-full flex items-center justify-center text-sm">
                      1
                    </div>
                    <span className="text-sm text-gray-700">Enter Details</span>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm">
                      2
                    </div>
                    <span className="text-sm text-gray-500">View Results</span>
                  </div>
                </div>
                {/* Rank Input */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Your Rank/Score <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter your rank (e.g., 60001)"
                      value={inputRank}
                      onChange={(e) => setInputRank(e.target.value)}
                      className="h-12 pr-10"
                    />
                    <Award className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  {inputRank && (
                    <p className="text-xs text-gray-500 mt-1">
                      Predicted percentile:{" "}
                      {(100 - (parseInt(inputRank) / 1000000) * 100).toFixed(2)}
                      %
                    </p>
                  )}
                </div>
                {/* Exam Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Select Entrance Exam{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={selectedExam}
                      onValueChange={setSelectedExam}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose your entrance exam" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {examOptions.map((exam) => (
                          <SelectItem key={exam.id} value={exam.id}>
                            <div className="flex items-start gap-2">
                              <div>
                                <p className="font-medium">{exam.name}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sub Category Selection */}
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Sub Category <span className="text-red-500">*</span>
                    </label>
                    <Select value={subCategory} onValueChange={setSubCategory}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Gender-Neutral">
                          Gender-Neutral
                        </SelectItem>
                        <SelectItem value="Female-only">Female-only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seat Type Selection */}
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Seat Type <span className="text-red-500">*</span>
                    </label>
                    <Select value={seatType} onValueChange={setSeatType}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="OPEN">OPEN</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="EWS">EWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* User State Selection */}
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Your State <span className="text-red-500">*</span>
                    </label>
                    <Select value={userState} onValueChange={setUserState}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      This helps us show you state quota colleges
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleStartPrediction}
                  disabled={
                    !selectedExam || !inputRank || !userState || isLoading
                  }
                  className="w-full h-12 bg-gradient-to-r  from-slate-900 via-blue-900 to-slate-800 text-white text-lg"
                >
                  {isLoading ? "Predicting..." : "Predict My Colleges"}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-1">1000+ Colleges</h3>
                <p className="text-sm text-white/80">Comprehensive database</p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-1">3-Year Data</h3>
                <p className="text-sm text-white/80">
                  Historical cutoff trends
                </p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-1">All Branches</h3>
                <p className="text-sm text-white/80">
                  Every specialization covered
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results View (existing design)
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
              className="border-gray-300 text-white hover:bg-gray-50 w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>

          {/* Stats Bar */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="p-3 md:p-4 bg-gradient-to-br bg-[#2a53e2]  border-0">
              <p className="text-xs md:text-sm text-white/80 mb-1">
                Percentile
              </p>
              <p className="text-white text-sm md:text-base">{percentile}%</p>
            </Card>

            <Card className="p-3 md:p-4 bg-white border border-gray-200">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Your Rank</p>
              <p className="text-slate-900 text-sm md:text-base">
                {predictedRank}
              </p>
            </Card>

            <Card className="p-3 md:p-4 bg-white border border-gray-200 col-span-2 md:col-span-1">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Category / Home State
              </p>
              <p className="text-slate-900 text-sm md:text-base">
                {category} / {homeState}
              </p>
            </Card>

            <Card className="p-3 md:p-4 bg-gradient-to-br from-green-500 to-green-600 border-0 col-span-2 md:col-span-1">
              <p className="text-xs md:text-sm text-white/80 mb-1">
                Colleges Found
              </p>
              <p className="text-white text-sm md:text-base">
                {filteredColleges.length} Matches
              </p>
            </Card>
          </div> */}
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <p className="text-gray-900 text-sm md:text-base">
                <span className="text-[#2a53e2]">
                  {filteredColleges.length} Colleges
                </span>{" "}
                found for Rank{" "}
                <span className="text-[#2a53e2]">{predictedRank}</span> AIR (
                {category} Category)
              </p>
            </div>

            <Tabs
              value={viewMode}
              onValueChange={(v) =>
                setViewMode(v as "colleges" | "specialization")
              }
              className="w-full md:w-auto"
            >
              <TabsList className="bg-gray-100 w-full md:w-auto grid grid-cols-2">
                <TabsTrigger
                  value="colleges"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#2a53e2] text-xs md:text-sm"
                >
                  <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  By Colleges
                </TabsTrigger>
                <TabsTrigger
                  value="specialization"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#2a53e2] text-xs md:text-sm"
                >
                  <GraduationCap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  By Specialization
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-8">
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
                  selectedOwnership.length}
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
                {/* Location Filter */}
                <div>
                  <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2a53e2]" />
                    Location
                  </h3>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search city..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-9 text-sm"
                    />
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <div key={city} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-${city}`}
                          checked={selectedCities.includes(city)}
                          onCheckedChange={() => toggleCity(city)}
                        />
                        <label
                          htmlFor={`mobile-${city}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quota Filter */}
                <div>
                  <h3 className="text-slate-900 mb-3">Quota</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-all-india"
                        checked={selectedQuota === "All India"}
                        onCheckedChange={() => setSelectedQuota("All India")}
                      />
                      <label
                        htmlFor="mobile-all-india"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        All India Quota
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-home-state"
                        checked={selectedQuota === "Home State"}
                        onCheckedChange={() => setSelectedQuota("Home State")}
                      />
                      <label
                        htmlFor="mobile-home-state"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Home State Quota
                      </label>
                    </div>
                  </div>
                </div>

                {/* Fees Range */}
                <div>
                  <h3 className="text-slate-900 mb-3">Annual Fees</h3>
                  <div className="mb-3">
                    <Slider
                      value={feesRange}
                      onValueChange={setFeesRange}
                      min={0}
                      max={500000}
                      step={10000}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{(feesRange[0] / 100000).toFixed(1)}L</span>
                      <span>₹{(feesRange[1] / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-fees-0-2"
                        checked={feesRange[0] === 0 && feesRange[1] === 200000}
                        onCheckedChange={() => setFeesRange([0, 200000])}
                      />
                      <label
                        htmlFor="mobile-fees-0-2"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        ₹0 - ₹2L
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-fees-2-4"
                        checked={
                          feesRange[0] === 200000 && feesRange[1] === 400000
                        }
                        onCheckedChange={() => setFeesRange([200000, 400000])}
                      />
                      <label
                        htmlFor="mobile-fees-2-4"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        ₹2L - ₹4L
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-fees-4-plus"
                        checked={
                          feesRange[0] === 400000 && feesRange[1] === 500000
                        }
                        onCheckedChange={() => setFeesRange([400000, 500000])}
                      />
                      <label
                        htmlFor="mobile-fees-4-plus"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        ₹4L+
                      </label>
                    </div>
                  </div>
                </div>

                {/* Specialization Filter */}
                <div>
                  <h3 className="text-slate-900 mb-3">Specialization</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-${spec}`}
                          checked={selectedSpecializations.includes(spec)}
                          onCheckedChange={() => toggleSpecialization(spec)}
                        />
                        <label
                          htmlFor={`mobile-${spec}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {spec}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ownership Filter */}
                <div>
                  <h3 className="text-slate-900 mb-3">Ownership</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-government"
                        checked={selectedOwnership.includes("Government")}
                        onCheckedChange={() => toggleOwnership("Government")}
                      />
                      <label
                        htmlFor="mobile-government"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Government
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobile-private"
                        checked={selectedOwnership.includes("Private")}
                        onCheckedChange={() => toggleOwnership("Private")}
                      />
                      <label
                        htmlFor="mobile-private"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Private
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <Card className="bg-white border border-gray-200 overflow-visible sticky top-6">
              <div className="p-4 bg-gradient-to-r bg-[#2a53e2] rounded-md text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                </div>
                <button onClick={() => setShowFilters(!showFilters)}>
                  {showFilters ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {showFilters && (
                <div className="p-4 space-y-6">
                  {/* Location Filter */}
                  <div>
                    <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#2a53e2]" />
                      Location
                    </h3>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search city..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="pl-9 text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filteredCities.map((city) => (
                        <div key={city} className="flex items-center gap-2">
                          <Checkbox
                            id={city}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => toggleCity(city)}
                          />
                          <label
                            htmlFor={city}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {city}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quota Filter */}
                  <div>
                    <h3 className="text-slate-900 mb-3">Quota</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="all-india"
                          checked={selectedQuota === "All India"}
                          onCheckedChange={() => setSelectedQuota("All India")}
                        />
                        <label
                          htmlFor="all-india"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          All India Quota
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="home-state"
                          checked={selectedQuota === "Home State"}
                          onCheckedChange={() => setSelectedQuota("Home State")}
                        />
                        <label
                          htmlFor="home-state"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Home State Quota
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Fees Range */}
                  <div>
                    <h3 className="text-slate-900 mb-3">Annual Fees</h3>
                    <div className="mb-3">
                      <Slider
                        value={feesRange}
                        onValueChange={setFeesRange}
                        min={0}
                        max={5000000}
                        step={100000}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>₹{(feesRange[0] / 100000).toFixed(1)}L</span>
                        <span>₹{(feesRange[1] / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="fees-0-2"
                          checked={
                            feesRange[0] === 0 && feesRange[1] === 200000
                          }
                          onCheckedChange={() => setFeesRange([0, 200000])}
                        />
                        <label
                          htmlFor="fees-0-2"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          ₹0 - ₹2L
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="fees-2-4"
                          checked={
                            feesRange[0] === 200000 && feesRange[1] === 400000
                          }
                          onCheckedChange={() => setFeesRange([200000, 400000])}
                        />
                        <label
                          htmlFor="fees-2-4"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          ₹2L - ₹4L
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="fees-4-plus"
                          checked={
                            feesRange[0] === 400000 && feesRange[1] === 500000
                          }
                          onCheckedChange={() => setFeesRange([400000, 500000])}
                        />
                        <label
                          htmlFor="fees-4-plus"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          ₹4L+
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Ownership Filter */}
                  <div>
                    <h3 className="text-slate-900 mb-3">Ownership</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="government"
                          checked={selectedOwnership.includes("Government")}
                          onCheckedChange={() => toggleOwnership("Government")}
                        />
                        <label
                          htmlFor="government"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Government
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="private"
                          checked={selectedOwnership.includes("Private")}
                          onCheckedChange={() => toggleOwnership("Private")}
                        />
                        <label
                          htmlFor="private"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Private
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isLoading ? (
                <Card className="p-12 text-center bg-white border border-gray-200 col-span-1 lg:col-span-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a53e2] mx-auto mb-4"></div>
                  <h3 className="text-slate-900 mb-2">
                    Loading Predictions...
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Analyzing data and finding best colleges for you
                  </p>
                </Card>
              ) : filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <Card
                    key={college.id}
                    className="bg-white border border-gray-200 "
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
                              <h3 className="text-slate-900 mb-1 text-base md:text-lg">
                                {college.name
                                  .split("-")
                                  .map((word) => word.toUpperCase())
                                  .join(" ")}
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
                            router.push(`/college/${college.name}`)
                          }
                        >
                          View Details
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>

                      {/* College Meta Row */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-[#2a53e2] text-[#2a53e2]"
                        >
                          NIRF #{college.nirf !== "-" ? college.nirf : "N/A"}
                        </Badge>
                        <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600 mb-2">
                          {college.tags.map((tag) => {
                            let href = `/college/${college.name}`;
                            if (tag.toLowerCase() === "cutoff") {
                              href += "#cutoff";
                            } else if (tag.toLowerCase() === "placement") {
                              href += "#placements";
                            }
                            return (
                              <a
                                key={tag}
                                href={href}
                                className="no-underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-gray-100"
                                >
                                  {tag}
                                </Badge>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                      {/* Placement & Fees Row */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-4">
                        <div className="text-xs md:text-sm">
                          <span className="text-gray-600">Avg Package:</span>
                          <span className="text-[#2a53e2] ml-2">
                            {college.avgPackage}
                          </span>
                        </div>
                        <div className="text-xs md:text-sm">
                          <span className="text-gray-600">Avg Fees:</span>
                          <span className="text-[#2a53e2] ml-2">
                            {college.fees.replace("/year", "")}
                          </span>
                        </div>
                      </div>

                      {/* Branch Info */}
                      <div className="bg-gradient-to-r from-[#2a53e2]/5 to-[#7C5EFF]/5 rounded-lg p-3 md:p-4 mb-4">
                        <p className="text-slate-900 mb-2 text-sm">
                          {college.branch}
                        </p>
                      </div>

                      {/* All Rounds Cutoff Data */}
                      <div>
                        <h4 className="text-slate-900 mb-2 md:mb-3 text-sm md:text-base">
                          Closing Ranks -
                        </h4>
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                          <table className="w-full text-xs md:text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-700 whitespace-nowrap">
                                  Round
                                </th>
                                {Object.keys(college.cutoffs)
                                  .sort()
                                  .reverse()
                                  .map((year) => (
                                    <th
                                      key={year}
                                      className="text-center py-2 md:py-3 px-2 md:px-4 text-gray-700 whitespace-nowrap"
                                    >
                                      {year}
                                    </th>
                                  ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {Array.from({ length: 6 }, (_, i) => i + 1).map(
                                (roundNum) => (
                                  <tr
                                    key={roundNum}
                                    className="hover:bg-gray-50"
                                  >
                                    <td className="py-2 md:py-3 px-2 md:px-4 text-gray-900 whitespace-nowrap font-medium">
                                      {roundNum}
                                    </td>
                                    {Object.keys(college.cutoffs)
                                      .sort()
                                      .reverse()
                                      .map((year) => {
                                        const roundKey = `Round-${roundNum}`;
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
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 md:p-12 text-center bg-white border border-gray-200 col-span-1 lg:col-span-2">
                  <Award className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-slate-900 mb-2 text-base md:text-lg">
                    No Colleges Found
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCities([]);
                      setFeesRange([0, 500000]);
                      setSelectedSpecializations([]);
                      setSelectedOwnership([]);
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

      <Footer />
    </div>
  );
}
