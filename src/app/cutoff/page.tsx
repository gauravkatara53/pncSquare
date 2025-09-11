import React, { Suspense } from "react";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
import CutoffPage from "@/components/CutoffPage/CutoffPage";
import type { Metadata } from "next";

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams?: Record<string, string | string[] | undefined>;
// }): Promise<Metadata> {
//   const getFirst = (v: string | string[] | undefined) =>
//     Array.isArray(v) ? v[0] : v;

//   const examType = getFirst(searchParams?.examType) ?? "College Exam Cutoffs";
//   const year = getFirst(searchParams?.year);
//   const seatType = getFirst(searchParams?.seatType);
//   const quota = getFirst(searchParams?.quota);
//   const round = getFirst(searchParams?.round);
//   const subCategory = getFirst(searchParams?.subCategory);

//   let title = `${examType}${year ? ` ${year}` : ""}`;
//   if (seatType) title += ` ${seatType}`;
//   if (quota) title += ` ${quota}`;
//   if (round) title += ` Round ${round}`;
//   if (subCategory) title += ` ${subCategory}`;
//   title += " Cutoff Details";

//   let description = `Explore cutoff information for ${examType}`;
//   if (year) description += ` in ${year}`;
//   if (seatType) description += `, category ${seatType}`;
//   if (quota) description += `, quota ${quota}`;
//   if (round) description += `, round ${round}`;
//   if (subCategory) description += `, subcategory ${subCategory}`;
//   description += ". See trends, college-wise cutoffs, and more.";

//   return { title, description };
// }

export default function Page() {
  return (
    <Suspense fallback={<CollegeHeroSkeleton />}>
      <CutoffPage />
    </Suspense>
  );
}
