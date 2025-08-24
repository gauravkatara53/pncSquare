"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
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

interface CourseCardProps {
  course: CourseData;
}

export function CourseCard({ course }: CourseCardProps) {
  const IconComponent = course.icon;

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <IconComponent className="h-8 w-8 text-slate-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-2">{course.name}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <Badge variant="outline">{course.degree}</Badge>
            </div>
          </div>
        </div>

        <p className="text-slate-700 mb-4 text-sm leading-relaxed">
          {course.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Average Fees:</span>
            <span className="font-medium text-slate-900">
              {course.averageFees}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Level:</span>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-slate-600 mb-2">Entrance Exams:</p>
          <div className="flex flex-wrap gap-2">
            {course.exams.map((exam, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {exam}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                course.popularity === "Very High"
                  ? "bg-red-400"
                  : course.popularity === "High"
                  ? "bg-orange-400"
                  : "bg-yellow-400"
              }`}
            ></div>
            <span className="text-xs text-slate-600">
              {course.popularity} Demand
            </span>
          </div>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
