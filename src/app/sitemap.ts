import { MetadataRoute } from "next";

const baseUrl = "https://pncsquare.in";
const apiBaseUrl = "https://pnc-backend.onrender.com/api/v1";

async function getAllCollegePaths(): Promise<string[]> {
  const res = await fetch(`${apiBaseUrl}/college/all/slugs`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to fetch college slugs. Status: ${res.status}, Response: ${text}`
    );
  }
  const response = await res.json();
  const slugs = response.data;
  if (!Array.isArray(slugs)) throw new Error("College slugs not an array");
  return slugs.map((slug: string) => `/college/${slug}`);
}

async function getAllNewsPaths(): Promise<string[]> {
  const res = await fetch(`${apiBaseUrl}/news/all/slugs`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to fetch news slugs. Status: ${res.status}, Response: ${text}`
    );
  }
  const response = await res.json();
  const slugs = response.data;
  if (!Array.isArray(slugs)) throw new Error("News slugs not an array");
  return slugs.map((slug: string) => `/newsarticle/${slug}`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const collegePaths = await getAllCollegePaths();
    const newsPaths = await getAllNewsPaths();

    const staticRoutes = [
      // Main pages
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/home`, lastModified: new Date() },
      { url: `${baseUrl}/colleges`, lastModified: new Date() },
      { url: `${baseUrl}/news`, lastModified: new Date() },
      { url: `${baseUrl}/courses`, lastModified: new Date() },
      { url: `${baseUrl}/cutoff`, lastModified: new Date() },
      { url: `${baseUrl}/exam`, lastModified: new Date() },
      { url: `${baseUrl}/compare`, lastModified: new Date() },
      { url: `${baseUrl}/review`, lastModified: new Date() },
      { url: `${baseUrl}/aboutus`, lastModified: new Date() },
      { url: `${baseUrl}/team`, lastModified: new Date() },
      { url: `${baseUrl}/help-center`, lastModified: new Date() },
      { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
      { url: `${baseUrl}/terms-of-service`, lastModified: new Date() },
      { url: `${baseUrl}/profile`, lastModified: new Date() },
      { url: `${baseUrl}/signin`, lastModified: new Date() },
      { url: `${baseUrl}/jee-main-rank-predictor`, lastModified: new Date() },

      // College streams - Engineering
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;page=3&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering`,
        lastModified: new Date(),
      },

      // College streams - Medical
      {
        url: `${baseUrl}/colleges?stream=Medical&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&amp;page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&amp;page=3&amp;limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?stream=Medical`, lastModified: new Date() },

      // College streams - Management
      {
        url: `${baseUrl}/colleges?stream=Management&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&amp;page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&amp;page=3&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management`,
        lastModified: new Date(),
      },

      // College streams - Additional
      {
        url: `${baseUrl}/colleges?stream=Architecture&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Pharmacy&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Law&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Science&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },

      // College types/tags - IIT variations
      {
        url: `${baseUrl}/colleges?tag=IIT&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIT&amp;page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIT&amp;page=3&amp;limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?tag=IIT`, lastModified: new Date() },

      // College types/tags - NIT variations
      {
        url: `${baseUrl}/colleges?tag=NIT&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&amp;page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&amp;page=3&amp;limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?tag=NIT`, lastModified: new Date() },

      // College types/tags - IIIT variations
      {
        url: `${baseUrl}/colleges?tag=IIIT&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIIT&amp;page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIIT&amp;page=3&amp;limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?tag=IIIT`, lastModified: new Date() },

      // Additional College tags
      {
        url: `${baseUrl}/colleges?tag=AIIMS&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIM&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IISER&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=Government&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=Private&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=University&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },

      // College pagination
      {
        url: `${baseUrl}/colleges?page=1&amp;limit=10`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?page=1&amp;limit=20`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?page=2&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?page=3&amp;limit=9`,
        lastModified: new Date(),
      },

      // Exam pages - Main exams
      { url: `${baseUrl}/exam?exam=jee-main`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=jee-advanced`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=neet-ug`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=gate`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=cat`, lastModified: new Date() },

      // Additional exam pages
      { url: `${baseUrl}/exam?exam=bitsat`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=viteee`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=comedk`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=mht-cet`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=wbjee`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=ts-eamcet`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=ap-eamcet`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=kcet`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=keam`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=gujcet`, lastModified: new Date() },

      // Cutoff pages for different exams
      { url: `${baseUrl}/cutoff?examType=JEE-Main`, lastModified: new Date() },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Advanced`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/cutoff?examType=NEET-UG`, lastModified: new Date() },

      // Cutoff with year variations
      {
        url: `${baseUrl}/cutoff?examType=JEE-Main&amp;year=2024`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Main&amp;year=2025`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Advanced&amp;year=2024`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Advanced&amp;year=2025`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=NEET-UG&amp;year=2024`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=NEET-UG&amp;year=2025`,
        lastModified: new Date(),
      },

      // Course categories
      {
        url: `${baseUrl}/courses?category=Engineering`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/courses?category=Medical`, lastModified: new Date() },
      {
        url: `${baseUrl}/courses?category=Management`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/courses?category=Science`, lastModified: new Date() },
      { url: `${baseUrl}/courses?category=Arts`, lastModified: new Date() },
      { url: `${baseUrl}/courses?category=Commerce`, lastModified: new Date() },

      // News categories
      { url: `${baseUrl}/news?category=Admission`, lastModified: new Date() },
      { url: `${baseUrl}/news?category=Exam`, lastModified: new Date() },
      { url: `${baseUrl}/news?category=Results`, lastModified: new Date() },
      { url: `${baseUrl}/news?category=Counselling`, lastModified: new Date() },
      { url: `${baseUrl}/news?page=1`, lastModified: new Date() },
      { url: `${baseUrl}/news?page=2`, lastModified: new Date() },

      // Location-based college searches
      {
        url: `${baseUrl}/colleges?location=Delhi&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Mumbai&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Bangalore&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Chennai&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Hyderabad&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Pune&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Kolkata&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },

      // State-wise searches
      {
        url: `${baseUrl}/colleges?state=Maharashtra&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Karnataka&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Tamil Nadu&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Uttar Pradesh&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=West Bengal&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Rajasthan&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },

      // Combined filters
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;tag=IIT`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&amp;tag=AIIMS`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&amp;tag=IIM`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;tag=NIT`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;tag=IIIT`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/college-predictor`,
        lastModified: new Date(),
      },
    ];

    const collegeSitemapRoutes = collegePaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    }));

    const newsSitemapRoutes = newsPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...collegeSitemapRoutes, ...newsSitemapRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback static routes when API fails
    return [
      // Main pages
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/home`, lastModified: new Date() },
      { url: `${baseUrl}/colleges`, lastModified: new Date() },
      { url: `${baseUrl}/news`, lastModified: new Date() },
      { url: `${baseUrl}/courses`, lastModified: new Date() },
      { url: `${baseUrl}/cutoff`, lastModified: new Date() },
      { url: `${baseUrl}/exam`, lastModified: new Date() },
      { url: `${baseUrl}/compare`, lastModified: new Date() },
      { url: `${baseUrl}/review`, lastModified: new Date() },
      { url: `${baseUrl}/aboutus`, lastModified: new Date() },
      { url: `${baseUrl}/team`, lastModified: new Date() },
      { url: `${baseUrl}/help-center`, lastModified: new Date() },
      { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
      { url: `${baseUrl}/terms-of-service`, lastModified: new Date() },
      { url: `${baseUrl}/profile`, lastModified: new Date() },
      { url: `${baseUrl}/signin`, lastModified: new Date() },

      // College streams
      {
        url: `${baseUrl}/colleges?stream=Engineering&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },

      // College tags
      {
        url: `${baseUrl}/colleges?tag=IIT&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIIT&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=AIIMS&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIM&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },

      // Exam pages
      { url: `${baseUrl}/exam?exam=jee-main`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=jee-advanced`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=neet-ug`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=gate`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=cat`, lastModified: new Date() },
      { url: `${baseUrl}/exam?exam=bitsat`, lastModified: new Date() },

      // Cutoff pages
      { url: `${baseUrl}/cutoff?examType=JEE-Main`, lastModified: new Date() },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Advanced`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/cutoff?examType=NEET-UG`, lastModified: new Date() },

      // Course categories
      {
        url: `${baseUrl}/courses?category=Engineering`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/courses?category=Medical`, lastModified: new Date() },
      {
        url: `${baseUrl}/courses?category=Management`,
        lastModified: new Date(),
      },

      // Location-based searches
      {
        url: `${baseUrl}/colleges?location=Delhi&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Mumbai&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Bangalore&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Chennai&amp;page=1&amp;limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/college-predictor`,
        lastModified: new Date(),
      },
    ];
  }
}

export const revalidate = 3600;
