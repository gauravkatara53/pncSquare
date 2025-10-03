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
import { cutoffData, examCards } from "@/Data/cutoffTrends";

export default function CutoffTrends() {
  return (
    <section className="py-16">
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
            {examCards.map((exam, idx) => (
              <ExamCard key={idx} {...exam} />
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

              <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cutoffData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                      }}
                    />
                    <Line
                      dataKey="jeeMain"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", r: 3 }}
                      name="JEE Main"
                    />
                    <Line
                      dataKey="neet"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", r: 3 }}
                      name="NEET"
                    />
                    <Line
                      dataKey="cat"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6", r: 3 }}
                      name="CAT (%)"
                    />
                    <Line
                      dataKey="iit"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: "#F59E0B", r: 3 }}
                      name="IIT"
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

/* --- Reusable Exam Card --- */
function ExamCard({
  name,
  currentCutoff,
  previousCutoff,
  change,
  trending,
  color,
  bgColor,
  desc,
}: {
  name: string;
  currentCutoff: string;
  previousCutoff: string;
  change: string;
  trending: "up" | "down";
  color: string;
  bgColor: string;
  desc: string;
}) {
  return (
    <Card className={`p-6 ${bgColor} border-0`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-semibold ${color} text-lg`}>{name}</h3>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
        <div
          className={`flex items-center gap-1 text-sm ${
            trending === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trending === "up" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${color}`}>{currentCutoff}</span>
        <span className="text-sm text-gray-500">from {previousCutoff}</span>
      </div>
    </Card>
  );
}
