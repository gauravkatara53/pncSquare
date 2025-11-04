"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { Search, MapPin, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states, streams, instituteTypes, heroImages } from "@/Data/filters";
import { collegeSearchSuggestions } from "@/Data/searchSuggestion";

// ✅ Dynamic imports for heavy libs
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div)
);
const Typewriter = dynamic(() =>
  import("react-simple-typewriter").then((mod) => mod.Typewriter)
);

export default function HeroSection() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    typeof collegeSearchSuggestions
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  const [filters, setFilters] = useState({
    state: "",
    stream: "",
    instituteType: "",
    searchTerm: "",
  });

  // ✅ Auto-slide every 4s (optimized interval)
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  // ✅ Memoized Levenshtein distance
  const levenshteinDistance = useCallback(
    (str1: string, str2: string): number => {
      const len1 = str1.length,
        len2 = str2.length;
      if (!len1) return len2;
      if (!len2) return len1;

      const dp = Array(len2 + 1)
        .fill(null)
        .map(() => Array(len1 + 1).fill(0));

      for (let i = 0; i <= len1; i++) dp[0][i] = i;
      for (let j = 0; j <= len2; j++) dp[j][0] = j;

      for (let j = 1; j <= len2; j++) {
        for (let i = 1; i <= len1; i++) {
          dp[j][i] =
            str1[i - 1] === str2[j - 1]
              ? dp[j - 1][i - 1]
              : Math.min(dp[j - 1][i], dp[j][i - 1], dp[j - 1][i - 1]) + 1;
        }
      }
      return dp[len2][len1];
    },
    []
  );

  // ✅ Optimized fuzzy search (memoized)
  const fuzzySearch = useCallback(
    (searchTerm: string) => {
      const search = searchTerm.toLowerCase().trim();
      if (!search) return [];

      const searchWords = search.split(/\s+/);

      return collegeSearchSuggestions.filter((college) => {
        const words = [
          ...college.name.toLowerCase().split(/\s+/),
          college.type.toLowerCase(),
          college.id.toLowerCase(),
        ];
        const matchedWords = searchWords.filter((s) =>
          words.some(
            (w) =>
              w.includes(s) ||
              s.includes(w) ||
              (s.length > 3 &&
                w.length > 3 &&
                Math.abs(s.length - w.length) <= 2 &&
                levenshteinDistance(s, w) <= 2)
          )
        );
        return matchedWords.length >= Math.ceil(searchWords.length / 2);
      });
    },
    [levenshteinDistance]
  );

  // ✅ Scroll helper
  const scrollToSearch = useCallback(() => {
    if (searchRef.current && window.innerWidth < 768) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|IEMobile/i.test(
        navigator.userAgent
      );
      const offset = isMobile ? 80 : 100;
      const top =
        searchRef.current.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // ✅ Search Focus/Blur Handlers
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    setTimeout(scrollToSearch, 100);
    if (filters.searchTerm && filteredSuggestions.length > 0)
      setShowSuggestions(true);
  }, [filters.searchTerm, filteredSuggestions.length, scrollToSearch]);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  // ✅ Debounced search suggestions
  const handleMobileSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilters((p) => ({ ...p, searchTerm: value }));
      setSelectedIndex(-1);

      if (value.trim()) {
        const filtered = fuzzySearch(value).slice(0, 5);
        setFilteredSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [fuzzySearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions) return;
      if (e.key === "ArrowDown")
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      else if (e.key === "ArrowUp")
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      else if (e.key === "Enter") {
        e.preventDefault();
        const selected =
          selectedIndex >= 0 ? filteredSuggestions[selectedIndex] : null;
        if (selected) handleSuggestionClick(selected);
        else handleSearch(e);
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
      }
    },
    [showSuggestions, filteredSuggestions, selectedIndex]
  );

  const handleSuggestionClick = useCallback(
    (college: (typeof collegeSearchSuggestions)[0]) => {
      setFilters((p) => ({ ...p, searchTerm: college.name }));
      setShowSuggestions(false);
      const params = new URLSearchParams({ searchTerm: college.name });
      router.push(`/colleges?${params.toString()}`);
    },
    [router]
  );

  // ✅ Outside click listener
  useEffect(() => {
    const closeOnOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  // ✅ Auto-scroll when suggestions appear
  useEffect(() => {
    if (showSuggestions && isSearchFocused) scrollToSearch();
  }, [showSuggestions, isSearchFocused, scrollToSearch]);

  // ✅ Normalize helper
  const normalize = useCallback(
    (v: string) => v.replace(/\s+/g, " ").trim(),
    []
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cleaned = Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [
          k,
          typeof v === "string" ? normalize(v) : v,
        ])
      ) as typeof filters;

      const params = new URLSearchParams(
        Object.entries(cleaned)
          .filter(([, v]) => v)
          .map(([k, v]) => [k, v as string])
      );

      router.push(`/colleges?${params.toString()}`);
    },
    [filters, normalize, router]
  );

  return (
    <section
      ref={heroSectionRef}
      className={`relative min-h-[300px] flex items-center justify-center 
        bg-gradient-to-br from-slate-900/10 via-blue-900/60 to-indigo-900/70 
        rounded-b-3xl ${
          showSuggestions ? "overflow-visible" : "overflow-hidden"
        }`}
      aria-label="Hero section for college search"
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <MotionDiv
            key={i}
            initial={false}
            animate={{ x: `${(i - index) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={img}
              alt="College background"
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL={`https://ik.imagekit.io/your-id/${img}?tr=w-10,h-10,bl-6`}
            />
            <div className="absolute inset-0 bg-black/40" />
          </MotionDiv>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center text-white">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
          <span className="text-white">Find</span>{" "}
          <span className="text-yellow-400">
            <Typewriter
              words={["1500+ Colleges", "500+ Courses", "100+ Exams"]}
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
          className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl sm:px-6 sm:pt-6 sm:pb-6 md:p-8 border border-white/20 shadow-lg relative z-10"
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
          <MotionDiv
            className="md:hidden mt-4 relative z-[100]"
            ref={searchRef}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search colleges..."
                className={`w-full pr-12 pl-4 py-3 -mt-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-gray-500 transition-all duration-300 ${
                  isSearchFocused ? "shadow-lg" : ""
                }`}
                value={filters.searchTerm}
                onChange={handleMobileSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <button
                type="submit"
                className="absolute right-2 -mt-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-2 rounded-xl"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl z-[9999] max-h-64 overflow-y-auto"
              >
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">
                    Suggested Colleges
                  </div>
                  {filteredSuggestions.map((college, index) => (
                    <MotionDiv
                      key={`hero-mobile-${college.id}-${index}`}
                      onClick={() => handleSuggestionClick(college)}
                      className={`group px-4 py-3 mx-1 cursor-pointer rounded-xl border transition-all duration-200 ${
                        selectedIndex === index
                          ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200 shadow-md"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-transparent hover:border-blue-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                          <span
                            className={`text-sm font-semibold truncate ${
                              selectedIndex === index
                                ? "text-blue-800"
                                : "text-gray-900 group-hover:text-blue-700"
                            }`}
                          >
                            {college.name}
                          </span>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            selectedIndex === index
                              ? "bg-gradient-to-r from-blue-200 to-indigo-200 scale-110"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200"
                          }`}
                        >
                          <Search
                            className={`w-4 h-4 ${
                              selectedIndex === index
                                ? "text-blue-700"
                                : "text-blue-600"
                            }`}
                          />
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
                <div className="border-t border-gray-100 p-3 text-center text-xs text-gray-500">
                  Press{" "}
                  <kbd className="px-2 py-0.5 bg-gray-100 rounded">↑↓</kbd> to
                  navigate •{" "}
                  <kbd className="px-2 py-0.5 bg-gray-100 rounded">Enter</kbd>{" "}
                  to select
                </div>
              </MotionDiv>
            )}
          </MotionDiv>
        </form>
      </div>
    </section>
  );
}

/* ✅ Reusable Select Component (memoized) */
const FilterSelect = React.memo(function FilterSelect({
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
});
