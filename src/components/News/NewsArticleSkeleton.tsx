"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NewsArticleSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center gap-8">
          {/* Left Sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Popular Exams Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
                <Skeleton height={24} width="80%" className="mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={36} className="w-full" />
                  ))}
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="bg-white rounded-lg p-6">
                <Skeleton height={24} width="60%" className="mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={36} />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="max-w-4xl flex-1 min-w-0">
            <header className="mb-8">
              {/* Category and Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Skeleton width={100} height={24} />
                <Skeleton width={80} height={24} />
              </div>

              {/* Title */}
              <Skeleton height={48} width="90%" className="mb-2" />
              <Skeleton height={48} width="80%" className="mb-6" />

              {/* Summary */}
              <Skeleton height={24} count={2} className="mb-8" />

              {/* Article Meta */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Skeleton circle width={40} height={40} />
                  <div>
                    <Skeleton width={120} height={20} className="mb-1" />
                    <Skeleton width={80} height={16} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={120} height={20} />
                  <Skeleton width={80} height={20} />
                </div>
              </div>

              <hr className="mb-8" />
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <Skeleton height={400} className="w-full rounded-lg" />
            </div>

            {/* Article Content */}
            {[1, 2, 3].map((section) => (
              <section key={section} className="mb-8">
                <Skeleton height={32} width="70%" className="mb-4" />
                <Skeleton height={20} count={4} className="mb-4" />
                <Skeleton height={300} className="mb-4" />
                <Skeleton height={20} count={3} className="mb-4" />
              </section>
            ))}
          </article>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Placement Data Section */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton height={24} width="60%" />
                  <Skeleton height={20} width={40} />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={36} className="w-full" />
                  ))}
                </div>
              </div>

              {/* Cutoff Section */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton height={24} width="70%" />
                  <Skeleton height={20} width={40} />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height={36} className="w-full" />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
