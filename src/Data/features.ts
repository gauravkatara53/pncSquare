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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4WVQBWuCpD4qOTs7hkpxXichM73aJLq1J4A&s",
  },
  {
    title: "Courses",
    route: "/courses",
    description: "Find the right courses with career scope.",
    icon: BookOpen,
    color: "from-pink-500 to-rose-500",
    image:
      "https://as2.ftcdn.net/jpg/01/95/96/13/1000_F_195961367_NNLBno8lv2hkt73tX4IRqo3P0u7EloUy.jpg",
  },
  {
    title: "Exams",
    route: "/exam",
    description:
      "Stay updated with exam dates, patterns, and preparation tips.",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    image:
      "https://static.vecteezy.com/system/resources/previews/002/184/109/non_2x/students-write-a-test-exam-in-a-beautiful-classroom-vector.jpg",
  },
  {
    title: "Cutoffs",
    route: "/cutoff",
    description: "Check cutoff trends across colleges and plan smartly.",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    image:
      "https://thumbs.dreamstime.com/b/student-climbing-stack-books-reaching-open-book-displayed-computer-screen-symbolizing-journey-online-education-362480772.jpg",
  },
];
