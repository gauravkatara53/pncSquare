import { Metadata } from "next";
import CutoffPage from "@/components/CutoffPage/CutoffPage";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = searchParams ? await searchParams : {};

  const getFirst = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const examType = getFirst(params.examType) ?? "College Exam Cutoffs";
  const year = getFirst(params.year);
  const seatType = getFirst(params.seatType);
  const quota = getFirst(params.quota);
  const round = getFirst(params.round);
  const subCategory = getFirst(params.subCategory);

  let title = `${examType}${year ? ` ${year}` : ""}`;
  if (seatType) title += ` ${seatType}`;
  if (quota) title += ` ${quota}`;
  if (round) title += ` Round ${round}`;
  if (subCategory) title += ` ${subCategory}`;
  title += " Cutoff Details";

  let description = `Explore cutoff information for ${examType}`;
  if (year) description += ` in ${year}`;
  if (seatType) description += `, category ${seatType}`;
  if (quota) description += `, quota ${quota}`;
  if (round) description += `, round ${round}`;
  if (subCategory) description += `, subcategory ${subCategory}`;
  description += ". See trends, college-wise cutoffs, and more.";

  return {
    title,
    description,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  return <CutoffPage urlParams={params} />;
}
