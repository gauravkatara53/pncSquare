import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Booting AI engine...",
  "Loading 2M+ cutoff records...",
  "Firing up ranking algorithms...",
  "Scanning admission patterns...",
  "Matching your rank profile...",
  "Factoring quota & preferences...",
  "Running ML predictions...",
  "Crunching data points...",
  "Fine-tuning accuracy...",
  "Almost there...",
];

export default function GenZAILoader({
  simulateLoadingMs = 7000,
}: {
  simulateLoadingMs?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = LINES.length;
    const step = Math.max(500, Math.floor(simulateLoadingMs / total));

    setCurrentIndex(0);
    setProgress(0);

    let index = 0;
    const timer = setInterval(() => {
      if (index < total) {
        setCurrentIndex(index);
        setProgress(Math.min(95, Math.floor(((index + 1) / total) * 95)));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setProgress(100), 300);
      }
    }, step);

    return () => clearInterval(timer);
  }, [simulateLoadingMs]);

  const textVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  // Calculate circle properties for smooth animation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <div className="w-full flex items-center justify-center bg-white text-gray-800 p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-2xl p-4 sm:p-8 bg-white">
        <div className="flex flex-col items-center text-center">
          {/* Top rotating circle with smooth progress */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="6"
              />
              {/* Animated progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeDashoffset }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-xs sm:text-sm">
              {progress}%
            </div>
          </div>

          <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            College Predictor
          </div>
          <div className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Powered by AI Model Pncsquare
          </div>

          {/* Animated line that slides in/out - FIXED */}
          <div className="relative w-full h-10 overflow-hidden flex items-center justify-center mb-4 sm:mb-6 px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="font-mono text-sm sm:text-base text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
              >
                {LINES[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom progress bar */}
          <div className="mt-4 sm:mt-6 w-full">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2 text-right">
              Processing {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
