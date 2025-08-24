import { CreditCard } from "lucide-react";
import { Card } from "../ui/card";

export function FeeStructure() {
  return (
    <div className="">
      {/* Fee Structure */}
      <section className="mb-16">
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
          {/* Fee Structure */}
          <Card className="border border-slate-200 shadow-sm">
            <div className="p-8">
              <h3 className="font-medium text-slate-900 mb-6">Annual Fees</h3>
              <div className="space-y-4">
                {[
                  {
                    item: "Caution Money (One-Time, Refundable)",
                    amount: "₹12,000",
                  },
                  { item: "One-Time Fees", amount: "₹8,000" },
                  { item: "Tuition Fee (Per Semester)", amount: "₹1,00,000" },
                  { item: "Other Fees (Per Semester)", amount: "₹19,000" },
                  { item: "Annual Fees", amount: "₹2,390" },
                  { item: "Mess Advance (Per Semester)", amount: "₹18,000" },
                ].map((fee, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0"
                  >
                    <span className="text-slate-700">{fee.item}</span>
                    <span className="font-medium text-slate-900">
                      {fee.amount}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-4 bg-slate-50 px-4 rounded-lg border border-slate-200 mt-6">
                  <span className="font-medium text-slate-900">Total</span>
                  <span className="font-semibold text-slate-900">
                    ₹1,59,390
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Fee Waivers */}
          <Card className="border border-slate-200 shadow-sm">
            <div className="p-8">
              <h3 className="font-medium text-slate-900 mb-6">
                Financial Aid & Waivers
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    100% Tuition Fee Waiver
                  </h4>
                  <p className="text-green-700 text-sm">
                    Available for SC/ST/PwD students
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">
                    100% Tuition Fee Remission
                  </h4>
                  <p className="text-blue-700 text-sm">
                    For families with income less than ₹1 lakh per annum
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-medium text-amber-800 mb-2">
                    2/3rd Tuition Fee Remission
                  </h4>
                  <p className="text-amber-700 text-sm">
                    For families with income between ₹1-5 lakh per annum
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
