"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TrendingUp,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

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
  // { id: "BITSAT", name: "BITSAT", description: "BITS Pilani entrance" },
  // { id: "VITEEE", name: "VITEEE", description: "VIT Engineering entrance" },
  // {
  //   id: "COMEDK",
  //   name: "COMEDK",
  //   description: "Karnataka engineering entrance",
  // },
];

const indianStates = [
  "Andaman-and-Nicobar-Islands",
  "Andhra-Pradesh",
  "Arunachal-Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal-Pradesh",
  "Jammu-and-Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya-Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil-Nadu",
  "Telangana",
  "Tripura",
  "Uttar-Pradesh",
  "Uttarakhand",
  "West-Bengal",
];

export default function CollegePredictorClientPage() {
  const router = useRouter();

  // Initial form state
  const [selectedExam, setSelectedExam] = useState("");
  const [inputRank, setInputRank] = useState("");
  const [seatType, setSeatType] = useState("General");
  const [subCategory, setSubCategory] = useState("Gender-Neutral");
  const [userState, setUserState] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!inputRank || !selectedExam || !userState) {
      alert("Please fill in all required fields");
      return;
    }

    // Build query string
    const params = new URLSearchParams({
      exam: selectedExam,
      rank: inputRank,
      seatType: seatType,
      subCategory: subCategory,
      state: userState,
    });

    // Navigate to results page with query parameters
    router.push(`/college-predictor-result?${params.toString()}&mode=safe`);
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    required
                  />
                  <Award className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Exam Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Select Entrance Exam <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={selectedExam}
                    onValueChange={setSelectedExam}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose your entrance exam" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
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
                    Seat Type <span className="text-red-500">*</span>
                  </label>
                  <Select value={subCategory} onValueChange={setSubCategory}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                      <SelectItem value="Gender-Neutral">
                        Gender-Neutral
                      </SelectItem>
                      <SelectItem value="Female-only">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seat Type Selection */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select value={seatType} onValueChange={setSeatType}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="EWS">EWS</SelectItem>
                      <SelectItem value="OBC">OBCL</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="PwD">PwD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* User State Selection */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Your State <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={userState}
                    onValueChange={setUserState}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state.replace(/-/g, " ")}
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
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white text-lg"
              >
                Predict Colleges <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
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
              <p className="text-sm text-white/80">Historical cutoff trends</p>
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
