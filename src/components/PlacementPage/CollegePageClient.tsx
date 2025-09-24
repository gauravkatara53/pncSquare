"use client";

import React, { useEffect, useMemo, useState } from "react";
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
          {error ?? "College not found"}
        </h1>
      </div>
    );

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
          <Cutoffs college={college.slug ?? ""} />
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
};

export default CollegePageClient;
