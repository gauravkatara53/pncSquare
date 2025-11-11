"use client";

import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingDown,
  Info,
  Sparkles,
  ArrowLeft,
  BarChart3,
  GraduationCap,
  Globe,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/common/footer";

export default function JEERankPredictor1() {
  const [inputType, setInputType] = useState("Percentile");
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("General");
  const [seatPool, setSeatPool] = useState("Gender-Neutral");
  const [domicileState, setDomicileState] = useState("Delhi");
  const [totalCandidates] = useState(1300000);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ rank: 0, minRank: 0, maxRank: 0 });
  const [animatedRank, setAnimatedRank] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const calculateRank = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;

    const total = totalCandidates;
    let predictedRank = 0;

    if (inputType === "Marks") {
      const percentile = Math.min(100, Math.max(0, (val / 300) * 100));
      predictedRank = Math.round(((100 - percentile) * total) / 100);
    } else {
      predictedRank = Math.round(((100 - val) * total) / 100);
    }

    const variation = 0.05;
    const minRank = Math.round(predictedRank * (1 - variation));
    const maxRank = Math.round(predictedRank * (1 + variation));

    setResult({ rank: predictedRank, minRank, maxRank });
    setShowResult(true);
  };

  const handleReset = () => {
    setShowResult(false);
    setInputValue("");
    setAnimatedRank(0);
  };

  useEffect(() => {
    if (showResult) {
      const start = 0;
      const end = result.rank;
      const duration = 2000;
      const frameRate = 60;
      const totalFrames = Math.round(duration / (1000 / frameRate));
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);
        setAnimatedRank(current);
        if (frame === totalFrames) {
          clearInterval(counter);
          setAnimatedRank(end);
        }
      }, 1000 / frameRate);

      return () => clearInterval(counter);
    }
  }, [showResult, result.rank]);

  const formatNumber = (num: number) => num.toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-4 sm:py-20 lg:py-10 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Matrix grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:48px_48px]"></div>

        {/* Two-column layout */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 lg:items-start">
          {/* Left Section */}
          <div className="text-center lg:text-left flex flex-col justify-start pt-4 lg:pt-6">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 self-center lg:self-start mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <span className="text-yellow-400 text-sm font-medium">
                Session 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                JEE Main
              </span>{" "}
              Rank Predictor
            </h1>

            <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Predict your All India Rank based on percentile or marks instantly
              using the official NTA formula.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-yellow-400 text-2xl font-semibold">
                  13L+
                </div>
                <p className="text-gray-400 text-sm">Candidates</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-yellow-400 text-2xl font-semibold">
                  99.8%
                </div>
                <p className="text-gray-400 text-sm">Accuracy</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-yellow-400 text-2xl font-semibold">
                  Instant
                </div>
                <p className="text-gray-400 text-sm">Results</p>
              </div>
            </div>
          </div>

          {/* Right Form / Result Area */}
          <div className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="form"
                  initial={
                    hasMounted ? { opacity: 0, scale: 0.95, y: 20 } : undefined
                  }
                  animate={
                    hasMounted ? { opacity: 1, scale: 1, y: 0 } : undefined
                  }
                  exit={
                    hasMounted ? { opacity: 0, scale: 0.95, y: -20 } : undefined
                  }
                  transition={
                    hasMounted
                      ? { duration: 0.4, ease: "easeInOut" }
                      : undefined
                  }
                >
                  <Card className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200">
                    <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-sm font-medium p-3 rounded-t-xl -mt-6 -mx-6 sm:-mx-8 sm:-mt-8 mb-6">
                      ⚡ Fill all the fields below to get better results
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        calculateRank();
                      }}
                      className="space-y-5"
                    >
                      {/* Input Type */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Select Input Type *
                        </Label>
                        <select
                          value={inputType}
                          onChange={(e) => setInputType(e.target.value)}
                          className="w-full mt-2 border border-gray-300 rounded-lg h-12 px-3 text-sm focus:ring-2 focus:ring-blue-600"
                        >
                          <option>Percentile</option>
                          {/* <option>Marks</option> */}
                        </select>
                      </div>

                      {/* Marks / Percentile */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          JEE Main {inputType} *
                        </Label>
                        <Input
                          type="number"
                          placeholder={`Enter ${inputType}`}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="mt-2 h-12 text-sm border-gray-300"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Category *
                        </Label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full mt-2 border border-gray-300 rounded-lg h-12 px-3 text-sm focus:ring-2 focus:ring-blue-600"
                        >
                          <option>General</option>
                          <option>EWS</option>
                          <option>OBC</option>
                          <option>SC</option>
                          <option>ST</option>
                        </select>
                      </div>

                      {/* Seat Pool */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Seat Pool *
                        </Label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="radio"
                              checked={seatPool === "Gender-Neutral"}
                              onChange={() => setSeatPool("Gender-Neutral")}
                            />
                            Gender Neutral
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="radio"
                              checked={seatPool === "Female"}
                              onChange={() => setSeatPool("Female")}
                            />
                            Female
                          </label>
                        </div>
                      </div>

                      {/* Domicile */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          12th Class Domicile State *
                        </Label>
                        <select
                          value={domicileState}
                          onChange={(e) => setDomicileState(e.target.value)}
                          className="w-full mt-2 border border-gray-300 rounded-lg h-12 px-3 text-sm focus:ring-2 focus:ring-blue-600"
                        >
                          <option>Andaman-and-Nicobar-Islands</option>
                          <option>Andhra-Pradesh</option>
                          <option>Arunachal-Pradesh</option>
                          <option>Assam</option>
                          <option>Bihar</option>
                          <option>Chandigarh</option>
                          <option>Chhattisgarh</option>
                          <option>Delhi</option>
                          <option>Goa</option>
                          <option>Gujarat</option>
                          <option>Haryana</option>
                          <option>Himachal-Pradesh</option>
                          <option>Jammu-and-Kashmir</option>
                          <option>Jharkhand</option>
                          <option>Karnataka</option>
                          <option>Kerala</option>
                          <option>Ladakh</option>
                          <option>Lakshadweep</option>
                          <option>Madhya-Pradesh</option>
                          <option>Maharashtra</option>
                          <option>Manipur</option>
                          <option>Meghalaya</option>
                          <option>Mizoram</option>
                          <option>Nagaland</option>
                          <option>Odisha</option>
                          <option>Puducherry</option>
                          <option>Punjab</option>
                          <option>Rajasthan</option>
                          <option>Sikkim</option>
                          <option>Tamil-Nadu</option>
                          <option>Telangana</option>
                          <option>Tripura</option>
                          <option>Uttar-Pradesh</option>
                          <option>Uttarakhand</option>
                          <option>West-Bengal</option>
                        </select>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white rounded-lg text-base hover:opacity-90 transition-opacity"
                      >
                        <Calculator className="w-5 h-5 mr-2" /> Predict Rank
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Result Card with Light Theme */}
                  <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-6 rounded-xl shadow-xl border border-blue-200 max-w-xl mx-auto">
                    {/* Back Button */}
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      className="mb-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Calculate Again
                    </Button>

                    {/* Success Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="inline-flex items-center gap-1.5 bg-green-100 border border-green-300 rounded-full px-3.5 py-1.5 mb-5"
                    >
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 text-sm font-semibold">
                        Rank Calculated Successfully!
                      </span>
                    </motion.div>

                    {/* Main Rank Display */}
                    <div className="text-center mb-6">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-gray-600 text-sm mb-2 uppercase tracking-wide font-medium"
                      >
                        Your Predicted All India Rank
                      </motion.p>
                      <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.35,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="relative inline-block"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur-xl opacity-30 rounded-full"></div>
                        <p className="relative text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight py-1">
                          {formatNumber(animatedRank)}
                        </p>
                      </motion.div>
                    </div>

                    {/* Rank Range Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center"
                      >
                        <div className="inline-flex items-center justify-center w-9 h-9 bg-green-100 rounded-full mb-2">
                          <TrendingDown className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-gray-600 text-xs mb-1 uppercase font-semibold">
                          Best Case
                        </p>
                        <p className="text-2xl sm:text-3xl text-gray-900 mb-1 font-bold">
                          {formatNumber(result.minRank)}
                        </p>
                        <p className="text-green-600 text-xs font-medium">
                          Optimistic Estimate
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 }}
                        className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 text-center"
                      >
                        <div className="inline-flex items-center justify-center w-9 h-9 bg-orange-100 rounded-full mb-2">
                          <TrendingDown className="w-4 h-4 text-orange-600 rotate-180" />
                        </div>
                        <p className="text-gray-600 text-xs mb-1 uppercase font-semibold">
                          Worst Case
                        </p>
                        <p className="text-2xl sm:text-3xl text-gray-900 mb-1 font-bold">
                          {formatNumber(result.maxRank)}
                        </p>
                        <p className="text-orange-600 text-xs font-medium">
                          Conservative Estimate
                        </p>
                      </motion.div>
                    </div>

                    {/* Predict Colleges Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button
                        onClick={() =>
                          (window.location.href = `/college-predictor-result?exam=JEE-Main&rank=${result.rank}&seatType=${category}&subCategory=${seatPool}&state=${domicileState}&mode=safe&page=1`)
                        }
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-5 py-3 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        🎓 Predict Colleges with AI
                      </Button>
                    </motion.div>
                  </Card>

                  {/* Disclaimer */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-r-xl"
                  >
                    <div className="flex gap-4">
                      <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900 font-semibold mb-2">
                          Important Disclaimer
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          This prediction is based on official NTA rank
                          estimation formula and historical data.
                        </p>
                        <p className="text-sm text-gray-600">
                          Actual ranks may vary due to candidate count,
                          tie-breaking, normalization, and other parameters. Use
                          this as a reference only.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Student Success Stories
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Hear from students who used Pncsquare to find their ideal colleges
            with accurate rank predictions.
          </p>

          {/* Compact Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Pncsquare helped me find the perfect NIT for my branch preference. The rank prediction was almost spot-on!",
                name: "Aarav Mehta",
                tag: "Accurate rank prediction",
                rating: 5,
              },
              {
                quote:
                  "I used multiple predictors, but Pncsquare was the most reliable one. The college suggestions matched the final JoSAA round exactly!",
                name: "Sneha Iyer",
                tag: "Best college predictor",
                rating: 4.5,
              },
              {
                quote:
                  "Pncsquare saved me weeks of confusion — I knew exactly which colleges to aim for even before counselling started.",
                name: "Ritik Sharma",
                tag: "Saved valuable time",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300"
              >
                {/* Card Body */}
                <div className="p-4 flex-1 text-left">
                  <p className="text-blue-400 text-3xl leading-none mb-2">“</p>
                  <p className="text-gray-700 text-sm mb-4">{review.quote}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-sm">
                      {review.name}
                    </p>
                    {/* Star Rating */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill={
                            index < Math.floor(review.rating)
                              ? "#fbbf24"
                              : index < review.rating
                              ? "url(#halfGradient)"
                              : "#e5e7eb"
                          }
                          className="w-4 h-4"
                        >
                          <defs>
                            <linearGradient id="halfGradient">
                              <stop offset="50%" stopColor="#fbbf24" />
                              <stop offset="50%" stopColor="#e5e7eb" />
                            </linearGradient>
                          </defs>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.197 3.68a1 1 0 00.95.69h3.862c.969 0 1.372 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.197 3.68c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.175 0l-3.124 2.27c-.784.57-1.838-.197-1.539-1.118l1.197-3.68a1 1 0 00-.364-1.118L2.452 9.107c-.784-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.197-3.68z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="bg-green-50 py-2 text-green-700 font-medium text-xs flex justify-center items-center gap-1 border-t border-green-100">
                  ⚡ {review.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Why Choose Our JEE Predictor?
          </h2>
          <p className="text-gray-600 mb-12">
            Trusted by over 2,00,000 students for precise rank predictions and
            data-driven college recommendations.
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1️⃣ Rank Prediction */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 text-left p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm inline-flex">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Rank Prediction
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Estimate your All-India rank instantly using your marks or
                percentile with data sourced from official NTA records.
              </p>
            </div>

            {/* 2️⃣ College Prediction */}
            <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 text-left p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm inline-flex">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                College Prediction
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Explore personalized college options based on historical
                cut-offs and JoSAA counselling insights.
              </p>
            </div>

            {/* 3️⃣ Pan-India Coverage */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 text-left p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm inline-flex">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                Pan-India Coverage
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Comprehensive database covering IITs, NITs, IIITs and GFTIs with
                verified admission data broken down by category.
              </p>
            </div>

            {/* 4️⃣ Flexible Inputs */}
            <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 text-left p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm inline-flex">
                  <Pencil className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                Flexible Inputs
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Enter either your marks or percentile; our system adapts to
                deliver precise outcomes.
              </p>
            </div>

            {/* 5️⃣ AI Based Prediction */}
            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 text-left p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm inline-flex">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                AI-Based Prediction
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                AI models trained on 2026 cut-offs, JoSAA data and real
                admission trends deliver accurate forecasts.
              </p>
            </div>

            {/* 6️⃣ Comprehensive Data */}
            <div className="rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100 text-left p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm inline-flex">
                  <ShieldCheck className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-pink-700 mb-2">
                2L+ Data Points
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Built on 2 lakh+ verified data points to ensure robust and
                dependable predictions for your JEE journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-700 leading-relaxed mb-8">
            Estimate your JEE rank and explore potential colleges based on your
            marks or percentile for JEE Main 2026. Our AI-powered predictor
            analyzes 200,000+ real admission records to deliver accurate
            predictions with safe and risk-mode insights tailored to your goals.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Does Our JEE Rank & College Predictor Work?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Built by IIT Kharagpur and NIT Jamshedpur alumni, this AI-powered
            tool is real-world tested and trusted by thousands of students. It
            uses a comprehensive dataset of 200,000+ verified admissions records
            to estimate your percentile, All India Rank, and match you with
            colleges that fit your profile.
          </p>

          <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-10">
            <li>
              <strong>Input Your Scores:</strong> Enter your expected marks or
              percentile.
            </li>
            <li>
              <strong>AI Prediction Engine:</strong> Our advanced algorithm
              analyzes 200,000+ data points across categories, states, and
              gender-based seat variations.
            </li>
            <li>
              <strong>Get Smart Predictions:</strong> Receive your predicted
              rank along with safe and risk-mode college recommendations.
            </li>
            <li>
              <strong>Filter & Explore:</strong> Narrow down by college type
              (IIT, NIT, IIIT), fee range, and location to find your perfect
              match.
            </li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Why Use Our Predictor?
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-10">
            <li>
              Built by IIT Kharagpur and NIT Jamshedpur students—real-world
              tested and verified.
            </li>
            <li>
              Analyzes 200,000+ authentic admission records for precision.
            </li>
            <li>
              Safe and risk mode predictions to match your counselling strategy.
            </li>
            <li>
              Advanced filtering by college type (IIT, NIT, IIIT), fee range,
              and location.
            </li>
            <li>Category, state, and gender-based seat variation support.</li>
            <li>Completely free—no signup required.</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            Whether you&apos;re targeting IITs, NITs, or IIITs, our data-driven
            predictor helps you make confident counselling decisions. Plan
            strategically with predictions backed by real admission data and
            tested by students just like you.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
