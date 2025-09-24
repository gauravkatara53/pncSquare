// app/colleges/page.tsx
import React, { Suspense } from "react";
import CollegesMainPage from "@/components/colleges/CollegesPages";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
import { generateTitleAndDescription } from "@/utils/seoCollegeText";

type SearchParamsType = { [key: string]: string | string[] | undefined };

/**
 * Safely resolve searchParams that may be passed directly or as a Promise.
 */
async function resolveSearchParams(
  maybeProps: unknown
): Promise<SearchParamsType> {
  if (!maybeProps || typeof maybeProps !== "object") return {};
  if (!("searchParams" in (maybeProps as Record<string, unknown>))) return {};

  const { searchParams } = maybeProps as {
    searchParams?: SearchParamsType | Promise<SearchParamsType>;
  };

  if (!searchParams) return {};

  // If searchParams is a Promise (Next can sometimes pass a promise), await it.
  if (typeof (searchParams as Promise<unknown>)?.then === "function") {
    return (await (searchParams as Promise<SearchParamsType>)) || {};
  }

  return (searchParams as SearchParamsType) || {};
}

/**
 * Normalize a single param: accepts string | string[] | undefined
 * - If array -> join with comma
 * - Trim whitespace and collapse multiple spaces
 * - Remove trailing/leading commas or empty values
 */
function normalizeParam(value?: string | string[]) {
  if (value === undefined) return undefined;

  const toString = Array.isArray(value) ? value.join(",") : value;
  // collapse multiple spaces and trim
  const normalized = toString.replace(/\s+/g, " ").trim();

  // remove accidental leading/trailing commas produced by joins like ['', 'x']
  return normalized.replace(/(^,+|,+$)/g, "") || undefined;
}

/**
 * Next.js generateMetadata (keeps signature flexible to accept whatever Next passes).
 */
export async function generateMetadata(props: unknown) {
  const baseUrl = "https://pncsquare.in/colleges"; // update to your production domain if different

  const rawParams = await resolveSearchParams(props);

  // Normalize only the params we care about for SEO / canonicalization
  const state = normalizeParam(
    rawParams.state as string | string[] | undefined
  );
  const stream = normalizeParam(
    rawParams.stream as string | string[] | undefined
  );
  const instituteType = normalizeParam(
    rawParams.instituteType as string | string[] | undefined
  );
  const tag = normalizeParam(rawParams.tag as string | string[] | undefined);
  const searchTerm = normalizeParam(
    rawParams.searchTerm as string | string[] | undefined
  );

  // you can include or exclude fees/placement in canonical as you prefer:
  // const minFees = normalizeParam(rawParams.minFees as string | undefined);
  // const maxFees = normalizeParam(rawParams.maxFees as string | undefined);

  // Build title/description using your existing util
  // Define the expected type for generateTitleAndDescription argument
  type CollegeSeoParams = {
    state?: string;
    stream?: string;
    instituteType?: string;
    tag?: string;
    // minFees?: string;
    // maxFees?: string;
    // minPlacementRate?: string;
    searchTerm?: string;
  };

  const { title, description } = generateTitleAndDescription({
    state,
    stream,
    instituteType,
    tag,
    // minFees,
    // maxFees,
    // minPlacementRate: rawParams.minPlacementRate as string | undefined,
    searchTerm,
  } as CollegeSeoParams); // keep shape compatible with your util

  // Build canonical URL with only stable SEO params
  const params = new URLSearchParams();
  if (state) params.set("state", state);
  if (stream) params.set("stream", stream);
  if (instituteType) params.set("instituteType", instituteType);
  if (tag) params.set("tag", tag);
  if (searchTerm) params.set("searchTerm", searchTerm);

  const canonicalUrl = params.toString()
    ? `${baseUrl}?${params.toString()}`
    : baseUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    // Optionally add open graph, robots, etc. here if you want
  };
}

export default function Page() {
  return (
    <Suspense fallback={<CollegeHeroSkeleton />}>
      <CollegesMainPage />
    </Suspense>
  );
}
