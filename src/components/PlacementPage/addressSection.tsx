import { Card } from "../ui/card";
import { MapPin, Plane, Train, TramFront } from "lucide-react";

type CollegeType = {
  address?: string;
  location?: string;
  pincode?: string;
  addressConnectivity?: {
    fullAddress: string;
    connectivity: {
      name: string;
      description: string;
      distanceKm: number;
    }[];
  }[];
};

export function Address({ college }: { college: CollegeType }) {
  if (!college) return null;

  // Get first address block (if available)
  const addressBlock = college.addressConnectivity?.[0];

  return (
    <div>
      {/* Address Section */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Address & Connectivity
            </h2>
          </div>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="py-8 px-4">
            {/* College Address */}
            <div className="mb-8">
              <p className="text-slate-700 text-md sm:text-lg leading-relaxed">
                {addressBlock?.fullAddress ||
                  `${college.address || ""}, ${college.location || ""} - ${
                    college.pincode || ""
                  }`}
              </p>
            </div>

            {/* Connectivity */}
            {addressBlock?.connectivity &&
              addressBlock.connectivity.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-6">
                    Nearest Transportation
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {addressBlock.connectivity.map((conn, idx) => {
                      // Pick an icon based on transport type
                      let Icon = Train;
                      let iconColor = "text-gray-600";
                      let bgColor = "bg-gray-50";

                      if (conn.name.toLowerCase().includes("airport")) {
                        Icon = Plane;
                        iconColor = "text-blue-600";
                        bgColor = "bg-blue-50";
                      } else if (conn.name.toLowerCase().includes("metro")) {
                        Icon = TramFront;
                        iconColor = "text-purple-600";
                        bgColor = "bg-purple-50";
                      } else if (conn.name.toLowerCase().includes("rail")) {
                        Icon = Train;
                        iconColor = "text-green-600";
                        bgColor = "bg-green-50";
                      }

                      return (
                        <div
                          key={idx}
                          className={`flex items-start gap-4 p-4 ${bgColor} rounded-lg border border-slate-100`}
                        >
                          <Icon
                            className={`h-6 w-6 ${iconColor} mt-1 flex-shrink-0`}
                          />
                          <div>
                            <p className="font-medium text-slate-900 mb-1">
                              {conn.description}
                            </p>
                            <p className="text-sm text-slate-600 mb-2">
                              {conn.name}
                            </p>
                            <p className={`${iconColor} font-medium`}>
                              {conn.distanceKm} km
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </Card>
      </section>
    </div>
  );
}
