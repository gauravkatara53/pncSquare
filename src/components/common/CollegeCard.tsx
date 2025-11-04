"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import imageKitLoader from "@/lib/imageKitLoader";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

// ✅ Lazy-load lucide icons to reduce bundle size
const Star = dynamic(() => import("lucide-react").then((mod) => mod.Star));
const MapPin = dynamic(() => import("lucide-react").then((mod) => mod.MapPin));
const Users = dynamic(() => import("lucide-react").then((mod) => mod.Users));
const DollarSign = dynamic(() =>
  import("lucide-react").then((mod) => mod.DollarSign)
);
const TrendingUp = dynamic(() =>
  import("lucide-react").then((mod) => mod.TrendingUp)
);

interface CollegeCardProps {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  type: string;
  fees: string;
  placement: string;
  cutoff: string;
  rank?: string;
}

/**
 * ✅ Optimized, memoized, and ImageKit-powered CollegeCard
 * - Identical UI
 * - Faster rendering (memoized)
 * - ImageKit CDN optimization
 * - Lazy-loaded icons for reduced bundle size
 */
function CollegeCard({
  name,
  location,
  rating,
  reviews,
  image,
  type,
  fees,
  placement,
  cutoff,
  rank,
}: CollegeCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transform-gpu">
      {/* Cover Image */}
      <div className="relative h-56">
        <Image
          loader={imageKitLoader}
          src={image}
          alt={name}
          fill
          priority={false}
          quality={10}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {rank && (
          <Badge className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 shadow-md">
            #{rank} Rank
          </Badge>
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-gray-600">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name + Location */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 mb-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
          <Badge
            variant="secondary"
            className="text-xs rounded-full px-3 py-0.5"
          >
            {type}
          </Badge>
        </div>

        {/* Stats */}
        <div className="space-y-3 divide-y divide-gray-100">
          <div className="flex items-center justify-between text-sm pb-2">
            <div className="flex items-center gap-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>Fees</span>
            </div>
            <span className="font-medium text-gray-900">{fees}</span>
          </div>

          <div className="flex items-center justify-between text-sm py-2">
            <div className="flex items-center gap-1 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Avg Package</span>
            </div>
            <span className="font-medium text-green-600">{placement}</span>
          </div>

          <div className="flex items-center justify-between text-sm pt-2">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span>Cutoff</span>
            </div>
            <span className="font-medium text-blue-600">{cutoff}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(CollegeCard);
