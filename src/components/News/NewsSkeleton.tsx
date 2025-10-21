"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card } from "../ui/card";
import { TrendingUp } from "lucide-react";

export default function NewsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-slate-50 to-orange-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Static Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Latest College & Exam News
            </h1>
            {/* Static Subtitle */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments in higher education,
              admissions, placements, and examination updates
            </p>
          </div>

          {/* Trending News Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h2 className="font-semibold text-md text-gray-900">
                  Trending Now
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card
                  key={i}
                  className="border border-slate-200 p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="relative overflow-hidden rounded-lg flex-shrink-0 bg-gray-100"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"
                        style={{
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-50 rounded-full px-2 py-1">
                          <Skeleton width={60} height={16} />
                        </div>
                      </div>
                      <Skeleton height={20} width="90%" className="mb-2" />
                      <Skeleton height={20} width="80%" className="mb-3" />
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <Skeleton width={50} height={16} />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <Skeleton width={40} height={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add shimmer animation */}
            <style jsx>{`
              @keyframes shimmer {
                0% {
                  background-position: 200% 0;
                }
                100% {
                  background-position: -200% 0;
                }
              }
              .animate-shimmer {
                animation: shimmer 1.5s infinite linear;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Main News Grid Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border border-slate-200">
              <div>
                {/* Image Skeleton */}
                <div className="aspect-video w-full">
                  <Skeleton height="100%" />
                </div>
                <div className="p-6">
                  {/* Category & Badge Skeleton */}
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton width={60} height={20} />
                    <Skeleton width={70} height={20} />
                  </div>
                  {/* Title Skeleton */}
                  <Skeleton height={24} width="90%" className="mb-3" />
                  <Skeleton height={24} width="80%" className="mb-3" />
                  {/* Summary Skeleton */}
                  <Skeleton height={16} count={3} className="mb-4" />
                  {/* Meta Info Skeleton */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton width={80} height={16} />
                      <Skeleton width={60} height={16} />
                    </div>
                    <Skeleton width={90} height={16} />
                  </div>
                  {/* Button Skeleton */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Skeleton height={36} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
