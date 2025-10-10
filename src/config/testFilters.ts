/**
 * Example usage and test file for cutoff filters
 * This demonstrates how the new filter system works with different college types
 */

import {
  getCollegeTagFromSlug,
  getCompleteFilterOptions,
  getAvailableExamTypes,
  getAvailableExamTypesForCollege,
  isIITCollege,
  getDefaultQuota,
} from "./cutoffFilters";

// Example usage for different college types

// 1. IIT College
console.log("=== IIT Delhi ===");
const iitSlug = "iit-delhi";
const iitTag = getCollegeTagFromSlug(iitSlug);
const iitExamTypes = getAvailableExamTypes(iitTag);
console.log("College Tag:", iitTag);
console.log("Available Exam Types:", iitExamTypes);
console.log("Is IIT:", isIITCollege(iitSlug));
console.log("Default Quota:", getDefaultQuota(iitTag));

if (iitExamTypes.includes("JEE-Advanced")) {
  const iitFilters = getCompleteFilterOptions(iitSlug, "JEE-Advanced");
  console.log("JEE-Advanced Filters:", {
    requiresSubCategory: iitFilters?.requiresSubCategory,
    requiresQuota: iitFilters?.requiresQuota,
    seatTypeOptions: iitFilters?.seatTypeOptions.length,
    quotaOptions: iitFilters?.quotaOptions,
  });
}

// 2. NIT College
console.log("\n=== NIT Trichy ===");
const nitSlug = "nit-trichy";
const nitTag = getCollegeTagFromSlug(nitSlug);
const nitExamTypes = getAvailableExamTypes(nitTag);
console.log("College Tag:", nitTag);
console.log("Available Exam Types:", nitExamTypes);
console.log("Is IIT:", isIITCollege(nitSlug));

if (nitExamTypes.includes("JEE-Main")) {
  const nitFilters = getCompleteFilterOptions(nitSlug, "JEE-Main");
  console.log("JEE-Main Filters:", {
    requiresSubCategory: nitFilters?.requiresSubCategory,
    requiresQuota: nitFilters?.requiresQuota,
    seatTypeOptions: nitFilters?.seatTypeOptions.length,
    quotaOptions: nitFilters?.quotaOptions,
  });
}

// 3. AIIMS College
console.log("\n=== AIIMS Delhi ===");
const aiimsSlug = "aiims-delhi";
const aiimsTag = getCollegeTagFromSlug(aiimsSlug);
const aiimsExamTypes = getAvailableExamTypes(aiimsTag);
console.log("College Tag:", aiimsTag);
console.log("Available Exam Types:", aiimsExamTypes);

if (aiimsExamTypes.includes("NEET-UG")) {
  const aiimsFilters = getCompleteFilterOptions(aiimsSlug, "NEET-UG");
  console.log("NEET-UG Filters:", {
    requiresSubCategory: aiimsFilters?.requiresSubCategory,
    requiresQuota: aiimsFilters?.requiresQuota,
    seatTypeOptions: aiimsFilters?.seatTypeOptions.length,
  });
}

// 4. NSUT Delhi (Individual College Config)
console.log("\n=== NSUT Delhi (Individual Config) ===");
const nsutSlug = "nsut-delhi";
const nsutTag = getCollegeTagFromSlug(nsutSlug);
const nsutExamTypes = getAvailableExamTypesForCollege(nsutSlug);
console.log("College Tag:", nsutTag);
console.log("Available Exam Types:", nsutExamTypes);
console.log("Is IIT:", isIITCollege(nsutSlug));

if (nsutExamTypes.includes("JEE-Main")) {
  const nsutFilters = getCompleteFilterOptions(nsutSlug, "JEE-Main");
  console.log("NSUT JEE-Main Filters:", {
    years: nsutFilters?.years,
    requiresSubCategory: nsutFilters?.requiresSubCategory,
    requiresQuota: nsutFilters?.requiresQuota,
    seatTypeOptions: nsutFilters?.seatTypeOptions,
    quotaOptions: nsutFilters?.quotaOptions,
    subCategories: nsutFilters?.subCategories,
  });
}

// 5. DTU Delhi (Individual College Config)
console.log("\n=== DTU Delhi (Individual Config) ===");
const dtuSlug = "dtu-delhi";
const dtuExamTypes = getAvailableExamTypesForCollege(dtuSlug);
console.log("Available Exam Types:", dtuExamTypes);

if (dtuExamTypes.includes("JEE-Main")) {
  const dtuFilters = getCompleteFilterOptions(dtuSlug, "JEE-Main");
  console.log("DTU JEE-Main Filters:", {
    years: dtuFilters?.years,
    subCategories: dtuFilters?.subCategories,
    quotaOptions: dtuFilters?.quotaOptions,
  });
}

// 6. Private College (Tag-based)
console.log("\n=== Manipal University (Tag-based) ===");
const privateSlug = "manipal-university";
const privateTag = getCollegeTagFromSlug(privateSlug);
const privateExamTypes = getAvailableExamTypes(privateTag);
console.log("College Tag:", privateTag);
console.log("Available Exam Types:", privateExamTypes);
console.log("Is IIT:", isIITCollege(privateSlug));
