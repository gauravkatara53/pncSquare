import React from "react";

export default function CollegePredictorResultSkeleton() {
  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      {/* Header Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border-b border-gray-200 animate-pulse">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:pt-10">
          <div className="h-8 bg-gray-300/30 rounded w-2/3 mb-4" />
          <div className="h-5 bg-gray-300/20 rounded w-1/2" />
        </div>
      </div>

      {/* Summary Bar Skeleton */}
      <div className="bg-white border-b border-gray-200 animate-pulse">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="h-5 bg-gray-300/20 rounded w-1/3" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-[1400px] mx-auto px-2 md:px-6 py-4 md:py-8">
        <div className="flex gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 animate-pulse">
              <div className="h-6 bg-gray-300/30 rounded w-2/3 mb-4" />
              <div className="h-4 bg-gray-300/20 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-300/10 rounded w-1/3 mb-2" />
              <div className="h-4 bg-gray-300/10 rounded w-1/4 mb-2" />
            </div>
          </div>

          {/* Results Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse"
                >
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="h-6 bg-gray-300/30 rounded w-2/3" />
                    <div className="h-4 bg-gray-300/20 rounded w-1/2" />
                  </div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-4 bg-gray-300/10 rounded w-1/4" />
                    <div className="h-4 bg-gray-300/10 rounded w-1/4" />
                  </div>
                  <div className="h-4 bg-gray-300/10 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-300/10 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-300/10 rounded w-1/4" />
                </div>
              ))}
            </div>
            {/* Pagination Skeleton */}
            <div className="flex flex-col items-center gap-4 mt-6 animate-pulse">
              <div className="h-10 bg-gray-300/20 rounded w-1/2" />
              <div className="h-4 bg-gray-300/10 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
