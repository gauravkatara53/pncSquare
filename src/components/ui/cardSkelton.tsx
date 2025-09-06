"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4"
        >
          {/* Image skeleton */}
          <Skeleton height={160} className="rounded-xl" />

          {/* Title skeleton */}
          <Skeleton width={`80%`} height={24} />

          {/* Subtitle skeleton */}
          <Skeleton width={`60%`} height={18} />

          {/* Button skeleton */}
          <Skeleton width={`40%`} height={36} className="rounded-lg" />
        </div>
      ))}
    </div>
  );
}
