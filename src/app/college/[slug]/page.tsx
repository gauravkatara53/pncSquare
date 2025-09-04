// app/college/[slug]/page.tsx
import React from "react";
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
  params: {
    slug: string;
  };
}

export default function CollegePage({ params }: PageProps) {
  const { slug } = params;

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
      [key: string]: unknown;
    };
  }

  // ❌ Can't use await in non-async function
  // ✅ Use React.use instead (Next.js server component)
  const collegeResponse = React.use(
    apiService.get<CollegeResponse>(`/college/${slug}`)
  );

  const college = collegeResponse.data;

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

  const rankings = college.rankings as Ranking[] | undefined;

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
            <Rankings rankings={rankings} />
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
                instituteFeeStructure: college.instituteFeeStructure as
                  | FeeType[]
                  | undefined,
                hostelFeeStructure: college.hostelFeeStructure as
                  | FeeType[]
                  | undefined,
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
