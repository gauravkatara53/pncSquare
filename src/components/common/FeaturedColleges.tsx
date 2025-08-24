import { colleges } from "@/lib/colleges";
import CollegeCard from "./CollegeCard";

export function FeaturedColleges() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Colleges
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover top-rated colleges with excellent placement records and
            academic excellence
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {colleges.map((college, index) => (
            <CollegeCard key={index} {...college} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Colleges →
          </button>
        </div>
      </div>
    </section>
  );
}
