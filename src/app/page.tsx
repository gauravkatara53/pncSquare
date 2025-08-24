import Hero from "@/components/common/Hero";
// import FeaturedColleges from "@/components/FeaturedColleges";
import { TopColleges } from "@/components/common/TopColleges";
import KeyFeatures from "@/components/common/KeyFeatures";
import CutoffTrends from "@/components/common/CutoffTrends";
import { Footer } from "@/components/common/footer";

export default function HomePage() {
  return (
    <div>
      <Hero />
      {/* <FeaturedColleges /> */}
      <KeyFeatures />
      <CutoffTrends />
      <TopColleges />
      <Footer />
    </div>
  );
}
