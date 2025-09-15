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
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/colleges`, lastModified: new Date() },
      { url: `${baseUrl}/news`, lastModified: new Date() },
      {
        url: `${baseUrl}/colleges?tag=IIT&page=1&limit=9`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/colleges?tag=NIT&page=1&limit=9`,
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
    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/colleges`, lastModified: new Date() },
      { url: `${baseUrl}/news`, lastModified: new Date() },
    ];
  }
}

export const revalidate = 3600;
