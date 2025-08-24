"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const cutoffData = [
  // JEE Main = Qualifying Percentile (UR-General)
  // NEET = General/UR Cutoff Marks (Govt. MBBS)
  // CAT = Approx final cutoff for Top IIMs (%ile)
  // GATE = General category qualifying marks (CSE, avg. as representative)
  { year: "2020", jeeMain: 90.37, neet: 147, cat: 99.5, gate: 28.5 },
  { year: "2021", jeeMain: 87.89, neet: 138, cat: 99.6, gate: 26.1 },
  { year: "2022", jeeMain: 88.41, neet: 117, cat: 99.7, gate: 25.0 },
  { year: "2023", jeeMain: 90.77, neet: 137, cat: 99.7, gate: 32.5 },
  { year: "2024", jeeMain: 93.23, neet: 162, cat: 99.8, gate: 29.2 },
];

const examCards = [
  {
    name: "JEE Main",
    currentCutoff: "93.23%",
    previousCutoff: "90.77%",
    change: "+2.7%",
    trending: "up",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    desc: "Qualifying Percentile (General/UR)",
  },
  {
    name: "NEET",
    currentCutoff: "162",
    previousCutoff: "137",
    change: "+18.2%",
    trending: "up",
    color: "text-green-600",
    bgColor: "bg-green-50",
    desc: "Qualifying Marks (General/UR, Govt. MBBS)",
  },
  {
    name: "CAT",
    currentCutoff: "99.8%",
    previousCutoff: "99.7%",
    change: "+0.1%",
    trending: "up",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    desc: "Top IIMs Final Cutoff",
  },
  {
    name: "GATE",
    currentCutoff: "29.2",
    previousCutoff: "32.5",
    change: "-10.1%",
    trending: "down",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    desc: "Qualifying Marks (General, CSE)",
  },
];

export default function CutoffTrends() {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cutoff Trends
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track admission cutoff trends across major entrance examinations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Exam Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {examCards.map((exam, index) => (
              <Card key={index} className={`p-6 ${exam.bgColor} border-0`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${exam.color} text-lg`}>
                      {exam.name}
                    </h3>
                    <p className="text-sm text-gray-600">{exam.desc}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      exam.trending === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {exam.trending === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{exam.change}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${exam.color}`}>
                    {exam.currentCutoff}
                  </span>
                  <span className="text-sm text-gray-500">
                    from {exam.previousCutoff}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 w-full">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                  5-Year Cutoff Trends
                </h3>
                <Badge variant="secondary">Updated 2024</Badge>
              </div>
              {/* Responsive Chart */}
              <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cutoffData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="jeeMain"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                      name="JEE Main"
                    />
                    <Line
                      type="monotone"
                      dataKey="neet"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
                      name="NEET"
                    />
                    <Line
                      type="monotone"
                      dataKey="cat"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 3 }}
                      name="CAT (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="gate"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: "#F59E0B", strokeWidth: 2, r: 3 }}
                      name="GATE"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
