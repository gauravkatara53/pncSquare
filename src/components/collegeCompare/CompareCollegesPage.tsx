"use client";
import { useState } from "react";
import { Search, Plus, X, ArrowRight, GraduationCap } from "lucide-react";

interface College {
  id: number;
  name: string;
  location: string;
  type: string;
  logo: string;
  ranking: number;
  rating: number;
}

const availableColleges: College[] = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    type: "Public",
    logo: "🎓",
    ranking: 1,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    type: "Public",
    logo: "🎓",
    ranking: 2,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Indian Institute of Technology Madras",
    location: "Chennai, Tamil Nadu",
    type: "Public",
    logo: "🎓",
    ranking: 3,
    rating: 4.4,
  },
  {
    id: 4,
    name: "Indian Institute of Technology Kanpur",
    location: "Kanpur, Uttar Pradesh",
    type: "Public",
    logo: "🎓",
    ranking: 4,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    type: "Public",
    logo: "🎓",
    ranking: 12,
    rating: 4.2,
  },
  {
    id: 6,
    name: "National Institute of Technology Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    type: "Public",
    logo: "🎓",
    ranking: 8,
    rating: 4.1,
  },
  {
    id: 7,
    name: "Birla Institute of Technology and Science",
    location: "Pilani, Rajasthan",
    type: "Private",
    logo: "🎓",
    ranking: 15,
    rating: 4.3,
  },
  {
    id: 8,
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    type: "Private",
    logo: "🎓",
    ranking: 25,
    rating: 4.0,
  },
  {
    id: 9,
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    type: "Private",
    logo: "🎓",
    ranking: 20,
    rating: 4.1,
  },
  {
    id: 10,
    name: "Netaji Subhas University of Technology",
    location: "New Delhi, Delhi",
    type: "Public",
    logo: "🎓",
    ranking: 18,
    rating: 4.0,
  },
];

interface CompareCollegesPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export function CompareCollegesPage({ onNavigate }: CompareCollegesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  const filteredColleges = availableColleges
    .filter(
      (college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (college) =>
        !selectedColleges.find((selected) => selected.id === college.id)
    );

  const addCollege = (college: College) => {
    if (selectedColleges.length < 4) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const removeCollege = (collegeId: number) => {
    setSelectedColleges(selectedColleges.filter((c) => c.id !== collegeId));
  };

  const handleCompare = () => {
    if (selectedColleges.length >= 2) {
      onNavigate("comparison", { colleges: selectedColleges });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h1 className="text-4xl mb-4">Compare Colleges</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select up to 4 colleges to compare side by side. Make an informed
              decision based on placements, fees, cutoffs, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Selected Colleges Section */}
        {selectedColleges.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-slate-900">
                Selected Colleges ({selectedColleges.length}/4)
              </h2>
              {selectedColleges.length >= 2 && (
                <button
                  onClick={handleCompare}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-lg transition-colors"
                >
                  Compare Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedColleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-lg shadow-md p-4 border-2 border-yellow-400 relative"
                >
                  <button
                    onClick={() => removeCollege(college.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-4xl mb-3">{college.logo}</div>
                  <h3 className="text-slate-900 mb-2 pr-6">{college.name}</h3>
                  <p className="text-gray-600 mb-2">{college.location}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-slate-900">{college.rating}</span>
                    <span className="text-gray-500">
                      • Rank #{college.ranking}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {selectedColleges.length < 2 && (
              <p className="text-gray-600 mt-4 text-center">
                Select at least 2 colleges to compare
              </p>
            )}
          </div>
        )}

        {/* Search and Selection Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl text-slate-900 mb-4">
            {selectedColleges.length === 0
              ? "Select Colleges to Compare"
              : "Add More Colleges"}
          </h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* College List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredColleges.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {searchQuery
                  ? "No colleges found matching your search"
                  : "All available colleges have been selected"}
              </div>
            ) : (
              filteredColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-yellow-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{college.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1">{college.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span>{college.location}</span>
                        <span>•</span>
                        <span>{college.type}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {college.rating}
                        </span>
                        <span>•</span>
                        <span>Rank #{college.ranking}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => addCollege(college)}
                    disabled={selectedColleges.length >= 4}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedColleges.length >= 4
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              ))
            )}
          </div>

          {selectedColleges.length >= 4 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-slate-900">
                You&apos;ve selected the maximum of 4 colleges. Remove a college
                to add another one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
