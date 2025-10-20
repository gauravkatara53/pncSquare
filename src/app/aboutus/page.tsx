"use client";
import { Footer } from "@/components/common/footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Pncsquare</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your trusted companion in engineering education, providing
              comprehensive information about colleges, entrance exams, and
              placements since 2024.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-8">
              Launched in June 2024, Pncsquare began with a mission to guide
              engineering aspirants in making smarter educational choices. Our
              journey started by offering in-depth details about colleges and
              entrance exams across India. Over time, we expanded our platform
              to include a comprehensive news section focused on exam updates,
              counseling timelines, and placement developments.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">
              Our Core Sections
            </h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  1. News
                </h4>
                <p>
                  Stay updated with the latest developments on entrance exams,
                  college admissions, placement drives, and educational
                  announcements across the country.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  2. Entrance Exam Insights
                </h4>
                <p>
                  Access detailed, up-to-date information about entrance exams,
                  including important dates, eligibility criteria, exam
                  patterns, syllabus, and fee structures.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  3. College Information
                </h4>
                <p>
                  Explore comprehensive profiles of colleges across India—
                  covering location, courses offered, cutoffs, fee details,
                  placement statistics, and campus facilities.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  4. Placement Guidance
                </h4>
                <p>
                  Get insights into company recruitment data, salary trends, and
                  placement resources to help you prepare effectively for your
                  career journey.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Stay Connected
              </h3>
              <p>
                Follow us on{" "}
                <a
                  href="https://facebook.com/pncsquare"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Facebook
                </a>{" "}
                and{" "}
                <a
                  href="https://twitter.com/pncsquare"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Twitter
                </a>{" "}
                to keep up with our latest updates, announcements, and resources
                for students.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
