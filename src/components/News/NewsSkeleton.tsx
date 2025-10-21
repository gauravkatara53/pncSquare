"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card } from "../ui/card";

export default function NewsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-slate-50 to-orange-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Title Skeleton */}
            <div className="mb-4">
              <Skeleton height={48} width="60%" className="mx-auto" />
            </div>
            {/* Subtitle Skeleton */}
            <div className="hidden sm:block">
              <Skeleton height={24} width="70%" className="mx-auto" />
            </div>
          </div>

          {/* Trending News Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton width={100} height={24} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="border border-slate-200 p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton
                      width={80}
                      height={80}
                      className="rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Skeleton height={20} width="90%" className="mb-2" />
                      <Skeleton height={20} width="70%" className="mb-3" />
                      <div className="flex items-center gap-3">
                        <Skeleton width={80} height={16} />
                        <Skeleton width={60} height={16} />
                        <Skeleton width={70} height={16} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
