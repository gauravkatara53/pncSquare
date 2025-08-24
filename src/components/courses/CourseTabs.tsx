"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CourseGrid } from "./CourseGrid";
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

interface CourseTabsProps {
  courses: CourseData[];
}

export function CourseTabs({ courses }: CourseTabsProps) {
  return (
    <Tabs defaultValue="all" className="mb-8">
      <TabsContent value="all" className="mt-8">
        <CourseGrid courses={courses} />
      </TabsContent>
    </Tabs>
  );
}
