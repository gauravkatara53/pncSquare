import { Target } from "lucide-react";
import { Card } from "../ui/card";

export function Admission() {
  return (
    <div className="">
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Admission Requirements
            </h2>
          </div>
          <p className="text-slate-600">
            Eligibility criteria and admission process
          </p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="p-8">
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-100 p-2 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  Candidates must qualify the <strong>JEE (Main)</strong> exam
                  and then appear for the <strong>JEE (Advanced)</strong> exam.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6 py-2 bg-green-100 p-2 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  Candidates must secure at least <strong>75% marks</strong>{" "}
                  (65% for SC/ST/PwD) in Class XII OR be within the
                  category-wise top 20 percentile.
                </p>
              </div>
              <div className="border-l-4 border-amber-500 pl-6 py-2 bg-amber-100 p-2 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  Admissions are based on the rank obtained in{" "}
                  <strong>JEE (Advanced)</strong> through{" "}
                  <strong>JoSAA Counselling</strong>.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm">
                  For detailed information, refer to the JEE Advanced
                  Performance Criteria in Class XII guidelines.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
