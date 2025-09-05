"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTop from "../ScrollToTop";

export default function CollegeHeroSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-8 bg-gray-100 rounded-2xl p-6 md:p-12">
      {/* Left column (text) */}
      <ScrollToTop />
      <div className="flex-1 flex flex-col gap-4 justify-center">
        {/* Badge skeleton */}
        <Skeleton
          height={28}
          width={100}
          borderRadius={16}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        {/* Title skeleton */}
        <Skeleton
          height={56}
          width="80%"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <Skeleton
          height={56}
          width="60%"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <Skeleton
          height={48}
          width="40%"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />

        {/* Subtitle skeleton */}
        <Skeleton
          height={22}
          width="70%"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
          style={{ marginTop: 16 }}
        />
        {/* Short description skeleton */}
        <Skeleton
          height={18}
          width="65%"
          count={2}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />

        {/* Statistic small cards skeleton */}
        <div className="flex flex-row gap-4 mt-6 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton
                circle
                height={40}
                width={40}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={18}
                width={60}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
                style={{ marginTop: 8 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right column (card with image & stats) */}
      <div className="flex flex-col items-center bg-gray-200 rounded-xl p-6 w-full md:w-[380px]">
        <Skeleton
          height={200}
          className="w-full"
          borderRadius={16}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <div className="flex flex-row gap-6 mt-4 w-full justify-around">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton
                height={28}
                width={80}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={16}
                width={76}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
                style={{ marginTop: 6 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
