"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Footer } from "../common/footer";
import { Search, MapPin, Filter, X } from "lucide-react";
import Image from "next/image";
import { apiService } from "../../ApiService/apiService";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

type College = {
  _id: number;
  name: string;
  image_url: string;
  location: string;
  ranking: string;
  placementRate: string;
  avgSalary: number;
  fees: number;
  rating: number;
  establishedYear: number;
  slug: string;
  nirf: string;
};

type FiltersType = {
  state: string[];
  stream: string[];
  instituteType: string[];
  tag: string[];
  minFees: string;
  maxFees: string;
  minPlacementRate: string;
  sortBy: string;
  order: string;
  searchTerm: string;
};

export default function CollegesMainPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const perPage = 9;

  // UI state for filter modal on mobile
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FiltersType>({
    state: [],
    stream: [],
    instituteType: [],
    tag: [],
    minFees: "",
    maxFees: "",
    minPlacementRate: "",
    sortBy: "",
    order: "",
    searchTerm: "",
  });

  const [page, setPage] = useState(1);

  const [colleges, setColleges] = useState<College[]>([]);
  const [totalColleges, setTotalColleges] = useState(0);
  const [loading, setLoading] = useState(false);

  // Parse filters from URL params
  const parseFiltersFromParams = useCallback(
    (params: URLSearchParams): FiltersType => ({
      state: params.get("state")?.split(",").filter(Boolean) || [],
      stream: params.get("stream")?.split(",").filter(Boolean) || [],
      instituteType:
        params.get("instituteType")?.split(",").filter(Boolean) || [],
      tag: params.get("tag")?.split(",").filter(Boolean) || [],
      minFees: params.get("minFees") || "",
      maxFees: params.get("maxFees") || "",
      minPlacementRate: params.get("minPlacementRate") || "",
      sortBy: params.get("sortBy") || "",
      order: params.get("order") || "",
      searchTerm: params.get("searchTerm") || "",
    }),
    []
  );

  // Parse page number with fallback
  const parsePageFromParams = useCallback((params: URLSearchParams): number => {
    const p = Number(params.get("page"));
    return Number.isInteger(p) && p > 0 ? p : 1;
  }, []);

  // Effect: Sync filters and page state to URL search params on URL change
  useEffect(() => {
    if (!searchParams) return;

    const params = new URLSearchParams(searchParams.toString());

    const parsedFilters = parseFiltersFromParams(params);
    setFilters(parsedFilters);

    setPage(parsePageFromParams(params));

    fetchColleges(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch colleges API
  const fetchColleges = async (params: URLSearchParams) => {
    setLoading(true);
    try {
      const apiParams: Record<string, string> = {};
      params.forEach((value, key) => {
        apiParams[key] = value;
      });

      const response = await apiService.get<{
        statusCode: number;
        data: { colleges: College[]; totalCount: number };
        message: string;
        success: boolean;
      }>("/college/all", apiParams);

      setColleges(response.data.colleges);
      setTotalColleges(response.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
      setColleges([]);
      setTotalColleges(0);
    } finally {
      setLoading(false);
    }
  };

  // Update URL params (push replace without scrolling)
  const updateUrlWithFilters = useCallback(
    (newFilters: FiltersType, newPage: number) => {
      const params = new URLSearchParams();

      // Helper to set array params
      const setArrayParam = (
        key: keyof FiltersType,
        arr: readonly string[]
      ) => {
        if (arr.length) params.set(key, arr.join(","));
      };

      setArrayParam("state", newFilters.state);
      setArrayParam("stream", newFilters.stream);
      setArrayParam("instituteType", newFilters.instituteType);
      setArrayParam("tag", newFilters.tag);

      if (newFilters.minFees) params.set("minFees", newFilters.minFees);
      if (newFilters.maxFees) params.set("maxFees", newFilters.maxFees);
      if (newFilters.minPlacementRate)
        params.set("minPlacementRate", newFilters.minPlacementRate);
      if (newFilters.sortBy) params.set("sortBy", newFilters.sortBy);
      if (newFilters.order) params.set("order", newFilters.order);
      if (newFilters.searchTerm)
        params.set("searchTerm", newFilters.searchTerm);

      params.set("page", newPage.toString());
      params.set("limit", perPage.toString());

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, perPage]
  );

  // Toggle filters for categories that are arrays
  const toggleFilter = useCallback(
    (category: keyof FiltersType, value: string) => {
      if (!["state", "stream", "instituteType", "tag"].includes(category))
        return;

      setFilters((prev) => {
        const current = prev[category] as string[];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];

        const newFilters = { ...prev, [category]: updated };
        updateUrlWithFilters(newFilters, 1);
        return newFilters;
      });
    },
    [updateUrlWithFilters]
  );

  // Handle input change for string values (minFees, searchTerm etc)
  const handleInputChange = useCallback(
    (category: keyof FiltersType, value: string) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [category]: category === "searchTerm" ? value.trimStart() : value,
        };

        // Immediately update URL and fetch on filters other than searchTerm
        if (category !== "searchTerm") {
          updateUrlWithFilters(newFilters, 1);
        }

        return newFilters;
      });
    },
    [updateUrlWithFilters]
  );

  const handleSearchClick = () => {
    // Ensure final trimmed value before searching
    const cleanedFilters = {
      ...filters,
      searchTerm: filters.searchTerm.trim(),
    };
    updateUrlWithFilters(cleanedFilters, 1);
  };

  // Change page handler
  const changePage = useCallback(
    (newPage: number) => {
      if (newPage !== page) {
        updateUrlWithFilters(filters, newPage);
      }
    },
    [filters, page, updateUrlWithFilters]
  );

  // Memoized total pages
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalColleges / perPage)),
    [totalColleges, perPage]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero/Searchbar */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Your Perfect College
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
              Discover top colleges across India with comprehensive information
              on admissions, placements, and campus life
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search colleges..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    handleInputChange("searchTerm", e.target.value)
                  }
                  className="pl-10 border-0 focus:ring-0 text-base md:text-lg"
                  aria-label="Search colleges"
                />
                <button
                  className="ml-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm md:text-base hover:bg-slate-800 transition-colors"
                  onClick={handleSearchClick}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - desktop */}
          <aside
            className="hidden lg:block w-64 flex-shrink-0"
            aria-label="Filters"
          >
            <Filters
              filters={filters}
              toggleFilter={toggleFilter}
              handleInputChange={handleInputChange}
            />
          </aside>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div
              className="fixed inset-0 z-40 bg-black/50 flex justify-end"
              role="dialog"
              aria-modal="true"
            >
              <section
                className="bg-white w-72 p-4 overflow-y-auto shadow-lg"
                aria-label="Filter options"
              >
                <header className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-slate-900">Filters</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFilters(false)}
                    aria-label="Close filters"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </header>
                <Filters
                  filters={filters}
                  toggleFilter={toggleFilter}
                  handleInputChange={handleInputChange}
                />
              </section>
            </div>
          )}

          {/* Main Content */}
          <section className="flex-1" aria-live="polite">
            {/* Results Header */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">
                  Colleges in India
                </h2>
                <p className="text-slate-600 text-sm md:text-base">
                  Found {totalColleges} colleges matching your criteria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                  aria-haspopup="dialog"
                  aria-expanded={showFilters}
                >
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>
              </div>
            </header>

            {/* College Cards Grid */}
            <section
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              aria-label="College results"
            >
              {loading
                ? Array.from({ length: perPage }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))
                : colleges.map((college) => (
                    <CollegeCard key={college._id} college={college} />
                  ))}
            </section>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <PaginationUI
                currentPage={page}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

type FiltersProps = {
  filters: FiltersType;
  toggleFilter: (category: keyof FiltersType, value: string) => void;
  handleInputChange: (category: keyof FiltersType, value: string) => void;
};

const STATES = [
  "Andhra-Pradesh",
  "Arunachal-Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal-Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya-Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil-Nadu",
  "Telangana",
  "Tripura",
  "Uttar-Pradesh",
  "Uttarakhand",
  "West-Bengal",
  "Andaman-and-Nicobar-Islands",
  "Chandigarh",
  "Delhi",
  "Jammu-and-Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const FILTER_OPTIONS = {
  feeLimits: [
    { label: "< ₹1 Lakh", value: "100000" },
    { label: "< ₹5 Lakh", value: "500000" },
    { label: "< ₹10 Lakh", value: "1000000" },
    { label: "< ₹15 Lakh", value: "1500000" },
  ],
  streams: ["Engineering", "Medical", "Management"],
  instituteTypes: ["Private", "Govt", "Deemed"],
  tags: [
    "IIT",
    "NIT",
    "IIIT",
    "GFTI",
    "IIM",
    "Private",
    "State",
    "AIIMS",
    "Other",
  ],
};

function Filters({ filters, toggleFilter, handleInputChange }: FiltersProps) {
  const isChecked = useCallback(
    (category: keyof FiltersType, value: string) =>
      filters[category].includes(value),
    [filters]
  );

  return (
    <Card
      className="border border-slate-200 shadow-sm"
      role="region"
      aria-labelledby="filter-heading"
    >
      <div className="p-6 space-y-8">
        {/* Location */}
        <section aria-labelledby="filter-location-heading">
          <h4
            id="filter-location-heading"
            className="font-medium text-slate-900 mb-4"
          >
            Location (State)
          </h4>
          <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
            {STATES.map((loc) => {
              const id = `state-${loc.toLowerCase().replace(/\s/g, "")}`;
              return (
                <div key={loc} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={isChecked("state", loc)}
                    onCheckedChange={() => toggleFilter("state", loc)}
                  />
                  <label htmlFor={id} className="text-sm">
                    {loc.replace(/-/g, " ")}
                  </label>
                </div>
              );
            })}
          </div>
        </section>
        <Separator />

        {/* Total Fees */}
        <section aria-labelledby="filter-fees-heading">
          <h4
            id="filter-fees-heading"
            className="font-medium text-slate-900 mb-4"
          >
            Total Fees
          </h4>
          <div className="space-y-2">
            {FILTER_OPTIONS.feeLimits.map((option) => {
              const id = `maxFees-${option.value}`;
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={filters.maxFees === option.value}
                    onCheckedChange={() =>
                      handleInputChange(
                        "maxFees",
                        filters.maxFees === option.value ? "" : option.value
                      )
                    }
                  />
                  <label htmlFor={id} className="text-sm">
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        </section>
        <Separator />

        {/* Stream */}
        <section aria-labelledby="filter-stream-heading">
          <h4
            id="filter-stream-heading"
            className="font-medium text-slate-900 mb-4"
          >
            Stream
          </h4>
          <div className="space-y-3">
            {FILTER_OPTIONS.streams.map((stream) => {
              const id = `stream-${stream.toLowerCase()}`;
              return (
                <div key={stream} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={isChecked("stream", stream)}
                    onCheckedChange={() => toggleFilter("stream", stream)}
                  />
                  <label htmlFor={id} className="text-sm">
                    {stream}
                  </label>
                </div>
              );
            })}
          </div>
        </section>
        <Separator />

        {/* Institute Type */}
        <section aria-labelledby="filter-institute-heading">
          <h4
            id="filter-institute-heading"
            className="font-medium text-slate-900 mb-4"
          >
            Institute Type
          </h4>
          <div className="space-y-3">
            {FILTER_OPTIONS.instituteTypes.map((inst) => {
              const id = `instituteType-${inst.toLowerCase()}`;
              return (
                <div key={inst} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={isChecked("instituteType", inst)}
                    onCheckedChange={() => toggleFilter("instituteType", inst)}
                  />
                  <label htmlFor={id} className="text-sm">
                    {inst}
                  </label>
                </div>
              );
            })}
          </div>
        </section>
        <Separator />

        {/* Tag */}
        <section aria-labelledby="filter-tag-heading">
          <h4
            id="filter-tag-heading"
            className="font-medium text-slate-900 mb-4"
          >
            Tag
          </h4>
          <div className="space-y-3">
            {FILTER_OPTIONS.tags.map((tag) => {
              const id = `tag-${tag.toLowerCase()}`;
              return (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={isChecked("tag", tag)}
                    onCheckedChange={() => toggleFilter("tag", tag)}
                  />
                  <label htmlFor={id} className="text-sm">
                    {tag}
                  </label>
                </div>
              );
            })}
          </div>
        </section>
        <Separator />

        {/* Min Placement Rate */}
        <section aria-labelledby="filter-placement-heading">
          <h4
            id="filter-placement-heading"
            className="font-medium text-slate-900 mb-4"
          >
            Minimum Placement Rate (%)
          </h4>
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="e.g., 80"
            value={filters.minPlacementRate}
            onChange={(e) =>
              handleInputChange("minPlacementRate", e.target.value)
            }
            aria-label="Minimum Placement Rate in percent"
          />
        </section>
      </div>
    </Card>
  );
}

// --- College Card ---
function CollegeCard({ college }: { college: College }) {
  return (
    <Card
      className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
      tabIndex={0}
      aria-label={`College: ${college.name}`}
    >
      <Link
        href={`/college/${college.slug}`}
        className="block focus:outline-none "
      >
        <div className="aspect-video w-full overflow-hidden rounded-t-lg cursor-pointer">
          <Image
            src={college.image_url}
            alt={college.name}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 text-sm md:text-base">
                {college.name}
              </h3>
              <div className="flex items-center gap-1 text-slate-600 text-xs md:text-sm">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{college.location}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
            <DetailBox label="Ranking" value={college.nirf} color="slate" />
            <DetailBox
              label="Placement"
              value={`${college.placementRate}%`}
              color="blue"
            />
            <DetailBox
              label="Avg Package"
              value={formatToIndianUnits(college.avgSalary)}
              color="green"
            />
            <DetailBox
              label="Fees"
              value={formatToIndianUnits(college.fees)}
              color="amber"
            />
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Est. {college.establishedYear}</Badge>
            <Button
              size="sm"
              className="bg-slate-900 hover:bg-slate-800"
              aria-label={`View details for ${college.name}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
}

function DetailBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`text-center p-2 md:p-3 bg-${color}-50 rounded-lg`}>
      <p className="text-[11px] md:text-sm text-slate-600 mb-1">{label}</p>
      <p className={`text-xs md:text-sm font-semibold text-${color}-700`}>
        {value}
      </p>
    </div>
  );
}

const formatToIndianUnits = (num: number | null | undefined): string => {
  if (num == null || isNaN(Number(num))) return "N/A";
  if (num >= 1e7) {
    return `${(num / 1e7).toFixed(1).replace(/\.0$/, "")} Cr`;
  } else if (num >= 1e5) {
    return `${(num / 1e5).toFixed(1).replace(/\.0$/, "")} Lakh`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1).replace(/\.0$/, "")} K`;
  }
  return num.toString();
};

// --- Loading Skeleton ---
function SkeletonCard() {
  return (
    <div
      className="border border-slate-200 shadow-sm rounded-lg animate-pulse"
      aria-hidden="true"
    >
      <div className="aspect-video bg-slate-200 rounded-t-lg"></div>
      <div className="p-4 md:p-6 space-y-4">
        <div className="h-5 bg-slate-300 rounded w-3/4"></div>
        <div className="h-4 bg-slate-300 rounded w-1/2"></div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="h-10 bg-slate-300 rounded"></div>
          <div className="h-10 bg-slate-300 rounded"></div>
          <div className="h-10 bg-slate-300 rounded"></div>
          <div className="h-10 bg-slate-300 rounded"></div>
        </div>
        <div className="h-8 bg-slate-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}

// --- Pagination UI ---
function PaginationUI({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  let start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);

  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-10"
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        {"<"}
      </Button>
      {pageNumbers.map((num) => (
        <Button
          key={num}
          variant={num === currentPage ? "default" : "ghost"}
          size="sm"
          className={num === currentPage ? "font-bold border-slate-900" : ""}
          aria-current={num === currentPage ? "page" : undefined}
          onClick={() => onPageChange(num)}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        {">"}
      </Button>
    </nav>
  );
}
