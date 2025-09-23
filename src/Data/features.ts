import { GraduationCap, BookOpen, FileText, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  image: string;
  route: string;
};

export const features: Feature[] = [
  {
    title: "Colleges",
    route: "/colleges",
    description: "Explore top colleges with detailed rankings, and placements.",
    icon: GraduationCap,
    color: "from-indigo-500 to-purple-500",
    image:
      "https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/college.png?updatedAt=1758657541926",
  },
  {
    title: "Courses",
    route: "/courses",
    description: "Find the right courses with career scope.",
    icon: BookOpen,
    color: "from-pink-500 to-rose-500",
    image:
      "https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/courses.png?updatedAt=1758657517295",
  },
  {
    title: "Exams",
    route: "/exam",
    description:
      "Stay updated with exam dates, patterns, and preparation tips.",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    image:
      "https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/exam.png?updatedAt=1758657446928",
  },
  {
    title: "Cutoffs",
    route: "/cutoff",
    description: "Check cutoff trends across colleges and plan smartly.",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    image:
      "https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/cutodd.png?updatedAt=1758658401551",
  },
];
