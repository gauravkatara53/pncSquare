"use client";

import React, { Suspense } from "react";
import CollegesMainPage from "@/components/colleges/CollegesPages";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <CollegeHeroSkeleton />
        </div>
      }
    >
      <CollegesMainPage />
    </Suspense>
  );
}
