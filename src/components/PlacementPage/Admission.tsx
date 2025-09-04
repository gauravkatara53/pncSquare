import { Target, Info } from "lucide-react";
import { Card } from "../ui/card";

type AdmissionCriteria = {
  admissionCriteria?: {
    criteriaList: { point: string }[];
    forMoreDetails?: string;
    detailsUrl?: string;
  };
};

export function Admission({ college }: { college: AdmissionCriteria }) {
  const criteria = college?.admissionCriteria;

  if (!criteria) return null;

  // Colors for variety (like your original design)
  const colors = [
    { border: "border-blue-500", bg: "bg-blue-100" },
    { border: "border-green-500", bg: "bg-green-100" },
    { border: "border-amber-500", bg: "bg-amber-100" },
    { border: "border-purple-500", bg: "bg-purple-100" },
  ];

  return (
    <div>
      <section className="mb-16">
        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl  font-semibold text-slate-900">
              Admission Requirements
            </h2>
          </div>
          <p className="text-slate-600">
            Eligibility criteria and admission process
          </p>
        </div>

        {/* Admission Criteria */}
        <Card className="border border-slate-200 shadow-sm">
          <div className="p-8">
            <div className="space-y-6 text-md">
              {criteria.criteriaList?.map((item, idx) => {
                const colorSet = colors[idx % colors.length];
                return (
                  <div
                    key={idx}
                    className={`border-l-4 ${colorSet.border} pl-6 py-2 ${colorSet.bg} p-2 rounded-lg`}
                  >
                    <p className="text-slate-700 leading-relaxed">
                      {item.point}
                    </p>
                  </div>
                );
              })}

              {/* Extra Info */}
              {(criteria.forMoreDetails || criteria.detailsUrl) && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600 text-sm">
                    {criteria.forMoreDetails}{" "}
                    {criteria.detailsUrl && (
                      <a
                        href={criteria.detailsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-1"
                      >
                        Learn more
                      </a>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
