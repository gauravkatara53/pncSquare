"use client";

import Image from "next/image";
import { GraduationCap, BookOpen, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  image: string;
  route: string;
};

const features = [
  {
    title: "Colleges",
    route: "/colleges",
    description:
      "Explore top colleges with detailed  rankings, and placements.",
    icon: GraduationCap,
    color: "from-indigo-500 to-purple-500",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4WVQBWuCpD4qOTs7hkpxXichM73aJLq1J4A&s",
  },
  {
    title: "Courses",
    route: "/courses",
    description: "Find the right courses with  career scope.",
    icon: BookOpen,
    color: "from-pink-500 to-rose-500",
    image:
      "https://as2.ftcdn.net/jpg/01/95/96/13/1000_F_195961367_NNLBno8lv2hkt73tX4IRqo3P0u7EloUy.jpg",
  },
  {
    title: "Exams",
    route: "/exam",
    description:
      "Stay updated with exam dates, patterns, and preparation tips.",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    image:
      "https://static.vecteezy.com/system/resources/previews/002/184/109/non_2x/students-write-a-test-exam-in-a-beautiful-classroom-vector.jpg",
  },
  {
    title: "Cutoffs",
    route: "/cutoff",
    description: "Check cutoff trends across colleges and plan smartly.",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    image:
      "https://thumbs.dreamstime.com/b/student-climbing-stack-books-reaching-open-book-displayed-computer-screen-symbolizing-journey-online-education-362480772.jpg",
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative py-20 bg-gradient-to-b">
      <div className="max-w-7xl mx-auto px-2 lg:px-12 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // Only animate once
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Key Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }} // Only animate once
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Everything you need to know about colleges, courses, exams, and
          cutoffs — all in one place.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <AnimatedFeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedFeatureCard({
  feature,
  idx,
}: {
  feature: Feature;
  idx: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true }); // detect only first time
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: idx * 0.2 },
      });
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, controls, idx]);

  return (
    <Link href={feature.route}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* Animated border */}
        <span
          className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${feature.color} p-[2px] 
        opacity-0 group-hover:opacity-100 transition-all duration-700`}
        >
          <span
            className="block h-full w-full rounded-2xl bg-white
          [mask-composite:exclude] [mask-image:linear-gradient(0deg,black,transparent)] 
          animate-draw-border"
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
      </motion.div>
    </Link>
  );
}
