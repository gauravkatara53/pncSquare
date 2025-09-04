import { Card } from "../ui/card";
import { CreditCard } from "lucide-react";

type FeeType = {
  title: string;
  amount: number;
  _id?: string; // optional id if available
};

type WaiverType = {
  title: string;
  description: string;
};

export function FeeStructure({
  college,
}: {
  college: {
    instituteFeeStructure?: FeeType[];
    hostelFeeStructure?: FeeType[];
    waiver?: WaiverType[];
  };
}) {
  if (
    !college?.instituteFeeStructure &&
    !college?.hostelFeeStructure &&
    !college?.waiver
  )
    return null;

  return (
    <div>
      {/* Fee Structure */}
      <section className="mb-16">
        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Fee Structure
            </h2>
          </div>
          <p className="text-slate-600">
            Comprehensive fee breakdown and financial aid
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Institute and Hostel Fees */}
          <div className="space-y-8">
            {/* Institute Fee Breakdown */}
            {college.instituteFeeStructure &&
              college.instituteFeeStructure.length > 0 && (
                <Card className="border border-slate-200 shadow-sm">
                  <div className="py-8 px-4">
                    <h3 className="font-medium text-slate-900 mb-6">
                      Institute Fee Structure
                    </h3>
                    <div className="space-y-4 text-sm sm:text-[1.0rem]">
                      {college.instituteFeeStructure
                        .filter((fee) => fee.title !== "Total")
                        .map((fee) => (
                          <div
                            key={fee._id || fee.title}
                            className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0"
                          >
                            <span className="text-slate-700">{fee.title}</span>
                            <span className="font-medium text-slate-900">
                              ₹{fee.amount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      {/* Display Total from API */}
                      {college.instituteFeeStructure.some(
                        (fee) => fee.title === "Total"
                      ) && (
                        <div className="flex justify-between items-center py-4 bg-slate-50 px-4 rounded-lg border border-slate-200 mt-6">
                          <span className="font-medium text-slate-900">
                            Total
                          </span>
                          <span className="font-semibold text-slate-900">
                            ₹
                            {college.instituteFeeStructure
                              .find((fee) => fee.title === "Total")
                              ?.amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}

            {/* Hostel Fee Breakdown */}
            {college.hostelFeeStructure &&
              college.hostelFeeStructure.length > 0 && (
                <Card className="border border-slate-200 shadow-sm">
                  <div className="py-8 px-4">
                    <h3 className="font-medium text-slate-900 mb-6">
                      Hostel Fee Structure
                    </h3>
                    <div className="space-y-4 text-sm sm:text-[1.0rem]">
                      {college.hostelFeeStructure
                        .filter((fee) => fee.title !== "Total")
                        .map((fee) => (
                          <div
                            key={fee._id || fee.title}
                            className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0"
                          >
                            <span className="text-slate-700">{fee.title}</span>
                            <span className="font-medium text-slate-900">
                              ₹{fee.amount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      {/* Display Total from API */}
                      {college.hostelFeeStructure.some(
                        (fee) => fee.title === "Total"
                      ) && (
                        <div className="flex justify-between items-center py-4 bg-slate-50 px-4 rounded-lg border border-slate-200 mt-6">
                          <span className="font-medium text-slate-900">
                            Total
                          </span>
                          <span className="font-semibold text-slate-900">
                            ₹
                            {college.hostelFeeStructure
                              .find((fee) => fee.title === "Total")
                              ?.amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}
          </div>

          {/* Right Column - Waivers */}
          {college.waiver && college.waiver.length > 0 && (
            <Card className="border border-slate-200 shadow-sm">
              <div className="py-8 px-4">
                <h3 className="font-medium text-slate-900 mb-6">
                  Financial Aid & Waivers
                </h3>
                <div className="space-y-4 text-sm sm:text-[1.1rem]">
                  {college.waiver.map((w, wIndex) => {
                    const colorClasses = [
                      {
                        bg: "bg-green-50",
                        border: "border-green-200",
                        text: "text-green-800",
                      },
                      {
                        bg: "bg-blue-50",
                        border: "border-blue-200",
                        text: "text-blue-800",
                      },
                      {
                        bg: "bg-amber-50",
                        border: "border-amber-200",
                        text: "text-amber-800",
                      },
                      {
                        bg: "bg-purple-50",
                        border: "border-purple-200",
                        text: "text-purple-800",
                      },
                    ];
                    const colors = colorClasses[wIndex % colorClasses.length];

                    return (
                      <div
                        key={wIndex}
                        className={`p-4 ${colors.bg} rounded-lg border ${colors.border}`}
                      >
                        <h4 className={`font-medium ${colors.text} mb-2`}>
                          {w.title}
                        </h4>
                        <p
                          className={`${colors.text.replace(
                            "800",
                            "700"
                          )} text-sm`}
                        >
                          {w.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
