"use client";

import { useState } from "react";
import { CompareCollegesPage } from "@/components/collegeCompare/CompareCollegesPage";
import { CollegeComparisonPage } from "@/components/collegeCompare/CollegeComparisonPage";

interface College {
  id: number;
  name: string;
  location: string;
  type: string;
  logo: string;
  ranking: number;
  rating: number;
}

export default function Page() {
  const [currentView, setCurrentView] = useState<"select" | "compare">(
    "select"
  );
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  const handleNavigate = (page: string, data?: unknown) => {
    if (
      page === "comparison" &&
      data &&
      typeof data === "object" &&
      "colleges" in data
    ) {
      setSelectedColleges(data.colleges as College[]);
      setCurrentView("compare");
    } else if (page === "compare") {
      setCurrentView("select");
    }
  };

  if (currentView === "compare") {
    return (
      <CollegeComparisonPage
        colleges={selectedColleges}
        onNavigate={handleNavigate}
      />
    );
  }

  return <CompareCollegesPage onNavigate={handleNavigate} />;
}
