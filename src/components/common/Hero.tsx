"use client";

import Image from "next/image";
import { Search, MapPin, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Typewriter } from "react-simple-typewriter";
const images = [
  "https://pbs.twimg.com/media/ElO-XOfU0AEeZi6?format=jpg&name=4096x4096",
  "https://image-static.collegedunia.com/public/asset/img/homepage/banner/MIT1747200012.webp",
  "https://image-static.collegedunia.com/public/asset/img/homepage/banner/LPU,1747200012.webp",
];
export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-[400px] flex items-center justify-center 
      bg-gradient-to-br from-slate-900/10 via-blue-900/60 to-indigo-900/70 
      mx-0 sm:-mx-0 lg:mx-[0rem] rounded-b-3xl overflow-hidden"
      aria-label="Find the best college hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 flex">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              x: `${(i - index) * 100}%`, // move images side-by-side
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={img}
              alt="College life"
              fill
              priority={i === 0} // load first immediately
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
          </motion.div>
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-center">
            <span className="text-white">Find</span>{" "}
            <span className="text-yellow-400">
              <Typewriter
                words={["2500+ Colleges", "250+ Courses", "110+ Exams"]}
                loop={true}
                cursor
                cursorStyle=""
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>{" "}
            <span className="text-white">in India</span>
          </h1>
          {/* <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore placements, cutoffs, reviews, and more from
            <span className="text-yellow-400 font-semibold">
              {" "}
              40,000+ colleges
            </span>{" "}
            across India
          </p> */}

          {/* Search Form */}
          <form
            className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg"
            onSubmit={(e) => e.preventDefault()}
            aria-label="College search form"
          >
            {/* Desktop Form: show on md+ */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4 mb-0">
              {/* State Select */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-5 h-5" />
                <Select>
                  <SelectTrigger className="pl-10 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-yellow-400">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Select */}
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-5 h-5" />
                <Select>
                  <SelectTrigger className="pl-10 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-yellow-400">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="law">Law</SelectItem>
                    <SelectItem value="arts">Arts & Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Select */}
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select>
                  <SelectTrigger className="pl-10 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-yellow-400">
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="jee">JEE Main</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="cat">CAT</SelectItem>
                    <SelectItem value="gate">GATE</SelectItem>
                    <SelectItem value="clat">CLAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold transition-all duration-200 shadow-md flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Colleges
              </Button>
            </div>

            {/* Mobile Form: show only search bar */}
            <div className="md:hidden flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search colleges..."
                  className="w-full pr-12 pl-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  aria-label="Search Colleges"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-2 rounded-xl"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Stats Section */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: "40,000+", label: "Colleges Listed" },
              { number: "5L+", label: "Student Reviews" },
              { number: "1000+", label: "Courses" },
              { number: "150+", label: "Entrance Exams" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
