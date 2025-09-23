"use client";

import Image from "next/image";
import { Search, MapPin, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

import { states, streams, instituteTypes, heroImages } from "@/Data/filters";

export default function HeroSection() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const [filters, setFilters] = useState({
    state: "",
    stream: "",
    instituteType: "",
    searchTerm: "",
  });

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.entries(filters).filter(([, v]) => v)
    );
    router.push(`/colleges?${params.toString()}`);
  };

  return (
    <section
      className="relative min-h-[400px] flex items-center justify-center 
      bg-gradient-to-br from-slate-900/10 via-blue-900/60 to-indigo-900/70 
      rounded-b-3xl overflow-hidden"
      aria-label="Hero section for college search"
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <motion.div
            key={i}
            initial={false} // ✅ prevent animation on first render
            animate={{ x: `${(i - index) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={img}
              alt="College background"
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center text-white">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
          <span className="text-white">Find</span>{" "}
          <span className="text-yellow-400">
            <Typewriter
              words={["2500+ Colleges", "250+ Courses", "110+ Exams"]}
              loop
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>{" "}
          <span className="text-white">in India</span>
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg"
          aria-label="Search colleges"
        >
          {/* Desktop Filters */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4">
            <FilterSelect
              icon={<MapPin className="w-5 h-5 text-gray-900" />}
              placeholder="Select State"
              options={states}
              onChange={(val) => setFilters((p) => ({ ...p, state: val }))}
            />
            <FilterSelect
              icon={<BookOpen className="w-5 h-5 text-gray-900" />}
              placeholder="Select Stream"
              options={streams}
              onChange={(val) => setFilters((p) => ({ ...p, stream: val }))}
            />
            <FilterSelect
              icon={<FileText className="w-5 h-5 text-gray-900" />}
              placeholder="Select Type"
              options={instituteTypes}
              onChange={(val) =>
                setFilters((p) => ({ ...p, instituteType: val }))
              }
            />
            <Button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold transition-all duration-200 shadow-md flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" /> Search Colleges
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden flex items-center mt-4">
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full pr-12 pl-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((p) => ({ ...p, searchTerm: e.target.value }))
              }
            />
            <button
              type="submit"
              className="absolute right-6 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-2 rounded-xl"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---- Reusable FilterSelect ---- */
function FilterSelect({
  icon,
  placeholder,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
      <Select onValueChange={onChange}>
        <SelectTrigger className="pl-10 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-yellow-400">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-48 overflow-y-auto bg-white">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt.replace(/-/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
