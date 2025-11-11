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

  const baseUrl = `https://pncsquare.in/college`;

  try {
    const response = await apiService.get<CollegeResponse>(`/college/${slug}`);
    const college = response?.data;

    if (!college) {
      return {
        title: "College Not Found | Placements & Cutoffs",
        description: "Requested college data not found.",
        keywords: ["college", "placements", "cutoff", "admissions", "fees"],
        alternates: {
          canonical: `${baseUrl}/${slug}`,
        },
      };
    }

    return {
      title: `${college.name} – Admission, Cutoff, Fees, Courses & Placements 2026 |Pncsquare`,
      description:
        college.bio ||
        `Explore ${college.name} - Admission, Cutoff, Fees, Courses & Placements 2026 | Pncsquare`,
      keywords: [
        college.name,
        `${college.name} placements`,
        `${college.name} cutoff`,
        `${college.name} admission`,
        `${college.name} fees`,
        `${college.name} courses`,
        "Pncsquare",
        "college placements India",
        "admission process",
        "JEE Advanced",
        "placement statistics",
        "engineering courses",
        "tuition fees",
        "college rankings",
        "financial aid",
      ],
      openGraph: {
        title: `${college.name} – Placements, Cutoff, Fees & Courses`,
        description:
          college.bio ||
          `Explore ${college.name} - Admission, Cutoff, Fees, Courses & Placements 2026 | Pncsquare`,
        images: [
          {
            url: college.image_url,
            width: 800,
            height: 600,
            alt: `${college.name} campus image`,
          },
        ],
      },
      alternates: {
        canonical: `${baseUrl}/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata for slug:", slug, error);
    return {
      title: "Error | College Information",
      description: "There was an error fetching college details.",
      keywords: ["college error", "college info not found", "Pncsquare"],
      alternates: {
        canonical: `${baseUrl}/${slug}`,
      },
    };
  }
}

export default async function CollegePage({ params }: { params: Params }) {
  const { slug } = await params;
  return <CollegePageClient slug={slug} />;
}
