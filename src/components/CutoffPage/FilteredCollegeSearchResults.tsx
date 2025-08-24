"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

interface FilteredCollegeSearchResultsProps {
  showFilteredResults: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredColleges: Array<{
    id: number;
    name: string;
    location: string;
    ranking: string;
    branches: Array<{
      name: string;
      general: number | null;
      obc: number | null;
      sc: number | null;
      st: number | null;
      seats: number;
    }>;
  }>;
  currentExam: {
    name: string;
    formatValue: (value: number) => string;
  };
  selectedYear: string;
  selectedCategory: string;
  expandedColleges: Record<number, boolean>;
  toggleCollegeExpansion: (collegeId: number) => void;
}

export function FilteredCollegeSearchResults({
  showFilteredResults,
  searchQuery,
  setSearchQuery,
  filteredColleges,
  currentExam,
  selectedYear,
  selectedCategory,
  expandedColleges,
  toggleCollegeExpansion,
}: FilteredCollegeSearchResultsProps) {
  if (!showFilteredResults) return null;

  return (
    <section className="mb-16 ">
      <div className="mb-8 px-4">
        <div className="flex items-center gap-2 mb-3 ">
          <Search className="h-5 w-5 text-slate-600" />
          <h2 className="text-2xl  font-semibold text-slate-900">
            Search College Cutoffs
          </h2>
        </div>
        <p className="text-slate-600">
          Find specific college cutoffs based on your selected filters
        </p>
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search colleges by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-slate-600">
              Found {filteredColleges.length} colleges for {currentExam.name} •{" "}
              {selectedYear} • {selectedCategory.toUpperCase()} category
            </p>
          </div>

          {/* Expandable College List */}
          <div className="space-y-4">
            {filteredColleges.map((college) => (
              <Collapsible key={college.id}>
                <Card className="border border-slate-200 shadow-sm mb-6">
                  {/* Trigger */}
                  <CollapsibleTrigger
                    className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    onClick={() => toggleCollegeExpansion(college.id)}
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 break-words">
                        {college.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                        <span className="text-sm text-slate-600 break-words">
                          {college.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {expandedColleges[college.id] ? (
                        <ChevronDown className="h-5 w-5 text-slate-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-slate-600" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  {/* Collapsible content */}
                  <CollapsibleContent>
                    <div className="border-t border-slate-200 p-4 sm:p-6">
                      <h4 className="text-base sm:text-lg font-medium text-slate-900 mb-4">
                        Branch-wise Cutoffs
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-slate-100">
                              <th className="border px-4 py-2 text-left whitespace-normal break-words">
                                Branch
                              </th>
                              <th className="border px-4 py-2 text-center whitespace-normal break-words">
                                Opening
                              </th>
                              <th className="border px-4 py-2 text-center whitespace-normal break-words">
                                Closing
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {college.branches.map((branch, index: number) => (
                              <tr key={index} className="hover:bg-slate-50">
                                <td className="border px-4 py-2 break-words max-w-[70%] font-medium text-slate-900">
                                  {branch.name}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                  <Badge variant="outline" className="text-xs">
                                    {branch.seats}
                                  </Badge>
                                </td>
                                <td className="border px-4 py-2 text-center font-medium text-blue-700">
                                  {branch.general !== null ? (
                                    currentExam.formatValue(branch.general)
                                  ) : (
                                    <span className="text-slate-400">-</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">
                No colleges found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search query or filters to find more results.
              </p>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
