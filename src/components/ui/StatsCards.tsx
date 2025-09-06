import React from "react";
import { TrendingUp, Users, Building2, DollarSign } from "lucide-react";
import { Card } from "../ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  bgGradient: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  bgGradient,
}: StatCardProps) {
  return (
    <Card
      className={`p-4 sm:p-6 relative overflow-hidden border-0 shadow-lg ${bgGradient}`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            {/* icon size adjusts for small vs bigger screens */}
            <div className="w-4 h-4 sm:w-5 sm:h-5 text-white">{icon}</div>
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              {trend}
            </div>
          )}
        </div>
        <div className="text-white">
          <h3 className="text-xs sm:text-sm opacity-90 mb-1">{title}</h3>
          <div className="text-xl sm:text-3xl font-bold mb-1">{value}</div>
          {subtitle && (
            <p className="text-xs sm:text-sm opacity-80">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
    </Card>
  );
}

// export function StatsCards() {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//       <StatCard
//         title="Total Offers"
//         value="450+"
//         subtitle="Across all branches"
//         icon={<Users className="w-5 h-5 text-white" />}
//         trend="+8% YoY"
//         bgGradient="bg-gradient-to-br from-blue-500 to-indigo-600"
//       />
//       <StatCard
//         title="Highest Package"
//         value="₹123 LPA"
//         subtitle="CSE"
//         icon={<DollarSign className="w-5 h-5 text-white" />}
//         bgGradient="bg-gradient-to-br from-emerald-500 to-green-600"
//       />
//       <StatCard
//         title="Average Package"
//         value="₹12.63 LPA"
//         subtitle="Overall (B.Tech)"
//         icon={<TrendingUp className="w-5 h-5 text-white" />}
//         bgGradient="bg-gradient-to-br from-amber-500 to-yellow-600"
//       />
//       <StatCard
//         title="Recruiters"
//         value="120+"
//         subtitle="2024 season"
//         icon={<Building2 className="w-5 h-5 text-white" />}
//         bgGradient="bg-gradient-to-br from-fuchsia-500 to-pink-600"
//       />
//     </div>
//   );
// }
interface StatData {
  totalOffers: string;
  highestPackage: string;
  averagePackage: string;
  recruiters: string;
}

interface StatsCardsProps {
  data: StatData[];
}

export function StatsCards({ data }: StatsCardsProps) {
  // Assuming only one object in data array for overall stats
  const stats = data[0];

  if (!stats) {
    return (
      <p className="text-center text-gray-500">No stats data available.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard
        title="Total Offers"
        value={`${stats.totalOffers ?? "-"}+`}
        subtitle="Across all branches"
        icon={<Users className="w-5 h-5 text-white" />}
        trend="+8% YoY"
        bgGradient="bg-gradient-to-br from-blue-500 to-indigo-600"
      />
      <StatCard
        title="Highest Package"
        value={formatPackage(stats.highestPackage)}
        subtitle="Top offer"
        icon={<DollarSign className="w-5 h-5 text-white" />}
        bgGradient="bg-gradient-to-br from-emerald-500 to-green-600"
      />
      <StatCard
        title="Average Package"
        value={formatPackage(stats.averagePackage)}
        subtitle="Overall (B.Tech)"
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        bgGradient="bg-gradient-to-br from-amber-500 to-yellow-600"
      />

      <StatCard
        title="Recruiters"
        value={`${stats.recruiters ?? "-"}+`}
        subtitle={"include all branches"}
        icon={<Building2 className="w-5 h-5 text-white" />}
        bgGradient="bg-gradient-to-br from-fuchsia-500 to-pink-600"
      />
    </div>
  );
}

function formatPackage(value?: string): string {
  if (!value) return "-";
  const num = Number(value);
  if (isNaN(num)) return value;
  if (num >= 100) {
    return `₹${(num / 100).toFixed(2)} Cr`;
  }
  return `₹${num.toFixed(2)} LPA`;
}
