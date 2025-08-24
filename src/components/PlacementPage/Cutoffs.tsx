import { Trophy } from "lucide-react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function Cutoffs() {
  return (
    <div className="">
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Cutoff Trends
            </h2>
          </div>
          <p className="text-slate-600">Historical admission cutoff ranks</p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <div className="py-8 px-4">
            <Tabs defaultValue="2025" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                <TabsTrigger
                  value="2025"
                  className="data-[state=active]:bg-white"
                >
                  2025
                </TabsTrigger>
                <TabsTrigger
                  value="2024"
                  className="data-[state=active]:bg-white"
                >
                  2024
                </TabsTrigger>
                <TabsTrigger
                  value="2023"
                  className="data-[state=active]:bg-white"
                >
                  2023
                </TabsTrigger>
                <TabsTrigger
                  value="2022"
                  className="data-[state=active]:bg-white"
                >
                  2022
                </TabsTrigger>
              </TabsList>

              {["2025", "2024", "2023", "2022"].map((year) => (
                <TabsContent key={year} value={year} className="mt-8">
                  <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-600">
                      {year} cutoff data will be available soon
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Card>
      </section>
    </div>
  );
}
