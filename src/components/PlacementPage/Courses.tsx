import { GraduationCap } from "lucide-react";
import { Card } from "../ui/card";

export type CoursesType = {
  coursesOffered?: {
    programs: {
      programType: string;
      courses: string[];
    }[];
  };
};

export function Courses({ courses }: { courses: CoursesType }) {
  if (
    !courses?.coursesOffered?.programs ||
    courses.coursesOffered.programs.length === 0
  ) {
    console.log("No courses data found:", courses);
    return null;
  }

  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="h-5 w-5 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Courses Offered
          </h2>
        </div>
        <p className="text-slate-600">
          Undergraduate, postgraduate and doctoral programs offered at the
          institute
        </p>
      </div>

      <div className="space-y-8">
        {courses.coursesOffered.programs.map((program, pIndex) => (
          <Card key={pIndex} className="border border-slate-200 shadow-sm">
            <div className="py-8 px-4">
              <h3 className="text-xl font-medium text-slate-900 mb-6">
                {program.programType}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm sm:text-[1.0rem]">
                {program.courses.map((course, cIndex) => (
                  <div
                    key={cIndex}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <span className="text-slate-700">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
