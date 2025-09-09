import { Metadata } from "next";
import { apiService } from "@/ApiService/apiService";
import CollegePageClient from "@/components/PlacementPage/CollegePageClient";

interface CollegeResponse {
  statusCode: number;
  data: {
    name: string;
    bio?: string;
    slug: string;
    fees: number;
    avgSalary: number;
    nirf: number;
    highestPackage: number;
    placementRate: number;
    image_url: string;
    [key: string]: unknown;
  };
  success: boolean;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await apiService.get<CollegeResponse>(`/college/${slug}`);
    const college = response?.data;

    if (!college) {
      console.error("College data not found for slug:", slug);
      return {
        title: "College Not Found | Placements & Cutoffs",
        description: "Requested college data not found.",
      };
    }

    return {
      title: `${college.name} – Admission, Cutoff, Fees, Courses & Placements 2025 | PNC Square`,
      description:
        college.bio ||
        `Explore ${college.name} - Admission, Cutoff, Fees, Courses & Placements 2025 | PNC Square`,
      openGraph: {
        title: `${college.name} – Placements, Cutoff, Fees & Courses`,
        description:
          college.bio ||
          `Explore ${college.name} - Admission, Cutoff, Fees, Courses & Placements 2025 | PNC Square`,
        images: [
          {
            url: college.image_url,
            width: 800,
            height: 600,
            alt: `${college.name} campus image`,
          },
        ],
      },
    };
  } catch (error) {
    // Detailed error log
    console.error("Error in generateMetadata for slug:", slug, error);
    return {
      title: "Error | College Information",
      description: "There was an error fetching college details.",
    };
  }
}

export default async function CollegePage({ params }: { params: Params }) {
  const { slug } = await params;
  return <CollegePageClient slug={slug} />;
}
