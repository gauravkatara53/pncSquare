"use client";

import Image from "next/image";
import Link from "next/link";
import { features, type Feature } from "@/Data/features";

export default function KeyFeatures() {
  return (
    <section className="relative py-20 bg-gradient-to-b">
      <div className="max-w-7xl mx-auto px-2 lg:px-12 text-center">
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
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Link href={feature.route}>
      <div
        className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300`}
      >
        {/* Border */}
        <span
          className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${feature.color} p-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700`}
        >
          <span
            className="block h-full w-full rounded-2xl bg-white
            [mask-composite:exclude] [mask-image:linear-gradient(0deg,black,transparent)]"
          ></span>
        </span>

        {/* Top Image */}
        <div className="relative h-40 w-full z-10">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 pt-2 text-center relative z-10">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mx-auto -mt-10 shadow-sm`}
          >
            <feature.icon size={28} />
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
}
