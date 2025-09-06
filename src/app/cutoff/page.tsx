"use client";

import React, { Suspense } from "react";

import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
import CutoffPage from "@/components/CutoffPage/CutoffPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <CollegeHeroSkeleton />
        </div>
      }
    >
      <CutoffPage />
    </Suspense>
  );
}
