// app/colleges/page.tsx

import CollegesMainPage from "@/components/colleges/CollegesPages";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
import { Suspense } from "react";
import { generateTitleAndDescription } from "@/utils/seoCollegeText";

type SearchParamsType = { [key: string]: string | undefined };

export async function generateMetadata(props: unknown) {
  const baseUrl = "https://pncsquare.in/colleges"; // Set your actual domain here

  // existing code to parse searchParams ...
  let resolvedSearchParams: SearchParamsType = {};

  if (props && typeof props === "object" && "searchParams" in props) {
    const { searchParams } = props as {
      searchParams?: SearchParamsType | Promise<SearchParamsType>;
    };
    if (
      searchParams &&
      typeof (searchParams as Promise<SearchParamsType>)?.then === "function"
    ) {
      resolvedSearchParams = await (searchParams as Promise<SearchParamsType>);
    } else if (typeof searchParams === "object" && searchParams !== null) {
      resolvedSearchParams = searchParams as SearchParamsType;
    }
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

  // Generate title and description as before
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

  // Normalize and rebuild query parameters for canonical URL to avoid duplicates
  const params = new URLSearchParams();

  // Add only certain parameters or normalized forms to canonical URL as needed
  if (state)
    params.set("state", Array.isArray(state) ? state.join(",") : state);
  if (stream)
    params.set("stream", Array.isArray(stream) ? stream.join(",") : stream);
  if (instituteType)
    params.set(
      "instituteType",
      Array.isArray(instituteType) ? instituteType.join(",") : instituteType
    );
  if (tag) params.set("tag", Array.isArray(tag) ? tag.join(",") : tag);
  if (searchTerm) params.set("searchTerm", searchTerm);
  // Avoid including filter params like min/max fees or placement rate if not needed for canonical

  const canonicalUrl = params.toString()
    ? `${baseUrl}?${params.toString()}`
    : baseUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<CollegeHeroSkeleton />}>
      <CollegesMainPage />
    </Suspense>
  );
}
