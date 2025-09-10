// app/colleges/page.tsx

import CollegesMainPage from "@/components/colleges/CollegesPages";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
import { Suspense } from "react";
import { generateTitleAndDescription } from "@/utils/seoCollegeText";

type SearchParamsType = { [key: string]: string | undefined };

export async function generateMetadata(props: unknown) {
  // Type guard for props object shape
  if (
    typeof props !== "object" ||
    props === null ||
    !("searchParams" in props)
  ) {
    return {
      title: "Colleges in India",
      description:
        "Discover top colleges across India. Find comprehensive info on admissions, placements, fees, and campus life.",
    };
  }

  // Extract searchParams property safely
  const { searchParams } = props as { searchParams?: unknown };

  let resolvedSearchParams: SearchParamsType = {};

  // Await if searchParams is Promise
  if (
    searchParams &&
    typeof (searchParams as Promise<SearchParamsType>)?.then === "function"
  ) {
    resolvedSearchParams = await (searchParams as Promise<SearchParamsType>);
  } else if (typeof searchParams === "object" && searchParams !== null) {
    resolvedSearchParams = searchParams as SearchParamsType;
  }

  const {
    state,
    stream,
    instituteType,
    tag,
    minFees,
    maxFees,
    minPlacementRate,
    searchTerm,
  } = resolvedSearchParams;

  const { title, description } = generateTitleAndDescription({
    state,
    stream,
    instituteType,
    tag,
    minFees,
    maxFees,
    minPlacementRate,
    searchTerm,
  });

  return {
    title,
    description,
  };
}

export default function Page() {
  return (
    <Suspense fallback={<CollegeHeroSkeleton />}>
      <CollegesMainPage />
    </Suspense>
  );
}
