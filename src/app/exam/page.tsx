import { Metadata } from "next";
import { examData } from "@/Data/examData";
import ExamClient from "./ExamClient";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  // Await searchParams if it's a Promise, otherwise default to empty object
  const params = searchParams ? await searchParams : {};

  const examSlug = Array.isArray(params.exam) ? params.exam[0] : params.exam;

  if (examSlug) {
    const exam = examData.find((e) => slugify(e.name) === examSlug);
    if (exam) {
      return {
        title: `${exam.name} | Pncsquare`,
        description:
          exam.overview ||
          `Detailed info about ${exam.name} exam - level, eligibility, dates, cutoff at Pncsquare`,
        openGraph: {
          title: `${exam.name} | Pncsquare`,
          description:
            exam.overview ||
            `Detailed info about ${exam.name} exam - level, eligibility, dates, cutoff at Pncsquare`,
          url: `https://pncsquare.in/exam?exam=${slugify(exam.name)}`,
          siteName: "Pncsquare",
        },
        twitter: {
          title: `${exam.name} | Pncsquare`,
          description:
            exam.overview ||
            `Detailed info about ${exam.name} exam - level, eligibility, dates, cutoff at Pncsquare`,
        },
      };
    }
  }

  return {
    title: "Entrance Exam | Pncsquare",
    description:
      "Explore comprehensive info about engineering, medical, management, law, and design entrance exams. Know eligibility, syllabus, dates, and more at Pncsquare.",
    openGraph: {
      title: "Entrance Exam | Pncsquare",
      description:
        "Explore comprehensive info about engineering, medical, management, law, and design entrance exams. Know eligibility, syllabus, dates, and more at Pncsquare.",
      url: "https://pncsquare.in/exam",
      siteName: "Pncsquare",
    },
    twitter: {
      title: "Entrance Exam | Pncsquare",
      description:
        "Explore comprehensive info about engineering, medical, management, law, and design entrance exams. Know eligibility, syllabus, dates, and more at Pncsquare.",
    },
  };
}

export default async function ExamPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Await searchParams if needed before passing to client component
  const params = searchParams ? await searchParams : {};

  // Convert string[] values to string (take the first element) for ExamClient props
  const normalizedParams: Record<string, string | undefined> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      normalizedParams[key] = value[0];
    } else {
      normalizedParams[key] = value;
    }
  });

  return <ExamClient searchParams={normalizedParams} />;
}
