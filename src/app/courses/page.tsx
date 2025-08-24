"use client";
import { useState } from "react";
import { Footer } from "@/components/common/footer";
import {
  HeroSection,
  SortFilterBar,
  CourseTabs,
  LoadMoreButton,
  courseData,
  categories,
  //   type CourseData,
} from "@/components/courses";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredCourses = courseData.filter((course) => {
    return (
      (selectedCategory === "all" || course.category === selectedCategory) &&
      (selectedDuration === "all" || course.duration === selectedDuration) &&
      (selectedDegree === "all" || course.degree === selectedDegree)
    );
  });

  const handleLoadMore = () => {
    // Implement load more functionality
    console.log("Loading more courses...");
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        selectedCategory={selectedCategory}
        selectedDuration={selectedDuration}
        selectedDegree={selectedDegree}
        onCategoryChange={setSelectedCategory}
        onDurationChange={setSelectedDuration}
        onDegreeChange={setSelectedDegree}
        categories={categories}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SortFilterBar
          filteredCoursesCount={filteredCourses.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <CourseTabs courses={filteredCourses} />

        <LoadMoreButton onLoadMore={handleLoadMore} />
      </div>

      <Footer />
    </div>
  );
}
