"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Footer } from "../common/footer";
import { Search, MapPin, Star, Filter, X } from "lucide-react";
import Image from "next/image";
// Sample Data
const collegeData = [
  {
    id: 1,
    name: "Indian Institute of Technology, Delhi",
    location: "New Delhi, Delhi",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    ranking: "NIRF Rank #2",
    placementRate: "98.5%",
    averagePackage: "₹18.2 LPA",
    fees: "₹2.5 Lakhs",
    rating: 4.8,
    established: 1961,
  },
  {
    id: 2,
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai, Maharashtra",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    ranking: "NIRF Rank #1",
    placementRate: "99.2%",
    averagePackage: "₹22.1 LPA",
    fees: "₹2.8 Lakhs",
    rating: 4.9,
    established: 1958,
  },
  // Add other colleges...
];

export default function CollegesMainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredColleges = collegeData.filter(
    (college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Your Perfect College
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
              Discover top engineering colleges across India with comprehensive
              information on admissions, placements, and campus life
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 focus:ring-0 text-base md:text-lg"
                />
              </div>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-full md:w-48 border-0 focus:ring-0 text-sm md:text-base">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-slate-900 hover:bg-slate-800 px-6 md:px-8 text-sm md:text-base">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Filters />
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
                <Filters />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">
                  Engineering Colleges
                </h2>
                <p className="text-slate-600 text-sm md:text-base">
                  Found {filteredColleges.length} colleges matching your
                  criteria
                </p>
              </div>

              {/* Sort + Mobile Filters */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>

                <Select defaultValue="ranking">
                  <SelectTrigger className="w-40 md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ranking">Best Ranking</SelectItem>
                    <SelectItem value="placement">Highest Placement</SelectItem>
                    <SelectItem value="package">Best Package</SelectItem>
                    <SelectItem value="fees">Lowest Fees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* College Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <Button variant="default" size="default">
                Load More Colleges
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Separate Filters Component
function Filters() {
  return (
    <Card className="border border-slate-200 shadow-sm">
      <div className="p-6 space-y-8">
        {/* Location */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Location</h4>
          <div className="space-y-3">
            {[
              "Delhi",
              "Mumbai",
              "Bangalore",
              "Chennai",
              "Hyderabad",
              "Pune",
            ].map((loc) => (
              <div key={loc} className="flex items-center space-x-2">
                <Checkbox id={loc.toLowerCase()} />
                <label htmlFor={loc.toLowerCase()} className="text-sm">
                  {loc}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Fees */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Annual Fees</h4>
          <div className="space-y-3">
            {[
              "Under ₹1 Lakh",
              "₹1-3 Lakhs",
              "₹3-5 Lakhs",
              "₹5-10 Lakhs",
              "Above ₹10 Lakhs",
            ].map((fee) => (
              <div key={fee} className="flex items-center space-x-2">
                <Checkbox id={fee.toLowerCase().replace(/[₹\s-]/g, "")} />
                <label
                  htmlFor={fee.toLowerCase().replace(/[₹\s-]/g, "")}
                  className="text-sm"
                >
                  {fee}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <h4 className="font-medium text-slate-900 mb-4">Rating</h4>
          <div className="space-y-3">
            {["4.5+ Stars", "4.0+ Stars", "3.5+ Stars"].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={rating.toLowerCase().replace(/[+\s]/g, "")} />
                <label
                  htmlFor={rating.toLowerCase().replace(/[+\s]/g, "")}
                  className="text-sm"
                >
                  {rating}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// College Card Component
type College = {
  id: number;
  name: string;
  location: string;
  image: string;
  ranking: string;
  placementRate: string;
  averagePackage: string;
  fees: string;
  rating: number;
  established: number;
};

function CollegeCard({ college }: { college: College }) {
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
         <Image
  src={college.image}
  alt={college.name}
  width={800}    // set this to the actual image width in px
  height={600}   // set this to the actual image height in px
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
            <div className="flex items-center gap-1 ml-4">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs md:text-sm">{college.rating}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
            <DetailBox label="Ranking" value={college.ranking} color="slate" />
            <DetailBox
              label="Placement"
              value={college.placementRate}
              color="blue"
            />
            <DetailBox
              label="Avg Package"
              value={college.averagePackage}
              color="green"
            />
            <DetailBox label="Fees" value={college.fees} color="amber" />
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline">Est. {college.established}</Badge>
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Mini Detail Box Component
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
