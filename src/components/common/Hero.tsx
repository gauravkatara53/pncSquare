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

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced fuzzy search function
  const fuzzySearch = (
    searchTerm: string,
    colleges: typeof collegeSearchSuggestions
  ) => {
    const search = searchTerm.toLowerCase().trim();
    const searchWords = search.split(/\s+/);

    return colleges.filter((college) => {
      const collegeName = college.name.toLowerCase();
      const collegeType = college.type.toLowerCase();
      const collegeId = college.id.toLowerCase();

      // Direct match (exact substring)
      if (
        collegeName.includes(search) ||
        collegeType.includes(search) ||
        collegeId.includes(search)
      ) {
        return true;
      }

      // Word-by-word matching (handles reverse order like "jaipur nit")
      const collegeWords = [
        ...collegeName.split(/\s+/),
        ...collegeType.split(/\s+/),
        ...collegeId.split(/-/),
      ];
      const matchedWords = searchWords.filter((searchWord) =>
        collegeWords.some(
          (collegeWord) =>
            collegeWord.includes(searchWord) ||
            searchWord.includes(collegeWord) ||
            // Simple typo tolerance (1-2 character difference)
            (searchWord.length > 3 &&
              collegeWord.length > 3 &&
              Math.abs(searchWord.length - collegeWord.length) <= 2 &&
              levenshteinDistance(searchWord, collegeWord) <= 2)
        )
      );

      // Return true if at least half of search words match
      return matchedWords.length >= Math.ceil(searchWords.length / 2);
    });
  };

  // Simple Levenshtein distance for typo detection
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // insertion
          matrix[j - 1][i] + 1, // deletion
          matrix[j - 1][i - 1] + substitutionCost // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  // Smooth scroll to search bar
  const scrollToSearch = () => {
    if (searchRef.current && window.innerWidth < 768) {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const offset = isMobile ? 80 : 100; // Less offset on mobile to account for virtual keyboard
      const elementTop =
        searchRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setTimeout(() => {
      scrollToSearch();
    }, 100); // Small delay to ensure the keyboard doesn't interfere

    if (filters.searchTerm.length >= 1 && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle search input blur
  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  // Handle mobile search input changes and filter suggestions
  const handleMobileSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((p) => ({ ...p, searchTerm: value }));
    setSelectedIndex(-1); // Reset selection on new input

    if (value.trim().length >= 1) {
      const filtered = fuzzySearch(value, collegeSearchSuggestions).slice(0, 5); // Limit to 5 suggestions for better UX

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        } else if (filters.searchTerm.trim()) {
          // If no suggestion selected, perform regular search
          handleSearch(e);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (
    college: (typeof collegeSearchSuggestions)[0]
  ) => {
    setFilters((p) => ({ ...p, searchTerm: college.name }));
    setShowSuggestions(false);
    setSelectedIndex(-1);
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
        setSelectedIndex(-1);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-scroll when suggestions appear
  useEffect(() => {
    if (showSuggestions && isSearchFocused) {
      scrollToSearch();
    }
  }, [showSuggestions, isSearchFocused]);

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
      ref={heroSectionRef}
      className={`relative min-h-[300px] flex items-center justify-center 
  bg-gradient-to-br from-slate-900/10 via-blue-900/60 to-indigo-900/70 
  rounded-b-3xl ${showSuggestions ? "overflow-visible" : "overflow-hidden"}`}
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
          className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl sm:px-6 sm:pt-6 sm:pb-6 -pb-8  -pt-8 md:p-8 border border-white/20 shadow-lg relative z-10"
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
          <motion.div
            className="md:hidden mt-4 relative z-[100] "
            ref={searchRef}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center ">
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

            {/* Mobile Search Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl z-[9999] max-h-64 overflow-y-auto"
                style={{
                  position: "absolute",
                  zIndex: 9999,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">
                    Suggested Colleges
                  </div>
                  {filteredSuggestions.map((college, index) => (
                    <motion.div
                      key={`hero-mobile-${college.id}-${index}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(college)}
                      className={`group px-4 py-3 mx-1 cursor-pointer rounded-xl border transition-all duration-200 ease-in-out ${
                        selectedIndex === index
                          ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200 shadow-md"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-transparent hover:border-blue-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                            <span
                              className={`text-sm font-semibold transition-colors truncate ${
                                selectedIndex === index
                                  ? "text-blue-800"
                                  : "text-gray-900 group-hover:text-blue-700"
                              }`}
                            >
                              {college.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                              selectedIndex === index
                                ? "bg-gradient-to-r from-blue-200 to-indigo-200 scale-110"
                                : "bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200"
                            }`}
                          >
                            <Search
                              className={`w-4 h-4 transition-colors ${
                                selectedIndex === index
                                  ? "text-blue-700"
                                  : "text-blue-600"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-gray-100 p-3">
                  <div className="text-xs text-gray-500 text-center">
                    Press{" "}
                    <kbd className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                      ↑↓
                    </kbd>{" "}
                    to navigate •{" "}
                    <kbd className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                      Enter
                    </kbd>{" "}
                    to select
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
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
