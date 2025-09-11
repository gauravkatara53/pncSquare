import type { Metadata } from "next";

export async function generateCutoffMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const {
    examType = "College Exam Cutoffs",
    year,
    seatType,
    quota,
    round,
    subCategory,
  } = searchParams ?? {};

  const firstValue = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  let title = firstValue(examType) ?? "College Exam Cutoffs";
  if (year) title += ` ${firstValue(year)}`;
  if (seatType) title += ` ${firstValue(seatType)}`;
  if (quota) title += ` ${firstValue(quota)}`;
  if (round) title += ` Round ${firstValue(round)}`;
  if (subCategory) title += ` ${firstValue(subCategory)}`;
  title += " Cutoff Details";

  let description = `Explore cutoff information for ${
    firstValue(examType) ?? "top exams"
  }`;
  if (year) description += ` in ${firstValue(year)}`;
  if (seatType) description += `, category ${firstValue(seatType)}`;
  if (quota) description += `, quota ${firstValue(quota)}`;
  if (round) description += `, round ${firstValue(round)}`;
  if (subCategory) description += `, subcategory ${firstValue(subCategory)}`;
  description += ". See trends, college-wise cutoffs, and more.";

  return {
    title,
    description,
  };
}
