"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { examData, ExamData } from "@/Data/examData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Footer } from "@/components/common/footer";
import {
  Search,
  Calendar,
  ExternalLink,
  FileText,
  Users,
  BookOpen,
  Trophy,
} from "lucide-react";

const categories = [
  "All",
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Design",
];

export default function ExamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const detailsRef = useRef<HTMLDivElement | null>(null);

  // Filter logic
  const filteredExams = examData.filter((exam) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      exam.name.toLowerCase().includes(q) ||
      exam.category.toLowerCase().includes(q) ||
      exam.conductedBy.toLowerCase().includes(q);

    return (
      (selectedCategory === "All" || exam.category === selectedCategory) &&
      matchesQuery
    );
  });

  // Scroll into view when an exam is selected
  useEffect(() => {
    if (selectedExam && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }, [selectedExam]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSearchClick = useCallback(() => {
    setSearchQuery((prev) => prev.trim());
  }, []);

  const handleSelectExam = useCallback((exam: ExamData) => {
    setSelectedExam(exam);
  }, []);

  const handleViewDetails = useCallback(
    (exam: ExamData) => {
      handleSelectExam(exam);
    },
    [handleSelectExam]
  );

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchClick();
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Find Your Entrance Exam
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive information about national and state-level entrance
              examinations for engineering, medical, and management courses
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white p-3 md:p-4 rounded-xl shadow-lg border border-slate-200">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search exams by name, category, or authority..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={onSearchKeyDown}
                className="pl-12 pr-28 md:pr-32 border-0 focus:ring-0 text-base md:text-lg"
                aria-label="Search exams"
              />
              <Button
                onClick={handleSearchClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-slate-900 hover:bg-slate-800"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Mobile Dropdown Category Selector */}
        <div className="md:hidden mb-6">
          <select
            className="w-full rounded border p-2 text-base"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Select category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Category Buttons */}
        <div className="hidden md:flex gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={
                selectedCategory === category ? "bg-slate-900 text-white" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">
            Entrance Examinations
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Found {filteredExams.length} exams matching your search
          </p>
        </div>

        {/* Selected Exam Details (all sections vertically) */}
        <div ref={detailsRef}>
          {selectedExam && (
            <Card className="border border-emerald-500 shadow-lg mb-8">
              <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={selectedExam.logo}
                        alt={selectedExam.name}
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-2xl font-semibold text-slate-900 mb-2 truncate">
                        {selectedExam.name}
                      </h2>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="default">{selectedExam.level}</Badge>
                        <Badge variant="outline">{selectedExam.category}</Badge>
                        <span className="text-sm text-slate-600">
                          Conducted by{" "}
                          <span className="font-medium text-slate-900">
                            {selectedExam.conductedBy}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedExam(null)}
                    >
                      Close
                    </Button>
                    <a
                      href={selectedExam.register}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-slate-900 hover:bg-slate-800 flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </a>
                  </div>
                </div>

                {/* All sections shown vertically, separated with subtle dividers */}
                <section aria-labelledby="overview" className="pt-2">
                  <h3
                    id="overview"
                    className="flex items-center gap-2 mb-3 text-lg md:text-xl"
                  >
                    <FileText className="h-5 w-5" /> Overview
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedExam.overview}
                  </p>
                </section>

                <hr className="border-slate-200" />

                <section aria-labelledby="eligibility" className="pt-2">
                  <h3
                    id="eligibility"
                    className="flex items-center gap-2 mb-3 text-lg md:text-xl"
                  >
                    <Users className="h-5 w-5" /> Eligibility
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedExam.eligibility}
                  </p>
                </section>

                <hr className="border-slate-200" />

                <section aria-labelledby="syllabus" className="pt-2">
                  <h3
                    id="syllabus"
                    className="flex items-center gap-2 mb-3 text-lg md:text-xl"
                  >
                    <BookOpen className="h-5 w-5" /> Syllabus
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedExam.syllabus}
                  </p>
                </section>

                <hr className="border-slate-200" />

                <section aria-labelledby="dates" className="pt-2">
                  <h3
                    id="dates"
                    className="flex items-center gap-2 mb-3 text-lg md:text-xl"
                  >
                    <Calendar className="h-5 w-5" /> Important Dates
                  </h3>

                  {/* Render dates vertically instead of a horizontal table */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="pt-1">
                        <Calendar className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">
                          Registration Period
                        </div>
                        <div className="font-medium text-slate-900">
                          {selectedExam.registrationDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="pt-1">
                        <Calendar className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Exam Date</div>
                        <div className="font-medium text-slate-900">
                          {selectedExam.date}
                        </div>
                      </div>
                    </div>

                    {/* If the exam has extraDates array (optional), show them vertically too */}
                    {selectedExam.extraDates &&
                      selectedExam.extraDates.length > 0 && (
                        <div className="pt-1">
                          <div className="text-sm text-slate-600 mb-2">
                            Other Dates
                          </div>
                          <ul className="list-disc pl-5 space-y-1 text-slate-900">
                            {selectedExam.extraDates.map((d, idx) => (
                              <li key={idx}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </section>

                <hr className="border-slate-200" />

                <section aria-labelledby="cutoff" className="pt-2">
                  <h3
                    id="cutoff"
                    className="flex items-center gap-2 mb-3 text-lg md:text-xl"
                  >
                    <Trophy className="h-5 w-5" /> Previous Year Cutoffs
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedExam.cutoff}
                  </p>
                </section>
              </div>
            </Card>
          )}
        </div>

        {/* Exam Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExams.map((exam) => (
            <Card
              key={exam.id}
              className={`border shadow-sm transition-shadow cursor-pointer ${
                selectedExam?.id === exam.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200"
              }`}
              onClick={() => handleSelectExam(exam)}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-4 mb-3">
                  <Image
                    src={exam.logo}
                    alt={exam.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1 truncate">
                      {exam.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap text-sm">
                      <Badge
                        variant={
                          exam.level === "National" ? "default" : "secondary"
                        }
                      >
                        {exam.level}
                      </Badge>
                      <Badge variant="outline">{exam.category}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Exam Date:</span>
                    <span className="font-medium text-slate-900">
                      {exam.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Conducted by:</span>
                    <span className="font-medium text-slate-900">
                      {exam.conductedBy}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center"
                  >
                    <a
                      href={exam.register}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Register
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(exam);
                    }}
                    className="bg-slate-900 hover:bg-slate-800"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
