"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface HeroSectionProps {
  selectedCategory: string;
  selectedDuration: string;
  selectedDegree: string;
  onCategoryChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onDegreeChange: (value: string) => void;
  categories: string[];
}

export function HeroSection({
  selectedCategory,
  selectedDuration,
  selectedDegree,
  onCategoryChange,
  onDurationChange,
  onDegreeChange,
  categories,
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Explore Courses & Programs
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover comprehensive information about undergraduate and
            postgraduate courses across various disciplines
          </p>
        </div>

        {/* Category Filters */}
        <div className="max-w-4xl mx-auto">
          <Card className="border border-slate-200 shadow-sm p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => onDurationChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="all">Any Duration</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Degree
                </label>
                <select
                  value={selectedDegree}
                  onChange={(e) => onDegreeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="all">Any Degree</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-slate-900 hover:bg-slate-800">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Search Courses
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
