"use client";

import { Card } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const placementData = [
  { branch: "CSE", placed: 98, total: 100, avgPackage: 22.5 },
  { branch: "ECE", placed: 94, total: 98, avgPackage: 18.2 },
  { branch: "ME", placed: 89, total: 95, avgPackage: 16.8 },
  { branch: "CE", placed: 92, total: 96, avgPackage: 15.5 },
  { branch: "EE", placed: 95, total: 99, avgPackage: 19.1 },
  { branch: "MME", placed: 87, total: 92, avgPackage: 14.2 },
];

const packageDistribution = [
  { range: "10-15 LPA", count: 45, color: "#3B82F6" },
  { range: "15-20 LPA", count: 38, color: "#10B981" },
  { range: "20-30 LPA", count: 25, color: "#F59E0B" },
  { range: "30+ LPA", count: 12, color: "#EF4444" },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export function PlacementChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <h3 className="text-xl mb-6 text-gray-800">
          Branch-wise Placement Statistics
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={placementData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="branch" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar
              dataKey="placed"
              fill="#3B82F6"
              name="Students Placed"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total"
              fill="#E5E7EB"
              name="Total Students"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl mb-6 text-gray-800">Package Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={packageDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ range, percent }) => {
                const pct = percent ?? 0;
                return `${range} (${(pct * 100).toFixed(0)}%)`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {packageDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {packageDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-gray-600">
                {item.range}: {item.count} students
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
