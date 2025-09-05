import { colleges } from "@/lib/colleges";
import CollegeCard from "./CollegeCard";
import Link from "next/link";

export function TopColleges() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Colleges
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover top-rated colleges with excellent placement records and
            academic excellence
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {colleges.map((college) => (
            <Link href={college.route} key={college.name}>
              <CollegeCard {...college} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href={"/colleges"}>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View All Colleges →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
