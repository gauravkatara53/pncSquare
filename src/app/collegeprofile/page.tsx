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
import { PlacementPage } from "@/components/PlacementPage/placementStatics";
import { Footer } from "@/components/common/footer";

export default function CollegeProfilePage() {
  return (
    <div className="bg-white">
      <CollegeHeader />
      <InfoBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <section id="overview">
          <Overview />
        </section>
        <section id="address">
          <Address />
        </section>
        <section id="facilities">
          <CampusFacilities />
        </section>
        <section id="ranking">
          <Rankings />
        </section>
        <section id="admission">
          <Admission />
        </section>
        <section id="courses">
          <Courses />
        </section>
        <section id="cutoff">
          <Cutoffs />
        </section>
        <section id="fees">
          <FeeStructure />
        </section>
        <section id="placements">
          <PlacementPage />
        </section>
      </main>
      <Footer />
    </div>
  );
}
