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

// Types
interface CollegeHeaderType {
  name: string;
  bio?: string;
  fees: number;
  avgSalary: number;
  nirf: number;
  highestPackage: number;
  placementRate: number;
  image_url: string;
}

interface FacilityType {
  name: string;
  available: boolean;
  description?: string;
  iconUrl?: string;
}

interface CollegeResponse {
  data: CollegeHeaderType & {
    address: string;
    campusFacilities?: FacilityType[];
    coursesOffered?: {
      programs: {
        programType: string;
        courses: string[];
      }[];
    };
    feeStructure?: FeeType[];
    waiver?: WaiverType[];
    rankings?: Ranking[];
    admissionCriteria?: {
      criteriaList: { point: string }[];
      forMoreDetails?: string;
      detailsUrl?: string;
    };
    slug: string;
    instituteFeeStructure?: FeeType[];
    hostelFeeStructure?: FeeType[];
    [key: string]: unknown;
  };
}

export default function CollegePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [college, setCollege] = useState<CollegeResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchCollege() {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.get<CollegeResponse>(
          `/college/${slug}`
        );

        if (response?.data) {
          setCollege(response.data);
        } else {
          setError("College data is invalid.");
        }
      } catch (err) {
        console.error("Error fetching college:", err);
        setError("Error fetching college data.");
      } finally {
        setLoading(false);
      }
    }

    fetchCollege();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading college details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
        </div>
      </div>
    );

  if (!college)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            College Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The college you&#39;re looking for doesn&#39;t exist.
          </p>
        </div>
      </div>
    );

  const collegeHeaderData: CollegeHeaderType = {
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
      <>
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
              college={{
                admissionCriteria: college.admissionCriteria,
              }}
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
      </>
    </div>
  );
}
