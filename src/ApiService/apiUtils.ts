import { apiService } from "./apiService";

export interface CollegeData {
  _id: string;
  name: string;
  slug: string;
  bio: string;
  image_url: string;
  fees: number;
  avgSalary: number;
  nirf: number;
  highestPackage: number;
  placementRate: number;
  instituteType: string;
  tag: string;
  establishedYear: number;
  location: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  examType?: string | string[]; // Support both string and array of strings for exam types
  // ... any other fields
}

/**
 * Fetch all colleges - optionally with filters
 * @param filters optional filters object to pass as query params
 */
export async function fetchColleges(
  filters?: Record<string, unknown>
): Promise<CollegeData[]> {
  return await apiService.get<CollegeData[]>("/college/all", filters || {});
}

/**
 * Fetch slug → ID mapping for all colleges
 */
export async function fetchSlugToIdMap(): Promise<Record<string, string>> {
  const colleges = await fetchColleges();
  const mapping: Record<string, string> = {};
  colleges.forEach((college) => {
    mapping[college.slug] = college._id;
  });
  return mapping;
}

/**
 * Fetch college data by slug, internally maps slug to ID and fetches by ID
 */
export async function fetchCollegeBySlug(
  slug: string
): Promise<CollegeData | null> {
  // Option 1: If API supports fetching college directly by slug
  try {
    const response = await apiService.get<{ data: CollegeData }>(
      `/college/slug/${slug}`
    );
    return response.data;
  } catch {
    // Fallback: map slug to ID then fetch by ID
    const slugToIdMap = await fetchSlugToIdMap();
    const id = slugToIdMap[slug];
    if (!id) return null;
    const res = await apiService.get<{ data: CollegeData }>(`/college/${id}`);
    return res.data || null;
  }
}

/**
 * Fetch college data by ID (direct)
 */
export async function fetchCollegeById(
  id: string
): Promise<CollegeData | null> {
  try {
    const response = await apiService.get<{ data: CollegeData }>(
      `/college/${id}`
    );
    return response.data;
  } catch {
    return null;
  }
}
