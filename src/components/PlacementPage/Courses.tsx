import { GraduationCap } from "lucide-react";
import { Card } from "../ui/card";

export function Courses() {
  return (
    <div className=" ">
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Courses Offered
            </h2>
          </div>
          <p className="text-slate-600">
            Undergraduate and postgraduate programs
          </p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="py-8 px-4">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Computer Science & Engineering",
                "Electrical Engineering",
                "Electronics & Communication Engineering",
                "Mechanical Engineering",
                "Civil Engineering",
                "Chemical Engineering",
                "Metallurgical & Materials Engineering",
                "Biotechnology & Medical Engineering",
                "Physics",
                "Chemistry",
                "Mathematics & Computing",
              ].map((course, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <span className="text-slate-700">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
