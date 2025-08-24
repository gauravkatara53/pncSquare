import {
  GraduationCap,
  Laptop,
  Wrench,
  Building,
  Zap,
} from "lucide-react";

export interface CourseData {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  degree: string;
  averageFees: string;
  exams: string[];
  description: string;
  category: string;
  level: string;
  popularity: string;
}

export const courseData: CourseData[] = [
  {
    id: 1,
    name: "Computer Science and Engineering",
    icon: Laptop,
    duration: "4 years",
    degree: "B.Tech",
    averageFees: "₹2.5 - 8.0 Lakhs",
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    description:
      "Learn programming, algorithms, software development, and computer systems",
    category: "Engineering",
    level: "Undergraduate",
    popularity: "High",
  },
  {
    id: 2,
    name: "Mechanical Engineering",
    icon: Wrench,
    duration: "4 years",
    degree: "B.Tech",
    averageFees: "₹2.0 - 6.0 Lakhs",
    exams: ["JEE Main", "JEE Advanced", "State CETs"],
    description:
      "Study mechanics, thermodynamics, materials science, and manufacturing",
    category: "Engineering",
    level: "Undergraduate",
    popularity: "High",
  },
  {
    id: 3,
    name: "Electrical Engineering",
    icon: Zap,
    duration: "4 years",
    degree: "B.Tech",
    averageFees: "₹2.2 - 7.0 Lakhs",
    exams: ["JEE Main", "JEE Advanced", "GATE"],
    description:
      "Focus on electrical systems, power generation, and electronic devices",
    category: "Engineering",
    level: "Undergraduate",
    popularity: "High",
  },
  {
    id: 4,
    name: "Civil Engineering",
    icon: Building,
    duration: "4 years",
    degree: "B.Tech",
    averageFees: "₹1.8 - 5.5 Lakhs",
    exams: ["JEE Main", "State CETs", "University Exams"],
    description:
      "Learn about construction, infrastructure, and structural design",
    category: "Engineering",
    level: "Undergraduate",
    popularity: "Medium",
  },
  {
    id: 5,
    name: "Master of Computer Applications",
    icon: Laptop,
    duration: "3 years",
    degree: "MCA",
    averageFees: "₹1.5 - 4.0 Lakhs",
    exams: ["NIMCET", "BHU MCA", "State CETs"],
    description:
      "Advanced study in computer applications and software development",
    category: "Computer Applications",
    level: "Postgraduate",
    popularity: "Medium",
  },
  {
    id: 6,
    name: "Master of Business Administration",
    icon: GraduationCap,
    duration: "2 years",
    degree: "MBA",
    averageFees: "₹3.0 - 20.0 Lakhs",
    exams: ["CAT", "XAT", "MAT", "GMAT"],
    description: "Comprehensive business management and leadership training",
    category: "Management",
    level: "Postgraduate",
    popularity: "Very High",
  },
];

export const categories = [
  "Engineering",
  "Computer Applications",
  "Management",
  "Medical",
  "Architecture",
];
