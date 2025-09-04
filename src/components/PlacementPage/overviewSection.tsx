import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Book } from "lucide-react";

interface College {
  bio?: string;
  fullNames?: string;
  name?: string;
  tag?: string;
  instituteType?: string;
  establishedYear?: number | string;
  location?: string;
  AlsoKnownAs?: string;
}

export default function Overview({ college }: { college: College }) {
  if (!college) return null;

  return (
    <div>
      {/* Overview Section */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Book className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Institute Overview
            </h2>
          </div>
          <p className="text-slate-600">
            {college.bio || "Comprehensive details about the institution"}
          </p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="py-8 px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600">Institute Name</span>
                  <span className="text-slate-900 text-right max-w-xs">
                    {college.fullNames || college.name}
                  </span>
                </div>
                {college.tag && (
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Also Known As</span>
                    <span className="text-slate-900">
                      {college.AlsoKnownAs}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600">Institute Type</span>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200"
                  >
                    {college.instituteType || "N/A"}
                  </Badge>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {college.establishedYear && (
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Established</span>
                    <span className="text-slate-900">
                      {college.establishedYear}
                    </span>
                  </div>
                )}
                {college.location && (
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Location</span>
                    <span className="text-slate-900">{college.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
