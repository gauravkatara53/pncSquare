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

      // College streams - Engineering
      {
        url: `${baseUrl}/colleges?stream=Engineering&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&page=2&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&page=3&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering`,
        lastModified: new Date(),
      },

      // College streams - Medical
      {
        url: `${baseUrl}/colleges?stream=Medical&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&page=2&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&page=3&limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?stream=Medical`, lastModified: new Date() },

      // College streams - Management
      {
        url: `${baseUrl}/colleges?stream=Management&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&page=2&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&page=3&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management`,
        lastModified: new Date(),
      },

      // College streams - Additional
      {
        url: `${baseUrl}/colleges?stream=Architecture&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Pharmacy&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Law&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Science&page=1&limit=9`,
        lastModified: new Date(),
      },

      // College types/tags - IIT variations
      {
        url: `${baseUrl}/colleges?tag=IIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIT&page=2&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIT&page=3&limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?tag=IIT`, lastModified: new Date() },

      // College types/tags - NIT variations
      {
        url: `${baseUrl}/colleges?tag=NIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&page=2&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&page=3&limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?tag=NIT`, lastModified: new Date() },

      // College types/tags - IIIT variations
      {
        url: `${baseUrl}/colleges?tag=IIIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIIT&page=2&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIIT&page=3&limit=9`,
        lastModified: new Date(),
      },
      { url: `${baseUrl}/colleges?tag=IIIT`, lastModified: new Date() },

      // Additional College tags
      {
        url: `${baseUrl}/colleges?tag=AIIMS&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIM&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IISER&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=Government&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=Private&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=University&page=1&limit=9`,
        lastModified: new Date(),
      },

      // College pagination
      { url: `${baseUrl}/colleges?page=1&limit=10`, lastModified: new Date() },
      { url: `${baseUrl}/colleges?page=1&limit=20`, lastModified: new Date() },
      { url: `${baseUrl}/colleges?page=2&limit=9`, lastModified: new Date() },
      { url: `${baseUrl}/colleges?page=3&limit=9`, lastModified: new Date() },

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
        url: `${baseUrl}/cutoff?examType=JEE-Main&year=2024`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Main&year=2025`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Advanced&year=2024`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=JEE-Advanced&year=2025`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=NEET-UG&year=2024`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/cutoff?examType=NEET-UG&year=2025`,
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
        url: `${baseUrl}/colleges?location=Delhi&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Mumbai&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Bangalore&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Chennai&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Hyderabad&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Pune&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Kolkata&page=1&limit=9`,
        lastModified: new Date(),
      },

      // State-wise searches
      {
        url: `${baseUrl}/colleges?state=Maharashtra&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Karnataka&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Tamil Nadu&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Uttar Pradesh&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=West Bengal&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?state=Rajasthan&page=1&limit=9`,
        lastModified: new Date(),
      },

      // Combined filters
      {
        url: `${baseUrl}/colleges?stream=Engineering&tag=IIT`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&tag=AIIMS`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&tag=IIM`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&tag=NIT`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Engineering&tag=IIIT`,
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
        url: `${baseUrl}/colleges?stream=Engineering&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Medical&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?stream=Management&page=1&limit=9`,
        lastModified: new Date(),
      },

      // College tags
      {
        url: `${baseUrl}/colleges?tag=IIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=AIIMS&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=IIM&page=1&limit=9`,
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
        url: `${baseUrl}/colleges?location=Delhi&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Mumbai&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Bangalore&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?location=Chennai&page=1&limit=9`,
        lastModified: new Date(),
      },
    ];
  }
}

export const revalidate = 3600;
