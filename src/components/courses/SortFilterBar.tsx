"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterBarProps {
  filteredCoursesCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function SortFilterBar({
  filteredCoursesCount,
  sortBy,
  onSortChange,
}: SortFilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Available Courses
        </h2>
        <p className="text-slate-600">
          Found {filteredCoursesCount} courses matching your criteria
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
            <SelectItem value="fees">Lowest Fees</SelectItem>
            <SelectItem value="name">Course Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
