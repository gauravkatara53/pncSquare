"use client";
import { CourseCard } from "./CourseCard";
interface CourseData {
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

interface CourseGridProps {
  courses: CourseData[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
