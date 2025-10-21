"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";

export default function NewsArticleSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center gap-8">
          {/* Left Sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Exam Links Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Popular Exams
                  </h3>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                    onClick={() => window.open("/exam?exam=jee-main", "_self")}
                  >
                    JEE Main
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                    onClick={() =>
                      window.open("/exam?exam=jee-advanced", "_self")
                    }
                  >
                    JEE Advanced
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                    onClick={() => window.open("/exam?exam=neet-ug", "_self")}
                  >
                    NEET UG
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                    onClick={() => window.open("/exam?exam=gate", "_self")}
                  >
                    GATE
                  </Button>
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-blue-600 border border-blue-200 hover:bg-blue-50"
                    onClick={() =>
                      window.open("https://facebook.com", "_blank")
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-blue-400 border border-blue-200 hover:bg-blue-50"
                    onClick={() =>
                      window.open("https://x.com/pncsquare", "_blank")
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-blue-700 border border-blue-200 hover:bg-blue-50"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/company/pncsquare/",
                        "_blank"
                      )
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-pink-600 border border-pink-200 hover:bg-pink-50"
                    onClick={() =>
                      window.open("https://instagram.com", "_blank")
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349 0 1.298-1.052 2.35-2.349 2.35zm7.718 0c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.35 1.052 2.35 2.349 0 1.298-1.053 2.35-2.35 2.35z" />
                    </svg>
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="max-w-4xl flex-1 min-w-0">
            <header className="mb-8">
              {/* Category and Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Skeleton width={100} height={24} />
                <Skeleton width={80} height={24} />
              </div>

              {/* Title */}
              <Skeleton height={48} width="90%" className="mb-2" />
              <Skeleton height={48} width="80%" className="mb-6" />

              {/* Summary */}
              <Skeleton height={24} count={2} className="mb-8" />

              {/* Article Meta */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Skeleton circle width={40} height={40} />
                  <div>
                    <Skeleton width={120} height={20} className="mb-1" />
                    <Skeleton width={80} height={16} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={120} height={20} />
                  <Skeleton width={80} height={20} />
                </div>
              </div>

              <hr className="mb-8" />
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <Skeleton height={400} className="w-full rounded-lg" />
            </div>

            {/* Article Content */}
            {[1, 2, 3].map((section) => (
              <section key={section} className="mb-8">
                <Skeleton height={32} width="70%" className="mb-4" />
                <Skeleton height={20} count={4} className="mb-4" />
                <Skeleton height={300} className="mb-4" />
                <Skeleton height={20} count={3} className="mb-4" />
              </section>
            ))}
          </article>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* 2025 Placement Data Section */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200 p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-md text-gray-800 mb-2">
                    Placement Data
                  </h3>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    2025
                  </span>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/iit-varanasi#placements",
                        "_blank"
                      )
                    }
                  >
                    IIT BHU
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/nit-allahabad#placements",
                        "_blank"
                      )
                    }
                  >
                    NIT Allahabad
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/nit-jamshedpur#placements",
                        "_blank"
                      )
                    }
                  >
                    NIT Jamshedpur
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/nit-jaipur#placements",
                        "_blank"
                      )
                    }
                  >
                    NIT Jaipur
                  </Button>
                </div>
              </div>

              {/* Cutoff Section */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border border-orange-200 p-6 shadow-sm">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Exam Cutoffs
                    </h3>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      2025
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/cutoff?examType=JEE-Advanced",
                        "_blank"
                      )
                    }
                  >
                    JEE Advanced
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/cutoff?examType=JEE-Main",
                        "_blank"
                      )
                    }
                  >
                    JEE Main
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/cutoff?examType=NEET-UG",
                        "_blank"
                      )
                    }
                  >
                    NEET UG
                  </Button>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Have questions about colleges or admissions? Our experts are
                  here to help.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-gray-700 border border-gray-200 hover:bg-gray-50"
                    onClick={() => window.open("/help-center", "_self")}
                  >
                    Help Center
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-gray-700 border border-gray-200 hover:bg-gray-50"
                    onClick={() => window.open("/aboutus", "_self")}
                  >
                    About Us
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
