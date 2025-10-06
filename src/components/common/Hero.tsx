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
import { useEffect, useState, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

import { states, streams, instituteTypes, heroImages } from "@/Data/filters";
import { collegeSearchSuggestions } from "@/Data/searchSuggestion";

export default function HeroSection() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    typeof collegeSearchSuggestions
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

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

  // Handle mobile search input changes and filter suggestions
  const handleMobileSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((p) => ({ ...p, searchTerm: value }));

    if (value.trim().length >= 2) {
      const filtered = collegeSearchSuggestions
        .filter(
          (college) =>
            college.name.toLowerCase().includes(value.toLowerCase()) ||
            college.type.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 4); // Limit to 4 suggestions

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (
    college: (typeof collegeSearchSuggestions)[0]
  ) => {
    setFilters((p) => ({ ...p, searchTerm: college.name }));
    setShowSuggestions(false);
    const params = new URLSearchParams();
    params.append("searchTerm", college.name);
    router.push(`/colleges?${params.toString()}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // add this helper above your component or inside it
  const normalize = (v: string) => v.replace(/\s+/g, " ").trim();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // create a cleaned copy of filters (trim + collapse spaces)
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [
        k,
        typeof v === "string" ? normalize(v) : v,
      ])
    ) as typeof filters;

    let params: URLSearchParams;

    if (window.innerWidth < 768) {
      // Mobile → only consider searchTerm (but normalized)
      params = new URLSearchParams(
        Object.entries({ searchTerm: cleanedFilters.searchTerm }).filter(
          ([, v]) => v
        )
      );
    } else {
      // Desktop → all filters (only include non-empty)
      params = new URLSearchParams(
        Object.entries(cleanedFilters).filter(([, v]) => v)
      );
    }

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
          <div className="md:hidden mt-4 relative" ref={searchRef}>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search colleges..."
                className="w-full pr-12 pl-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                value={filters.searchTerm}
                onChange={handleMobileSearchChange}
                onFocus={() => {
                  if (
                    filters.searchTerm.length >= 2 &&
                    filteredSuggestions.length > 0
                  ) {
                    setShowSuggestions(true);
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-2 rounded-xl"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                {filteredSuggestions.map((college, index) => (
                  <div
                    key={`hero-mobile-${college.id}-${index}`}
                    onClick={() => handleSuggestionClick(college)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {college.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {college.type}
                      </span>
                    </div>
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
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
