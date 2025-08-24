import { StatsCards } from "../ui/StatsCards";
import { PlacementChart } from "../ui/PlacementChart";
import { TopRecruiters } from "../ui/TopRecruiters";
import { Card } from "../ui/card";

export function PlacementPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Placement Statistics */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Placement Statistics
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive overview of placement achievements across all
            engineering disciplines
          </p>
        </div>
        <StatsCards />
      </section>

      {/* Detailed Branch-wise Statistics */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            IIT Bhubaneswar Placement Statistics 2024
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Detailed branch-wise placement data and package information
          </p>
        </div>

        <div className="grid gap-8">
          {/* Placement Statistics by Branch */}
          <Card className="border border-slate-200 shadow-sm">
            <div className="p-4 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Placement Statistics by Branch
              </h3>
              <div className="space-y-4">
                {[
                  { branch: "Civil Engineering", placed: "94.90%" },
                  {
                    branch: "Computer Science and Engineering",
                    placed: "93.04%",
                  },
                  { branch: "Electrical Engineering", placed: "92.59%" },
                  {
                    branch: "Electronics and Communication Engineering",
                    placed: "90.29%",
                  },
                  { branch: "Mechanical Engineering", placed: "91.51%" },
                  {
                    branch: "Metallurgical and Materials Engineering",
                    placed: "100.00%",
                  },
                  {
                    branch: "Production and Industrial Engineering",
                    placed: "95.56%",
                  },
                ]
                  .sort((a, b) => parseFloat(b.placed) - parseFloat(a.placed))
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
                    >
                      <span className="text-slate-700 text-sm">
                        {item.branch}
                      </span>
                      <span
                        className={`font-medium ${
                          item.placed === "100.00%"
                            ? "text-emerald-700"
                            : "text-slate-900"
                        }`}
                      >
                        {item.placed}
                      </span>
                    </div>
                  ))}
                {/* Overall Row */}
                <div className="flex justify-between items-center py-3 bg-slate-50 px-4 rounded-lg border border-slate-200 mt-4">
                  <span className="font-medium text-slate-900">
                    Overall (B.Tech)
                  </span>
                  <span className="font-semibold text-blue-700">93.76%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Package Statistics Grid */}
          <div className="">
            {/* Median Package */}
            <Card className="border border-slate-200 shadow-sm mb-8">
              <div className="p-4 sm:p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  Median Package (Branch-wise)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-4 py-2 text-left">Branch</th>
                        <th className="border px-4 py-2 text-left">
                          Median CTC (in LPA)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          branch: "Computer Science and Engineering",
                          package: "14.10",
                        },
                        {
                          branch: "Electronics and Communication Engineering",
                          package: "12.00",
                        },
                        { branch: "Electrical Engineering", package: "11.25" },
                        { branch: "Mechanical Engineering", package: "8.00" },
                        {
                          branch: "Metallurgical and Materials Engineering",
                          package: "8.00",
                        },
                        {
                          branch: "Production and Industrial Engineering",
                          package: "8.00",
                        },
                        { branch: "Civil Engineering", package: "7.00" },
                      ]
                        .sort(
                          (a, b) =>
                            parseFloat(b.package) - parseFloat(a.package)
                        )
                        .map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="border px-4 py-2 break-words max-w-[70%]">
                              {item.branch}
                            </td>
                            <td className="border px-4 py-2">
                              ₹{item.package}
                            </td>
                          </tr>
                        ))}
                      <tr className="bg-slate-50 font-semibold">
                        <td className="border px-4 py-2">Overall (B.Tech)</td>
                        <td className="border px-4 py-2">₹9.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Highest Package */}
            <Card className="border border-slate-200 shadow-sm mb-8">
              <div className="p-4 sm:p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  Highest Package (Branch-wise)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-4 py-2 text-left">Branch</th>
                        <th className="border px-4 py-2 text-left">
                          Max CTC (in LPA)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          branch: "Computer Science and Engineering",
                          package: "123.00",
                          highlight: true,
                        },
                        { branch: "Electrical Engineering", package: "82.00" },
                        {
                          branch: "Electronics and Communication Engineering",
                          package: "82.00",
                        },
                        { branch: "Civil Engineering", package: "18.00" },
                        { branch: "Mechanical Engineering", package: "18.00" },
                        {
                          branch: "Metallurgical and Materials Engineering",
                          package: "17.00",
                        },
                        {
                          branch: "Production and Industrial Engineering",
                          package: "14.10",
                        },
                      ]
                        .sort(
                          (a, b) =>
                            parseFloat(b.package) - parseFloat(a.package)
                        )
                        .map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="border px-4 py-2 break-words max-w-[70%]">
                              {item.branch}
                            </td>
                            <td
                              className={`border px-4 py-2 ${
                                item.highlight
                                  ? "text-green-700 font-semibold"
                                  : "text-slate-900"
                              }`}
                            >
                              ₹{item.package}
                            </td>
                          </tr>
                        ))}
                      <tr className="bg-slate-50 font-semibold text-green-700">
                        <td className="border px-4 py-2 text-slate-900">
                          Overall (B.Tech)
                        </td>
                        <td className="border px-4 py-2">₹123.00 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Average Package */}
            <Card className="border border-slate-200 shadow-sm">
              <div className="p-4 sm:p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  Average Package (Branch-wise)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-4 py-2 text-left">Branch</th>
                        <th className="border px-4 py-2 text-left">
                          Avg CTC (in LPA)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          branch: "Computer Science and Engineering",
                          package: "20.24",
                        },
                        {
                          branch: "Electronics and Communication Engineering",
                          package: "15.65",
                        },
                        { branch: "Electrical Engineering", package: "14.78" },
                        {
                          branch: "Metallurgical and Materials Engineering",
                          package: "9.33",
                        },
                        { branch: "Mechanical Engineering", package: "9.30" },
                        {
                          branch: "Production and Industrial Engineering",
                          package: "8.26",
                        },
                        { branch: "Civil Engineering", package: "8.22" },
                      ]
                        .sort(
                          (a, b) =>
                            parseFloat(b.package) - parseFloat(a.package)
                        )
                        .map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="border px-4 py-2 break-words max-w-[70%]">
                              {item.branch}
                            </td>
                            <td className="border px-4 py-2">
                              ₹{item.package}
                            </td>
                          </tr>
                        ))}
                      <tr className="bg-slate-50 font-semibold">
                        <td className="border px-4 py-2">Overall (B.Tech)</td>
                        <td className="border px-4 py-2">₹12.63</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Placement Analytics
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Detailed breakdown of placement statistics by branch and package
            distribution
          </p>
        </div>
        <PlacementChart />
      </section>

      {/* Top Recruiters */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Top Recruiters
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Leading companies that hire our graduates
          </p>
        </div>
        <TopRecruiters />
      </section>
    </div>
  );
}
