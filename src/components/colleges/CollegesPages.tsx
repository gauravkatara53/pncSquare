"use client";

import { useEffect, useState, useCallback } from "react";
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
import { useRouter, usePathname } from "next/navigation";

type College = {
  _id: number;
  name: string;
  image_url: string;
  location: string;
  image: string;
  ranking: string;
  placementRate: string;
  avgSalary: number;
  fees: number;
  rating: number;
  establishedYear: number;
  slug: string;
  nirf: string;
};

export default function CollegesMainPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    state: [] as string[],
    minFees: "",
    maxFees: "",
    stream: [] as string[],
    instituteType: [] as string[],
    tag: [] as string[],
    minPlacementRate: "",
    sortBy: "",
    order: "",
    searchTerm: "",
  });

  const [page, setPage] = useState(1);
  const [perPage] = useState(9);
  const [totalColleges, setTotalColleges] = useState(0);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  // Get current filter params for API/URL
  const buildFilterQueryParams = useCallback(() => {
    const params: Record<string, string> = {};
    if (filters.state.length) params.state = filters.state.join(",");
    if (filters.stream.length) params.Stream = filters.stream.join(",");
    if (filters.instituteType.length)
      params.instituteType = filters.instituteType.join(",");
    if (filters.tag.length) params.tag = filters.tag.join(",");
    if (filters.minFees) params.minFees = filters.minFees;
    if (filters.maxFees) params.maxFees = filters.maxFees;
    if (filters.minPlacementRate)
      params.minPlacementRate = filters.minPlacementRate;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.order) params.order = filters.order;
    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    params.page = String(page);
    params.limit = String(perPage);
    return params;
  }, [filters, page, perPage]);

  // Update URL whenever filters/page change
  const syncUrlWithFilters = useCallback(() => {
    const params = buildFilterQueryParams();
    const queryString = new URLSearchParams(params).toString();
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  }, [buildFilterQueryParams, pathname, router]);

  // Fetch college data using current filters/page
  const fetchColleges = useCallback(async () => {
    setLoading(true);
    try {
      const params = buildFilterQueryParams();
      const response = await apiService.get<{
        statusCode: number;
        data: { colleges: College[]; totalCount: number };
        message: string;
        success: boolean;
      }>("/college/all", params);

      setColleges(response.data.colleges);
      setTotalColleges(response.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setLoading(false);
    }
  }, [buildFilterQueryParams]);

  // Update URL + fetch data when filters/page change
  useEffect(() => {
    syncUrlWithFilters();
    fetchColleges();
  }, [filters, page, syncUrlWithFilters, fetchColleges]);

  // Filter checkbox toggler
  function toggleFilter(category: keyof typeof filters, value: string) {
    setPage(1);
    setFilters((prev) => {
      const currentValues = prev[category];
      if (Array.isArray(currentValues)) {
        return currentValues.includes(value)
          ? { ...prev, [category]: currentValues.filter((v) => v !== value) }
          : { ...prev, [category]: [...currentValues, value] };
      }
      return prev;
    });
  }

  // Input handler
  function handleInputChange(
    category: "minFees" | "maxFees" | "minPlacementRate" | "sortBy" | "order",
    value: string
  ) {
    setPage(1);
    setFilters((prev) => ({ ...prev, [category]: value }));
  }

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(totalColleges / perPage));
  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  }

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
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search colleges..."
                  value={filters.searchTerm}
                  onChange={(e) => {
                    setPage(1);
                    setFilters((prev) => ({
                      ...prev,
                      searchTerm: e.target.value,
                    }));
                  }}
                  className="pl-10 border-0 focus:ring-0 text-base md:text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Filters
              filters={filters}
              toggleFilter={toggleFilter}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 z-40 bg-black/50 flex justify-end">
              <div className="bg-white w-72 p-4 overflow-y-auto shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-slate-900">Filters</h3>
                  <Button variant="ghost" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Filters
                  filters={filters}
                  toggleFilter={toggleFilter}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
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
                >
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>
              </div>
            </div>

            {/* College Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {loading
                ? Array(perPage)
                    .fill(0)
                    .map((_, idx) => <SkeletonCard key={idx} />)
                : colleges.map((college) => (
                    <CollegeCard key={college._id} college={college} />
                  ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <PaginationUI
                currentPage={page}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// --- Pagination UI: Page numbers + arrows ---
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
    <div className="flex justify-center items-center gap-2 mt-10">
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<"}
      </Button>
      {pageNumbers.map((num) => (
        <Button
          key={num}
          variant={num === currentPage ? "default" : "ghost"}
          size="sm"
          className={num === currentPage ? "font-bold border-slate-900" : ""}
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
      >
        {">"}
      </Button>
    </div>
  );
}

// --- Filters component ---
type FiltersProps = {
  filters: {
    state: string[];
    minFees: string;
    maxFees: string;
    stream: string[];
    instituteType: string[];
    tag: string[];
    minPlacementRate: string;
  };
  toggleFilter: (
    category: keyof FiltersProps["filters"],
    value: string
  ) => void;
  handleInputChange: (
    category: "minFees" | "maxFees" | "minPlacementRate",
    value: string
  ) => void;
};

function Filters({ filters, toggleFilter, handleInputChange }: FiltersProps) {
  function isChecked(category: keyof FiltersProps["filters"], value: string) {
    return filters[category].includes(value);
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      <div className="p-6 space-y-8">
        {/* Location */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Location (State)</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
            {[
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
            ].map((loc) => (
              <div key={loc} className="flex items-center space-x-2">
                <Checkbox
                  id={`state-${loc.toLowerCase().replace(/\s/g, "")}`}
                  checked={isChecked("state", loc)}
                  onCheckedChange={() => toggleFilter("state", loc)}
                />
                <label
                  htmlFor={`state-${loc.toLowerCase().replace(/\s/g, "")}`}
                  className="text-sm"
                >
                  {loc.replace(/-/g, " ")}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {/* Total Fees */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Total Fees</h4>
          <div className="space-y-2">
            {[
              { label: "< ₹1 Lakh", value: "100000" },
              { label: "< ₹5 Lakh", value: "500000" },
              { label: "< ₹10 Lakh", value: "1000000" },
              { label: "< ₹15 Lakh", value: "1500000" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`maxFees-${option.value}`}
                  checked={filters.maxFees === option.value}
                  onCheckedChange={() =>
                    handleInputChange(
                      "maxFees",
                      filters.maxFees === option.value ? "" : option.value
                    )
                  }
                />
                <label htmlFor={`maxFees-${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {/* Stream */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Stream</h4>
          <div className="space-y-3">
            {["Engineering", "Medical", "Management"].map((stream) => (
              <div key={stream} className="flex items-center space-x-2">
                <Checkbox
                  id={`stream-${stream.toLowerCase()}`}
                  checked={isChecked("stream", stream)}
                  onCheckedChange={() => toggleFilter("stream", stream)}
                />
                <label
                  htmlFor={`stream-${stream.toLowerCase()}`}
                  className="text-sm"
                >
                  {stream}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {/* Institute Type */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Institute Type</h4>
          <div className="space-y-3">
            {["Private", "Govt", "Deemed"].map((inst) => (
              <div key={inst} className="flex items-center space-x-2">
                <Checkbox
                  id={`instituteType-${inst.toLowerCase()}`}
                  checked={isChecked("instituteType", inst)}
                  onCheckedChange={() => toggleFilter("instituteType", inst)}
                />
                <label
                  htmlFor={`instituteType-${inst.toLowerCase()}`}
                  className="text-sm"
                >
                  {inst}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {/* Tag */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Tag</h4>
          <div className="space-y-3">
            {[
              "IIT",
              "NIT",
              "IIIT",
              "GFTI",
              "Private",
              "State",
              "AIIMS",
              "Other",
            ].map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag.toLowerCase()}`}
                  checked={isChecked("tag", tag)}
                  onCheckedChange={() => toggleFilter("tag", tag)}
                />
                <label htmlFor={`tag-${tag.toLowerCase()}`} className="text-sm">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Min Placement Rate */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">
            Minimum Placement Rate (%)
          </h4>
          <Input
            type="number"
            placeholder="e.g., 80"
            value={filters.minPlacementRate}
            onChange={(e) =>
              handleInputChange("minPlacementRate", e.target.value)
            }
          />
        </div>
      </div>
    </Card>
  );
}

// --- College Card ---
function CollegeCard({ college }: { college: College }) {
  const router = useRouter();
  const goToDetails = () => {
    router.push(`/college/${college.slug}`);
  };

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div
          onClick={goToDetails}
          className="aspect-video w-full overflow-hidden rounded-t-lg"
        >
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
                <MapPin className="h-4 w-4" />
                {college.location}
              </div>
            </div>
          </div>
          {/* Details Grid */}
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
              onClick={goToDetails}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// --- DetailsBox ---
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
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")} K`;
  }
  return num.toString();
};

// --- Loading Skeleton ---
function SkeletonCard() {
  return (
    <div className="border border-slate-200 shadow-sm rounded-lg animate-pulse">
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
