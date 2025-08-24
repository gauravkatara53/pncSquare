import { Users } from "lucide-react";
import { Card } from "../ui/card";

export function CampusFacilities() {
  return (
    <div className="">
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
          <div className="py-8 px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Library",
                "Hostels",
                "Sports Complex",
                "Laboratories",
                "Auditorium",
                "Medical Center",
                "Cafeteria",
                "Wi-Fi Campus",
                "Computer Center",
                "Gym",
                "Swimming Pool",
                "Research Centers",
              ].map((facility, index) => (
                <div
                  key={index}
                  className="text-center py-3 px-4 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <span className="text-slate-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
