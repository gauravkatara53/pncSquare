"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import imageKitLoader from "@/lib/imageKitLoader";
import { features, type Feature } from "@/Data/features";

function KeyFeatures() {
  // Memoize to prevent re-render
  const memoizedFeatures = useMemo(() => features, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Everything you need to know about colleges, courses, exams, and
          cutoffs — all in one place.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {memoizedFeatures.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(KeyFeatures);

const FeatureCard = memo(function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <Link
      href={feature.route}
      aria-label={`Learn more about ${feature.title}`}
      className="group"
    >
      <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 transform-gpu">
        {/* Gradient Border */}
        <span
          className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${feature.color} p-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700`}
        >
          <span className="block h-full w-full rounded-2xl bg-white"></span>
        </span>

        {/* Image */}
        <div className="relative h-40 w-full">
          <Image
            loader={imageKitLoader}
            src={feature.image}
            alt={feature.title}
            fill
            priority={index === 0}
            quality={10}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6 pt-2 text-center relative z-10">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mx-auto -mt-10 shadow-md`}
          >
            <feature.icon size={28} aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </Link>
  );
});
