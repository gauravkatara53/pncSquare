// app/college/[slug]/page.tsx
"use client";

import { use } from "react";
import React, { useEffect, useState } from "react";
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface CollegeResponse {
  statusCode: number;
  data: {
    name: string;
    bio?: string;
    fees: number;
    avgSalary: number;
    nirf: number;
    highestPackage: number;
    placementRate: number;
    image_url: string;
    address: string;
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
    slug: string;
    [key: string]: unknown;
  };
  message: string;
  success: boolean;
  errors: unknown;
}

export default function CollegePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [college, setCollege] = useState<CollegeResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    apiService
      .get<CollegeResponse>(`/college/${slug}`)
      .then((response) => {
        if (response && response.data) {
          setCollege(response.data);
        } else {
          setError("College not found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching college:", err);
        setError("Error fetching college.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading college...</p>
      </div>
    );

  if (error || !college)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">
          {error || "College not found"}
        </h1>
      </div>
    );

  // Header props
  const collegeHeaderData = {
    name: college.name,
    bio: college.bio,
    fees: college.fees,
    avgSalary: college.avgSalary,
    nirf: college.nirf,
    highestPackage: college.highestPackage,
    placementRate: college.placementRate,
    image_url: college.image_url,
  };

  return (
    <div className="bg-white">
      <ScrollToTop />
      <CollegeHeader college={collegeHeaderData} />

      <InfoBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <section id="overview">
          <Overview college={college} />
        </section>
        <section id="address">
          <Address college={college} />
        </section>
        <section id="cutoff">
          <Cutoffs college={college.slug} />
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
        <section id="placements">
          <PlacementPage college={college} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
