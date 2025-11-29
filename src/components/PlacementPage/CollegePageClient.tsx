"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CollegeHeader from "@/components/PlacementPage/HeroSection";
import InfoBar from "@/components/PlacementPage/InfoBar";
import Overview from "@/components/PlacementPage/overviewSection";
import { Address } from "@/components/PlacementPage/addressSection";
import { CampusFacilities } from "@/components/PlacementPage/campusFacilities";
import { Rankings } from "@/components/PlacementPage/ranking";
import { Admission } from "@/components/PlacementPage/Admission";
import { Courses } from "@/components/PlacementPage/Courses";
import { Cutoffs } from "@/components/PlacementPage/Cutoffs";
import { FeeStructure } from "@/components/PlacementPage/FeeStructure";
import type { FeeType, WaiverType } from "@/types/feeStructure";
import { PlacementPage } from "@/components/PlacementPage/placementStatics";
import { Footer } from "@/components/common/footer";
import type { Ranking } from "@/types/ranking";
import { apiService } from "@/ApiService/apiService";
import ScrollToTop from "@/components/ScrollToTop";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
import { Button } from "../ui/button";
import NotFound from "../common/collegeNotFound";

interface Props {
  slug: string;
}

/** keep a clean typed model for the actual college data we expect to use */
export type CollegeData = {
  name: string;
  bio?: string;
  fees?: number;
  avgSalary?: number;
  nirf?: number;
  highestPackage?: number;
  placementRate?: number;
  image_url?: string;
  address?: string;
  examType?: string | string[]; // Support both string and array of strings
  availablePlacementReports?: number[]; // Array of years for which placement data is available
  campusFacilities?: {
    name: string;
    available: boolean;
    description?: string;
    iconUrl?: string;
  }[];
  coursesOffered?: {
    programs: {
      programType: string;
      courses: string[];
    }[];
  };
  instituteFeeStructure?: FeeType[];
  hostelFeeStructure?: FeeType[];
  waiver?: WaiverType[];
  rankings?: Ranking[];
  admissionCriteria?: {
    criteriaList: { point: string }[];
    forMoreDetails?: string;
    detailsUrl?: string;
  };
  slug?: string;
  [key: string]: unknown;
};

type CollegeResponse = {
  statusCode: number;
  data: CollegeData;
  message: string;
  success: boolean;
  errors?: unknown;
};

/**
 * small reusable hook to fetch college data with cancellation support
 */
function useCollege(slug: string | undefined) {
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCollege(null);
      setLoading(false);
      setError("No college specified.");
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await apiService.get<CollegeResponse>(`/college/${slug}`, {
          signal,
        } as unknown as Record<string, unknown>); // some axios setups accept AbortSignal differently; cast if needed

        if (signal.aborted) return;

        if (res?.data?.data) {
          setCollege(res.data.data as CollegeData);
          setError(null);
        } else if (res?.data) {
          // fallback if API shape differs
          setCollege(res.data as unknown as CollegeData);
        } else {
          setCollege(null);
          setError("College not found.");
        }
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          ("name" in err || "message" in err)
        ) {
          const errorObj = err as {
            name?: string;
            message?: string;
            response?: { data?: { message?: string } };
          };
          if (
            errorObj.name === "CanceledError" ||
            errorObj.message === "canceled"
          ) {
            // request was cancelled — ignore
            return;
          }
          setError(
            errorObj.response?.data?.message ||
              errorObj.message ||
              "Error fetching college."
          );
        } else {
          setError("Error fetching college.");
        }
        setCollege(null);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [slug]);

  return { college, loading, error };
}

const CollegePageClient: React.FC<Props> = ({ slug }) => {
  const { college, loading, error } = useCollege(slug);

  // memoize header payload so children don't re-render unnecessarily
  const collegeHeaderData = useMemo(
    () => ({
      name: college?.name ?? "Unnamed Institute",
      bio: college?.bio ?? "",
      fees: college?.fees ?? 0,
      avgSalary: college?.avgSalary ?? 0,
      nirf: college?.nirf ?? 0,
      highestPackage: college?.highestPackage ?? 0,
      placementRate: college?.placementRate ?? 0,
      image_url: college?.image_url ?? "",
    }),
    [college]
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CollegeHeroSkeleton />
      </div>
    );

  if (error || !college)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">
          {/* {error ?? "College not found"} */}
          <NotFound />
        </h1>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      <ScrollToTop />
      <CollegeHeader college={collegeHeaderData} />
      <InfoBar />

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop layout with main content and sidebar */}
        <div className="flex flex-col xl:flex-row xl:space-x-16">
          {/* Main content area */}
          <div className="flex-1 space-y-8 max-w-6xl">
            <section id="overview">
              <Overview college={college} />
            </section>

            <section id="address">
              <Address college={college} />
            </section>

            <section id="cutoff">
              <Cutoffs
                college={slug}
                examTypes={
                  Array.isArray(college.examType)
                    ? college.examType
                    : college.examType
                    ? [college.examType]
                    : []
                }
              />
            </section>

            <section id="ranking">
              <Rankings rankings={college.rankings} />
            </section>

            <section id="facilities">
              <CampusFacilities college={college} />
            </section>

            <section id="admission">
              <Admission
                college={{ admissionCriteria: college.admissionCriteria }}
              />
            </section>

            <section id="courses">
              <Courses courses={{ coursesOffered: college.coursesOffered }} />
            </section>

            <section id="fees">
              <FeeStructure
                college={{
                  instituteFeeStructure: college.instituteFeeStructure,
                  hostelFeeStructure: college.hostelFeeStructure,
                  waiver: college.waiver,
                }}
              />
            </section>
          </div>

          {/* Sidebar for desktop */}
          <aside className="hidden xl:block w-[250px] flex-shrink-0">
            <div className=" top-24 space-y-4">
              {/* 2025 Placement Data Section */}
              <div className="mt-10 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200 p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-md text-gray-800 mb-2">
                    Placement Data
                  </h3>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    2025
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/iit-varanasi#placements",
                        "_blank"
                      )
                    }
                  >
                    IIT BHU
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/nit-allahabad#placements",
                        "_blank"
                      )
                    }
                  >
                    NIT Allahabad
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/nit-jamshedpur#placements",
                        "_blank"
                      )
                    }
                  >
                    NIT Jamshedpur
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/college/nit-jaipur#placements",
                        "_blank"
                      )
                    }
                  >
                    NIT Jaipur
                  </button>
                </div>
              </div>

              {/* Cutoff Section */}
              <div className="mt-10 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border border-orange-200 p-4 shadow-sm">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Exam Cutoffs
                    </h3>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      2025
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/cutoff?examType=JEE-Advanced",
                        "_blank"
                      )
                    }
                  >
                    JEE Advanced
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/cutoff?examType=JEE-Main",
                        "_blank"
                      )
                    }
                  >
                    JEE Main
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm rounded-md transition-all"
                    onClick={() =>
                      window.open(
                        "https://pncsquare.in/cutoff?examType=NEET-UG",
                        "_blank"
                      )
                    }
                  >
                    NEET UG
                  </button>
                </div>
              </div>
            </div>

            {/* Exam Links Section */}
            <div className="mt-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Popular Exams
                </h3>
              </div>

              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                  onClick={() => window.open("/exam?exam=jee-main", "_self")}
                >
                  JEE Main
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                  onClick={() =>
                    window.open("/exam?exam=jee-advanced", "_self")
                  }
                >
                  JEE Advanced
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                  onClick={() => window.open("/exam?exam=neet-ug", "_self")}
                >
                  NEET UG
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                  onClick={() => window.open("/exam?exam=gate", "_self")}
                >
                  GATE
                </Button>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="mt-10 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-blue-600 border border-blue-200 hover:bg-blue-50"
                  onClick={() => window.open("https://facebook.com", "_blank")}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-blue-400 border border-blue-200 hover:bg-blue-50"
                  onClick={() =>
                    window.open("https://x.com/pncsquare", "_blank")
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-blue-700 border border-blue-200 hover:bg-blue-50"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/pncsquare/",
                      "_blank"
                    )
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-pink-600 border border-pink-200 hover:bg-pink-50"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349 0 1.298-1.052 2.35-2.349 2.35zm7.718 0c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.35 1.052 2.35 2.349 0 1.298-1.053 2.35-2.35 2.35z" />
                  </svg>
                  Instagram
                </Button>
              </div>
            </div>

            {/* Quick Navigation Section */}
            <div className="mt-10 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                  onClick={() => window.open("/colleges", "_self")}
                >
                  Colleges
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                  onClick={() => window.open("/courses", "_self")}
                >
                  Courses
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                  onClick={() => window.open("/exam", "_self")}
                >
                  Exams
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                  onClick={() => window.open("/cutoff", "_self")}
                >
                  Cutoffs
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                  onClick={() => window.open("/review", "_self")}
                >
                  Reviews
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                  onClick={() => window.open("/placements", "_self")}
                >
                  Placements
                </Button>
              </div>
            </div>

            {/* Featured Colleges */}
            <div className="mt-10 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-lg border border-teal-200 p-6 px-3 shadow-sm">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Top Colleges
                </h3>
              </div>
              <div className="space-y-3">
                {/* IIT Bombay */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-bombay",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/Screenshot%202025-10-19%20at%2010.59.05%E2%80%AFAM.png"
                    alt="IIT Bombay Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Bombay</h4>
                    <p className="text-xs text-gray-500">Mumbai, Maharashtra</p>
                  </div>
                </div>

                {/* IIT Delhi */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-delhi",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/logo-iit-delhi.png"
                    alt="IIT Delhi Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Delhi</h4>
                    <p className="text-xs text-gray-500">New Delhi</p>
                  </div>
                </div>

                {/* IIT Madras */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-madras",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/iit-madras.png"
                    alt="IIT Madras Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Madras</h4>
                    <p className="text-xs text-gray-500">Chennai, Tamil Nadu</p>
                  </div>
                </div>

                {/* IIT Kanpur */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-kanpur",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/iitkanpur.png"
                    alt="IIT Kanpur Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Kanpur</h4>
                    <p className="text-xs text-gray-500">
                      Kanpur, Uttar Pradesh
                    </p>
                  </div>
                </div>

                {/* IIT Kharagpur */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-kharagpur",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/240px-IIT_Kharagpur_Logo.svg.png"
                    alt="IIT Kharagpur Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Kharagpur</h4>
                    <p className="text-xs text-gray-500">
                      Kharagpur, West Bengal
                    </p>
                  </div>
                </div>

                {/* IIT Roorkee */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-roorkee",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/logo-roorke.png"
                    alt="IIT Roorkee Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Roorkee</h4>
                    <p className="text-xs text-gray-500">
                      Roorkee, Uttarakhand
                    </p>
                  </div>
                </div>

                {/* IIT Guwahati */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-guwahati",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/logo-iit-guhwati.png"
                    alt="IIT Guwahati Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Guwahati</h4>
                    <p className="text-xs text-gray-500">Guwahati, Assam</p>
                  </div>
                </div>

                {/* IIT Hyderabad */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-hyderabad",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/logo-hyderbad.png"
                    alt="IIT Hyderabad Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Hyderabad</h4>
                    <p className="text-xs text-gray-500">
                      Hyderabad, Telangana
                    </p>
                  </div>
                </div>

                {/* IIT BHU */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-varanasi",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/Screenshot%202025-10-19%20at%2011.37.44%E2%80%AFAM.png"
                    alt="IIT BHU Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT BHU</h4>
                    <p className="text-xs text-gray-500">
                      Varanasi, Uttar Pradesh
                    </p>
                  </div>
                </div>

                {/* IIT Indore */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/iit-indore",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/college-profiles/indore.png"
                    alt="IIT Indore Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">IIT Indore</h4>
                    <p className="text-xs text-gray-500">
                      Indore, Madhya Pradesh
                    </p>
                  </div>
                </div>
                {/* NIT Trichy */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-trichy",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/nit-trichy.png"
                    alt="NIT Trichy Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">NIT Trichy</h4>
                    <p className="text-xs text-gray-500">
                      Tiruchirappalli, Tamil Nadu
                    </p>
                  </div>
                </div>

                {/* NIT Surathkal */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-surathkal",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_23_NIT-SURATHKAL-LOGO.png?updatedAt=1760938202237"
                    alt="NIT Surathkal Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">NIT Surathkal</h4>
                    <p className="text-xs text-gray-500">
                      Mangalore, Karnataka
                    </p>
                  </div>
                </div>

                {/* NIT Warangal */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-warangal",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_57_NIT-Warangal-Logo.png?updatedAt=1760938201626"
                    alt="NIT Warangal Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">NIT Warangal</h4>
                    <p className="text-xs text-gray-500">Warangal, Telangana</p>
                  </div>
                </div>

                {/* NIT Calicut */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-calicut",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_13_NIT-Calicut-Logo.png?updatedAt=1760938201349"
                    alt="NIT Calicut Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">NIT Calicut</h4>
                    <p className="text-xs text-gray-500">Kozhikode, Kerala</p>
                  </div>
                </div>

                {/* NIT Rourkela */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-rourkela",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_47_NIT-ROURKELA-LOGO.jpg?updatedAt=1760938200852"
                    alt="NIT Rourkela Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">NIT Rourkela</h4>
                    <p className="text-xs text-gray-500">Rourkela, Odisha</p>
                  </div>
                </div>

                {/* MNNIT Allahabad */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/mnnit-allahabad",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_9_MNNIT-Allahabad-Logo.png?updatedAt=1760938202287"
                    alt="MNNIT Allahabad Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      MNNIT Allahabad
                    </h4>
                    <p className="text-xs text-gray-500">
                      Prayagraj, Uttar Pradesh
                    </p>
                  </div>
                </div>

                {/* NIT Kurukshetra */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-kurukshetra",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_41_NIT-Kurukshetra-Logo.png?updatedAt=1760938202053"
                    alt="NIT Kurukshetra Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      NIT Kurukshetra
                    </h4>
                    <p className="text-xs text-gray-500">
                      Kurukshetra, Haryana
                    </p>
                  </div>
                </div>

                {/* NIT Durgapur */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/nit-durgapur",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_17_NIT-Durgapur-Logo.png?updatedAt=1760938201933"
                    alt="NIT Durgapur Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">NIT Durgapur</h4>
                    <p className="text-xs text-gray-500">
                      Durgapur, West Bengal
                    </p>
                  </div>
                </div>

                {/* VNIT Nagpur */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/vnit-nagpur",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_61_VNIT-Nagpur-Logo.png?updatedAt=1760938201604"
                    alt="VNIT Nagpur Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">VNIT Nagpur</h4>
                    <p className="text-xs text-gray-500">Nagpur, Maharashtra</p>
                  </div>
                </div>

                {/* MNIT Jaipur */}
                <div
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-teal-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://pncsquare.in/college/mnit-jaipur",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src="https://ik.imagekit.io/ak2ol9uti/logo/imgi_5_MNIT-Jaipur-Logo.png?updatedAt=1760938202220"
                    alt="MNIT Jaipur Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">MNIT Jaipur</h4>
                    <p className="text-xs text-gray-500">Jaipur, Rajasthan</p>
                  </div>
                </div>
                {/* See All Button */}
                <button
                  className="w-full mt-2 px-4 py-2 text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-all text-sm font-medium"
                  onClick={() => window.open("/colleges", "_self")}
                >
                  See All Colleges →
                </button>
              </div>
            </div>
            {/* Need Help Section */}
            <div className="mt-10 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Have questions about colleges or admissions? Our experts are
                here to help.
              </p>
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-md transition-all text-sm"
                  onClick={() => window.open("/help-center", "_self")}
                >
                  Help Center
                </button>
                <button
                  className="w-full px-4 py-2 text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-md transition-all text-sm"
                  onClick={() => window.open("/aboutus", "_self")}
                >
                  About Us
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Placement section - Full width and centered */}
        {college.availablePlacementReports &&
          college.availablePlacementReports.length > 0 && (
            <div className="mt-16 max-w-6xl mx-auto">
              <section id="placements">
                <PlacementPage college={college} />
              </section>
            </div>
          )}
      </main>

      <Footer />
    </div>
  );
};

export default CollegePageClient;
