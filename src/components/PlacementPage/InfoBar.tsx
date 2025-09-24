"use client";

import { useEffect } from "react";
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
  { label: "Cutoff", icon: Table, target: "cutoff" },
  { label: "Ranking", icon: LineChart, target: "ranking" },
  { label: "Facilities", icon: Info, target: "facilities" },
  { label: "Admission", icon: Landmark, target: "admission" },
  { label: "Courses", icon: BookOpen, target: "courses" },
  { label: "Fees", icon: IndianRupee, target: "fees" },
  { label: "Placements", icon: Briefcase, target: "placements" },
];

export default function InfoBar() {
  // Centralized scroll function that accounts for fixed header height
  const scrollToSection = (id: string, smooth = true) => {
    if (!id) return;
    const section = document.getElementById(id);
    if (!section) return;

    // measure header height dynamically so section isn't hidden under the fixed bar
    const header = document.querySelector(".info-bar") as HTMLElement | null;
    const headerHeight = header ? header.clientHeight : 80; // fallback to 80px

    const top =
      section.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top,
      behavior: smooth ? "smooth" : "auto",
    });

    // update hash without jumping (pushState won't cause a scroll)
    window.history.pushState(null, "", `#${id}`);
  };

  const handleScroll = (id: string) => {
    scrollToSection(id, true);
  };

  // on mount: if there's a hash in the URL, scroll to it (no smooth to avoid janky visual)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#")) {
      const id = hash.slice(1);
      // small timeout to allow layout to settle if needed (images, etc.)
      // but keep it small to avoid perceptible delay
      setTimeout(() => scrollToSection(id, false), 50);
    }

    // handle browser back/forward navigation
    const onPopState = () => {
      const h = window.location.hash;
      if (h && h.startsWith("#")) {
        scrollToSection(h.slice(1), false);
      } else {
        // if no hash, scroll to top (optional)
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div className="info-bar bg-slate-900 text-white pb-4 pt-3 top-0 z-50">
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
