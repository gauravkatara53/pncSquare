"use client";
import { useState } from "react";
import Image from "next/image";
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

interface ExamData {
  id: number;
  name: string;
  logo: string;
  level: string;
  date: string;
  registrationDate: string;
  category: string;
  conductedBy: string;
  overview: string;
  eligibility: string;
  syllabus: string;
  cutoff: string;
}

const examData: ExamData[] = [
  {
    id: 1,
    name: "JEE Advanced",
    logo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=80&h=80&fit=crop",
    level: "National",
    date: "June 4, 2024",
    registrationDate: "April 30 - May 9, 2024",
    category: "Engineering",
    conductedBy: "IIT Delhi",
    overview:
      "Joint Entrance Examination (Advanced) is conducted by the Indian Institutes of Technology (IITs) for admission to undergraduate programs.",
    eligibility:
      "Must qualify JEE Main with top 2.5 lakh ranks. 12th pass with 75% marks (65% for SC/ST).",
    syllabus:
      "Physics, Chemistry, Mathematics based on Class 11 & 12 NCERT curriculum",
    cutoff:
      "Previous year cutoffs range from 15,000-40,000 ranks for different categories",
  },
  {
    id: 2,
    name: "JEE Main",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    level: "National",
    date: "January 24-31, April 6-15, 2024",
    registrationDate: "December 15, 2023 - January 12, 2024",
    category: "Engineering",
    conductedBy: "NTA",
    overview:
      "National level entrance exam for admission to NITs, IIITs, CFTIs and other engineering colleges.",
    eligibility:
      "12th pass or equivalent with Physics, Chemistry, Mathematics. No age limit from 2019.",
    syllabus: "PCM based on NCERT Class 11 & 12 syllabus with equal weightage",
    cutoff: "General category cutoff around 90+ percentile for good NITs",
  },
  {
    id: 3,
    name: "GATE",
    logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop",
    level: "National",
    date: "February 3-4, 10-11, 2024",
    registrationDate: "August 30 - September 21, 2023",
    category: "Engineering",
    conductedBy: "IIT Kharagpur",
    overview:
      "Graduate Aptitude Test in Engineering for M.Tech admissions and PSU recruitments.",
    eligibility: "Bachelor's degree in Engineering/Technology or equivalent",
    syllabus: "Subject-specific syllabus covering undergraduate level concepts",
    cutoff:
      "Varies by paper and category, typically 25-50 marks for qualifying",
  },
  {
    id: 4,
    name: "CAT",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=80&fit=crop",
    level: "National",
    date: "November 26, 2023",
    registrationDate: "August 2 - September 13, 2023",
    category: "Management",
    conductedBy: "IIM Calcutta",
    overview:
      "Common Admission Test for admission to MBA programs at IIMs and other top B-schools.",
    eligibility: "Bachelor's degree with 50% marks (45% for SC/ST/PwD)",
    syllabus:
      "Quantitative Ability, Verbal Ability & Reading Comprehension, Data Interpretation & Logical Reasoning",
    cutoff: "90+ percentile generally required for IIM calls",
  },
  {
    id: 5,
    name: "NEET",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop",
    level: "National",
    date: "May 5, 2024",
    registrationDate: "February 9 - March 9, 2024",
    category: "Medical",
    conductedBy: "NTA",
    overview:
      "National Eligibility cum Entrance Test for admission to MBBS, BDS and other medical courses.",
    eligibility:
      "12th pass with Physics, Chemistry, Biology/Biotechnology. Minimum 50% marks in PCB.",
    syllabus: "NCERT based Physics, Chemistry, Biology (Class 11 & 12)",
    cutoff:
      "General category cutoff around 720+ for government medical colleges",
  },
  {
    id: 6,
    name: "BITSAT",
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=80&h=80&fit=crop",
    level: "Institute",
    date: "June 15-30, 2024",
    registrationDate: "January 8 - March 15, 2024",
    category: "Engineering",
    conductedBy: "BITS Pilani",
    overview:
      "BITS Admission Test for admission to undergraduate programs at BITS campuses.",
    eligibility:
      "12th pass with Physics, Chemistry, Mathematics. Minimum 75% aggregate.",
    syllabus: "PCM + English Proficiency & Logical Reasoning",
    cutoff: "300+ score generally required for CS branches at BITS Pilani",
  },
];

export default function ExamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);

  const filteredExams = examData.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
        {/* Exam Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["All", "Engineering", "Medical", "Management", "Law", "Design"].map(
            (category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "ghost"}
                className={
                  category === "All" ? "bg-slate-900 hover:bg-slate-800" : ""
                }
              >
                {category}
              </Button>
            )
          )}
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

        {/* Exam Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExams.map((exam) => (
            <Card
              key={exam.id}
              className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
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
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Register
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
        {selectedExam && (
          <Card className="border border-slate-200 shadow-lg">
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
      </div>

      <Footer />
    </div>
  );
}
