import { Users, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../ui/card";

type FacilityType = {
  name: string;
  available: boolean;
};

export function CampusFacilities({
  college,
}: {
  college: { campusFacilities?: FacilityType[] };
}) {
  if (!college?.campusFacilities || college.campusFacilities.length === 0) {
    return null; // hide section if no data
  }

  return (
    <div>
      {/* Campus Facilities */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Campus Facilities
            </h2>
          </div>
          <p className="text-slate-600">
            World-class infrastructure and amenities
          </p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="py-8 px-2 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {college.campusFacilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-col items-center justify-center gap-2 py-4 px-2 sm:px-4 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <div className="flex flex-row sm:flex-col items-center gap-2 w-full">
                    {facility.available ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-slate-700 font-medium text-center">
                      {facility.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
