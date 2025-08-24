"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendsChartProps {
  currentExam: {
    trendData: Array<{
      year: string;
      general: number;
      obc: number;
      sc: number;
      st: number;
    }>;
    formatValue: (value: number) => string;
  };
}

export function TrendsChart({ currentExam }: TrendsChartProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">
            5-Year Cutoff Trends
          </h2>
        </div>
        <p className="text-slate-600">
          Historical analysis across different categories
        </p>
      </div>

      <Card className="border border-slate-200 shadow-sm p-8">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentExam.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => currentExam.formatValue(value)}
              />
              <Tooltip
                formatter={(value, name) => [
                  currentExam.formatValue(value as number),
                  String(name).toUpperCase(),
                ]}
                labelStyle={{ color: "#1e293b" }}
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="general"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="obc"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="sc"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="st"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}
