import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Users, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { apiService } from "../../ApiService/apiService";

interface Recruiter {
  _id: string;
  name: string;
  domain: string;
  hired: number;
  topPackage: string;
  locations: string[];
  logo?: string;
}

interface RecruitersApiResponse {
  _id: string;
  slug: string;
  year: number;
  totalRecruiters: number;
  ppo: number;
  average: number | string;
  risePlacement: string | number;
  bannerImage: string;
  recruiters: Recruiter[];
}

interface TopRecruitersProps {
  slug?: string;
  year: number;
}

function RecruiterCard({
  name,
  domain,
  hired,
  topPackage,
  locations,
  logo,
}: Recruiter) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex items-start gap-4">
        <ImageWithFallback
          src={logo}
          alt={name}
          className="w-12 h-12 rounded-lg bg-white object-contain border"
          width={48}
          height={48}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          <Badge variant="secondary" className="mb-2 text-xs">
            {domain}
          </Badge>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{hired} hired</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-medium">{topPackage}</span>
              <span>top package</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{locations.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function TopRecruiters({ slug, year }: TopRecruitersProps) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [summaryStats, setSummaryStats] = useState<{
    totalRecruiters?: number;
    ppo?: number;
    average?: number | string;
    risePlacement?: string | number;
    bannerImage?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecruiters() {
      if (!slug) return;
      setLoading(true);
      try {
        const url = `/placement/get/${encodeURIComponent(
          slug
        )}/recruiters?year=${year}`;
        console.log("Fetching recruiters from URL:", url);
        const response = await apiService.get<{ data: RecruitersApiResponse }>(
          url
        );
        const apiData = response.data;
        setRecruiters(apiData.recruiters || []);
        setSummaryStats({
          totalRecruiters: apiData.totalRecruiters,
          ppo: apiData.ppo,
          average: apiData.average,
          risePlacement: apiData.risePlacement,
          bannerImage: apiData.bannerImage,
        });
      } catch (err) {
        // Handle 404 errors gracefully - this might be normal if no recruiter data exists
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as { response?: { status?: number } };
          if (axiosError.response?.status === 404) {
            console.warn(
              `No recruiter data found for slug: ${slug}, year: ${year}`
            );
          } else {
            console.error("Error fetching recruiters:", err);
          }
        } else {
          console.error("Error fetching recruiters:", err);
        }
        setRecruiters([]);
        setSummaryStats({});
      } finally {
        setLoading(false);
      }
    }
    fetchRecruiters();
  }, [slug, year]);

  const noDataAvailable =
    !loading && (recruiters.length === 0 || !summaryStats.totalRecruiters);

  if (noDataAvailable) {
    return null; // Hide entire section if no data for the year
  }

  return (
    <Card className="px-2 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-gray-800">Top Recruiters {year}</h3>
        <Badge className="bg-blue-100 text-blue-800">
          {summaryStats.totalRecruiters
            ? `${summaryStats.totalRecruiters}+ Offer`
            : "No data"}
        </Badge>
      </div>

      <div className="mb-6">
        <ImageWithFallback
          src="https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/banner.png"
          alt="Corporate recruiters"
          className="w-full h-24 object-cover object-center rounded-lg"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading recruiters...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recruiters.map((recruiter) => (
            <RecruiterCard key={recruiter._id} {...recruiter} />
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {summaryStats.totalRecruiters || "-"}
            </div>
            <div className="text-sm text-gray-600">Total Recruiters</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {summaryStats.ppo || "-"}
            </div>
            <div className="text-sm text-gray-600">PPO</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {summaryStats.average || "-"}%
            </div>
            <div className="text-sm text-gray-600">Average</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {summaryStats.risePlacement || "-"}%
            </div>
            <div className="text-sm text-gray-600">Rise-Placement</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
