import { Card } from "../ui/card";
import { MapPin, Plane, Train } from "lucide-react";

export function Address() {
  return (
    <div className="">
      {/* Address Section */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl  font-semibold text-slate-900">
              Address & Connectivity
            </h2>
          </div>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="py-8 px-4">
            <div className="mb-8">
              <p className="text-slate-700 text-lg leading-relaxed">
                Indian Institute of Technology, Argul Campus, Jatani, Khordha,
                Bhubaneswar, Odisha - 752050
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-6">
                Nearest Transportation
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <Plane className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900 mb-1">
                      Biju Patnaik International Airport
                    </p>
                    <p className="text-sm text-slate-600 mb-2">Bhubaneswar</p>
                    <p className="text-blue-600 font-medium">29 km</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <Train className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900 mb-1">
                      Khurda Road Junction
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                      Main Railway Station
                    </p>
                    <p className="text-green-600 font-medium">6 km</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <Train className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900 mb-1">
                      Bhubaneswar Railway Station
                    </p>
                    <p className="text-sm text-slate-600 mb-2">City Station</p>
                    <p className="text-purple-600 font-medium">34 km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
