"use client";
import React, { useEffect, useState } from "react";
import { StatsCards } from "../ui/StatsCards";
import { Card } from "../ui/card";
import { apiService } from "../../ApiService/apiService";
import CardSkeletonGrid from "../ui/cardSkelton";
import { TopRecruiters } from "./TopRecruiters";

interface College {
  slug?: string;
  name?: string;
  isPlacementRateAvailable?: boolean;
  isMedianPackageAvailable?: boolean;
  isHighestPackageAvailable?: boolean;
  isAveragePackageAvailable?: boolean;
}

interface PlacementDataItem {
  _id: string;
  branch: string;
  placementPercentage: number;
  averagePackageLPA: number;
  highestPackageLPA: number;
  medianPackageLPA: number | null;
}

export function PlacementPage({ college }: { college: College }) {
  const [year, setYear] = useState(2025); // default year
  const [placementStats, setPlacementStats] = useState<{
    totalOffers?: number;
    highestPackage?: number;
    averagePackage?: number;
    recruiters?: number;
    graph_url?: string;
    company_url?: string;
  } | null>(null);

  const [placementData, setPlacementData] = useState<PlacementDataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const years = [2025, 2024, 2023]; // example years

  useEffect(() => {
    async function fetchPlacementData() {
      setLoading(true);
      try {
        const slug = college?.slug;
        // Fetch detailed branch-wise placement data
        const url = `/placement/list?slug=${encodeURIComponent(
          slug ?? ""
        )}&year=${year}`;
        const response = await apiService.get(url);
        setPlacementData(
          (response as { data?: PlacementDataItem[] }).data || []
        );

        // Fetch overall stats as before
        if (slug) {
          const statsResponse = await apiService.get<{
            data: {
              year: number;
              totalOffers: number;
              highestPackage: number;
              averagePackage: number;
              recruiters: number;
              graph_url: string;
              company_url?: string;
            }[];
          }>(`/placement/get/${slug}/stats`);

          if (statsResponse.data) {
            const yearStats = statsResponse.data.find(
              (stat) => stat.year === year
            );
            if (yearStats) {
              setPlacementStats({
                totalOffers: yearStats.totalOffers,
                highestPackage: yearStats.highestPackage,
                averagePackage: yearStats.averagePackage,
                recruiters: yearStats.recruiters,
                graph_url: yearStats.graph_url,
                company_url: yearStats.company_url,
              });
            } else {
              setPlacementStats(null);
            }
          } else {
            setPlacementStats(null);
          }
        }
      } catch (error) {
        setPlacementData([]);
        setPlacementStats(null);
        console.error("Error fetching placement data or stats:", error);
      } finally {
        setLoading(false);
      }
    }
    if (college?.slug) {
      fetchPlacementData();
    }
  }, [college?.slug, year]);

  // Filter out branches where all stats are zero or null/undefined
  const validData = placementData.filter(
    (item) =>
      (item.placementPercentage ?? 0) > 0 ||
      (item.averagePackageLPA ?? 0) > 0 ||
      (item.highestPackageLPA ?? 0) > 0 ||
      (item.medianPackageLPA ?? 0) > 0
  );

  // Filter valid data separately for each section's requirement
  const validPlacementRateData = validData.filter(
    (item) => (item.placementPercentage ?? 0) > 0
  );
  const validMedianPackageData = validData.filter(
    (item) => (item.medianPackageLPA ?? 0) > 0
  );
  const validHighestPackageData = validData.filter(
    (item) => (item.highestPackageLPA ?? 0) > 0
  );
  const validAveragePackageData = validData.filter(
    (item) => (item.averagePackageLPA ?? 0) > 0
  );

  // Overall Placement % using validPlacementRateData
  const overallPlacement = validPlacementRateData.length
    ? (
        validPlacementRateData.reduce(
          (acc, cur) => acc + cur.placementPercentage,
          0
        ) / validPlacementRateData.length
      ).toFixed(2)
    : "-";

  // Overall Median Package calculation
  const overallMedianPackage =
    validMedianPackageData.length > 0
      ? (() => {
          const medians = validMedianPackageData
            .map((d) => d.medianPackageLPA)
            .filter((v): v is number => v !== null && v !== undefined && v > 0);
          medians.sort((a, b) => a - b);
          const mid = Math.floor(medians.length / 2);
          if (medians.length % 2 === 0) {
            return ((medians[mid - 1] + medians[mid]) / 2).toFixed(2);
          } else {
            return medians[mid].toFixed(2);
          }
        })()
      : null;

  // Overall Highest Package calculation
  const overallHighestPackage = validHighestPackageData.length
    ? Math.max(...validHighestPackageData.map((d) => d.highestPackageLPA))
    : "-";

  // Overall Average Package calculation
  const overallAvgPackage = validAveragePackageData.length
    ? (
        validAveragePackageData.reduce(
          (acc, cur) => acc + cur.averagePackageLPA,
          0
        ) / validAveragePackageData.length
      ).toFixed(2)
    : "-";

  /* Determine if Branch-wise Placement section should render at all:
     Render only if at least one placement subsection has valid data and corresponding availability flags */
  const hasAnyBranchPlacementData =
    (college.isPlacementRateAvailable && validPlacementRateData.length > 0) ||
    (college.isMedianPackageAvailable && validMedianPackageData.length > 0) ||
    (college.isHighestPackageAvailable && validHighestPackageData.length > 0) ||
    (college.isAveragePackageAvailable && validAveragePackageData.length > 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Year Selection Dropdown */}
      <section className="mb-8 text-center">
        <label htmlFor="year-select" className="mr-4 font-semibold">
          Select Year:
        </label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1"
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </section>

      {/* Placement Statistics - Overall cards */}
      {loading ? (
        <div className="text-center mb-16">
          <CardSkeletonGrid />
        </div>
      ) : (
        placementStats && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Placement Statistics
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Comprehensive overview of placement achievements across all
                engineering disciplines
              </p>
            </div>
            <StatsCards
              data={[
                {
                  totalOffers:
                    placementStats.totalOffers !== undefined
                      ? placementStats.totalOffers.toString()
                      : "-",
                  highestPackage:
                    placementStats.highestPackage !== undefined
                      ? placementStats.highestPackage.toString()
                      : "-",
                  averagePackage:
                    placementStats.averagePackage !== undefined
                      ? placementStats.averagePackage.toString()
                      : "-",
                  recruiters:
                    placementStats.recruiters !== undefined
                      ? placementStats.recruiters.toString()
                      : "-",
                },
              ]}
            />
          </section>
        )
      )}

      {/* Branch-wise Placement Sections */}
      {hasAnyBranchPlacementData && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              {college?.name} Placement {year}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Detailed branch-wise placement data and package information
            </p>
          </div>

          <div className="grid gap-8">
            {/* Placement Rate Section */}
            {college.isPlacementRateAvailable &&
              validPlacementRateData.length > 0 && (
                <Card className="border border-slate-200 shadow-sm">
                  <div className="p-4 sm:p-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">
                      Placement Statistics by Branch
                    </h3>
                    <div className="space-y-4">
                      {validPlacementRateData
                        .sort(
                          (a, b) =>
                            b.placementPercentage - a.placementPercentage
                        )
                        .map((item) => (
                          <div
                            key={item._id}
                            className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
                          >
                            <span className="text-slate-700 text-sm">
                              {item.branch}
                            </span>
                            <span
                              className={`font-medium ${
                                item.placementPercentage === 100
                                  ? "text-emerald-700"
                                  : "text-slate-900"
                              }`}
                            >
                              {Number(item.placementPercentage ?? 0).toFixed(2)}
                              %
                            </span>
                          </div>
                        ))}
                      <div className="flex justify-between items-center py-3 bg-slate-50 px-4 rounded-lg border border-slate-200 mt-4">
                        <span className="font-medium text-slate-900">
                          Overall
                        </span>
                        <span className="font-semibold text-blue-700">
                          {overallPlacement}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

            {/* Median Package Section */}
            {college.isMedianPackageAvailable &&
              validMedianPackageData.length > 0 && (
                <Card className="border border-slate-200 shadow-sm mb-8">
                  <div className="p-4 sm:p-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">
                      Median Package (Branch-wise)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border px-4 py-2 text-left">
                              Branch
                            </th>
                            <th className="border px-4 py-2 text-left">
                              Median CTC (in LPA)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {validMedianPackageData
                            .sort(
                              (a, b) =>
                                (b.medianPackageLPA ?? 0) -
                                (a.medianPackageLPA ?? 0)
                            )
                            .map((item) => (
                              <tr key={item._id} className="hover:bg-slate-50">
                                <td className="border px-4 py-2 break-words max-w-[70%]">
                                  {item.branch}
                                </td>
                                <td className="border px-4 py-2">
                                  ₹{Number(item.medianPackageLPA).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          <tr className="bg-slate-50 font-semibold text-green-700">
                            <td className="border px-4 py-2 text-slate-900">
                              Overall (B.Tech)
                            </td>
                            <td className="border px-4 py-2">
                              {overallMedianPackage !== null
                                ? `₹${overallMedianPackage}`
                                : "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              )}

            {/* Highest Package Section */}
            {college.isHighestPackageAvailable &&
              validHighestPackageData.length > 0 && (
                <Card className="border border-slate-200 shadow-sm mb-8">
                  <div className="p-4 sm:p-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">
                      Highest Package (Branch-wise)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border px-4 py-2 text-left">
                              Branch
                            </th>
                            <th className="border px-4 py-2 text-left">
                              Max CTC (in LPA)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {validHighestPackageData
                            .sort(
                              (a, b) =>
                                b.highestPackageLPA - a.highestPackageLPA
                            )
                            .map((item) => (
                              <tr key={item._id} className="hover:bg-slate-50">
                                <td className="border px-4 py-2 break-words max-w-[70%]">
                                  {item.branch}
                                </td>
                                <td className="border px-4 py-2">
                                  ₹
                                  {Number(item.highestPackageLPA ?? 0).toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            ))}
                          <tr className="bg-slate-50 font-semibold text-green-700">
                            <td className="border px-4 py-2 text-slate-900">
                              Overall (B.Tech)
                            </td>
                            <td className="border px-4 py-2">
                              ₹{overallHighestPackage}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              )}

            {/* Average Package Section */}
            {college.isAveragePackageAvailable &&
              validAveragePackageData.length > 0 && (
                <Card className="border border-slate-200 shadow-sm">
                  <div className="p-4 sm:p-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">
                      Average Package (Branch-wise)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border px-4 py-2 text-left">
                              Branch
                            </th>
                            <th className="border px-4 py-2 text-left">
                              Avg CTC (in LPA)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {validAveragePackageData
                            .sort(
                              (a, b) =>
                                (b.averagePackageLPA ?? 0) -
                                (a.averagePackageLPA ?? 0)
                            )
                            .map((item) => (
                              <tr key={item._id} className="hover:bg-slate-50">
                                <td className="border px-4 py-2 break-words max-w-[70%]">
                                  {item.branch}
                                </td>
                                <td className="border px-4 py-2">
                                  ₹
                                  {Number(item.averagePackageLPA ?? 0).toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            ))}
                          <tr className="bg-slate-50 font-semibold">
                            <td className="border px-4 py-2">
                              Overall (B.Tech)
                            </td>
                            <td className="border px-4 py-2">
                              ₹{overallAvgPackage}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              )}
          </div>
        </section>
      )}

      {/* Charts Section */}
      <section className="mb-16">
        <div className="text-center mb-12 flex justify-center">
          {placementStats?.graph_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={placementStats.graph_url}
              alt="Placement Graphs"
              className="w-full max-w-[1200px] h-auto rounded border border-slate-200 pb-8"
            />
          ) : (
            <p className="text-center text-slate-500 pb-8"></p>
          )}
        </div>
      </section>

      {/* Top Recruiters Section */}
      <TopRecruiters slug={college?.slug} year={year} />
    </div>
  );
}
