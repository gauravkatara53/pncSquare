/**
 * Cutoff Filter Configuration System
 * This file contains filter dropdown configurations for different college tags and exam types
 */

export type Year = "2025" | "2024";
export type SubCategory =
  | "Gender-Neutral"
  | "Female-only (including Supernumerary)";

// Base interface for filter options
export interface FilterOptions {
  years: Year[];
  subCategories: string[]; // Allow any string for custom subcategories
  quotaOptions: string[];
  seatTypeOptions: string[];
  requiresSubCategory: boolean;
  requiresQuota: boolean;
}

// Exam-specific configurations
export interface ExamFilterConfig {
  name: string;
  requiresSubCategory: boolean;
  requiresQuota: boolean;
  seatTypeOptions: string[];
  quotaOptions?: string[];
  subCategories?: SubCategory[] | string[]; // Allow custom strings for individual colleges
  years?: Year[]; // College-specific available years
}

// Individual college configuration (overrides tag-based config)
export interface IndividualCollegeConfig {
  slug: string;
  examConfigs: Record<string, ExamFilterConfig>;
  fallbackTag?: string; // Fallback to tag-based config for unlisted exams
}

// College tag-specific configurations
export interface CollegeTagConfig {
  tag: string;
  examConfigs: Record<string, ExamFilterConfig>;
  defaultQuota?: string;
  isGovernmentInstitute: boolean;
}

// Available years (common for all)
export const AVAILABLE_YEARS: Year[] = ["2025", "2024"];

// Common sub-categories
export const COMMON_SUB_CATEGORIES: SubCategory[] = [
  "Gender-Neutral",
  "Female-only (including Supernumerary)",
];

// Exam configurations
export const EXAM_CONFIGS: Record<string, ExamFilterConfig> = {
  "JEE-Advanced": {
    name: "JEE Advanced",
    requiresSubCategory: true,
    requiresQuota: false, // IITs use AI quota by default
    seatTypeOptions: [
      "OPEN",
      "OBC-NCL",
      "SC",
      "ST",
      "EWS",
      "OPEN (PwD)",
      "OBC-NCL (PwD)",
      "SC (PwD)",
      "ST (PwD)",
      "EWS (PwD)",
    ],
    quotaOptions: ["AI"], // All India quota for IITs
    subCategories: COMMON_SUB_CATEGORIES,
  },
  "JEE-Main": {
    name: "JEE Main",
    requiresSubCategory: true,
    requiresQuota: true,
    seatTypeOptions: [
      "OPEN",
      "OBC-NCL",
      "SC",
      "ST",
      "EWS",
      "OPEN (PwD)",
      "OBC-NCL (PwD)",
      "SC (PwD)",
      "ST (PwD)",
      "EWS (PwD)",
    ],
    quotaOptions: ["HS", "OS", "AI"],
    subCategories: COMMON_SUB_CATEGORIES,
  },
  "NEET-UG": {
    name: "NEET UG",
    requiresSubCategory: false,
    requiresQuota: false,
    seatTypeOptions: [
      "General",
      "General PwD",
      "OBC",
      "OBC PwD",
      "SC",
      "SC PwD",
      "ST",
      "ST PwD",
      "EWS",
      "EWS PwD",
    ],
  },
  "CUET-UG": {
    name: "CUET UG",
    requiresSubCategory: true,
    requiresQuota: true,
    seatTypeOptions: [
      "General",
      "OBC",
      "SC",
      "ST",
      "EWS",
      "General PwD",
      "OBC PwD",
      "SC PwD",
      "ST PwD",
      "EWS PwD",
    ],
    quotaOptions: ["HS", "OS", "AI"],
    subCategories: COMMON_SUB_CATEGORIES,
  },
  GATE: {
    name: "GATE",
    requiresSubCategory: true,
    requiresQuota: true,
    seatTypeOptions: [
      "OPEN",
      "OBC-NCL",
      "SC",
      "ST",
      "EWS",
      "OPEN (PwD)",
      "OBC-NCL (PwD)",
      "SC (PwD)",
      "ST (PwD)",
      "EWS (PwD)",
    ],
    quotaOptions: ["HS", "OS", "AI"],
    subCategories: COMMON_SUB_CATEGORIES,
  },
};

// Individual college configurations (specific colleges with unique filter requirements)
export const INDIVIDUAL_COLLEGE_CONFIGS: Record<
  string,
  IndividualCollegeConfig
> = {
  "nsut-delhi": {
    slug: "nsut-delhi",
    examConfigs: {
      "JEE-Main": {
        name: "JEE Main",
        requiresSubCategory: true,
        requiresQuota: true,
        years: ["2025"], // Only 2025 available
        seatTypeOptions: ["General", "EWS", "OBC", "SC", "ST"],
        quotaOptions: ["Delhi", "Outside Delhi"],
        subCategories: [
          "NONE",
          "DEFENCE",
          "KASHMIRI MIGRANT",
          "PERSON WITH DISABILITIES",
        ],
      },
    },
    fallbackTag: "University",
  },
  "dtu-delhi": {
    slug: "dtu-delhi",
    examConfigs: {
      "JEE-Main": {
        name: "JEE Main",
        requiresSubCategory: true,
        requiresQuota: true,
        years: ["2025", "2024"],
        seatTypeOptions: ["General", "EWS", "OBC", "SC", "ST"],
        quotaOptions: [" Delhi Region", "Outside  Delhi Region"],
        subCategories: [
          "NONE",
          "DEFENCE",
          "KASHMIRI MIGRANT",
          "PERSON WITH DISABILITIES",
          "SPORTS",
        ],
      },
    },
    fallbackTag: "University",
  },
  "iiit-delhi": {
    slug: "iiit-delhi",
    examConfigs: {
      "JEE-Main": {
        name: "JEE Main",
        requiresSubCategory: true,
        requiresQuota: true,
        years: ["2025", "2024"],
        seatTypeOptions: ["General", "EWS", "OBC", "SC", "ST"],
        quotaOptions: ["Delhi", "Outside Delhi"],
        subCategories: [
          "NONE",
          "DEFENCE",
          "KASHMIRI MIGRANT",
          "PERSON WITH DISABILITIES",
        ],
      },
    },
    fallbackTag: "IIIT",
  },
};

// College tag configurations
export const COLLEGE_TAG_CONFIGS: Record<string, CollegeTagConfig> = {
  IIT: {
    tag: "IIT",
    examConfigs: {
      "JEE-Advanced": EXAM_CONFIGS["JEE-Advanced"],
      GATE: EXAM_CONFIGS["GATE"],
    },
    defaultQuota: "AI",
    isGovernmentInstitute: true,
  },
  NIT: {
    tag: "NIT",
    examConfigs: {
      "JEE-Main": EXAM_CONFIGS["JEE-Main"],
      GATE: EXAM_CONFIGS["GATE"],
    },
    isGovernmentInstitute: true,
  },
  IIIT: {
    tag: "IIIT",
    examConfigs: {
      "JEE-Main": EXAM_CONFIGS["JEE-Main"],
      GATE: EXAM_CONFIGS["GATE"],
    },
    isGovernmentInstitute: true,
  },
  GFTI: {
    tag: "GFTI", // Government Funded Technical Institutes
    examConfigs: {
      "JEE-Main": EXAM_CONFIGS["JEE-Main"],
      GATE: EXAM_CONFIGS["GATE"],
    },
    isGovernmentInstitute: true,
  },
  AIIMS: {
    tag: "AIIMS",
    examConfigs: {
      "NEET-UG": EXAM_CONFIGS["NEET-UG"],
    },
    isGovernmentInstitute: true,
  },
  Medical: {
    tag: "Medical",
    examConfigs: {
      "NEET-UG": EXAM_CONFIGS["NEET-UG"],
    },
    isGovernmentInstitute: false,
  },
  University: {
    tag: "University",
    examConfigs: {
      "CUET-UG": EXAM_CONFIGS["CUET-UG"],
      "JEE-Main": EXAM_CONFIGS["JEE-Main"],
      "NEET-UG": EXAM_CONFIGS["NEET-UG"],
    },
    isGovernmentInstitute: false,
  },
  Private: {
    tag: "Private",
    examConfigs: {
      "JEE-Main": EXAM_CONFIGS["JEE-Main"],
      "NEET-UG": EXAM_CONFIGS["NEET-UG"],
      "CUET-UG": EXAM_CONFIGS["CUET-UG"],
    },
    isGovernmentInstitute: false,
  },
};

// Helper function to determine college tag from slug
export function getCollegeTagFromSlug(slug: string): string {
  const lowerSlug = slug.toLowerCase();

  if (lowerSlug.startsWith("iit-")) return "IIT";
  if (lowerSlug.startsWith("nit-")) return "NIT";
  if (lowerSlug.startsWith("iiit-")) return "IIIT";
  if (lowerSlug.includes("aiims")) return "AIIMS";
  if (lowerSlug.includes("medical") || lowerSlug.includes("mbbs"))
    return "Medical";

  // Default fallback
  return "University";
}

// Helper function to get available exam types for a college
export function getAvailableExamTypes(collegeTag: string): string[] {
  const config = COLLEGE_TAG_CONFIGS[collegeTag];
  if (!config) return [];

  return Object.keys(config.examConfigs);
}

// Helper function to get filter configuration for a specific college and exam
export function getFilterConfig(
  collegeTag: string,
  examType: string
): ExamFilterConfig | null {
  const tagConfig = COLLEGE_TAG_CONFIGS[collegeTag];
  if (!tagConfig) return null;

  return tagConfig.examConfigs[examType] || null;
}

// Helper function to check if college is IIT (for special quota handling)
export function isIITCollege(slug: string): boolean {
  return slug.toLowerCase().startsWith("iit-");
}

// Helper function to check if college is government institute
export function isGovernmentInstitute(collegeTag: string): boolean {
  const config = COLLEGE_TAG_CONFIGS[collegeTag];
  return config?.isGovernmentInstitute || false;
}

// Helper function to get default quota for a college tag
export function getDefaultQuota(collegeTag: string): string | undefined {
  const config = COLLEGE_TAG_CONFIGS[collegeTag];
  return config?.defaultQuota;
}

// Helper function to get exam config for individual college (with fallback to tag-based)
export function getExamConfigForCollege(
  collegeSlug: string,
  examType: string
): ExamFilterConfig | null {
  // First check for individual college configuration
  const individualConfig = INDIVIDUAL_COLLEGE_CONFIGS[collegeSlug];
  if (individualConfig?.examConfigs[examType]) {
    return individualConfig.examConfigs[examType];
  }

  // Fallback to tag-based configuration
  const collegeTag = getCollegeTagFromSlug(collegeSlug);
  return getFilterConfig(collegeTag, examType);
}

// Helper function to get available exam types for a specific college
export function getAvailableExamTypesForCollege(collegeSlug: string): string[] {
  // First check individual college config
  const individualConfig = INDIVIDUAL_COLLEGE_CONFIGS[collegeSlug];
  if (individualConfig) {
    const individualExams = Object.keys(individualConfig.examConfigs);

    // If has fallback tag, also include exams from tag config
    if (individualConfig.fallbackTag) {
      const tagExams = getAvailableExamTypes(individualConfig.fallbackTag);
      return [...new Set([...individualExams, ...tagExams])];
    }

    return individualExams;
  }

  // Fallback to tag-based configuration
  const collegeTag = getCollegeTagFromSlug(collegeSlug);
  return getAvailableExamTypes(collegeTag);
}

// Function to get complete filter options for a college and exam type
export function getCompleteFilterOptions(
  collegeSlug: string,
  examType: string
): FilterOptions | null {
  const examConfig = getExamConfigForCollege(collegeSlug, examType);

  if (!examConfig) return null;

  // Use college-specific years if available, otherwise use default years
  const availableYears = examConfig.years || AVAILABLE_YEARS;

  // Convert subcategories to string array
  let subCategories: string[] = [];
  if (examConfig.subCategories) {
    subCategories = examConfig.subCategories as string[];
  } else {
    subCategories = COMMON_SUB_CATEGORIES;
  }

  return {
    years: availableYears,
    subCategories: subCategories,
    quotaOptions: examConfig.quotaOptions || [],
    seatTypeOptions: examConfig.seatTypeOptions,
    requiresSubCategory: examConfig.requiresSubCategory,
    requiresQuota: examConfig.requiresQuota && !isIITCollege(collegeSlug), // IITs don't require quota selection
  };
}
