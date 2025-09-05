"use client";
import { useState } from "react";
import Image from "next/image";
import { examData, ExamData } from "@/Data/examData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  // Filter logic
  const filteredExams = examData.filter(
    (exam) =>
      (selectedCategory === "All" || exam.category === selectedCategory) &&
      (exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Find Your Entrance Exam
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive information about national and state-level entrance
              examinations for engineering, medical, and management courses
            </p>
          </div>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white p-4 rounded-xl shadow-lg border border-slate-200">
              <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search exams by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-32 border-0 focus:ring-0 text-lg"
              />
              <Button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-900 hover:bg-slate-800">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Dropdown Category Selector */}
        <div className="md:hidden mb-8">
          <select
            className="w-full rounded border p-2 text-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Entrance Examinations
          </h2>
          <p className="text-slate-600">
            Found {filteredExams.length} exams matching your search
          </p>
        </div>
        {selectedExam && (
          <Card className="border border-emerald-500 shadow-lg mb-12">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedExam.logo}
                    alt={selectedExam.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                      {selectedExam.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <Badge variant="default">{selectedExam.level}</Badge>
                      <Badge variant="outline">{selectedExam.category}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedExam(null)}>
                  Close
                </Button>
              </div>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  <TabsTrigger value="dates">Important Dates</TabsTrigger>
                  <TabsTrigger value="cutoff">Cutoff</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-8">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5" />
                      Exam Overview
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedExam.overview}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="eligibility" className="mt-8">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5" />
                      Eligibility Criteria
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedExam.eligibility}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="syllabus" className="mt-8">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5" />
                      Exam Syllabus
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedExam.syllabus}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="dates" className="mt-8">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="flex items-center gap-2 mb-4">
                      <Calendar className="h-5 w-5" />
                      Important Dates
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Registration Period</TableCell>
                          <TableCell>{selectedExam.registrationDate}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Exam Date</TableCell>
                          <TableCell>{selectedExam.date}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="cutoff" className="mt-8">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="flex items-center gap-2 mb-4">
                      <Trophy className="h-5 w-5" />
                      Previous Year Cutoffs
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedExam.cutoff}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        )}
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
              onClick={() => setSelectedExam(exam)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={exam.logo}
                    alt={exam.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {exam.name}
                    </h3>
                    <div className="flex items-center gap-2">
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
                <div className="space-y-3 mb-6">
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

                  <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Exam Details */}
      </div>
      <Footer />
    </div>
  );
}
