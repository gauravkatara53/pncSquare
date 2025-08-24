"use client";

import {
  MapPin,
  LineChart,
  Landmark,
  BookOpen,
  Info,
  Table,
  IndianRupee,
  Briefcase,

} from "lucide-react";

const navItems = [
  { label: "How to Reach", icon: MapPin, target: "address" },
  { label: "Ranking", icon: LineChart, target: "ranking" },
  { label: "Admission", icon: Landmark, target: "admission" },
  { label: "Courses", icon: BookOpen, target: "courses" },
  { label: "Seats", icon: Info, target: "facilities" },
  { label: "Cutoff", icon: Table, target: "cutoff" },
  { label: "Fees", icon: IndianRupee, target: "fees" },
  { label: "Placements", icon: Briefcase, target: "placements" },
];

export default function InfoBar() {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-900 text-white pb-4 pt-3 top-0 z-50">
      {/* Desktop / Tablet View */}
      <div className="max-w-7xl mx-auto hidden sm:flex justify-center gap-20 flex-wrap">
        {navItems.map(({ label, icon: Icon, target }) => (
          <div
            key={label}
            onClick={() => handleScroll(target)}
            className="flex flex-col items-center justify-center space-y-1 cursor-pointer group"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full transition-all duration-300 group-hover:bg-yellow-500 group-hover:scale-110">
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-sm group-hover:text-yellow-400 transition">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile View (Dropdown) */}
      <div className="sm:hidden px-4">
        <select
          onChange={(e) => handleScroll(e.target.value)}
          className="w-full bg-slate-800 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          defaultValue=""
        >
          <option value="" disabled>
            Select Section
          </option>
          {navItems.map(({ label, target }) => (
            <option key={label} value={target}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
